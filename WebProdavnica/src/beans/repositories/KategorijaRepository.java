package beans.repositories;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;

import beans.model.Kategorija;

public class KategorijaRepository implements Serializable{

	private static final long serialVersionUID = 7125724793308225076L;
	
	private ArrayList<Kategorija> skladisteKategorija;
	private String _datoteka;
	
	public KategorijaRepository(){
		skladisteKategorija = new ArrayList<Kategorija>();
		_datoteka = "kategorije.dat";
		Deserialize();
	}
	
	public KategorijaRepository(String _dat){
		skladisteKategorija = new ArrayList<Kategorija>();
		_datoteka = _dat;
		Deserialize();
	}
	
	public ArrayList<Kategorija> FindAll(){
		return new ArrayList<Kategorija>(skladisteKategorija);
	}
	
	public void Save(Kategorija du){
		for(Kategorija k:skladisteKategorija){
			if(k.getCvor().getNaziv().equals(du.getCvor().getNaziv()))
				return;
		}
		skladisteKategorija.add(du);
		Serialize();
	}
	
	public void Delete(Kategorija du){
		for(Kategorija k:skladisteKategorija){
			if(k.getCvor().getNaziv().equals(du.getCvor().getNaziv())){
				skladisteKategorija.remove(du);
				Serialize();
				return;
			}
		}
	}
	
	public void Change(Kategorija du){
		for(int i = 0; i < skladisteKategorija.size(); i++){
			if(skladisteKategorija.get(i).getCvor().getNaziv().equals(du.getCvor().getNaziv())){
				skladisteKategorija.get(i).setCvor(du.getCvor());
				Serialize();
				return;
			}
		}
	}
	
	public void ClearAll(){
		skladisteKategorija.clear();
		Serialize();
	}
	
	public void SaveAll(ArrayList<Kategorija> lista){
		ClearAll();
		for(Kategorija du:lista){
			Save(du);
		}
	}
	
	private void Serialize(){
	      try
	      {
	         FileOutputStream fileOut =
	         new FileOutputStream(_datoteka);
	         ObjectOutputStream out = new ObjectOutputStream(fileOut);
	         out.writeObject(skladisteKategorija); //upisi listu u datoteku, kao objekat
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
	         skladisteKategorija = (ArrayList<Kategorija>) in.readObject();
	         in.close();
	         fileIn.close();
	      }catch(IOException i)
	      {
	         i.printStackTrace();
	         return;
	      }catch(ClassNotFoundException c)
	      {
	         System.out.println("Nije pronadjena klasa kategorija");
	         c.printStackTrace();
	         return;
	      }
	}

}
