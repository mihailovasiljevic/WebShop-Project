/***********************************************************************
 * Module:  DodatneUsluge.java
 * Author:  Misa
 * Purpose: Defines the Class DodatneUsluge
 ***********************************************************************/

package beans.model;

import java.io.Serializable;
import java.util.ArrayList;

public class DodatneUsluge implements Serializable{

	private static final long serialVersionUID = 6676302885815997715L;

	private String naziv = null;

   private String opis = null;

   private double cena = -1;
   
   ArrayList<String> listaKomadaNamestajaUKojimaJeBesplatna = null;
   
   public DodatneUsluge(){}
   
	public DodatneUsluge(String naziv, String opis, double cena, ArrayList<String> lista) {
		super();
		this.naziv = naziv;
		this.opis = opis;
		this.cena = cena;
		this.listaKomadaNamestajaUKojimaJeBesplatna = lista;
	}
	
	public DodatneUsluge(DodatneUsluge u) {
		super();
		this.naziv = u.naziv;
		this.opis = u.opis;
		this.cena = u.cena;
		this.listaKomadaNamestajaUKojimaJeBesplatna = u.listaKomadaNamestajaUKojimaJeBesplatna;
	}

	public String getNaziv() {
		return naziv;
	}
	
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	
	public String getOpis() {
		return opis;
	}
	
	public void setOpis(String opis) {
		this.opis = opis;
	}
	
	public double getCena() {
		return cena;
	}
	
	public void setCena(double cena) {
		this.cena = cena;
	}

	public ArrayList<String> getListaKomadaNamestajaUKojimaJeBesplatna() {
		return listaKomadaNamestajaUKojimaJeBesplatna;
	}

	public void setListaKomadaNamestajaUKojimaJeBesplatna(
			ArrayList<String> listaKomadaNamestajaUKojimaJeBesplatna) {
		this.listaKomadaNamestajaUKojimaJeBesplatna = listaKomadaNamestajaUKojimaJeBesplatna;
	}
	
	public int addKomadNamestaja(KomadNamestaja kor){
		for(String k:listaKomadaNamestajaUKojimaJeBesplatna){
			if(k.equals(kor.getSifra())){
				return -1;
			}
		}
		listaKomadaNamestajaUKojimaJeBesplatna.add(kor.getSifra());
		return listaKomadaNamestajaUKojimaJeBesplatna.indexOf(kor.getSifra());
	}
	
	public int removeKomadNamestaja(KomadNamestaja kor){
		for(String k:listaKomadaNamestajaUKojimaJeBesplatna){
			if(k.equals(kor.getSifra())){
				int idx = listaKomadaNamestajaUKojimaJeBesplatna.indexOf(k);
				listaKomadaNamestajaUKojimaJeBesplatna.remove(k);
				return idx;
			}
		}
		return -1;
	}
	
	public int clearAll(){
		try{
			listaKomadaNamestajaUKojimaJeBesplatna.clear();
			return 1;
		}
		catch(Exception ex){
			return -1;
		}
	}
	
	public int getCount(){
		return listaKomadaNamestajaUKojimaJeBesplatna.size();
	}
	
	public String getElement(int i){
		return listaKomadaNamestajaUKojimaJeBesplatna.get(i);
	}

}