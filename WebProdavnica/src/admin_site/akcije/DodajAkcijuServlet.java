package admin_site.akcije;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.model.Akcija;
import beans.model.Kategorija;
import beans.model.KomadNamestaja;
import beans.model.Salon;

import beans.model.StringGetter;

import beans.repositories.AkcijeRepository;
import beans.repositories.KategorijaRepository;
import beans.repositories.KomadNamestajaRepository;
import beans.repositories.SalonRepository;


/**
 * Servlet implementation class DodajAkcijuServlet
 */
public class DodajAkcijuServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DodajAkcijuServlet() {
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
		try {
			proveriAkciju(request,response);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private synchronized void proveriAkciju(HttpServletRequest request, HttpServletResponse response) throws IOException, ParseException{
		ObjectMapper mapper = new ObjectMapper();
		String jsonRequest = request.getParameter("akcijaPodaci");
		//KomadNamestaja s = mapper.readValue(jsonRequest, KomadNamestaja.class);
		StringGetter s = mapper.readValue(jsonRequest, StringGetter.class);
		String[] tokens = s.getParametar().split(" ");
		
		String[] opstiPodaci;
		String[] listaKategorija;
		String[] listaKomada;
		
		opstiPodaci = tokens[0].split(",");
		listaKategorija = tokens[1].split(",");
		listaKomada = tokens[2].split(",");
		
		/*pribavi sve repozitorijume*/
		String putanja = getServletContext().getRealPath("");
		KategorijaRepository katRep = new KategorijaRepository(putanja+"/kategorije.dat");
		KomadNamestajaRepository knRepository = new KomadNamestajaRepository(putanja+"/komadiNamestaja.dat");
		AkcijeRepository akcijeRepository = new AkcijeRepository(putanja+"/akcije.dat");
		
		ArrayList<String> nizKategorija = new ArrayList<String>();
		
		for(int i = 0; i < listaKategorija.length;i++){
			for(Kategorija kat:katRep.FindAll()){
				if(kat.getCvor().getNaziv().equals(listaKategorija[i])){
					nizKategorija.add(kat.getCvor().getNaziv());
					break;
				}
			}
		}
		
		ArrayList<String> nizKomada = new ArrayList<String>();

		for(int i = 0; i < listaKomada.length;i++){
			for(KomadNamestaja kn:knRepository.FindAll()){
				if(kn.getSifra().equals(listaKomada[i])){
					nizKomada.add(kn.getSifra());
					break;
				}
			}
		}

		response.setContentType("application/json"); 
		
		//Proveri da li komad namestaja vec vec postoji
		for(Akcija ak: akcijeRepository.FindAll()){
			if(ak.getNaziv().equals(opstiPodaci[0])){
				String answer = mapper.writeValueAsString("akcija_postoji");
				response.getWriter().write(answer);
				return;
			}
		}
		String string =opstiPodaci[0].replaceAll("-", ".") + ".";
		
		DateFormat format = DateFormat.getDateInstance();
		Date dateOd;
		dateOd = format.parse(string);
		
		string =opstiPodaci[1].replaceAll("-", ".") + ".";

		Date dateDo;
		dateDo = format.parse(string);
		
		SalonRepository salonRepository = new SalonRepository(putanja+"/saloni.dat");
		Salon tmpSalon = new Salon();
		for(Salon sal:salonRepository.FindAll()){
			if(sal.getPib().equals(opstiPodaci[4])){
				tmpSalon = new Salon(sal);
				break;
			}
		}
		int popust = 0;
		try{
			popust = Integer.parseInt(opstiPodaci[2]);
		}catch(Exception ex){
			String answer = mapper.writeValueAsString("greska");
			response.getWriter().write(answer);
			return;
		}
		Akcija ak = new Akcija(dateOd, dateDo, popust, tmpSalon, nizKomada, nizKategorija, opstiPodaci[3]);
		//ako ne postoji dodaj ga i vrati ga kao odgovor
		akcijeRepository.Save(ak);
		 mapper.writeValue(response.getOutputStream(), makeJSONAkcija(request, ak).toString());
		 return;
		 
	}
	@SuppressWarnings("unchecked")
	private synchronized JSONObject makeJSONAkcija(HttpServletRequest request, Akcija s){
		JSONObject jsonObject = new JSONObject();
		HashMap<String,Object> mapaAtributaAkcija;
		ArrayList<HashMap<String,Object>> listaMapaAtributaAkcija = new ArrayList<HashMap<String,Object>>(); 


			mapaAtributaAkcija = new HashMap<String, Object>();
			mapaAtributaAkcija.put("naziv", s.getNaziv());
			mapaAtributaAkcija.put("datumPocetka", s.getDatumPocetka().toString());
			mapaAtributaAkcija.put("datumZavrsetka",s.getDatumZavrsetka().toString());
			mapaAtributaAkcija.put("popust",s.getPopust());
			mapaAtributaAkcija.put("salon",s.getSalon().getPib());
			
			HashMap<String,Object> mapaAtributaListe;
			ArrayList<HashMap<String,Object>> listaMapaAtributaListe = new ArrayList<HashMap<String,Object>>(); 
			
			for(int j = 0; j < s.getListaKategorija().size(); j++){
				mapaAtributaListe = new HashMap<String,Object>();
				mapaAtributaListe.put("naziv",s.getListaKategorija().get(j));
				listaMapaAtributaListe.add(mapaAtributaListe);
			
			}
			mapaAtributaAkcija.put("kategorije", listaMapaAtributaListe);
			
			listaMapaAtributaListe = new ArrayList<HashMap<String,Object>>();
			for(int j = 0; j < s.getListaKomadaNamestaja().size(); j++){
				mapaAtributaListe = new HashMap<String,Object>();
				mapaAtributaListe.put("sifra", s.getListaKomadaNamestaja().get(j));
				listaMapaAtributaListe.add(mapaAtributaListe);
			
			}
			mapaAtributaAkcija.put("komadiNamestaja", listaMapaAtributaListe);
			
			listaMapaAtributaAkcija.add(mapaAtributaAkcija);

		jsonObject.put("Akcije", listaMapaAtributaAkcija);
		return jsonObject;
	}


}
