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
 * Servlet implementation class IzmeniKomadNamestajaServlet
 */
public class IzmeniKomadNamestajaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public IzmeniKomadNamestajaServlet() {
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
		String[] tokens = s.getParametar().split(",");
		
		/*pribavi sve repozitorijume*/
		String putanja = getServletContext().getRealPath("");
		KategorijaRepository katRep = new KategorijaRepository(putanja+"/kategorije.dat");
		SalonRepository salRep = new SalonRepository(putanja+"/saloni.dat");
		SlikaRepository slikRep = new SlikaRepository(putanja+"/slike.dat");
		VideoRepository vidRep = new VideoRepository(putanja+"/videi.dat");
		Kategorija tmpKat = null;
		Slika tmpSlika = null;
		Video tmpVideo=null;
		Salon tmpSalon = null;
		KomadNamestaja tmpKomadNamestaja;
		
		for(Kategorija kat:katRep.FindAll()){
			if(kat.getCvor().getNaziv().equals(tokens[8])){
				tmpKat = new Kategorija(kat);
				break;
			}
		}
		
		for(Salon sal:salRep.FindAll()){
			if(sal.getPib().equals(tokens[9])){
				tmpSalon = new Salon(sal);
				break;
			}
		}
		
		for(Slika slik:slikRep.FindAll()){
			if(slik.getOznaka().equals(tokens[0])){
				tmpSlika = new Slika(slik);
				break;
			}
		}
		
		for(Video vid:vidRep.FindAll()){
			if(vid.getOznaka().equals(tokens[0])){
				tmpVideo = new Video(vid);
				break;
			}
		}
		double cena;
		int godina;
		int kolicina;
		try{
			cena = Double.parseDouble(tokens[5]);
			kolicina = Integer.parseInt(tokens[6]);
			godina = Integer.parseInt(tokens[7]);
		}catch(Exception ex){
			response.setContentType("application/json");
			String answer = mapper.writeValueAsString("greska");
			response.getWriter().write(answer);
			return;
		}
		
		
		tmpKomadNamestaja = new KomadNamestaja(tokens[0], tokens[1], tokens[2], tokens[3], tokens[4], cena, kolicina, godina,tmpKat,tmpSlika,tmpVideo,tmpSalon); 
				
				
		KomadNamestajaRepository knRepository = new KomadNamestajaRepository(putanja+"/komadiNamestaja.dat");
		response.setContentType("application/json"); 
		
		//Proveri da li komad namestaja postoji
		for(KomadNamestaja kn: knRepository.FindAll()){
			if(kn.getSifra().equals(tmpKomadNamestaja.getSifra())){
				knRepository.Change(tmpKomadNamestaja);
				 mapper.writeValue(response.getOutputStream(), makeJSONKomadNamestaja(request, tmpKomadNamestaja).toString());
				 return;
			}
		}
		String answer = mapper.writeValueAsString("komad_ne_postoji");
		response.getWriter().write(answer);
	}
	private synchronized JSONObject makeJSONKomadNamestaja(HttpServletRequest request, KomadNamestaja s){
		JSONObject jsonObject = new JSONObject();
		HashMap<String,Object> mapaAtributaKomadaNamestaja;
		ArrayList<HashMap<String,Object>> listaMapaAtributaKomadaNamestaja = new ArrayList<HashMap<String,Object>>(); 

			mapaAtributaKomadaNamestaja = new HashMap<String, Object>();
			mapaAtributaKomadaNamestaja.put("sifra", s.getSifra());
			mapaAtributaKomadaNamestaja.put("naziv", s.getNaziv());
			mapaAtributaKomadaNamestaja.put("boja", s.getBoja());
			mapaAtributaKomadaNamestaja.put("zemljaProizvodnje", s.getZemljaProizvodnje());
			mapaAtributaKomadaNamestaja.put("nazivProizvodjaca", s.getNazivProizvodjaca());
			mapaAtributaKomadaNamestaja.put("jedinicnaCena", s.getJedinicnaCena());

			mapaAtributaKomadaNamestaja.put("kolicinaUMagacinu", s.getKolicinaUMagacinu());
			mapaAtributaKomadaNamestaja.put("kategorija",s.getKategorija().getCvor().getNaziv());
			mapaAtributaKomadaNamestaja.put("godinaProizvodnje", s.getGodinaProizvodnje());
			mapaAtributaKomadaNamestaja.put("salon", s.getSalon().getNaziv());
			if(s.getSlika()!=null)
				mapaAtributaKomadaNamestaja.put("slika", s.getSlika().getPutanja());
			else
				mapaAtributaKomadaNamestaja.put("slika", "nema");
			if(s.getVideo()!=null)
				mapaAtributaKomadaNamestaja.put("video", s.getVideo().getPutanja());
			else
				mapaAtributaKomadaNamestaja.put("video", "nema");
			listaMapaAtributaKomadaNamestaja.add(mapaAtributaKomadaNamestaja);
		
		jsonObject.put("KomadNamestaja", listaMapaAtributaKomadaNamestaja);
		return jsonObject;
	}

}
