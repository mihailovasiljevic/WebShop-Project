package beans.repositories;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;

import beans.model.DodatneUsluge;


public class DodatneUslugeRepository implements Serializable{

	private static final long serialVersionUID = -8902245166049980184L;
	
	private ArrayList<DodatneUsluge> skladisteDodatnihUsluga;
	private String _datoteka;
	
	public DodatneUslugeRepository(){
		skladisteDodatnihUsluga = new ArrayList<DodatneUsluge>();
		_datoteka = "dodatneUsluge.dat";
		Deserialize();
	}
	public DodatneUslugeRepository(String _dat){
		skladisteDodatnihUsluga = new ArrayList<DodatneUsluge>();
		_datoteka = _dat;
		Deserialize();
	}
	
	public ArrayList<DodatneUsluge> FindAll(){
		return new ArrayList<DodatneUsluge>(skladisteDodatnihUsluga);
	}
	
	public void Save(DodatneUsluge du){
		for(DodatneUsluge k:skladisteDodatnihUsluga){
			if(k.getNaziv().equals(du.getNaziv()))
				return;
		}
		skladisteDodatnihUsluga.add(du);
		Serialize();
	}
	
	public void Delete(DodatneUsluge du){
		for(DodatneUsluge k:skladisteDodatnihUsluga){
			if(k.getNaziv().equals(du.getNaziv())){
				skladisteDodatnihUsluga.remove(du);
				Serialize();
				return;
			}
		}
	}
	
	public void Change(DodatneUsluge du){
		for(int i = 0; i < skladisteDodatnihUsluga.size(); i++){
			if(skladisteDodatnihUsluga.get(i).getNaziv().equals(du.getNaziv())){
				skladisteDodatnihUsluga.get(i).setListaKomadaNamestajaUKojimaJeBesplatna(du.getListaKomadaNamestajaUKojimaJeBesplatna());
				skladisteDodatnihUsluga.get(i).setCena(du.getCena());
				skladisteDodatnihUsluga.get(i).setOpis(du.getOpis());
				Serialize();
				return;
			}
		}
	}
	
	public void ClearAll(){
		skladisteDodatnihUsluga.clear();
		Serialize();
	}
	
	public void SaveAll(ArrayList<DodatneUsluge> lista){
		ClearAll();
		for(DodatneUsluge du:lista){
			Save(du);
		}
	}
	
	private void Serialize(){
	      try
	      {
	         FileOutputStream fileOut =
	         new FileOutputStream(_datoteka);
	         ObjectOutputStream out = new ObjectOutputStream(fileOut);
	         out.writeObject(skladisteDodatnihUsluga); //upisi listu u datoteku, kao objekat
	         out.close();
	         fileOut.close();
	         System.out.print("Podaci serijalizovani u dodatneUsluge.dat");
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
	         skladisteDodatnihUsluga = (ArrayList<DodatneUsluge>) in.readObject();
	         in.close();
	         fileIn.close();
	      }catch(IOException i)
	      {
	         i.printStackTrace();
	         return;
	      }catch(ClassNotFoundException c)
	      {
	         System.out.println("Nije pronadjena klasa dodatnih usluga");
	         c.printStackTrace();
	         return;
	      }
	}

	
}
