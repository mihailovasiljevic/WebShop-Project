package admin_site;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import beans.model.Akcija;
import beans.model.DodatneUsluge;
import beans.model.Kategorija;
import beans.model.KomadNamestaja;
import beans.model.Korisnik;
import beans.model.Salon;
import beans.model.StringGetter;
import beans.model.TreeNode;
import beans.model.Uloga;
import beans.repositories.AkcijeRepository;
import beans.repositories.DodatneUslugeRepository;
import beans.repositories.KategorijaRepository;
import beans.repositories.KomadNamestajaRepository;
import beans.repositories.KorisnikRepository;
import beans.repositories.RacunRepository;
import beans.repositories.SalonRepository;
import beans.repositories.UlogaRepository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

/**
 * Servlet implementation class TableServlet
 */
@WebServlet("/table")
public class TableServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TableServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		JSONObject jsonObject2 = new JSONObject();
		ObjectMapper mapper = new ObjectMapper();
		String jsonRequest = request.getParameter("tabelaPodaci");
		
		StringGetter a = mapper.readValue(jsonRequest, StringGetter.class);
		
		
		
		//Obrada zahteva ako se trazi tabela korisnika
		if(a.getParametar().equals("korisnici")){
			response.setContentType("application/json");  
			try{
				 mapper.writeValue(response.getOutputStream(), makeJSONKorisnik(request).toString());
				 return;
			}catch(Exception ex){
				ex.printStackTrace();
			}
		}else if(a.getParametar().equals("uloge")){
			response.setContentType("application/json");  
			try{
				 mapper.writeValue(response.getOutputStream(), makeJSONUloge(request).toString());
				 return;
			}catch(Exception ex){
				ex.printStackTrace();
			}
		}else if(a.getParametar().equals("saloni")){
			response.setContentType("application/json");  
			try{
				 mapper.writeValue(response.getOutputStream(), makeJSONSaloni(request).toString());
				 return;
			}catch(Exception ex){
				ex.printStackTrace();
			}
		}else if(a.getParametar().equals("kategorije")){
			response.setContentType("application/json");  
			try{
				 mapper.writeValue(response.getOutputStream(), makeJSONKategorije(request).toString());
				 return;
			}catch(Exception ex){
				ex.printStackTrace();
			}
		}else if(a.getParametar().equals("komadiNamestaja")){
			response.setContentType("application/json");  
			try{
				 mapper.writeValue(response.getOutputStream(), makeJSONKomadiNamestaja(request).toString());
				 return;
			}catch(Exception ex){
				ex.printStackTrace();
			}
		}else if(a.getParametar().equals("dodatneUsluge")){
			response.setContentType("application/json");  
			try{
				 mapper.writeValue(response.getOutputStream(), makeJSONDodatneUsluge(request).toString());
				 return;
			}catch(Exception ex){
				ex.printStackTrace();
			}
		}
		else if(a.getParametar().equals("akcije")){
			response.setContentType("application/json");  
			try{
				 mapper.writeValue(response.getOutputStream(), makeJSONAkcije(request).toString());
				 return;
			}catch(Exception ex){
				ex.printStackTrace();
			}
		}
		else if(a.getParametar().equals("racuni")){
			response.setContentType("application/json");  
			try{
				 mapper.writeValue(response.getOutputStream(), makeJSONRacuni(request).toString());
				 return;
			}catch(Exception ex){
				ex.printStackTrace();
			}
		}
		
		

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}
	
	/*
	 * Metoda koja od objekta korisnika pravi JSONobjekat
	 */
	@SuppressWarnings("unchecked")
	private synchronized JSONObject makeJSONKorisnik(HttpServletRequest request){
		JSONObject jsonObject = new JSONObject();
		String putanja = getServletContext().getRealPath("");
		KorisnikRepository korisnikRepository = new KorisnikRepository(putanja+"/korisnici.dat");
		
		ArrayList<Korisnik> listaKorisnika = korisnikRepository.FindAll();
		HashMap<String,Object> mapaAtributaKorisnika;
		ArrayList<HashMap<String,Object>> listaMapaAtributaKorisnika = new ArrayList<HashMap<String,Object>>(); 
	    
		for (int i=0 ; i<listaKorisnika.size() ; i++)
	    {
			mapaAtributaKorisnika = new HashMap<String, Object>();
			mapaAtributaKorisnika.put("korisnickoIme", listaKorisnika.get(i).getKorisnickoIme());
			mapaAtributaKorisnika.put("lozinka", listaKorisnika.get(i).getLozinka());
			mapaAtributaKorisnika.put("ime", listaKorisnika.get(i).getIme());
			mapaAtributaKorisnika.put("prezime", listaKorisnika.get(i).getPrezime());
			mapaAtributaKorisnika.put("kontaktTelefon", listaKorisnika.get(i).getKontaktTelefon());
			mapaAtributaKorisnika.put("email", listaKorisnika.get(i).getEmail());
			mapaAtributaKorisnika.put("prijavljen", listaKorisnika.get(i).isPrijavljen()+"");
			mapaAtributaKorisnika.put("uloga", listaKorisnika.get(i).getUloga().getNaziv());
			listaMapaAtributaKorisnika.add(mapaAtributaKorisnika);
	    }
		jsonObject.put("Korisnici", listaMapaAtributaKorisnika);
		return jsonObject;
	}
	
	/*
	 * Metoda koja od objekta uloga pravi JSONobjekat
	 */
	@SuppressWarnings("unchecked")
	private synchronized JSONObject makeJSONUloge(HttpServletRequest request){
		JSONObject jsonObject = new JSONObject();
		String putanja = getServletContext().getRealPath("");
		UlogaRepository ulogaRepository = new UlogaRepository(putanja+"/uloge.dat");
		
		ArrayList<Uloga> listaUloga = ulogaRepository.FindAll();
		HashMap<String,Object> mapaAtributaUloga;
		ArrayList<HashMap<String,Object>> listaMapaAtributaUloga = new ArrayList<HashMap<String,Object>>(); 
	    
		for (int i=0 ; i<listaUloga.size() ; i++)
	    {
			mapaAtributaUloga = new HashMap<String, Object>();
			mapaAtributaUloga.put("oznaka", listaUloga.get(i).getOznaka());
			mapaAtributaUloga.put("naziv", listaUloga.get(i).getNaziv());
			listaMapaAtributaUloga.add(mapaAtributaUloga);
	    }
		jsonObject.put("Uloge", listaMapaAtributaUloga);
		return jsonObject;
	}
	
	/*
	 * Metoda koja od objekta salona pravi JSONobjekat
	 */
	@SuppressWarnings("unchecked")
	private synchronized JSONObject makeJSONSaloni(HttpServletRequest request){
		JSONObject jsonObject = new JSONObject();
		String putanja = getServletContext().getRealPath("");
		SalonRepository salonRepository = new SalonRepository(putanja+"/saloni.dat");
		
		ArrayList<Salon> listaSalona = salonRepository.FindAll();
		HashMap<String,Object> mapaAtributaSalona;
		ArrayList<HashMap<String,Object>> listaMapaAtributaSalona = new ArrayList<HashMap<String,Object>>(); 
	    
		for (int i=0 ; i<listaSalona.size() ; i++)
	    {
			mapaAtributaSalona = new HashMap<String, Object>();
			mapaAtributaSalona.put("naziv", listaSalona.get(i).getNaziv());
			mapaAtributaSalona.put("pib", listaSalona.get(i).getPib());
			mapaAtributaSalona.put("maticniBroj", listaSalona.get(i).getMaticniBroj());
			mapaAtributaSalona.put("brojZiroRacuna", listaSalona.get(i).getBrojZiroRacuna());
			mapaAtributaSalona.put("adresa", listaSalona.get(i).getAdresa());
			mapaAtributaSalona.put("telefon", listaSalona.get(i).getTelefon());
			mapaAtributaSalona.put("email", listaSalona.get(i).getEmail());
			mapaAtributaSalona.put("adresaInternetSajta", listaSalona.get(i).getAdresaInternetSajta());
			listaMapaAtributaSalona.add(mapaAtributaSalona);
	    }
		jsonObject.put("Saloni", listaMapaAtributaSalona);
		return jsonObject;
	}
	/*
	@SuppressWarnings("unchecked")
	private synchronized JSONObject makeJSONKategorije(HttpServletRequest request){
		
		JSONObject jsonObject = new JSONObject();
		String putanja = getServletContext().getRealPath("");
		KategorijaRepository kategorijaRepository = new KategorijaRepository(putanja+"/kategorije.dat");
		
		ArrayList<Kategorija> listaKategorija = kategorijaRepository.FindAll();
		HashMap<String,Object> mapaAtributaKategorija;
		ArrayList<HashMap<String,Object>> listaMapaAtributaKategorija = new ArrayList<HashMap<String,Object>>(); 

		for (int i=0 ; i<listaKategorija.size() ; i++)
	    {
			mapaAtributaKategorija = new HashMap<String, Object>();
			mapaAtributaKategorija.put("naziv", listaKategorija.get(i).getCvor().getNaziv());
			mapaAtributaKategorija.put("opis", listaKategorija.get(i).getCvor().getOpis());
			
			if(listaKategorija.get(i).getCvor().getParent() != null){
				mapaAtributaKategorija.put("roditelj.naziv", listaKategorija.get(i).getCvor().getParent().getNaziv());
				mapaAtributaKategorija.put("roditelj.opis", listaKategorija.get(i).getCvor().getParent().getOpis());
			}else{
				mapaAtributaKategorija.put("roditelj.naziv", "");
				mapaAtributaKategorija.put("roditelj.opis", "");
			}
			
			HashMap<String,Object> mapaAtributaPodkategorija;
			ArrayList<HashMap<String,Object>> listaMapaAtributaPodkategorija = new ArrayList<HashMap<String,Object>>();
			
			for(int j = 0; j < listaKategorija.get(i).getCvor().getChildren().size(); j++){
				mapaAtributaPodkategorija = new HashMap<String, Object>();
				mapaAtributaPodkategorija.put("dete.naziv", listaKategorija.get(i).getCvor().getChildren().get(j).getNaziv());
				mapaAtributaPodkategorija.put("dete.opis", listaKategorija.get(i).getCvor().getChildren().get(j).getOpis());
				
				listaMapaAtributaPodkategorija.add(mapaAtributaPodkategorija);
			}
			mapaAtributaKategorija.put("deca", listaMapaAtributaPodkategorija);
			listaMapaAtributaKategorija.add(mapaAtributaKategorija);
	  }
		
		jsonObject.put("Kategorije", listaMapaAtributaKategorija);
		return jsonObject;
		

		
		
	}
	*/
	
	private String cijeJe= "";
	private HashMap<String, Object> mapaDece;
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
	/**
	 * 
	 * @param tmpNode
	 * Za parametar prima cvor ciju decu je neophodno pribaviti
	 * Funkcija radi na principu rekurzije, posalje joj se cvor, prikupe se njegova deca, napravi se listaDece
	 * listaDece predstavlja listu HashMapa koje su tipa: jsonParametar,jsonVrednost
	 * udje se u petlju da se pronadju sva deca, u petlji se u listuDece doda dete koje je pronadjeno
	 * vratimo se rekurzijom nazad da bismo pronasli njegovu decu
	 * i tako u proizvoljnu dubinu
	 * provera pre dodavanja se vrsi zato sto se na ovaj nacin ide samo jednom granom stabla od korena do lista
	 * npr: 0 - 1
	 *      | - 2
	 *      
	 *      1-3-5
	 *      |-4
	 *      
	 *      U ovakvom rasporedu situacija rekurzijom se dobija grana dece od 0 koja glasi 1 - 3 - 5
	 *      Kako su deca sa oznakama 3 i 4 na istom hijerarhijsom nivou neophodno je izvrsiti proveru da li vec postoji dete
	 *      ciji je roditelj 1, ako postoju, tu ubaci 4
	 *      
	 *      listSize promenljiva se pravi zato sto postoji mogucnost da lista postoji i u tom slucaju
	 *      da se ne zakuca velicina, unutrasnja k petlja bi se vrtela beskonacno, zato sto bi se
	 *      .size() stalno povecavao a uslov stalno bio zadovoljen
	 *      
	 *      listaListeDece je kontejner u koju se ubacuju sve lsite dece. 
	 *      listaDece je organizovana tako da ce se u njoj nalaziti sva deca na istom hijerarhijskom nivou
	 *      na taj nacin smo obezbedili da ukoliko su nam potrebna deca cvora 1
	 *      dobijemo u jednoj listi cvorove 3 i 4 koji su na prvom hijerarhijsom nivou
	 *      i listu u kojoj je cvor 5 koji je list
	 *      na taj nacin uvek vizuelno mozemo predstavljavati stablo onako kako zapravo izgleda
	 *      u skladu sa hijerarhijom koju ima
	 *     
	 */

	
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
	
	
	@SuppressWarnings("unchecked")
	private synchronized JSONObject makeJSONKomadiNamestaja(HttpServletRequest request){
		
		JSONObject jsonObject = new JSONObject();
		String putanja = getServletContext().getRealPath("");
		KomadNamestajaRepository knRepository = new KomadNamestajaRepository(putanja+"/komadiNamestaja.dat");
		
		ArrayList<KomadNamestaja> listaKomadaNamestaja = knRepository.FindAll();
		HashMap<String,Object> mapaAtributaKomadaNamestaja;
		ArrayList<HashMap<String,Object>> listaMapaAtributaKomadaNamestaja = new ArrayList<HashMap<String,Object>>(); 

		for (int i=0 ; i<listaKomadaNamestaja.size() ; i++)
	    {
			mapaAtributaKomadaNamestaja = new HashMap<String, Object>();
			mapaAtributaKomadaNamestaja.put("sifra", listaKomadaNamestaja.get(i).getSifra());
			mapaAtributaKomadaNamestaja.put("naziv", listaKomadaNamestaja.get(i).getNaziv());
			mapaAtributaKomadaNamestaja.put("boja", listaKomadaNamestaja.get(i).getBoja());
			mapaAtributaKomadaNamestaja.put("zemljaProizvodnje", listaKomadaNamestaja.get(i).getZemljaProizvodnje());
			mapaAtributaKomadaNamestaja.put("nazivProizvodjaca", listaKomadaNamestaja.get(i).getNazivProizvodjaca());
			mapaAtributaKomadaNamestaja.put("jedinicnaCena", listaKomadaNamestaja.get(i).getJedinicnaCena());

			mapaAtributaKomadaNamestaja.put("kolicinaUMagacinu", listaKomadaNamestaja.get(i).getKolicinaUMagacinu());
			mapaAtributaKomadaNamestaja.put("kategorija", listaKomadaNamestaja.get(i).getKategorija().getCvor().getNaziv());
			mapaAtributaKomadaNamestaja.put("godinaProizvodnje", listaKomadaNamestaja.get(i).getGodinaProizvodnje());
			mapaAtributaKomadaNamestaja.put("salon", listaKomadaNamestaja.get(i).getSalon().getPib());
			if(listaKomadaNamestaja.get(i).getSlika()!=null)
				mapaAtributaKomadaNamestaja.put("slika", listaKomadaNamestaja.get(i).getSlika().getPutanja());
			else
				mapaAtributaKomadaNamestaja.put("slika", "nema");
			if(listaKomadaNamestaja.get(i).getVideo()!=null)
				mapaAtributaKomadaNamestaja.put("video", listaKomadaNamestaja.get(i).getVideo().getPutanja());
			else
				mapaAtributaKomadaNamestaja.put("video", "nema");
			listaMapaAtributaKomadaNamestaja.add(mapaAtributaKomadaNamestaja);
	  }
		
		jsonObject.put("KomadiNamestaja", listaMapaAtributaKomadaNamestaja);
		return jsonObject;
	
	}
	@SuppressWarnings("unchecked")
	private synchronized JSONObject makeJSONDodatneUsluge(HttpServletRequest request){
		
		JSONObject jsonObject = new JSONObject();
		String putanja = getServletContext().getRealPath("");
		DodatneUslugeRepository duRepository = new DodatneUslugeRepository(putanja+"/dodatneUsluge.dat");
		
		ArrayList<DodatneUsluge> listaDodatnihUsluge = duRepository.FindAll();
		HashMap<String,Object> mapaAtributaDodatnihUslugea;
		ArrayList<HashMap<String,Object>> listaMapaAtributaDodatnihUsluga = new ArrayList<HashMap<String,Object>>(); 

		for (int i=0 ; i<listaDodatnihUsluge.size() ; i++)
	    {
			mapaAtributaDodatnihUslugea = new HashMap<String, Object>();
			mapaAtributaDodatnihUslugea.put("naziv", listaDodatnihUsluge.get(i).getNaziv());
			mapaAtributaDodatnihUslugea.put("opis", listaDodatnihUsluge.get(i).getOpis());
			mapaAtributaDodatnihUslugea.put("cena", listaDodatnihUsluge.get(i).getCena());
			
			HashMap<String,Object> mapaAtributaListe;
			ArrayList<HashMap<String,Object>> listaMapaAtributaListe = new ArrayList<HashMap<String,Object>>(); 
			
			for(int j = 0; j < listaDodatnihUsluge.get(i).getListaKomadaNamestajaUKojimaJeBesplatna().size(); j++){
				mapaAtributaListe = new HashMap<String,Object>();
				mapaAtributaListe.put("string", listaDodatnihUsluge.get(i).getListaKomadaNamestajaUKojimaJeBesplatna().get(j));
				listaMapaAtributaListe.add(mapaAtributaListe);
			
			}
			mapaAtributaDodatnihUslugea.put("komadiNamestaja", listaMapaAtributaListe);
			
			listaMapaAtributaDodatnihUsluga.add(mapaAtributaDodatnihUslugea);
	  }
		
		jsonObject.put("DodatneUsluge", listaMapaAtributaDodatnihUsluga);
		return jsonObject;
		
	}
	@SuppressWarnings("unchecked")
	private synchronized JSONObject makeJSONAkcije(HttpServletRequest request){
		
		JSONObject jsonObject = new JSONObject();
		String putanja = getServletContext().getRealPath("");
		AkcijeRepository akcijeRepository = new AkcijeRepository(putanja+"/akcije.dat");
		
		ArrayList<Akcija> listaAkcija = akcijeRepository.FindAll();
		HashMap<String,Object> mapaAtributaAkcija;
		ArrayList<HashMap<String,Object>> listaMapaAtributaAkcija = new ArrayList<HashMap<String,Object>>(); 

		for (int i=0 ; i<listaAkcija.size() ; i++)
	    {
			mapaAtributaAkcija = new HashMap<String, Object>();
			mapaAtributaAkcija.put("naziv", listaAkcija.get(i).getNaziv());
			mapaAtributaAkcija.put("datumPocetka", listaAkcija.get(i).getDatumPocetka().toString());
			mapaAtributaAkcija.put("datumZavrsetka",listaAkcija.get(i).getDatumZavrsetka().toString());
			mapaAtributaAkcija.put("popust",listaAkcija.get(i).getPopust());
			mapaAtributaAkcija.put("salon",listaAkcija.get(i).getSalon().getPib());
			
			HashMap<String,Object> mapaAtributaListe;
			ArrayList<HashMap<String,Object>> listaMapaAtributaListe = new ArrayList<HashMap<String,Object>>(); 
			
			for(int j = 0; j < listaAkcija.get(i).getListaKategorija().size(); j++){
				mapaAtributaListe = new HashMap<String,Object>();
				mapaAtributaListe.put("naziv", listaAkcija.get(i).getListaKategorija().get(j));
				listaMapaAtributaListe.add(mapaAtributaListe);
			
			}
			mapaAtributaAkcija.put("kategorije", listaMapaAtributaListe);
			
			listaMapaAtributaListe = new ArrayList<HashMap<String,Object>>();
			for(int j = 0; j < listaAkcija.get(i).getListaKomadaNamestaja().size(); j++){
				mapaAtributaListe = new HashMap<String,Object>();
				mapaAtributaListe.put("sifra", listaAkcija.get(i).getListaKomadaNamestaja().get(j));
				listaMapaAtributaListe.add(mapaAtributaListe);
			
			}
			mapaAtributaAkcija.put("komadiNamestaja", listaMapaAtributaListe);
			
			listaMapaAtributaAkcija.add(mapaAtributaAkcija);
	  }
		
		jsonObject.put("Akcije", listaMapaAtributaAkcija);
		return jsonObject;
		
	}
	
	@SuppressWarnings("unchecked")
	private synchronized JSONObject makeJSONRacuni(HttpServletRequest request){
		
		String putanja = getServletContext().getRealPath("");
		KomadNamestajaRepository knRepository = new KomadNamestajaRepository(putanja+"/komadiNamestaja.dat");
		DodatneUslugeRepository duRepository = new DodatneUslugeRepository(putanja+"/dodatneUsluge.dat");
		JSONObject jsonObject = new JSONObject();
		RacunRepository racunRep = new RacunRepository(putanja+"/racuni.dat");
		HashMap<String,Object> mapaAtributaKorisnika;
		ArrayList<HashMap<String,Object>> listaMapaAtributaKorisnika = new ArrayList<HashMap<String,Object>>();
		for(int i = 0; i < racunRep.FindAll().size(); i++){	
			mapaAtributaKorisnika = new HashMap<String, Object>();
				mapaAtributaKorisnika.put("oznaka", racunRep.FindAll().get(i).getOznaka());
				mapaAtributaKorisnika.put("porez", racunRep.FindAll().get(i).getPorez());
				mapaAtributaKorisnika.put("ukupnaCena", racunRep.FindAll().get(i).getUkupnaCena());
				mapaAtributaKorisnika.put("datum", racunRep.FindAll().get(i).getDatum().toString());
				if(racunRep.FindAll().get(i).getVreme() != null)
					mapaAtributaKorisnika.put("vreme", racunRep.FindAll().get(i).getVreme());
				else
					mapaAtributaKorisnika.put("vreme", "null");
				mapaAtributaKorisnika.put("racun", racunRep.FindAll().get(i).getKorisnik().getKorisnickoIme());
	
				
				HashMap<String,Object> mapaAtributaListe;
				ArrayList<HashMap<String,Object>> listaMapaAtributaListe = new ArrayList<HashMap<String,Object>>(); 
				
				if(racunRep.FindAll().get(i).getKupljeniNamestaj() != null){

					for(int j = 0; j < racunRep.FindAll().get(i).getKupljeniNamestaj().size(); j++){
							mapaAtributaListe = new HashMap<String, Object>();
							mapaAtributaListe.put("sifra", racunRep.FindAll().get(i).getKupljeniNamestaj().get(j).getSifra());
							mapaAtributaListe.put("naziv", racunRep.FindAll().get(i).getKupljeniNamestaj().get(j).getNaziv());
							mapaAtributaListe.put("boja", racunRep.FindAll().get(i).getKupljeniNamestaj().get(j).getBoja());
							mapaAtributaListe.put("zemljaProizvodnje", racunRep.FindAll().get(i).getKupljeniNamestaj().get(j).getZemljaProizvodnje());
							mapaAtributaListe.put("nazivProizvodjaca", racunRep.FindAll().get(i).getKupljeniNamestaj().get(j).getNazivProizvodjaca());
							mapaAtributaListe.put("jedinicnaCena",racunRep.FindAll().get(i).getKupljeniNamestaj().get(j).getJedinicnaCena());
		
							mapaAtributaListe.put("kolicinaUMagacinu", racunRep.FindAll().get(i).getKupljeniNamestaj().get(j).getKolicinaUMagacinu());
							mapaAtributaListe.put("kategorija", racunRep.FindAll().get(i).getKupljeniNamestaj().get(j).getKategorija().getCvor().getNaziv());
							mapaAtributaListe.put("godinaProizvodnje",racunRep.FindAll().get(i).getKupljeniNamestaj().get(j).getGodinaProizvodnje());
							mapaAtributaListe.put("salon",racunRep.FindAll().get(i).getKupljeniNamestaj().get(j).getSalon().getPib());
							if(racunRep.FindAll().get(i).getKupljeniNamestaj().get(j).getSlika()!=null)
								mapaAtributaListe.put("slika", racunRep.FindAll().get(i).getKupljeniNamestaj().get(j).getSlika().getPutanja());
							else
								mapaAtributaListe.put("slika", "nema");
							if(racunRep.FindAll().get(i).getKupljeniNamestaj().get(j).getVideo()!=null)
								mapaAtributaListe.put("video", racunRep.FindAll().get(i).getKupljeniNamestaj().get(j).getVideo().getPutanja());
							else
								mapaAtributaListe.put("video", "nema");
							listaMapaAtributaListe.add(mapaAtributaListe);
					}
	
					mapaAtributaKorisnika.put("KomadiNamestaja", listaMapaAtributaListe);
					
					listaMapaAtributaListe = new ArrayList<HashMap<String,Object>>();
					
					if(racunRep.FindAll().get(i).getDodatneUsluge() != null)
					for(int j = 0; j < racunRep.FindAll().get(i).getDodatneUsluge().size(); j++){
						mapaAtributaListe = new HashMap<String,Object>();
							mapaAtributaListe = new HashMap<String, Object>();
							mapaAtributaListe.put("naziv", racunRep.FindAll().get(i).getDodatneUsluge().get(j).getNaziv());
							mapaAtributaListe.put("opis", racunRep.FindAll().get(i).getDodatneUsluge().get(j).getOpis());
							mapaAtributaListe.put("cena", racunRep.FindAll().get(i).getDodatneUsluge().get(j).getCena());
							listaMapaAtributaListe.add(mapaAtributaListe);
					}
					
					mapaAtributaKorisnika.put("DodatneUsluge", listaMapaAtributaListe);
					
				
				
				}
			listaMapaAtributaKorisnika.add(mapaAtributaKorisnika);
		}
		
		jsonObject.put("Racuni", listaMapaAtributaKorisnika);
		return jsonObject;
	}

}
