package beans.repositories;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;

import beans.model.Racun;


public class RacunRepository implements Serializable{

	private static final long serialVersionUID = 6578423804856418779L;
	
	private ArrayList<Racun> skladisteRacuna;
	private String _datoteka;
	
	public RacunRepository(){
		skladisteRacuna = new ArrayList<Racun>();
		_datoteka = "racuni.dat";
		Deserialize();
	}
	public RacunRepository(String _dat){
		skladisteRacuna = new ArrayList<Racun>();
		_datoteka = _dat;
		Deserialize();
	}
	
	public ArrayList<Racun> FindAll(){
		return new ArrayList<Racun>(skladisteRacuna);
	}
	
	public void Save(Racun du){
		for(Racun k:skladisteRacuna){
			if(k.getOznaka() == du.getOznaka())
				return;
		}
		skladisteRacuna.add(du);
		Serialize();
	}
	
	public void Delete(Racun du){
		for(Racun k:skladisteRacuna){
			if(k.getOznaka() == du.getOznaka()){
				skladisteRacuna.remove(du);
				Serialize();
				return;
			}
		}


	}
	
	public void Change(Racun du){
		for(int i = 0; i < skladisteRacuna.size(); i++){
			if(skladisteRacuna.get(i).getOznaka() == du.getOznaka()){
				skladisteRacuna.get(i).setDatum(du.getDatum());
				skladisteRacuna.get(i).setDodatneUsluge(du.getDodatneUsluge());
				skladisteRacuna.get(i).setKorisnik(du.getKorisnik());
				skladisteRacuna.get(i).setKupljeniNamestaj(du.getKupljeniNamestaj());
				skladisteRacuna.get(i).setPorez(du.getPorez());
				skladisteRacuna.get(i).setUkupnaCena(du.getUkupnaCena());
				skladisteRacuna.get(i).setVreme(du.getVreme());
				Serialize();
				return;
			}
		}
	}
	public void ClearAll(){
		skladisteRacuna.clear();
		Serialize();
	}
	
	public void SaveAll(ArrayList<Racun> lista){
		ClearAll();
		for(Racun du:lista){
			Save(du);
		}
	}
	
	private void Serialize(){
	      try
	      {
	         FileOutputStream fileOut =
	         new FileOutputStream(_datoteka);
	         ObjectOutputStream out = new ObjectOutputStream(fileOut);
	         out.writeObject(skladisteRacuna); //upisi listu u datoteku, kao objekat
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
	         skladisteRacuna = (ArrayList<Racun>) in.readObject();
	         in.close();
	         fileIn.close();
	      }catch(IOException i)
	      {
	         i.printStackTrace();
	         return;
	      }catch(ClassNotFoundException c)
	      {
	         System.out.println("Nije pronadjena klasa racuna");
	         c.printStackTrace();
	         return;
	      }
	}

}
