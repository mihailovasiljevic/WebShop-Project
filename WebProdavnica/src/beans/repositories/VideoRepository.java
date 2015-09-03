package beans.repositories;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;

import beans.model.Video;

public class VideoRepository implements Serializable{
	
	private static final long serialVersionUID = -1496758321342192775L;
	
	private ArrayList<Video> skladisteVidea;
	private String _datoteka;
	
	public VideoRepository(){
		skladisteVidea = new ArrayList<Video>();
		_datoteka = "videi.dat";
		Deserialize();
	}
	public VideoRepository(String _dat){
		skladisteVidea = new ArrayList<Video>();
		_datoteka = _dat;
		Deserialize();
	}
	public ArrayList<Video> FindAll(){
		return new ArrayList<Video>(skladisteVidea);
	}
	
	public void Save(Video du){
		for(Video k:skladisteVidea){
			if(k.getOznaka() == du.getOznaka())
				return;
		}
		skladisteVidea.add(du);
		Serialize();
	}
	
	public void Delete(Video du){
		for(Video k:skladisteVidea){
			if(k.getOznaka() == du.getOznaka()){
				skladisteVidea.remove(du);
				Serialize();
				return;
			}
		}

	}
	
	public void Change(Video du){
		for(int i = 0; i < skladisteVidea.size(); i++){
			if(skladisteVidea.get(i).getOznaka() == du.getOznaka()){
				//skladisteVidea.get(i).setListaKomadaNamestaja(du.getListaKomadaNamestaja());
				skladisteVidea.get(i).setPutanja(du.getPutanja());
				Serialize();
				return;
			}
		}
	}
	
	public void ClearAll(){
		skladisteVidea.clear();
		Serialize();
	}
	
	public void SaveAll(ArrayList<Video> lista){
		ClearAll();
		for(Video du:lista){
			Save(du);
		}
	}
	
	private void Serialize(){
	      try
	      {
	         FileOutputStream fileOut =
	         new FileOutputStream(_datoteka);
	         ObjectOutputStream out = new ObjectOutputStream(fileOut);
	         out.writeObject(skladisteVidea); //upisi listu u datoteku, kao objekat
	         out.close();
	         fileOut.close();
	         System.out.print("Podaci serijalizovani u "+_datoteka);
	      }catch(IOException i)
	      {
	          i.printStackTrace();
	      }
	}
	
	@SuppressWarnings("unchecked")
	private void Deserialize(){
	    try
	      {
	         FileInputStream fileIn = new FileInputStream(_datoteka);
	         ObjectInputStream in = new ObjectInputStream(fileIn);
	         skladisteVidea = (ArrayList<Video>) in.readObject();
	         in.close();
	         fileIn.close();
	      }catch(IOException i)
	      {
	         i.printStackTrace();
	         return;
	      }catch(ClassNotFoundException c)
	      {
	         System.out.println("Nije pronadjena klasa Video.");
	         c.printStackTrace();
	         return;
	      }
	}

}
