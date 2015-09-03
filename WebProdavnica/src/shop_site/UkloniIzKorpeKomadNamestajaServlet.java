package shop_site;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.model.KomadNamestaja;
import beans.model.Korisnik;
import beans.model.ShoppingCartItemNamestaj;
import beans.model.StringGetter;
import beans.repositories.KomadNamestajaRepository;
import beans.repositories.KorisnikRepository;

/**
 * Servlet implementation class UkloniIzKorpeKomadNamestajaServlet
 */
public class UkloniIzKorpeKomadNamestajaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UkloniIzKorpeKomadNamestajaServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		ObjectMapper mapper = new ObjectMapper();
		response.setContentType("application/json");
		String answer = mapper.writeValueAsString(false);
		response.getWriter().write(answer);
		return;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		proveriDodavanjeUKorpuKomadaNamestaja(request,response);
	}
	private synchronized void proveriDodavanjeUKorpuKomadaNamestaja(HttpServletRequest request, HttpServletResponse response) throws IOException{
		ObjectMapper mapper = new ObjectMapper();
		String jsonRequest = request.getParameter("komadNamestajaPodaci");
		//KomadNamestaja s = mapper.readValue(jsonRequest, KomadNamestaja.class);
		StringGetter s = mapper.readValue(jsonRequest, StringGetter.class);
		String[] tokens = s.getParametar().split(",");
		String sifra = tokens[0];
		String brKomada = tokens[1];
		/*pribavi sve repozitorijume*/
		String putanja = getServletContext().getRealPath("");
		KomadNamestajaRepository knRepository = new KomadNamestajaRepository(putanja+"/komadiNamestaja.dat");
		KorisnikRepository korRep = new KorisnikRepository(putanja+"/korisnici.dat");
		response.setContentType("application/json"); 
		
		/*U slucaju da nema korisnika vrati gresku!*/
		Korisnik korisnik = (Korisnik)request.getSession().getAttribute("korisnik");
		if(korisnik == null){
			String answer = mapper.writeValueAsString(false);
			response.getWriter().write(answer);
			return;
		}
		try{
			int brKomadaNamestaja = Integer.parseInt(brKomada);
			
			for(ShoppingCartItemNamestaj sc:korisnik.getShoppingCart().getListaNamestaja()){
				if(sc.getKomadNamestaja().getSifra().equals(sifra)){
					if(brKomadaNamestaja == 1){
						//ukloni 1
						if((sc.getBrojKomadaNamestaja() - brKomadaNamestaja) < 0){
							String answer = mapper.writeValueAsString(false);
							response.getWriter().write(answer);
							return;
						}else if((sc.getBrojKomadaNamestaja() - brKomadaNamestaja) == 0){
							//ukloni sve
							int brZaVratiti = sc.getBrojKomadaNamestaja();
							korisnik.getShoppingCart().getListaNamestaja().remove(sc);
							for(KomadNamestaja kn:knRepository.FindAll()){
								if(kn.getSifra().equals(sifra)){
									kn.setKolicinaUMagacinu(kn.getKolicinaUMagacinu()+brZaVratiti);
									knRepository.Change(kn);
									break;
								}
							}
						}
						else{
							sc.setBrojKomadaNamestaja(sc.getBrojKomadaNamestaja()-brKomadaNamestaja);
							for(KomadNamestaja kn:knRepository.FindAll()){
								if(kn.getSifra().equals(sifra)){
									kn.setKolicinaUMagacinu(kn.getKolicinaUMagacinu()+brKomadaNamestaja);
									knRepository.Change(kn);
									break;
								}
							}
						}
					}else{
						//ukloni sve
						int brZaVratiti = sc.getBrojKomadaNamestaja();
						korisnik.getShoppingCart().getListaNamestaja().remove(sc);
						for(KomadNamestaja kn:knRepository.FindAll()){
							if(kn.getSifra().equals(sifra)){
								kn.setKolicinaUMagacinu(kn.getKolicinaUMagacinu()+brZaVratiti);
								knRepository.Change(kn);
								break;
							}
						}
					}
					/*Sacuvaj izmenjenog korisnika i vrati uspesno odradjenu radnju!*/
					for(Korisnik k:korRep.FindAll()){
						if(k.getKorisnickoIme().equals(korisnik.getKorisnickoIme())){
							korRep.Change(k);
							break;
						}
					}
					String answer = mapper.writeValueAsString(true);
					response.getWriter().write(answer);
					return;
					
				}
			}
		}catch(Exception ex){
			String answer = mapper.writeValueAsString(false);
			response.getWriter().write(answer);
			return;
		}
	}
}
