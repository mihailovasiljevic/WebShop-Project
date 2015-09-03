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
import beans.model.ShoppingCartItemUsluga;
import beans.model.StringGetter;
import beans.repositories.DodatneUslugeRepository;
import beans.repositories.KomadNamestajaRepository;
import beans.repositories.KorisnikRepository;

/**
 * Servlet implementation class UkloniIzKorpeDodatnuUsluguServlet
 */
public class UkloniIzKorpeDodatnuUsluguServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UkloniIzKorpeDodatnuUsluguServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
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
		//doGet(request, response);
		proveriDodavanjeUDodatneUsluge(request,response);
	}
	private synchronized void proveriDodavanjeUDodatneUsluge(HttpServletRequest request, HttpServletResponse response) throws IOException{
		ObjectMapper mapper = new ObjectMapper();
		String jsonRequest = request.getParameter("dodatnaUslugaPodaci");
		//KomadNamestaja s = mapper.readValue(jsonRequest, KomadNamestaja.class);
		StringGetter s = mapper.readValue(jsonRequest, StringGetter.class);
		String naziv = s.getParametar();

		/*pribavi sve repozitorijume*/
		String putanja = getServletContext().getRealPath("");
		DodatneUslugeRepository duRepository = new DodatneUslugeRepository(putanja+"/dodatneUsluge.dat");
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
			for(ShoppingCartItemUsluga sc:korisnik.getShoppingCart().getListaUsluga()){
				if(sc.getDodatnaUsluga().getNaziv().equals(naziv)){
					//ukloni sve
					korisnik.getShoppingCart().getListaUsluga().remove(sc);

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
