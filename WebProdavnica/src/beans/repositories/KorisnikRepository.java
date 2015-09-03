package beans.repositories;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;

import beans.model.Korisnik;


public class KorisnikRepository implements Serializable{

	private static final long serialVersionUID = -3373933956220484033L;
	
	private ArrayList<Korisnik> skladisteKorisnika;
	private String _datoteka;
	
	public KorisnikRepository(){
		skladisteKorisnika = new ArrayList<Korisnik>();
		_datoteka = "WebContent/korisnici.dat";
		Deserialize();
	}
	public KorisnikRepository(String _dat){
		skladisteKorisnika = new ArrayList<Korisnik>();
		_datoteka = _dat;
		Deserialize();
	}
	
	public ArrayList<Korisnik> FindAll(){
		return new ArrayList<Korisnik>(skladisteKorisnika);
	}
	
	public void Save(Korisnik du){
		for(Korisnik k : skladisteKorisnika){
			if(k.getKorisnickoIme().equals(du.getKorisnickoIme()) && k.getLozinka().equals(du.getLozinka()))
				return;
		}
		skladisteKorisnika.add(du);
		Serialize();
	}
	
	public void Delete(Korisnik du){
		for(Korisnik k : skladisteKorisnika){
			if(k.getKorisnickoIme().equals(du.getKorisnickoIme()) && k.getLozinka().equals(du.getLozinka())){
				skladisteKorisnika.remove(k);
				Serialize();
				return;
			}
		}
	}
	
	public void Change(Korisnik du){
		for(int i = 0; i < skladisteKorisnika.size(); i++){
			if(skladisteKorisnika.get(i).getKorisnickoIme().equals(du.getKorisnickoIme()) && skladisteKorisnika.get(i).getLozinka().equals(du.getLozinka())){
				skladisteKorisnika.get(i).setEmail(du.getEmail());
				skladisteKorisnika.get(i).setIme(du.getIme());
				skladisteKorisnika.get(i).setKontaktTelefon(du.getKontaktTelefon());
				skladisteKorisnika.get(i).setKorisnickoIme(du.getKorisnickoIme());
				skladisteKorisnika.get(i).setLozinka(du.getLozinka());
				skladisteKorisnika.get(i).setPrezime(du.getPrezime());
				skladisteKorisnika.get(i).setPrijavljen(du.isPrijavljen());
				skladisteKorisnika.get(i).setUloga(du.getUloga());
				skladisteKorisnika.get(i).setShoppingCart(du.getShoppingCart());
				skladisteKorisnika.get(i).setPutanja(du.getPutanja());
				Serialize();
				return;
			}
		}
	}
	public void ClearAll(){
		skladisteKorisnika.clear();
		Serialize();
	}
	
	public void SaveAll(ArrayList<Korisnik> lista){
		ClearAll();
		for(Korisnik du:lista){
			Save(du);
		}
	}
	
	private void Serialize(){
	      try
	      {
	         FileOutputStream fileOut =
	         new FileOutputStream(_datoteka);
	         ObjectOutputStream out = new ObjectOutputStream(fileOut);
	         out.writeObject(skladisteKorisnika); //upisi listu u datoteku, kao objekat
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
	         skladisteKorisnika = (ArrayList<Korisnik>) in.readObject();
	         in.close();
	         fileIn.close();
	      }catch(IOException i)
	      {
	         i.printStackTrace();
	         return;
	      }catch(ClassNotFoundException c)
	      {
	         System.out.println("Nije pronadjena klasa Korisnik");
	         c.printStackTrace();
	         return;
	      }
	}

}
