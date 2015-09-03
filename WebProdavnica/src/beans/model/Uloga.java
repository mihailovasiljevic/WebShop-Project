/***********************************************************************
 * Module:  Uloga.java
 * Author:  Misa
 * Purpose: Defines the Class Uloga
 ***********************************************************************/

package beans.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;


public class Uloga implements Serializable{


	private static final long serialVersionUID = -6224235699931102715L;
	private int oznaka;
	
   private String naziv;
  // private ArrayList<Korisnik> listaKorisnika = null;
   

	public Uloga() {}
	
	public Uloga(int oznaka, String naziv) {
		super();
		this.oznaka = oznaka;
		this.naziv = naziv;
		//this.listaKorisnika = listaKorisnika;
	}

	public Uloga(Uloga u) {
		super();
		this.oznaka = u.oznaka;
		this.naziv = u.naziv;
		//this.listaKorisnika = u.listaKorisnika;
	}

	public int getOznaka() {
		return oznaka;
	}
	public void setOznaka(int oznaka) {
		this.oznaka = oznaka;
	}
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	/*
	public ArrayList<Korisnik> getListaKorisnika() {
		return listaKorisnika;
	}
	public void setListaKorisnika(ArrayList<Korisnik> listaKorisnika) {
		this.listaKorisnika = listaKorisnika;
	}
	
	public int addKorisnik(Korisnik kor){
		for(Korisnik k:listaKorisnika){
			if(k.getKorisnickoIme().equals(kor.getKorisnickoIme()) && k.getLozinka().equals(kor.getLozinka())){
				return -1;
			}
		}
		listaKorisnika.add(kor);
		return listaKorisnika.indexOf(kor);
	}
	
	public int removeKorisnik(Korisnik kor){
		for(Korisnik k:listaKorisnika){
			if(k.getKorisnickoIme().equals(kor.getKorisnickoIme()) && k.getLozinka().equals(kor.getLozinka())){
				int idx = listaKorisnika.indexOf(k);
				listaKorisnika.remove(k);
				return idx;
			}
		}
		return -1;
	}
	
	public int clearAll(){
		try{
			listaKorisnika.clear();
			return 1;
		}
		catch(Exception ex){
			return -1;
		}
	}
	
	public int getCount(){
		return listaKorisnika.size();
	}
	
	public Korisnik getElement(int i){
		return listaKorisnika.get(i);
	}
	
	public int findKorisnik(Korisnik kor){
		for(Korisnik k:listaKorisnika){
			if(k.getKorisnickoIme().equals(kor.getKorisnickoIme()) && k.getLozinka().equals(kor.getLozinka())){
				return listaKorisnika.indexOf(k);
			}
		}
		return -1;
	}
	*/

}