package shop_site;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.model.Korisnik;
import beans.model.KorisnikLogIn;
import beans.repositories.KorisnikRepository;

/**
 * Servlet implementation class KorisnikLoginServlet
 */
public class KorisnikLoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public KorisnikLoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("application/json");  
	       Korisnik korisnik = (Korisnik)request.getSession().getAttribute("korisnik");
	        ObjectMapper mapper = new ObjectMapper();
	        if(korisnik != null){
	        	mapper.writeValue(response.getOutputStream(), makeJSONKorisnik(request, korisnik).toString());
	            return;
	        }else{
	            String answer = mapper.writeValueAsString("-1");
	            response.getWriter().write(answer);
	            return;
	        }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		/*PROVERI DA LI POSTOJI SESIJA*/
		/*
		HttpSession session = request.getSession(false);
		if(session==null)
			session.invalidate();
			*/
		//Proveri da li je korisnik vec ulogovan na racunaru
		response.setContentType("application/json");  
	    Korisnik korisnik = (Korisnik)request.getSession().getAttribute("korisnik");
        ObjectMapper mapper = new ObjectMapper();
        //Ako je administrator ulogovan posalji poruku ajaxu da mu prikaze sadrzaj
        if(korisnik != null){
        	mapper.writeValue(response.getOutputStream(), makeJSONKorisnik(request, korisnik).toString());
            return;
        }
 
        String jsonRequest = request.getParameter("loginPodaci");
 
        KorisnikLogIn a = mapper.readValue(jsonRequest, KorisnikLogIn.class);
         
 
         
        //Ako administrator nije ulogovan pokusaj da ga identifikujes i ako uspes prijavi ga i vezi za sesiju
 
        boolean ulogovan = false;
        String putanja = getServletContext().getRealPath("");
        KorisnikRepository korRep = new KorisnikRepository(putanja+"/korisnici.dat");
        for(Korisnik k: korRep.FindAll()){
            if(a.getUsername().equals(k.getKorisnickoIme()) && a.getPassword().equals(k.getLozinka()) && k.getUloga().getOznaka()==2){
                ulogovan = true;
                k.setPrijavljen(true);
                korRep.Change(k);
                System.out.println(k.isPrijavljen()+"");
                request.getSession().setAttribute("korisnik", new Korisnik(k));
                mapper.writeValue(response.getOutputStream(), makeJSONKorisnik(request, k).toString());
                return;
            } 
        }
        ulogovan = false;
        String answer = mapper.writeValueAsString("greska");
        response.getWriter().write(answer);
        return;
	}
	@SuppressWarnings("unchecked")
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
			mapaAtributaKorisnika.put("putanja", k.getPutanja());
			
			HashMap<String,Object> mapaAtributaListe;
			ArrayList<HashMap<String,Object>> listaMapaAtributaListe = new ArrayList<HashMap<String,Object>>(); 
			
			if(k.getShoppingCart() != null){
				if(k.getShoppingCart().getListaNamestaja() != null)
				for(int j = 0; j < k.getShoppingCart().getListaNamestaja().size(); j++){
					mapaAtributaListe = new HashMap<String,Object>();
						mapaAtributaListe = new HashMap<String, Object>();
						mapaAtributaListe.put("sifra", k.getShoppingCart().getListaNamestaja().get(j).getKomadNamestaja().getSifra());
						mapaAtributaListe.put("naziv", k.getShoppingCart().getListaNamestaja().get(j).getKomadNamestaja().getNaziv());
						mapaAtributaListe.put("boja", k.getShoppingCart().getListaNamestaja().get(j).getKomadNamestaja().getBoja());
						mapaAtributaListe.put("zemljaProizvodnje", k.getShoppingCart().getListaNamestaja().get(j).getKomadNamestaja().getZemljaProizvodnje());
						mapaAtributaListe.put("nazivProizvodjaca", k.getShoppingCart().getListaNamestaja().get(j).getKomadNamestaja().getNazivProizvodjaca());
						mapaAtributaListe.put("jedinicnaCena", k.getShoppingCart().getListaNamestaja().get(j).getKomadNamestaja().getJedinicnaCena());
	
						mapaAtributaListe.put("kolicinaUMagacinu", k.getShoppingCart().getListaNamestaja().get(j).getKomadNamestaja().getKolicinaUMagacinu());
						mapaAtributaListe.put("kategorija", k.getShoppingCart().getListaNamestaja().get(j).getKomadNamestaja().getKategorija().getCvor().getNaziv());
						mapaAtributaListe.put("godinaProizvodnje", k.getShoppingCart().getListaNamestaja().get(j).getKomadNamestaja().getGodinaProizvodnje());
						mapaAtributaListe.put("salon", k.getShoppingCart().getListaNamestaja().get(j).getKomadNamestaja().getSalon().getNaziv());
						if(k.getShoppingCart().getListaNamestaja().get(j).getKomadNamestaja().getSlika()!=null)
							mapaAtributaListe.put("slika", k.getShoppingCart().getListaNamestaja().get(j).getKomadNamestaja().getSlika().getPutanja());
						else
							mapaAtributaListe.put("slika", "nema");
						if(k.getShoppingCart().getListaNamestaja().get(j).getKomadNamestaja().getVideo()!=null)
							mapaAtributaListe.put("video", k.getShoppingCart().getListaNamestaja().get(j).getKomadNamestaja().getVideo().getPutanja());
						else
							mapaAtributaListe.put("video", "nema");
						mapaAtributaListe.put("ukupno", k.getShoppingCart().getTotal());
						mapaAtributaListe.put("ukupnoItem", k.getShoppingCart().getListaNamestaja().get(j).getTotal());
						mapaAtributaListe.put("brojKomadaNamestaja", k.getShoppingCart().getListaNamestaja().get(j).getBrojKomadaNamestaja());
						listaMapaAtributaListe.add(mapaAtributaListe);
				}

				mapaAtributaKorisnika.put("KomadiNamestaja", listaMapaAtributaListe);
				
				listaMapaAtributaListe = new ArrayList<HashMap<String,Object>>();
				
				if(k.getShoppingCart().getListaUsluga() != null)
				for(int j = 0; j < k.getShoppingCart().getListaUsluga().size(); j++){
					mapaAtributaListe = new HashMap<String,Object>();
						mapaAtributaListe = new HashMap<String, Object>();
						mapaAtributaListe.put("naziv", k.getShoppingCart().getListaUsluga().get(j).getDodatnaUsluga().getNaziv());
						mapaAtributaListe.put("opis", k.getShoppingCart().getListaUsluga().get(j).getDodatnaUsluga().getOpis());
						mapaAtributaListe.put("cena", k.getShoppingCart().getListaUsluga().get(j).getDodatnaUsluga().getCena());
						mapaAtributaListe.put("ukupnoItem", k.getShoppingCart().getListaUsluga().get(j).getTotal());
						listaMapaAtributaListe.add(mapaAtributaListe);
				}
				
				mapaAtributaKorisnika.put("DodatneUsluge", listaMapaAtributaListe);
			}
		listaMapaAtributaKorisnika.add(mapaAtributaKorisnika);
		jsonObject.put("Korisnik", listaMapaAtributaKorisnika.get(0));
		return jsonObject;
	}
}
