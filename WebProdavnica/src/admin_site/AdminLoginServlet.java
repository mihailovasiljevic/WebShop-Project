package admin_site;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.model.Korisnik;
import beans.model.KorisnikLogIn;
import beans.repositories.KorisnikRepository;

/**
 * Servlet implementation class AdminLoginServlet
 */
@WebServlet("/admin-login")
public class AdminLoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private ArrayList<Korisnik> listaAdminsitratora;    
    /**
     * @see HttpServlet#HttpServlet()
     */
	
    public AdminLoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	@Override
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
		super.init(config);
		listaAdminsitratora = new ArrayList<Korisnik>();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
        Korisnik administrator = (Korisnik)request.getSession().getAttribute("administrator");
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
	    Korisnik administrator = (Korisnik)request.getSession().getAttribute("administrator");
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
            if(a.getUsername().equals(k.getKorisnickoIme()) && a.getPassword().equals(k.getLozinka()) && k.getUloga().getNaziv().equals("administrator")){
                ulogovan = true;
                k.setPrijavljen(true);
                korRep.Change(k);
                System.out.println(k.isPrijavljen()+"");
                request.getSession().setAttribute("administrator", new Korisnik(k));
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

