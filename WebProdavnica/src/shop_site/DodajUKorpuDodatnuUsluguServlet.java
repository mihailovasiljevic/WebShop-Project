package shop_site;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.model.DodatneUsluge;
import beans.model.KomadNamestaja;
import beans.model.Korisnik;
import beans.model.StringGetter;
import beans.repositories.DodatneUslugeRepository;
import beans.repositories.KomadNamestajaRepository;
import beans.repositories.KorisnikRepository;

/**
 * Servlet implementation class DodajUKorpuDodatnuUsluguServlet
 */
public class DodajUKorpuDodatnuUsluguServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DodajUKorpuDodatnuUsluguServlet() {
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
		proveriDodavanjeUKorpuDodatneUsluge(request,response);
	}
	private synchronized void proveriDodavanjeUKorpuDodatneUsluge(HttpServletRequest request, HttpServletResponse response) throws IOException{
		ObjectMapper mapper = new ObjectMapper();
		String jsonRequest = request.getParameter("dodatnaUslugaPodaci");
		//KomadNamestaja s = mapper.readValue(jsonRequest, KomadNamestaja.class);
		StringGetter s = mapper.readValue(jsonRequest, StringGetter.class);
		String[] tokens = s.getParametar().split(",");
		String naziv = tokens[0];
		String besplatna = tokens[1];
		/*pribavi sve repozitorijume*/
		String putanja = getServletContext().getRealPath("");
		DodatneUslugeRepository duRepository = new DodatneUslugeRepository(putanja+"/dodatneUsluge.dat");
		KorisnikRepository korRep = new KorisnikRepository(putanja+"/korisnici.dat");
		response.setContentType("application/json"); 
		
		DodatneUsluge dodatnaUslugaZaDodati = new DodatneUsluge();

		for(DodatneUsluge kn: duRepository.FindAll()){
			if(kn.getNaziv().equals(naziv)){
				dodatnaUslugaZaDodati = new DodatneUsluge(kn);
				break;
			}
		}
		/*U slucaju da nema korisnika vrati gresku!*/
		Korisnik korisnik = (Korisnik)request.getSession().getAttribute("korisnik");
		if(korisnik == null){
			String answer = mapper.writeValueAsString(false);
			response.getWriter().write(answer);
			return;
		}
		try{
			/*Dodaj proizovd u korisnikovu korpu!*/
			int besp = Integer.parseInt(besplatna);
			int res = korisnik.getShoppingCart().addUsluga(dodatnaUslugaZaDodati,besp);
			if(res == -1){
				String answer = mapper.writeValueAsString("vec_dodato");
				response.getWriter().write(answer);
				return;
			}
		}catch(Exception ex){
			/*Greskau  parsiranju pre svega vraca false*/
			String answer = mapper.writeValueAsString(false);
			response.getWriter().write(answer);
			return;
		}
		/*Sacuvaj izmenjenog korisnika i vrati uspesno odradjenu radnju!*/
		for(Korisnik k:korRep.FindAll()){
			if(k.getKorisnickoIme().equals(korisnik.getKorisnickoIme())){
				korRep.Change(k);
			}
		}
		String answer = mapper.writeValueAsString(true);
		response.getWriter().write(answer);
		return;
		 
	}

}
