package admin_site.komadinamestaja;

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
import beans.model.KomadNamestaja;
import beans.model.Salon;
import beans.model.Slika;
import beans.model.StringGetter;
import beans.model.Video;
import beans.repositories.KategorijaRepository;
import beans.repositories.KomadNamestajaRepository;
import beans.repositories.SalonRepository;
import beans.repositories.SlikaRepository;
import beans.repositories.VideoRepository;

/**
 * Servlet implementation class ObrisiKomadNamestaja
 */
public class ObrisiKomadNamestaja extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ObrisiKomadNamestaja() {
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

		
		/*pribavi sve repozitorijume*/
		String putanja = getServletContext().getRealPath("");
		SlikaRepository slikRep = new SlikaRepository(putanja+"/slike.dat");
		VideoRepository vidRep = new VideoRepository(putanja+"/videi.dat");
		Slika tmpSlika = null;
		Video tmpVideo=null;
		KomadNamestaja tmpKomadNamestaja;
		
		for(Slika slik:slikRep.FindAll()){
			if(slik.getOznaka().equals(s.getParametar())){
				slikRep.Delete(slik);
				break;
			}
		}
		
		for(Video vid:vidRep.FindAll()){
			if(vid.getOznaka().equals(s.getParametar())){
				vidRep.Delete(vid);
				break;
			}
		}
		KomadNamestajaRepository knRepository = new KomadNamestajaRepository(putanja+"/komadiNamestaja.dat");
		response.setContentType("application/json"); 
		//Proveri da li komad namestaja postoji
		for(KomadNamestaja kn: knRepository.FindAll()){
			if(kn.getSifra().equals(s.getParametar())){
				JSONObject jsp = makeJSONKomadNamestaja(request, kn);
				knRepository.Delete(kn);
				 mapper.writeValue(response.getOutputStream(), jsp.toString());
				return;
			}
		}
		String answer = mapper.writeValueAsString("komad_ne_postoji");
		response.getWriter().write(answer);
	}
	@SuppressWarnings("unchecked")
	private synchronized JSONObject makeJSONKomadNamestaja(HttpServletRequest request, KomadNamestaja s){
		JSONObject jsonObject = new JSONObject();
		HashMap<String,Object> mapaAtributaKomadaNamestaja;
		ArrayList<HashMap<String,Object>> listaMapaAtributaKomadaNamestaja = new ArrayList<HashMap<String,Object>>(); 

			mapaAtributaKomadaNamestaja = new HashMap<String, Object>();
			mapaAtributaKomadaNamestaja.put("sifra", s.getSifra());
			listaMapaAtributaKomadaNamestaja.add(mapaAtributaKomadaNamestaja);
		jsonObject.put("KomadNamestaja", listaMapaAtributaKomadaNamestaja);
		return jsonObject;
	}
}
