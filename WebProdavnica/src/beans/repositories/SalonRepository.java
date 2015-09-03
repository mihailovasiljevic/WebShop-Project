package beans.repositories;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;

import beans.model.Salon;


public class SalonRepository implements Serializable{

	private static final long serialVersionUID = 9176895319275063994L;
	
	private ArrayList<Salon> skladisteSalona;
	private String _datoteka;
	
	public SalonRepository(){
		skladisteSalona = new ArrayList<Salon>();
		_datoteka = "saloni.dat";
		Deserialize();
	}
	public SalonRepository(String _dat){
		skladisteSalona = new ArrayList<Salon>();
		_datoteka = _dat;
		Deserialize();
	}
	
	public ArrayList<Salon> FindAll(){
		return new ArrayList<Salon>(skladisteSalona);
	}
	
	public void Save(Salon du){
		for(Salon k:skladisteSalona){
			if(k.getPib().equals(du.getPib()))
				return;
		}
		skladisteSalona.add(du);
		Serialize();
	}
	
	public void Delete(Salon du){
		for(Salon k:skladisteSalona){
			if(k.getPib().equals(du.getPib())){
				skladisteSalona.remove(du);
				Serialize();
				return;
			}
		}


	}
	
	public void Change(Salon du){
		for(int i = 0; i < skladisteSalona.size(); i++){
			if(skladisteSalona.get(i).getPib().equals(du.getPib())){
				skladisteSalona.get(i).setNaziv(du.getNaziv());
				skladisteSalona.get(i).setAdresa(du.getAdresa());
				skladisteSalona.get(i).setAdresaInternetSajta(du.getAdresaInternetSajta());
				skladisteSalona.get(i).setEmail(du.getEmail());
				skladisteSalona.get(i).setTelefon(du.getTelefon());
				Serialize();
				return;
			}
		}
	}
	
	public void ClearAll(){
		skladisteSalona.clear();
		Serialize();
	}
	
	public void SaveAll(ArrayList<Salon> lista){
		ClearAll();
		for(Salon du:lista){
			Save(du);
		}
	}
	
	private void Serialize(){
	      try
	      {
	         FileOutputStream fileOut =
	         new FileOutputStream(_datoteka);
	         ObjectOutputStream out = new ObjectOutputStream(fileOut);
	         out.writeObject(skladisteSalona); //upisi listu u datoteku, kao objekat
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
	         skladisteSalona = (ArrayList<Salon>) in.readObject();
	         in.close();
	         fileIn.close();
	      }catch(IOException i)
	      {
	         i.printStackTrace();
	         return;
	      }catch(ClassNotFoundException c)
	      {
	         System.out.println("Nije pronadjena klasa salona");
	         c.printStackTrace();
	         return;
	      }
	}

}
