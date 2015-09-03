package menadzer_site;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.model.Korisnik;
import beans.model.KorisnikLogIn;
import beans.repositories.KorisnikRepository;

/**
 * Servlet implementation class MenadzerLoginServlet
 */
public class MenadzerLoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MenadzerLoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
        Korisnik administrator = (Korisnik)request.getSession().getAttribute("menadzer");
        ObjectMapper mapper = new ObjectMapper();
        if(administrator != null){
            String answer = mapper.writeValueAsString("vec_prijavljen");
            response.getWriter().write(answer);
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
		//Proveri da li je administrator vec ulogovan na racunaru
	    Korisnik administrator = (Korisnik)request.getSession().getAttribute("menadzer");
        ObjectMapper mapper = new ObjectMapper();
        //Ako je administrator ulogovan posalji poruku ajaxu da mu prikaze sadrzaj
        if(administrator != null){
            String answer = mapper.writeValueAsString("vec_prijavljen");
            response.getWriter().write(answer);
            return;
        }
 
        String jsonRequest = request.getParameter("loginPodaci");
 
        KorisnikLogIn a = mapper.readValue(jsonRequest, KorisnikLogIn.class);
         
 
         
        //Ako administrator nije ulogovan pokusaj da ga identifikujes i ako uspes prijavi ga i vezi za sesiju
 
        boolean ulogovan = false;
        String putanja = getServletContext().getRealPath("");
        KorisnikRepository korRep = new KorisnikRepository(putanja+"/korisnici.dat");
        for(Korisnik k: korRep.FindAll()){
            if(a.getUsername().equals(k.getKorisnickoIme()) && a.getPassword().equals(k.getLozinka()) && k.getUloga().getNaziv().equals("menadzer")){
                ulogovan = true;
                k.setPrijavljen(true);
                korRep.Change(k);
                System.out.println(k.isPrijavljen()+"");
                request.getSession().setAttribute("menadzer", new Korisnik(k));
                String answer = mapper.writeValueAsString("prijavljen");
                response.getWriter().write(answer);
                return;
            }
        }
        ulogovan = false;
        String answer = mapper.writeValueAsString("greska");
        response.getWriter().write(answer);
        return;
         
	}

}
