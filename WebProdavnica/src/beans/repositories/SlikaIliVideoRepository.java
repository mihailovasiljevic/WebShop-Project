package beans.repositories;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;

import beans.model.SlikaIliVideo;

public class SlikaIliVideoRepository implements Serializable{

	private static final long serialVersionUID = -8239823706568975429L;
	
	private ArrayList<SlikaIliVideo> skladisteSlikaIliVidea;
	private String _datoteka;
	
	public SlikaIliVideoRepository(){
		skladisteSlikaIliVidea = new ArrayList<SlikaIliVideo>();
		_datoteka = "slikeIliVidei.dat";
		Deserialize();
	}
	public SlikaIliVideoRepository(String _dat){
		skladisteSlikaIliVidea = new ArrayList<SlikaIliVideo>();
		_datoteka = _dat;
		Deserialize();
	}
	public ArrayList<SlikaIliVideo> FindAll(){
		return new ArrayList<SlikaIliVideo>(skladisteSlikaIliVidea);
	}
	
	public void Save(SlikaIliVideo du){
		for(SlikaIliVideo k:skladisteSlikaIliVidea){
			if(k.getOznaka() == du.getOznaka())
				return;
		}
		skladisteSlikaIliVidea.add(du);
		Serialize();
	}
	
	public void Delete(SlikaIliVideo du){
		for(SlikaIliVideo k:skladisteSlikaIliVidea){
			if(k.getOznaka() == du.getOznaka()){
				skladisteSlikaIliVidea.remove(du);
				Serialize();
				return;
			}
		}

	}
	
	public void Change(SlikaIliVideo du){
		for(int i = 0; i < skladisteSlikaIliVidea.size(); i++){
			if(skladisteSlikaIliVidea.get(i).getOznaka() == du.getOznaka()){
				//skladisteSlikaIliVidea.get(i).setListaKomadaNamestaja(du.getListaKomadaNamestaja());
				skladisteSlikaIliVidea.get(i).setPutanja(du.getPutanja());
				Serialize();
				return;
			}
		}
	}
	
	public void ClearAll(){
		skladisteSlikaIliVidea.clear();
		Serialize();
	}
	
	public void SaveAll(ArrayList<SlikaIliVideo> lista){
		ClearAll();
		for(SlikaIliVideo du:lista){
			Save(du);
		}
	}
	
	private void Serialize(){
	      try
	      {
	         FileOutputStream fileOut =
	         new FileOutputStream(_datoteka);
	         ObjectOutputStream out = new ObjectOutputStream(fileOut);
	         out.writeObject(skladisteSlikaIliVidea); //upisi listu u datoteku, kao objekat
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
	         skladisteSlikaIliVidea = (ArrayList<SlikaIliVideo>) in.readObject();
	         in.close();
	         fileIn.close();
	      }catch(IOException i)
	      {
	         i.printStackTrace();
	         return;
	      }catch(ClassNotFoundException c)
	      {
	         System.out.println("Nije pronadjena klasa Slika");
	         c.printStackTrace();
	         return;
	      }
	}
}
