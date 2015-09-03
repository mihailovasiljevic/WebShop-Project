/***********************************************************************
 * Module:  SlikaIliVideo.java
 * Author:  Misa
 * Purpose: Defines the Class SlikaIliVideo
 ***********************************************************************/

package beans.model;

import java.io.Serializable;
import java.util.*;

import beans.model.KomadNamestaja;


public class SlikaIliVideo implements Serializable{
	
	private static final long serialVersionUID = -7732263323119144948L;
	
	private int oznaka = -1;
   private String putanja = null;
  // private ArrayList<KomadNamestaja> listaKomadaNamestaja = null;
   public SlikaIliVideo(){}
   public SlikaIliVideo(int oznaka, String putanja) {
		super();
		this.oznaka = oznaka;
		this.putanja = putanja;
		//this.listaKomadaNamestaja = listaKomadaNamestaja;
	}
	public SlikaIliVideo(SlikaIliVideo siv) {
		super();
		this.oznaka = siv.oznaka;
		this.putanja = siv.putanja;
		//this.listaKomadaNamestaja = siv.listaKomadaNamestaja;
	}
	public int getOznaka() {
		return oznaka;
	}
	public void setOznaka(int oznaka) {
		this.oznaka = oznaka;
	}
	public String getPutanja() {
		return putanja;
	}
	public void setPutanja(String putanja) {
		this.putanja = putanja;
	}
	/*
	public ArrayList<KomadNamestaja> getListaKomadaNamestaja() {
		return listaKomadaNamestaja;
	}
	public void setListaKomadaNamestaja(ArrayList<KomadNamestaja> listaKomadaNamestaja) {
		this.listaKomadaNamestaja = listaKomadaNamestaja;
	}
	
	public int addKomadNamestaja(KomadNamestaja kor){
		for(KomadNamestaja k:listaKomadaNamestaja){
			if(k.getSifra().equals(kor.getSifra())){
				return -1;
			}
		}
		listaKomadaNamestaja.add(kor);
		return listaKomadaNamestaja.indexOf(kor);
	}
	
	public int removeKomadNamestaja(KomadNamestaja kor){
		for(KomadNamestaja k:listaKomadaNamestaja){
			if(k.getSifra().equals(kor.getSifra())){
				int idx = listaKomadaNamestaja.indexOf(k);
				listaKomadaNamestaja.remove(k);
				return idx;
			}
		}
		return -1;
	}
	
	public int clearAll(){
		try{
			listaKomadaNamestaja.clear();
			return 1;
		}
		catch(Exception ex){
			return -1;
		}
	}
	
	public int getCount(){
		return listaKomadaNamestaja.size();
	}
	
	public KomadNamestaja getElement(int i){
		return listaKomadaNamestaja.get(i);
	}
	
	public int findKomadNamestaja(KomadNamestaja kor){
		for(KomadNamestaja k:listaKomadaNamestaja){
			if(k.getSifra().equals(kor.getSifra())){
				return listaKomadaNamestaja.indexOf(k);
			}
		}
		return -1;
	}
*/
}