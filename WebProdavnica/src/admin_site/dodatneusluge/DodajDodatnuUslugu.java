package admin_site.dodatneusluge;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.model.DodatneUsluge;
import beans.repositories.DodatneUslugeRepository;

/**
 * Servlet implementation class DodajDodatnuUslugu
 */
public class DodajDodatnuUslugu extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DodajDodatnuUslugu() {
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
		proveriDodatnuUslugu(request,response);
	}
	private synchronized void proveriDodatnuUslugu(HttpServletRequest request, HttpServletResponse response) throws IOException{
		ObjectMapper mapper = new ObjectMapper();
		String jsonRequest = request.getParameter("dodatneUslugePodaci");
		DodatneUsluge du = mapper.readValue(jsonRequest, DodatneUsluge.class);
		
		String putanja = getServletContext().getRealPath("");
		
		DodatneUslugeRepository duRepository = new DodatneUslugeRepository(putanja+"/dodatneUsluge.dat");
		response.setContentType("application/json"); 
		
		//Proveri da li korisnik vec postoji
		for(DodatneUsluge dus: duRepository.FindAll()){
			if(dus.getNaziv().equals(du.getNaziv())){
				String answer = mapper.writeValueAsString("dodatna_usluga_postoji");
				response.getWriter().write(answer);
				return;
			}
		}
		
		//ako ne postoji dodaj ga i vrati ga kao odgovor
		duRepository.Save(new DodatneUsluge(du));
		 mapper.writeValue(response.getOutputStream(), makeJSONDodatneUsluge(request, du).toString());
		 return;
		 
	}
	@SuppressWarnings("unchecked")
	private synchronized JSONObject makeJSONDodatneUsluge(HttpServletRequest request, DodatneUsluge s){
		JSONObject jsonObject = new JSONObject();


		HashMap<String,Object> mapaAtributaDodatnihUslugea;
		ArrayList<HashMap<String,Object>> listaMapaAtributaDodatnihUsluga = new ArrayList<HashMap<String,Object>>(); 


			mapaAtributaDodatnihUslugea = new HashMap<String, Object>();
			mapaAtributaDodatnihUslugea.put("naziv", s.getNaziv());
			mapaAtributaDodatnihUslugea.put("opis", s.getOpis());
			mapaAtributaDodatnihUslugea.put("cena", s.getCena());
	
			listaMapaAtributaDodatnihUsluga.add(mapaAtributaDodatnihUslugea);

		
		jsonObject.put("DodatnaUsluga", listaMapaAtributaDodatnihUsluga);
		return jsonObject;
	}
}
