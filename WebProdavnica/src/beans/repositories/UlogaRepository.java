package beans.repositories;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;

import beans.model.Uloga;

public class UlogaRepository implements Serializable{

	private static final long serialVersionUID = -6576794440061360145L;
	
	private ArrayList<Uloga> skladisteUloga;
	private String _datoteka;
	
	public UlogaRepository(){
		skladisteUloga = new  ArrayList<Uloga>();
		_datoteka = "uloge.dat";
		Deserialize();
	}
	public UlogaRepository(String _dat){
		skladisteUloga = new  ArrayList<Uloga>();
		_datoteka = _dat;
		Deserialize();
	}
	
	public ArrayList<Uloga> FindAll(){
		return new ArrayList<Uloga>(skladisteUloga);
	}
	
	public void Save(Uloga du){
		for(Uloga k : skladisteUloga){
			if(k.getOznaka() == du.getOznaka())
				return;
		}
		skladisteUloga.add(du);
		Serialize();
	}
	
	public void Delete(Uloga du){
		for(Uloga k : skladisteUloga){
			if(k.getOznaka() == du.getOznaka()){
				skladisteUloga.remove(k);
				Serialize();
				return;
			}
		}
	}
	
	public void Change(Uloga du){
		for(int i = 0; i < skladisteUloga.size(); i++){
			if(skladisteUloga.get(i).getOznaka() == du.getOznaka()){
				//skladisteUloga.get(i).setListaKorisnika(du.getListaKorisnika());
				skladisteUloga.get(i).setNaziv(du.getNaziv());
				Serialize();
				return;
			}
		}
	}
	
	public void ClearAll(){
		skladisteUloga.clear();
		Serialize();
	}
	
	public void SaveAll(ArrayList<Uloga> lista){
		ClearAll();
		for(Uloga du:lista){
			Save(du);
		}
	}
	
	private void Serialize(){
	      try
	      {
	         FileOutputStream fileOut =
	         new FileOutputStream(_datoteka);
	         ObjectOutputStream out = new ObjectOutputStream(fileOut);
	         out.writeObject(skladisteUloga); //upisi listu u datoteku, kao objekat
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
	         skladisteUloga = (ArrayList<Uloga>) in.readObject();
	         in.close();
	         fileIn.close();
	      }catch(IOException i)
	      {
	         i.printStackTrace();
	         return;
	      }catch(ClassNotFoundException c)
	      {
	         System.out.println("Nije pronadjena klasa Uloga.");
	         c.printStackTrace();
	         return;
	      }
	}
	public String get_datoteka() {
		return _datoteka;
	}
	public void set_datoteka(String _datoteka) {
		this._datoteka = _datoteka;
	}

}
