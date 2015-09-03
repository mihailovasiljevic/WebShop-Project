package beans.repositories;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;

import beans.model.Slika;


public class SlikaRepository implements Serializable{
	private static final long serialVersionUID = -6332579320707484113L;
	
	private ArrayList<Slika> skladisteSlika;
	private String _datoteka;
	
	public SlikaRepository(){
		skladisteSlika = new ArrayList<Slika>();
		_datoteka = "slike.dat";
		Deserialize();
	}
	public SlikaRepository(String _dat){
		skladisteSlika = new ArrayList<Slika>();
		_datoteka = _dat;
		Deserialize();
	}
	public ArrayList<Slika> FindAll(){
		return new ArrayList<Slika>(skladisteSlika);
	}
	
	public void Save(Slika du){
		for(Slika k:skladisteSlika){
			if(k.getOznaka() == du.getOznaka())
				return;
		}
		skladisteSlika.add(du);
		Serialize();
	}
	
	public void Delete(Slika du){
		for(Slika k:skladisteSlika){
			if(k.getOznaka() == du.getOznaka()){
				skladisteSlika.remove(du);
				Serialize();
				return;
			}
		}

	}
	
	public void Change(Slika du){
		for(int i = 0; i < skladisteSlika.size(); i++){
			if(skladisteSlika.get(i).getOznaka() == du.getOznaka()){
				//skladisteSlika.get(i).setListaKomadaNamestaja(du.getListaKomadaNamestaja());
				skladisteSlika.get(i).setPutanja(du.getPutanja());
				Serialize();
				return;
			}
		}
	}
	
	public void ClearAll(){
		skladisteSlika.clear();
		Serialize();
	}
	
	public void SaveAll(ArrayList<Slika> lista){
		ClearAll();
		for(Slika du:lista){
			Save(du);
		}
	}
	
	private void Serialize(){
	      try
	      {
	         FileOutputStream fileOut =
	         new FileOutputStream(_datoteka);
	         ObjectOutputStream out = new ObjectOutputStream(fileOut);
	         out.writeObject(skladisteSlika); //upisi listu u datoteku, kao objekat
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
	         skladisteSlika = (ArrayList<Slika>) in.readObject();
	         in.close();
	         fileIn.close();
	      }catch(IOException i)
	      {
	         i.printStackTrace();
	         return;
	      }catch(ClassNotFoundException c)
	      {
	         System.out.println("Nije pronadjena klasa slika ili video");
	         c.printStackTrace();
	         return;
	      }
	}

}
