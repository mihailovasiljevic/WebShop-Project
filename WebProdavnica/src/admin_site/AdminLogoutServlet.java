package admin_site;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.model.KomadNamestaja;
import beans.model.Korisnik;
import beans.model.ShoppingCartItemNamestaj;
import beans.model.StringGetter;
import beans.repositories.KomadNamestajaRepository;
import beans.repositories.KorisnikRepository;

/**
 * Servlet implementation class AdminLogoutServlet
 */
public class AdminLogoutServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AdminLogoutServlet() {
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

		/*pribavi sve repozitorijume*/
		String putanja = getServletContext().getRealPath("");
		KorisnikRepository korRep = new KorisnikRepository(putanja+"/korisnici.dat");
		response.setContentType("application/json"); 
		/*U slucaju da nema korisnika vrati gresku!*/
		Korisnik korisnik = (Korisnik)request.getSession().getAttribute("administrator");
		for(Korisnik k:korRep.FindAll()){
			if(k.getKorisnickoIme().equals(korisnik.getKorisnickoIme())){
				k.setPrijavljen(false);
				korRep.Change(k);
				break;
			}
		}
		
		HttpSession session = request.getSession(false);

			session.invalidate();
		return;
	}

}
