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
import beans.model.StringGetter;
import beans.model.TreeNode;
import beans.repositories.KategorijaRepository;

/**
 * Servlet implementation class GetKateogrijaServlet
 */
public class GetKateogrijaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetKateogrijaServlet() {
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
		JSONObject jsonObject2 = new JSONObject();
		ObjectMapper mapper = new ObjectMapper();
		String jsonRequest = request.getParameter("kategorija");
		
		StringGetter a = mapper.readValue(jsonRequest, StringGetter.class);
		
		response.setContentType("application/json");  
		try{
			 mapper.writeValue(response.getOutputStream(), makeJSONKategorije(request, a).toString());
			 return;
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
	}
	
	private String cijeJe= "";
	private HashMap<String, Object> mapaDece;
	private ArrayList<HashMap<String, Object>> listaDece = new ArrayList<HashMap<String, Object>>();
	private ArrayList<ArrayList<HashMap<String, Object>>> listaListeDece = new ArrayList<ArrayList<HashMap<String, Object>>>();
	private boolean vecDodato = false;
	
	@SuppressWarnings("unchecked")
	private synchronized JSONObject makeJSONKategorije(HttpServletRequest request, StringGetter a){
		JSONObject jsonObject = new JSONObject();
		String putanja = getServletContext().getRealPath("");
		KategorijaRepository kategorijaRepository = new KategorijaRepository(putanja+"/kategorije.dat");
		listaDece = new ArrayList<HashMap<String, Object>>();
		listaListeDece = new ArrayList<ArrayList<HashMap<String, Object>>>();
		ArrayList<Kategorija> listaKategorija = kategorijaRepository.FindAll();
		for(Kategorija kat:listaKategorija){
			if(kat.getCvor().getNaziv().equals(a.getParametar())){
				HashMap<String,Object> mapaAtributaKategorija;
				ArrayList<HashMap<String,Object>> listaMapaAtributaKategorija = new ArrayList<HashMap<String,Object>>();
				
				for(TreeNode k:kat.getCvor().getChildren()){
					mapaAtributaKategorija = new HashMap<String,Object>();
					mapaAtributaKategorija.put("naziv", k.getNaziv());
					mapaAtributaKategorija.put("opis", k.getOpis());
					mapaAtributaKategorija.put("roditelj", k.getParent().getNaziv());
					listaMapaAtributaKategorija.add(mapaAtributaKategorija);
				}
				
				jsonObject.put("Kategorije", listaMapaAtributaKategorija);
				return jsonObject;
			}
		}
		//recursiveSearch(listaKategorija.get(0).getCvor());
		
		//jsonObject.put("Kategorije", listaListeDece);
		return null;
		
	}

}
