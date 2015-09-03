package shop_site;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.fasterxml.jackson.databind.ObjectMapper;

import admin_site.kategorije.GetKateogrijaServlet;
import beans.model.Kategorija;
import beans.model.KomadNamestaja;
import beans.model.Korisnik;
import beans.model.Salon;
import beans.model.Slika;
import beans.model.StringGetter;
import beans.model.Video;
import beans.repositories.KategorijaRepository;
import beans.repositories.KomadNamestajaRepository;
import beans.repositories.KorisnikRepository;
import beans.repositories.SalonRepository;
import beans.repositories.SlikaRepository;
import beans.repositories.VideoRepository;

/**
 * Servlet implementation class DodajUKorpuKomadNamestajaServlet
 */
public class DodajUKorpuKomadNamestajaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DodajUKorpuKomadNamestajaServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		ObjectMapper mapper = new ObjectMapper();
		response.setContentType("application/json");
		String answer = mapper.writeValueAsString(false);
		response.getWriter().write(answer);
		return;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		proveriDodavanjeUKorpuKomadaNamestaja(request,response);
	}
	private synchronized void proveriDodavanjeUKorpuKomadaNamestaja(HttpServletRequest request, HttpServletResponse response) throws IOException{
		ObjectMapper mapper = new ObjectMapper();
		String jsonRequest = request.getParameter("komadNamestajaPodaci");
		//KomadNamestaja s = mapper.readValue(jsonRequest, KomadNamestaja.class);
		StringGetter s = mapper.readValue(jsonRequest, StringGetter.class);
		String[] tokens = s.getParametar().split(",");
		String sifra = tokens[0];
		String popust = tokens[1];
		String brKomada = tokens[2];
		/*pribavi sve repozitorijume*/
		String putanja = getServletContext().getRealPath("");
		KomadNamestajaRepository knRepository = new KomadNamestajaRepository(putanja+"/komadiNamestaja.dat");
		KorisnikRepository korRep = new KorisnikRepository(putanja+"/korisnici.dat");
		response.setContentType("application/json"); 
		
		KomadNamestaja komadNamestajaZaDodati = new KomadNamestaja();

		for(KomadNamestaja kn: knRepository.FindAll()){
			if(kn.getSifra().equals(sifra)){
				komadNamestajaZaDodati = new KomadNamestaja(kn);
				break;
			}
		}
		/*U slucaju da nema korisnika vrati gresku!*/
		Korisnik korisnik = (Korisnik)request.getSession().getAttribute("korisnik");
		if(korisnik == null){
			String answer = mapper.writeValueAsString(false);
			response.getWriter().write(answer);
			return;
		}
		try{
			int brKomadaNamestaja = Integer.parseInt(brKomada);
			int popustInt = Integer.parseInt(popust);
			
			for(KomadNamestaja kn: knRepository.FindAll()){
				if(kn.getSifra().equals(sifra)){
					/*U slucaju da nema korisnika dovoljno komada namestaja vrati gresku!*/
					if((kn.getKolicinaUMagacinu() - brKomadaNamestaja) < 0){
						String answer = mapper.writeValueAsString(false);
						response.getWriter().write(answer);
						return;
					}
					else{
						/*Smanji broj komada namestaja!*/
						kn.setKolicinaUMagacinu(kn.getKolicinaUMagacinu() - brKomadaNamestaja);
						knRepository.Change(kn);
					}
					break;
				}
			}
			/*Dodaj proizovd u korisnikovu korpu!*/
			korisnik.getShoppingCart().addNamestaj(komadNamestajaZaDodati, brKomadaNamestaja, popustInt);
		}catch(Exception ex){
			ex.printStackTrace();
			/*Greskau  parsiranju pre svega vraca false*/
			String answer = mapper.writeValueAsString(false);
			response.getWriter().write(answer);
			return;
		}
		/*Sacuvaj izmenjenog korisnika i vrati uspesno odradjenu radnju!*/
		for(Korisnik k:korRep.FindAll()){
			if(k.getKorisnickoIme().equals(korisnik.getKorisnickoIme())){
				korRep.Change(k);
			}
		}
		String answer = mapper.writeValueAsString(true);
		response.getWriter().write(answer);
		return;
		 
	}
}
