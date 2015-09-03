package admin_site.korisnici;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import beans.model.Korisnik;
import beans.repositories.KorisnikRepository;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class IzmeniKorisnikaServlet
 */
@WebServlet("/izmeniKorisnika")
public class IzmeniKorisnikaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public IzmeniKorisnikaServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		proveriKorisnika(request,response);
	}
	private synchronized void proveriKorisnika(HttpServletRequest request, HttpServletResponse response) throws IOException{
		ObjectMapper mapper = new ObjectMapper();
		String jsonRequest = request.getParameter("korisnikPodaci");
		Korisnik k = mapper.readValue(jsonRequest, Korisnik.class);
		
		System.out.println(k.getUloga().getOznaka());
		System.out.println(k.getUloga().getNaziv());
		
		String putanja = getServletContext().getRealPath("");
		KorisnikRepository korisnikRepository = new KorisnikRepository(putanja+"/korisnici.dat");
		response.setContentType("application/json"); 
		
		//Proveri da li korisnik ne postoji
		for(Korisnik kor: korisnikRepository.FindAll()){
			if(kor.getKorisnickoIme().equals(k.getKorisnickoIme())){
				//ako postoji izmeni ga i vrati ga kao odgovor
				korisnikRepository.Change(k);
				 mapper.writeValue(response.getOutputStream(), makeJSONKorisnik(request, k).toString());
				return;
			}	
		}
		String answer = mapper.writeValueAsString("korisnik_ne_postoji");
		response.getWriter().write(answer);

		 return;
	}
	
	private synchronized JSONObject makeJSONKorisnik(HttpServletRequest request, Korisnik k){
		JSONObject jsonObject = new JSONObject();

		HashMap<String,Object> mapaAtributaKorisnika;
		ArrayList<HashMap<String,Object>> listaMapaAtributaKorisnika = new ArrayList<HashMap<String,Object>>(); 
	    

			mapaAtributaKorisnika = new HashMap<String, Object>();
			mapaAtributaKorisnika.put("korisnickoIme", k.getKorisnickoIme());
			mapaAtributaKorisnika.put("lozinka", k.getLozinka());
			mapaAtributaKorisnika.put("ime", k.getIme());
			mapaAtributaKorisnika.put("prezime", k.getPrezime());
			mapaAtributaKorisnika.put("kontaktTelefon", k.getKontaktTelefon());
			mapaAtributaKorisnika.put("email", k.getEmail());
			mapaAtributaKorisnika.put("prijavljen", k.isPrijavljen()+"");
			mapaAtributaKorisnika.put("uloga", k.getUloga().getNaziv());
			listaMapaAtributaKorisnika.add(mapaAtributaKorisnika);
		jsonObject.put("Korisnik", listaMapaAtributaKorisnika.get(0));
		return jsonObject;
	}
}
