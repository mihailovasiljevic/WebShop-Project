package admin_site.kategorije;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.model.Kategorija;
import beans.model.Salon;
import beans.model.StringGetter;
import beans.model.TreeNode;
import beans.repositories.KategorijaRepository;
import beans.repositories.SalonRepository;

/**
 * Servlet implementation class DodajKategorijuServlet
 */
public class DodajKategorijuServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DodajKategorijuServlet() {
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
		proveriKategoriju(request,response);
	}
	private synchronized void proveriKategoriju(HttpServletRequest request, HttpServletResponse response) throws IOException{
		ObjectMapper mapper = new ObjectMapper();
		String jsonRequest = request.getParameter("kategorijaPodaci");
		StringGetter strGet = mapper.readValue(jsonRequest, StringGetter.class);
		String[] tokens = strGet.getParametar().split(",");
		String putanja = getServletContext().getRealPath("");
		KategorijaRepository kategorijaRepository = new KategorijaRepository(putanja+"/kategorije.dat");
		TreeNode tmpParent = null;
		for(Kategorija kat:kategorijaRepository.FindAll()){
			if(kat.getCvor().getNaziv().equals(tokens[2])){
				Kategorija tmpKat = new Kategorija(tokens[0], tokens[1], kat.getCvor());
				//Proveri da li korisnik vec postoji
				for(Kategorija kat2: kategorijaRepository.FindAll()){
					if(kat.getCvor().getNaziv().equals(tmpKat.getCvor().getNaziv())){
						response.setContentType("application/json"); 
						String answer = mapper.writeValueAsString("kategorija_postoji");
						response.getWriter().write(answer);
						return;
					}
				}
				kat.getCvor().addChild(tmpKat.getCvor());
				//ako ne postoji dodaj ga i vrati ga kao odgovor
				kategorijaRepository.Save(new Kategorija(tmpKat));
				kategorijaRepository.Change(kat);
				response.setContentType("application/json");
				 mapper.writeValue(response.getOutputStream(), makeJSONKategorija(request, tmpKat).toString());
				 return;
			}
		}
		
		
		
		
		
		

	}

	@SuppressWarnings("unchecked")
	private synchronized JSONObject makeJSONKategorija(HttpServletRequest request, Kategorija s){
		JSONObject jsonObject = new JSONObject();
		HashMap<String,Object> mapaAtributaKategorija;
		ArrayList<HashMap<String,Object>> listaMapaAtributaKategorija = new ArrayList<HashMap<String,Object>>();
		
					mapaAtributaKategorija = new HashMap<String,Object>();
					mapaAtributaKategorija.put("naziv", s.getCvor().getNaziv());
					mapaAtributaKategorija.put("opis", s.getCvor().getOpis());
					mapaAtributaKategorija.put("roditelj", s.getCvor().getParent().getNaziv());
					listaMapaAtributaKategorija.add(mapaAtributaKategorija);

				jsonObject.put("Kategorija", listaMapaAtributaKategorija);
				return jsonObject;

	}

}
