package admin_site;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import sun.reflect.ReflectionFactory.GetReflectionFactoryAction;
import beans.model.Akcija;
import beans.model.DodatneUsluge;
import beans.model.Kategorija;
import beans.model.KomadNamestaja;
import beans.model.Korisnik;
import beans.model.Racun;
import beans.model.Salon;
import beans.model.ShoppingCart;
import beans.model.ShoppingCartItemNamestaj;
import beans.model.ShoppingCartItemUsluga;
import beans.model.Slika;
import beans.model.SlikaIliVideo;
import beans.model.TreeNode;
import beans.model.Uloga;
import beans.repositories.AkcijeRepository;
import beans.repositories.DodatneUslugeRepository;
import beans.repositories.KategorijaRepository;
import beans.repositories.KomadNamestajaRepository;
import beans.repositories.KorisnikRepository;
import beans.repositories.RacunRepository;
import beans.repositories.SalonRepository;
import beans.repositories.SlikaIliVideoRepository;
import beans.repositories.SlikaRepository;
import beans.repositories.UlogaRepository;
import beans.repositories.VideoRepository;

/**
 * Servlet implementation class LoadDataServlet
 */
@WebServlet("/loadData")
public class LoadDataServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	ArrayList<String> listKat = new ArrayList<String>();
	ArrayList<String> listkom = new ArrayList<String>();
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoadDataServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		/*
		Uloga u = new Uloga(0, "administrator", new ArrayList<Korisnik>());
		Korisnik admin = new Korisnik("admin", "admin", "Mihailo", "Vasiljevic", "+381693659007", "mihailo93@gmail.com", u);
		u.addKorisnik(admin);
		String putanja = request.getServletContext().getRealPath("");
		UlogaRepository ulrep = new UlogaRepository(putanja+"/uloge.dat");
		ulrep.Save(u);
		KorisnikRepository korRep = new KorisnikRepository(putanja+"/korisnici.dat");
		korRep.Save(admin);
		
		String putanja = getServletContext().getRealPath("");
		KorisnikRepository korRep = new KorisnikRepository(putanja+"/korisnici.dat");
		ArrayList<Korisnik> listaKorisnika = korRep.FindAll();
		System.out.println(listaKorisnika.get(0).getIme());
		System.out.println(putanja+"/uloge.dat");
		*/
		/*
		String putanja = getServletContext().getRealPath("");
		SalonRepository salonRepository = new SalonRepository(putanja+"/saloni.dat");
		Salon s = new Salon("Salon nameštaja", "Bulevar Cara Lazara 10", "+381210123456","salonnamestaja@mail.com","www.namestaj.com","1234567890","01234567","200000000012345600");
		salonRepository.Save(s);
		ArrayList<Salon> listaSalona = salonRepository.FindAll();
		System.out.println(listaSalona.get(0).getNaziv());
		response.setContentType("utf-8");
		response.getWriter().println(listaSalona.get(0).getNaziv());
		*/
		/*
		String putanja = getServletContext().getRealPath("");
		KategorijaRepository kategorijaRepository = new KategorijaRepository(putanja+"/kategorije.dat");
		Kategorija kat1 = new Kategorija("Nameštaj", "Ovo je root kategorija nameštaja.", null);
		Kategorija kat2 = new Kategorija("Dnevna soba", "Ovo je root kategorija za nameštaj u dnevnoj sobi.", kat1.getCvor());
		kat1.getCvor().setChildren(new ArrayList<TreeNode>());
		kat1.getCvor().addChild(new TreeNode(kat2.getCvor()));
		Kategorija kat3 = new Kategorija("Akvarijum", "Ovo je kategorija kojoj pripadaju svi akvarijumi.", kat2.getCvor());
		kat2.getCvor().setChildren(new ArrayList<TreeNode>());
		kat2.getCvor().addChild(new TreeNode(kat3.getCvor()));
		Kategorija kat4 = new Kategorija("Trosedi", "Ovo je kategorija kojoj pripadaju svi trosedi.", kat2.getCvor());
		kat2.getCvor().addChild(new TreeNode(kat4.getCvor()));
		kategorijaRepository.Save(new Kategorija(kat1));
		kategorijaRepository.Save(new Kategorija(kat2));
		kategorijaRepository.Save(new Kategorija(kat3));
		kategorijaRepository.Save(new Kategorija(kat4));
		for(Kategorija kat:kategorijaRepository.FindAll()){
			System.out.println("NAZIV KATEGORIJE | NAZIV RODITELJA | NAZIV DECE");
			System.out.println(kat.getCvor().getNaziv()+" | ");
			try{
				System.out.println(kat.getCvor().getParent().getNaziv() + " | ");
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
			for(TreeNode tn:kat.getCvor().getChildren()){
				System.out.println(tn.getNaziv() + ", ");
			}
			System.out.println("\n");
		}
		*/
		/*
		String putanja = getServletContext().getRealPath("");
		KategorijaRepository kategorijaRepository = new KategorijaRepository(putanja+"/kategorije.dat");
		kategorijaRepository.ClearAll();
		Kategorija root = new Kategorija("Nameštaj", "Ovo je root kategorija nameštaja.", null);
		Kategorija k1 = new Kategorija("Dnevna soba", "Namestaj u dnevnoj sobi", root.getCvor());
		Kategorija k2 = new Kategorija("Kuhinja i trpezarija", "Namestaj u kuhinji i trpezariji", root.getCvor());
		Kategorija k3 = new Kategorija("Spavaća soba", "Namestaj u spavaćoj sobi", root.getCvor());
		root.getCvor().setChildren(new ArrayList<TreeNode>());
		root.getCvor().addChild(k1.getCvor());
		root.getCvor().addChild(k2.getCvor());
		root.getCvor().addChild(k3.getCvor());
	
		
		Kategorija k4 = new Kategorija("Trosedi", "Trosedi u dnevnoj sobi", k1.getCvor());
		Kategorija k5 = new Kategorija("TV police", "TV police u dnevnojs obi", k1.getCvor());
		k1.getCvor().setChildren(new ArrayList<TreeNode>());
		k1.getCvor().addChild(k4.getCvor());
		k1.getCvor().addChild(k5.getCvor());
		
		Kategorija k6 = new Kategorija("TV KOMODA", "TV KOMODA kao tv polica", k5.getCvor());
		k5.getCvor().setChildren(new ArrayList<TreeNode>());
		k5.getCvor().addChild(k6.getCvor());
		
		Kategorija k7 = new Kategorija("Trpezarijski stolovi", "Trpezarijski sto u kuhinji", k2.getCvor());
		k2.getCvor().setChildren(new ArrayList<TreeNode>());
		k2.getCvor().addChild(k7.getCvor());
		kategorijaRepository.Save(root);
		kategorijaRepository.Save(k1);
		kategorijaRepository.Save(k2);
		kategorijaRepository.Save(k3);
		kategorijaRepository.Save(k4);
		kategorijaRepository.Save(k5);
		kategorijaRepository.Save(k6);
		kategorijaRepository.Save(k7);
		
		for(Kategorija kat:kategorijaRepository.FindAll()){
			System.out.println(kat.getCvor().getNaziv()+"\n");
		}
		*//*
		String putanja = getServletContext().getRealPath("");
		KomadNamestajaRepository knRepository = new KomadNamestajaRepository(putanja+"/komadiNamestaja.dat");
		SlikaRepository slikaRepo = new SlikaRepository(putanja+"/slike.dat");
		VideoRepository videoRepo = new VideoRepository(putanja+"/videi.dat");
		KategorijaRepository kategorijaRepository = new KategorijaRepository(putanja+"/kategorije.dat");
		SalonRepository salonRepository = new SalonRepository(putanja+"/saloni.dat");
		slikaRepo.ClearAll();
		videoRepo.ClearAll();
		knRepository.ClearAll();
		Slika s1 = new Slika("0", "../uploadedFiles/bedroom1.jpg");
		slikaRepo.Save(s1);
		KomadNamestaja k1 = new KomadNamestaja("0000001", "Francuski krevet", "crna", "Alžir", "UAT", 29999.99, 12, 2012, null, kategorijaRepository.FindAll().get(1),  s1,null, salonRepository.FindAll().get(0));
		knRepository.Save(k1);
		*/
		String putanja = getServletContext().getRealPath("");
		/*
		DodatneUslugeRepository duRepository = new DodatneUslugeRepository(putanja+"/dodatneUsluge.dat");
		KomadNamestajaRepository knRepository = new KomadNamestajaRepository(putanja+"/komadiNamestaja.dat");
		duRepository.ClearAll();
		DodatneUsluge d1 = new DodatneUsluge("prevoz","Usluga prevoza",2000, new ArrayList<String>());
		for(int i = 0; i < knRepository.FindAll().size(); i+=2){
			d1.addKomadNamestaja(knRepository.FindAll().get(i));
		}
		duRepository.Save(d1);
		*/
		/*
		SalonRepository salonRepository = new SalonRepository(putanja+"/saloni.dat");
		KomadNamestajaRepository knRepository = new KomadNamestajaRepository(putanja+"/komadiNamestaja.dat");
		KategorijaRepository kategorijaRepository = new KategorijaRepository(putanja+"/kategorije.dat");
		AkcijeRepository akcijeRepository = new AkcijeRepository(putanja+"/akcije.dat");
		listkom = new ArrayList<String>();
		listkom.add(knRepository.FindAll().get(0).getSifra());
		listkom.add(knRepository.FindAll().get(1).getSifra());
		listKat = new ArrayList<String>();
		listKat.add(kategorijaRepository.FindAll().get(1).getCvor().getNaziv());
		recursiveSearch(kategorijaRepository.FindAll().get(1).getCvor());
		listKat.add(kategorijaRepository.FindAll().get(3).getCvor().getNaziv());
		recursiveSearch(kategorijaRepository.FindAll().get(3).getCvor());
		@SuppressWarnings("deprecation")
		Akcija a = new Akcija(new Date(2015,7,6), new Date(2015,7,12), 20, salonRepository.FindAll().get(0), listkom, listKat, "specijalna ponuda");
		akcijeRepository.Save(a);
	}
	private ArrayList<HashMap<String, Object>> listaDece = new ArrayList<HashMap<String, Object>>();
	private ArrayList<ArrayList<HashMap<String, Object>>> listaListeDece = new ArrayList<ArrayList<HashMap<String, Object>>>();
	private boolean vecDodato = false;
	
	private void recursiveSearch(TreeNode tmpNode){
		//System.out.println(tmpNode.getNaziv() + cijeJe);
		String putanja = getServletContext().getRealPath("");
		KategorijaRepository katRep = new KategorijaRepository(putanja+"/kategorije.dat");
		KomadNamestajaRepository knRepository = new KomadNamestajaRepository(putanja+"/komadiNamestaja.dat");
		ArrayList<TreeNode> children = tmpNode.getChildren(); 
		
	    for (int i = 0; i < children.size(); i++) { 
			for(Kategorija kat:katRep.FindAll()){
				if(kat.getCvor().getNaziv().equals(children.get(i).getNaziv())){
					boolean uListi = false;
					for(String s:listKat){
						if(s.equals(kat.getCvor().getNaziv())){
							uListi = true;
						}
					}
					if(uListi == false){
						listKat.add(kat.getCvor().getNaziv());
					}
					boolean uListi2 = false;
					for(KomadNamestaja kom:knRepository.FindAll()){
						if(kom.getKategorija().getCvor().getNaziv().equals(kat.getCvor().getNaziv())){
							for(String s:listkom){
								if(s.equals(kom.getSifra())){
									uListi2 = true;
								}
							}
							if(uListi2 == false){
								listkom.add(kom.getSifra());
								break;
							}
						}
					}
					break;
				}
			}
			recursiveSearch( children.get(i));
	    }
	   // children.clear();


	    //listaListeDece.add(listaDece);
	     * */
		
		KorisnikRepository korRep = new KorisnikRepository(putanja+"/korisnici.dat");
		UlogaRepository ulrep = new UlogaRepository(putanja+"/uloge.dat"); 
	
		korRep.ClearAll();
		ulrep.ClearAll();
		
		Uloga u = new Uloga(0, "administrator");
		Uloga u2 = new Uloga(1, "menadzer");
		Uloga u3 = new Uloga(2, "korisnik");
		ulrep.Save(u);
		ulrep.Save(u2);
		ulrep.Save(u3);
		Korisnik admin = new Korisnik("admin", "admin", "Mihailo", "Vasiljevic", "+381693659007", "mihailo93@gmail.com", ulrep.FindAll().get(0), null, "../uploadedFiles/ja.jpg");
		korRep.Save(admin);
		Korisnik korisnik = new Korisnik("test", "test", "Testni", "Korisnik", "123456789", "test@test.com", ulrep.FindAll().get(2), new ShoppingCart(new ArrayList<ShoppingCartItemNamestaj>(),new ArrayList<ShoppingCartItemUsluga>()), "../shop/images/avatar.png");
		korRep.Save(korisnik);
		Korisnik menadzer = new Korisnik("proba", "proba", "Testni", "Korisnik", "123456789", "test@test.com", ulrep.FindAll().get(1), new ShoppingCart(new ArrayList<ShoppingCartItemNamestaj>(),new ArrayList<ShoppingCartItemUsluga>()), "../shop/images/avatar.png");
		korRep.Save(menadzer);
		
		RacunRepository racRep = new RacunRepository(putanja+"/racuni.dat");
		racRep.ClearAll();
		KomadNamestajaRepository knRepository = new KomadNamestajaRepository(putanja+"/komadiNamestaja.dat");
		DodatneUslugeRepository duRepository = new DodatneUslugeRepository(putanja+"/dodatneUsluge.dat");
		String string = "03.07.2015.";
		DateFormat format = DateFormat.getDateInstance();
		Date date;
		try {
			int current = 0;
			if(racRep.FindAll() == null)
				current = 0;
			else
				current = racRep.FindAll().size();
			date = format.parse(string);
			ArrayList<KomadNamestaja> listaKomNam = new ArrayList<KomadNamestaja>();
			ArrayList<DodatneUsluge> listaDu = new ArrayList<DodatneUsluge>();
			listaKomNam.add(knRepository.FindAll().get(0));
			listaKomNam.add(knRepository.FindAll().get(1));
			listaKomNam.add(knRepository.FindAll().get(2));
			Racun r1 = new Racun(0.2,20000,date,"12:48",korisnik,listaKomNam,listaDu,current);
			racRep.Save(r1);
			string = "15.07.2015.";
			date = format.parse(string);
			 listaKomNam = new ArrayList<KomadNamestaja>();
			listaDu = new ArrayList<DodatneUsluge>();
			listaKomNam.add(knRepository.FindAll().get(2));
			listaKomNam.add(knRepository.FindAll().get(4));
			listaKomNam.add(knRepository.FindAll().get(3));
			listaDu.add(duRepository.FindAll().get(0));
			listaDu.add(duRepository.FindAll().get(1));
			if(racRep.FindAll() == null)
				current = 0;
			else
				current = racRep.FindAll().size();
			Racun r2 = new Racun(0.2,15000,date,"12:48",korisnik,listaKomNam,listaDu,current);
			racRep.Save(r2);
			for(Racun r:racRep.FindAll()){
				System.out.println("\nOznaka: "+r.getOznaka());
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
