package beans.repositories;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;

import beans.model.Akcija;
import beans.model.Akcija;

public class AkcijeRepository implements Serializable{

	private static final long serialVersionUID = -1729227991350988266L;
	private ArrayList<Akcija> skladisteAkcija;
	private String _datoteka;
	
	public AkcijeRepository(){
		skladisteAkcija = new ArrayList<Akcija>();
		_datoteka = "akcije.dat";
		Deserialize();
	}
	public AkcijeRepository(String _dat){
		skladisteAkcija = new ArrayList<Akcija>();
		_datoteka = _dat;
		Deserialize();
	}
	
	public ArrayList<Akcija> FindAll(){
		return new ArrayList<Akcija>(skladisteAkcija);
	}
	
	public void Save(Akcija du){
		for(Akcija k:skladisteAkcija){
			if(k.getNaziv().equals(du.getNaziv()))
				return;
		}
		skladisteAkcija.add(du);
		Serialize();
	}
	
	public void Delete(Akcija du){
		for(Akcija k:skladisteAkcija){
			if(k.getNaziv().equals(du.getNaziv())){
				skladisteAkcija.remove(du);
				Serialize();
				return;
			}
		}
	}
	
	public void Change(Akcija du){
		for(int i = 0; i < skladisteAkcija.size(); i++){
			if(skladisteAkcija.get(i).getNaziv().equals(du.getNaziv())){
				skladisteAkcija.get(i).setDatumPocetka(du.getDatumPocetka());
				skladisteAkcija.get(i).setDatumZavrsetka(du.getDatumZavrsetka());
				skladisteAkcija.get(i).setListaKategorija(du.getListaKategorija());
				skladisteAkcija.get(i).setListaKomadaNamestaja(du.getListaKomadaNamestaja());
				skladisteAkcija.get(i).setPopust(du.getPopust());
				skladisteAkcija.get(i).setSalon(du.getSalon());
				Serialize();
				return;
			}
		}
	}
	
	public void ClearAll(){
		skladisteAkcija.clear();
		Serialize();
	}
	
	public void SaveAll(ArrayList<Akcija> lista){
		ClearAll();
		for(Akcija du:lista){
			Save(du);
		}
	}
	
	private void Serialize(){
	      try
	      {
	         FileOutputStream fileOut =
	         new FileOutputStream(_datoteka);
	         ObjectOutputStream out = new ObjectOutputStream(fileOut);
	         out.writeObject(skladisteAkcija); //upisi listu u datoteku, kao objekat
	         out.close();
	         fileOut.close();
	         System.out.print("Podaci serijalizovani u Akcija.dat");
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
	         skladisteAkcija = (ArrayList<Akcija>) in.readObject();
	         in.close();
	         fileIn.close();
	      }catch(IOException i)
	      {
	         i.printStackTrace();
	         return;
	      }catch(ClassNotFoundException c)
	      {
	         System.out.println("Nije pronadjena klasa akcija");
	         c.printStackTrace();
	         return;
	      }
	}
}
