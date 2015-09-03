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
 * Servlet implementation class IzmeniKategorijuServlet
 */
public class IzmeniKategorijuServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public IzmeniKategorijuServlet() {
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
		boolean postoji = false;
		ObjectMapper mapper = new ObjectMapper();
		String jsonRequest = request.getParameter("kategorijaPodaci");
		StringGetter strGet = mapper.readValue(jsonRequest, StringGetter.class);
		String[] tokens = strGet.getParametar().split(",");
		String putanja = getServletContext().getRealPath("");
		KategorijaRepository kategorijaRepository = new KategorijaRepository(putanja+"/kategorije.dat");
		TreeNode tmpParent = null;
		int brojac = 0;
		for(Kategorija kat:kategorijaRepository.FindAll()){
			if(kat.getCvor().getNaziv().equals(tokens[3])){
				tmpParent = kat.getCvor();
				Kategorija tmpKat = new Kategorija(tokens[0], tokens[1], tmpParent);
				kat.getCvor().removeChild(tmpKat.getCvor());
				kategorijaRepository.Change(kat);
				brojac++;
			}
			if(kat.getCvor().getNaziv().equals(tokens[2])){
				tmpParent = kat.getCvor();
				Kategorija tmpKat = new Kategorija(tokens[0], tokens[1], tmpParent);
				kat.getCvor().addChild(tmpKat.getCvor());
				kategorijaRepository.Change(kat);
				brojac++;
			}
			if(kat.getCvor().getNaziv().equals(tokens[0])){
				kat.getCvor().setNaziv(tokens[0]);
				kat.getCvor().setOpis(tokens[1]);
				kategorijaRepository.Change(kat);
				brojac++;
			}
			if(brojac == 3){
				response.setContentType("application/json"); 
				/*Vrati celokupno stanje posle promene*/
				mapper.writeValue(response.getOutputStream(), makeJSONKategorije(request).toString());
				return;
			}
		}
		if(brojac == 3){
			response.setContentType("application/json"); 
			/*Vrati celokupno stanje posle promene*/
			mapper.writeValue(response.getOutputStream(), makeJSONKategorije(request).toString());
			return;
		}else{
			response.setContentType("application/json"); 
			/*Vrati celokupno stanje posle promene*/
			String answer = mapper.writeValueAsString("kategorija_ne_postoji");
			response.getWriter().write(answer);
			return;
		}
	}
	private ArrayList<HashMap<String, Object>> listaDece = new ArrayList<HashMap<String, Object>>();
	private ArrayList<ArrayList<HashMap<String, Object>>> listaListeDece = new ArrayList<ArrayList<HashMap<String, Object>>>();
	private boolean vecDodato = false;

	@SuppressWarnings("unchecked")
	private synchronized JSONObject makeJSONKategorije(HttpServletRequest request){
		JSONObject jsonObject = new JSONObject();
		String putanja = getServletContext().getRealPath("");
		KategorijaRepository kategorijaRepository = new KategorijaRepository(putanja+"/kategorije.dat");
		listaDece = new ArrayList<HashMap<String, Object>>();
		listaListeDece = new ArrayList<ArrayList<HashMap<String, Object>>>();
		ArrayList<Kategorija> listaKategorija = kategorijaRepository.FindAll();
		recursiveSearch(listaKategorija.get(0).getCvor());
		
		jsonObject.put("Kategorije", listaListeDece);
		return jsonObject;
		
	}
	private synchronized void recursiveSearch(TreeNode tmpNode){
		//System.out.println(tmpNode.getNaziv() + cijeJe);
		
		ArrayList<TreeNode> children = tmpNode.getChildren(); 
		listaDece = new ArrayList<HashMap<String, Object>>();
	    for (int i = 0; i < children.size(); i++) { 
	      vecDodato = false;
	       HashMap<String, Object> mapaDece = new HashMap<String, Object>();
	       mapaDece.put("naziv", children.get(i).getNaziv());
	       mapaDece.put("opis", children.get(i).getOpis());
	       mapaDece.put("roditelj", children.get(i).getParent().getNaziv());
	       System.out.println("\nnaziv:" + children.get(i).getNaziv()+" opis:"+ children.get(i).getOpis()+" roditelj:"+children.get(i).getParent().getNaziv());
	       for(int j = 0; j < listaListeDece.size(); j++){
	    	   if(vecDodato == true)
	    		   break;
	    	   int listSize = listaListeDece.get(j).size();
	    	   for(int k = 0; k < listSize; k++ ){
	    		   if(listaListeDece.get(j).get(k).get("roditelj").equals(children.get(i).getParent().getNaziv())){
	    			   listaListeDece.get(j).add(mapaDece);
	    			   vecDodato = true;
	    			   break;
	    		   }
	    	   }
	       }
	       if(vecDodato == false){
		       listaDece.add(mapaDece);
		       listaListeDece.add(listaDece);
	       }
	       //cijeJe= " " + children.get(i).getParent().getNaziv();
	       recursiveSearch( children.get(i));
	    }

	    //listaListeDece.add(listaDece);
	 }

}
