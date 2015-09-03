package shop_site;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.model.DodatneUsluge;
import beans.model.KomadNamestaja;
import beans.model.Korisnik;
import beans.model.Racun;
import beans.model.ShoppingCart;
import beans.model.ShoppingCartItemNamestaj;
import beans.model.ShoppingCartItemUsluga;
import beans.model.StringGetter;
import beans.repositories.DodatneUslugeRepository;
import beans.repositories.KorisnikRepository;
import beans.repositories.RacunRepository;

/**
 * Servlet implementation class KupiServlet
 */
public class KupiServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public KupiServlet() {
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
		proveriKorisnika(request,response);
	}
	private synchronized void proveriKorisnika(HttpServletRequest request, HttpServletResponse response) throws JsonParseException, JsonMappingException, IOException{
		ObjectMapper mapper = new ObjectMapper();
		String jsonRequest = request.getParameter("dodatnaUslugaPodaci");
		//KomadNamestaja s = mapper.readValue(jsonRequest, KomadNamestaja.class);
		StringGetter s = mapper.readValue(jsonRequest, StringGetter.class);
		String korisnickoIme = s.getParametar();

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
		Calendar c = Calendar.getInstance();
		c.set(115, 6, 31);
		RacunRepository racRep = new RacunRepository(putanja+"/racuni.dat");
		int count;
		if(racRep == null){
			count = 0;
		}else{
			count = racRep.FindAll().size();
		}
		ArrayList<KomadNamestaja> listaKomada = new ArrayList<KomadNamestaja>();
		ArrayList<DodatneUsluge> listaUsluga = new ArrayList<DodatneUsluge>();
		
		for(ShoppingCartItemNamestaj scin:korisnik.getShoppingCart().getListaNamestaja()){
			listaKomada.add(new KomadNamestaja(scin.getKomadNamestaja()));
		}
		for(ShoppingCartItemUsluga scin:korisnik.getShoppingCart().getListaUsluga()){
			listaUsluga.add(new DodatneUsluge(scin.getDodatnaUsluga()));
		}
		Racun korisnickiRacun = new Racun(0.2,korisnik.getShoppingCart().getTotal(),new Date(), null, korisnik, listaKomada, listaUsluga, count);
		
		try{
			racRep.Save(korisnickiRacun);
			/*ISPRAZNI KORPU*/
			for(Korisnik k:korRep.FindAll()){
				if(k.getKorisnickoIme().equals(korisnik.getKorisnickoIme())){
					k.setShoppingCart(null);
					k.setShoppingCart(new ShoppingCart(new ArrayList<ShoppingCartItemNamestaj>(),new ArrayList<ShoppingCartItemUsluga>()));
					korisnik.setShoppingCart(new ShoppingCart(new ArrayList<ShoppingCartItemNamestaj>(),new ArrayList<ShoppingCartItemUsluga>()));
					korRep.Change(k);
					break;
				}
			}
			
			/*DEBUG*/
				for(Racun rac:racRep.FindAll()){
					System.out.println("RACUN: "+rac.getCountKomadiNamestaja()+", CENA: "+rac.getUkupnaCena());
				}
			
			/**/
			String answer = mapper.writeValueAsString(true);
			response.getWriter().write(answer);
			return;
		}catch(Exception ex){
			
		}
	}
}
