package beans.repositories;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;


import beans.model.KomadNamestaja;


public class KomadNamestajaRepository implements Serializable{

	private static final long serialVersionUID = -4310498803159430943L;
	
	private ArrayList<KomadNamestaja> skladisteKomadaNamestaja;
	private String _datoteka;
	
	public KomadNamestajaRepository(){
		skladisteKomadaNamestaja = new ArrayList<KomadNamestaja>();
		_datoteka = "komadiNamestaja.dat";
		Deserialize();
	}
	public KomadNamestajaRepository(String _dat){
		skladisteKomadaNamestaja = new ArrayList<KomadNamestaja>();
		_datoteka = _dat;
		Deserialize();
	}
	
	public ArrayList<KomadNamestaja> FindAll(){
		return new ArrayList<KomadNamestaja>(skladisteKomadaNamestaja);
	}
	
	public void Save(KomadNamestaja du){
		for(KomadNamestaja k:skladisteKomadaNamestaja){
			if(k.getSifra().equals(du.getSifra()))
				return;
		}
		skladisteKomadaNamestaja.add(du);
		Serialize();
	}
	
	public void Delete(KomadNamestaja du){
		for(KomadNamestaja k:skladisteKomadaNamestaja){
			if(k.getSifra().equals(du.getSifra())){
				skladisteKomadaNamestaja.remove(du);
				Serialize();
				return;
			}
		}

	}
	
	public void Change(KomadNamestaja du){
		for(int i = 0; i < skladisteKomadaNamestaja.size(); i++){
			if(skladisteKomadaNamestaja.get(i).getSifra().equals(du.getSifra())){
				
				skladisteKomadaNamestaja.get(i).setBoja(du.getBoja());
				skladisteKomadaNamestaja.get(i).setGodinaProizvodnje(du.getGodinaProizvodnje());
				skladisteKomadaNamestaja.get(i).setJedinicnaCena(du.getJedinicnaCena());
				skladisteKomadaNamestaja.get(i).setKategorija(du.getKategorija());
				skladisteKomadaNamestaja.get(i).setKolicinaUMagacinu(du.getKolicinaUMagacinu());
				skladisteKomadaNamestaja.get(i).setSlika(du.getSlika());
				skladisteKomadaNamestaja.get(i).setVideo(du.getVideo());
				skladisteKomadaNamestaja.get(i).setNazivProizvodjaca(du.getNazivProizvodjaca());
				skladisteKomadaNamestaja.get(i).setNaziv(du.getNaziv());
				skladisteKomadaNamestaja.get(i).setZemljaProizvodnje(du.getZemljaProizvodnje());
				Serialize();
				return;
			}
		}
	}
	
	public void ClearAll(){
		skladisteKomadaNamestaja.clear();
		Serialize();
	}
	
	public void SaveAll(ArrayList<KomadNamestaja> lista){
		ClearAll();
		for(KomadNamestaja du:lista){
			Save(du);
		}
	}
	
	private void Serialize(){
	      try
	      {
	         FileOutputStream fileOut =
	         new FileOutputStream(_datoteka);
	         ObjectOutputStream out = new ObjectOutputStream(fileOut);
	         out.writeObject(skladisteKomadaNamestaja); //upisi listu u datoteku, kao objekat
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
	         skladisteKomadaNamestaja = (ArrayList<KomadNamestaja>) in.readObject();
	         in.close();
	         fileIn.close();
	      }catch(IOException i)
	      {
	         i.printStackTrace();
	         return;
	      }catch(ClassNotFoundException c)
	      {
	         System.out.println("Nije pronadjena klasa Komada namestaja");
	         c.printStackTrace();
	         return;
	      }
	}

}
