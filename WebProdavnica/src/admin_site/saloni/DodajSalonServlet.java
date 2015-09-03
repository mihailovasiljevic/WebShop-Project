package admin_site.saloni;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.model.Korisnik;
import beans.model.Salon;
import beans.repositories.KorisnikRepository;
import beans.repositories.SalonRepository;

/**
 * Servlet implementation class DodajSalonServlet
 */
public class DodajSalonServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DodajSalonServlet() {
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
		proveriSalon(request,response);
	}
	private synchronized void proveriSalon(HttpServletRequest request, HttpServletResponse response) throws IOException{
		ObjectMapper mapper = new ObjectMapper();
		String jsonRequest = request.getParameter("salonPodaci");
		Salon s = mapper.readValue(jsonRequest, Salon.class);
		
		System.out.println(s.getNaziv());
		System.out.println(s.getPib());
		
		String putanja = getServletContext().getRealPath("");
		SalonRepository salonRepository = new SalonRepository(putanja+"/saloni.dat");
		response.setContentType("application/json"); 
		
		//Proveri da li korisnik vec postoji
		for(Salon sal: salonRepository.FindAll()){
			if(sal.getPib().equals(s.getPib())){
				String answer = mapper.writeValueAsString("salon_postoji");
				response.getWriter().write(answer);
				return;
			}
		}
		
		//ako ne postoji dodaj ga i vrati ga kao odgovor
		salonRepository.Save(new Salon(s));
		 mapper.writeValue(response.getOutputStream(), makeJSONSalon(request, s).toString());
		 return;
	}
	private synchronized JSONObject makeJSONSalon(HttpServletRequest request, Salon s){
		JSONObject jsonObject = new JSONObject();
		String putanja = getServletContext().getRealPath("");
		SalonRepository salonRepository = new SalonRepository(putanja+"/saloni.dat");
		
		ArrayList<Salon> listaSalona = salonRepository.FindAll();
		HashMap<String,Object> mapaAtributaSalona;
		ArrayList<HashMap<String,Object>> listaMapaAtributaSalona = new ArrayList<HashMap<String,Object>>(); 
	    

			mapaAtributaSalona = new HashMap<String, Object>();
			mapaAtributaSalona.put("naziv", s.getNaziv());
			mapaAtributaSalona.put("pib", s.getPib());
			mapaAtributaSalona.put("maticniBroj", s.getMaticniBroj());
			mapaAtributaSalona.put("brojZiroRacuna", s.getBrojZiroRacuna());
			mapaAtributaSalona.put("adresa", s.getAdresa());
			mapaAtributaSalona.put("telefon", s.getTelefon());
			mapaAtributaSalona.put("email", s.getEmail());
			mapaAtributaSalona.put("adresaInternetSajta", s.getAdresaInternetSajta());
			listaMapaAtributaSalona.add(mapaAtributaSalona);

		jsonObject.put("Salon", listaMapaAtributaSalona.get(0));
		return jsonObject;
	}

}
