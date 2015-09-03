package admin_site.komadinamestaja;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;

import beans.model.Slika;
import beans.model.Video;
import beans.repositories.SlikaRepository;
import beans.repositories.VideoRepository;


/**
 * Servlet implementation class FileUploadServlet
 */
public class FileUploadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FileUploadServlet() {
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
		String ajaxUpdateResult = "";
		try {
			List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
			Slika s1 = null;
			Video v1 = null;
			String forParsing;
			String[] tokens = null;
			for (FileItem item : items) {
				
				if (item.isFormField()) {

					forParsing = item.getString();
					tokens = forParsing.split("_");
					if(tokens[1].equals("slika"))
						s1 = new Slika();
					else
						v1 = new Video();
				
				} else {
					String fileName = item.getName();
					InputStream content = item.getInputStream();
					String putanja = getServletContext().getRealPath("");
					Path path = Paths.get(putanja+"/uploadedFiles/"+item.getName());
					try{
						Files.copy(content, path);
						if(s1 != null){
							if(tokens[0]!=null)
								s1.setOznaka(tokens[0]);
							s1.setPutanja("../uploadedFiles/"+item.getName());
							SlikaRepository sr = new SlikaRepository(putanja+"/slike.dat");
							sr.Save(s1);
						}
						if(v1 != null){
							if(tokens[0]!=null)
								v1.setOznaka(tokens[0]);
							v1.setPutanja("/uploadedFiles/"+item.getName());
							VideoRepository vr = new VideoRepository(putanja+"/videi.dat");
							vr.Save(v1);
						}
					}catch(Exception ex){
						ex.printStackTrace();
					}
					
					response.setContentType("text/plain");
					response.setCharacterEncoding("UTF-8");

					// Do whatever with the content InputStream.
					System.out.println(Streams.asString(content));

					ajaxUpdateResult += "File " + fileName + " is successfully uploaded BUHAH!\n\r";
				}
			}
		} catch (FileUploadException e) {
			throw new ServletException("Parsing file upload failed.", e);
		}

		response.getWriter().print(ajaxUpdateResult);
	}

}
