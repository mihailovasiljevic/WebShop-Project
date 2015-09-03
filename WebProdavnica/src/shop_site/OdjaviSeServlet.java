package shop_site;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.model.DodatneUsluge;
import beans.model.KomadNamestaja;
import beans.model.Korisnik;
import beans.model.ShoppingCartItemNamestaj;
import beans.model.ShoppingCartItemUsluga;
import beans.model.StringGetter;
import beans.repositories.DodatneUslugeRepository;
import beans.repositories.KomadNamestajaRepository;
import beans.repositories.KorisnikRepository;

/**
 * Servlet implementation class OdjaviSeServlet
 */
public class OdjaviSeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public OdjaviSeServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		ObjectMapper mapper = new ObjectMapper();
		String jsonRequest = request.getParameter("komadNamestajaPodaci");
		//KomadNamestaja s = mapper.readValue(jsonRequest, KomadNamestaja.class);
		StringGetter s = mapper.readValue(jsonRequest, StringGetter.class);
		String korisnickoIme = s.getParametar();

		/*pribavi sve repozitorijume*/
		String putanja = getServletContext().getRealPath("");
		KorisnikRepository korRep = new KorisnikRepository(putanja+"/korisnici.dat");
		response.setContentType("application/json"); 
		/*U slucaju da nema korisnika vrati gresku!*/
		Korisnik korisnik = (Korisnik)request.getSession().getAttribute("korisnik");
		if(korisnik == null){
			String answer = mapper.writeValueAsString(false);
			response.getWriter().write(answer);
			return;
		}
		for(Korisnik k:korRep.FindAll()){
			if(k.getKorisnickoIme().equals(korisnik.getKorisnickoIme())){
				k.setPrijavljen(false);
				korRep.Change(k);
				break;
			}
		}
		/*ako je imao nesto u korpi vrati na stanje*/
		KomadNamestajaRepository knRepository = new KomadNamestajaRepository(putanja+"/komadiNamestaja.dat");
		
		for(ShoppingCartItemNamestaj scin:korisnik.getShoppingCart().getListaNamestaja()){
			for(KomadNamestaja kn:knRepository.FindAll()){
				if(kn.getSifra().equals(scin.getKomadNamestaja().getSifra())){
					kn.setKolicinaUMagacinu(kn.getKolicinaUMagacinu()+scin.getBrojKomadaNamestaja());
					knRepository.Change(kn);
					break;
				}
			}
		}
		
		HttpSession session = request.getSession(false);
		if(session!=null)
			session.invalidate();
		String answer = mapper.writeValueAsString(true);
		response.getWriter().write(answer);
		return;
	}

}
