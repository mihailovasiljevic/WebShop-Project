/***********************************************************************
 * Module:  Racun.java
 * Author:  Misa
 * Purpose: Defines the Class Racun
 ***********************************************************************/

package beans.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;


public class Racun implements Serializable{


	private static final long serialVersionUID = 3955604226584573946L;
	
	private int oznaka = -1;
	
	private double porez = -1;

   private double ukupnaCena = 0;

   private Date datum = null;

   private String vreme = null;

   public Korisnik korisnik;
   
   public ArrayList<KomadNamestaja> listaKupljenogNamestaja = null;

   public ArrayList<DodatneUsluge> listaDodatnihUsluga = null;

   public Racun(){}
   
	public Racun(double porez, double ukupnaCena, Date datum, String vreme,
			Korisnik korisnik, ArrayList<KomadNamestaja> kupljeniNamestaj,
			ArrayList<DodatneUsluge> dodatneUsluge, int oznaka) {
		super();
		this.porez = porez;
		this.ukupnaCena = ukupnaCena;
		this.datum = datum;
		this.vreme = vreme;
		this.korisnik = korisnik;
		this.listaKupljenogNamestaja = kupljeniNamestaj;
		this.listaDodatnihUsluga = dodatneUsluge;
		this.oznaka = oznaka;
	}
	
	public Racun(Racun r) {
		super();
		this.porez = r.porez;
		this.ukupnaCena = r.ukupnaCena;
		this.datum = r.datum;
		this.vreme = r.vreme;
		this.korisnik = r.korisnik;
		this.listaKupljenogNamestaja = r.listaKupljenogNamestaja;
		this.listaDodatnihUsluga = r.listaDodatnihUsluga;
		this.oznaka = r.oznaka;
	}

	public int getOznaka() {
		return oznaka;
	}

	public void setOznaka(int oznaka) {
		this.oznaka = oznaka;
	}

	public double getPorez() {
		return porez;
	}

	public void setPorez(double porez) {
		this.porez = porez;
	}

	public double getUkupnaCena() {
		return ukupnaCena;
	}

	public void setUkupnaCena(double ukupnaCena) {
		this.ukupnaCena = ukupnaCena;
	}

	public Date getDatum() {
		return datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}

	public String getVreme() {
		return vreme;
	}

	public void setVreme(String vreme) {
		this.vreme = vreme;
	}

	public Korisnik getKorisnik() {
		return korisnik;
	}

	public void setKorisnik(Korisnik korisnik) {
		this.korisnik = korisnik;
	}

	public ArrayList<KomadNamestaja> getKupljeniNamestaj() {
		return listaKupljenogNamestaja;
	}

	public void setKupljeniNamestaj(ArrayList<KomadNamestaja> kupljeniNamestaj) {
		this.listaKupljenogNamestaja = kupljeniNamestaj;
	}

	public ArrayList<DodatneUsluge> getDodatneUsluge() {
		return listaDodatnihUsluga;
	}

	public void setDodatneUsluge(ArrayList<DodatneUsluge> dodatneUsluge) {
		this.listaDodatnihUsluga = dodatneUsluge;
	}
	
	public int addKomadNamestaja(KomadNamestaja kor){
		for(KomadNamestaja k:listaKupljenogNamestaja){
			if(k.getSifra().equals(kor.getSifra())){
				return -1;
			}
		}
		listaKupljenogNamestaja.add(kor);
		return listaKupljenogNamestaja.indexOf(kor);
	}
	
	public int removeKomadNamestaja(KomadNamestaja kor){
		for(KomadNamestaja k:listaKupljenogNamestaja){
			if(k.getSifra().equals(kor.getSifra())){
				int idx = listaKupljenogNamestaja.indexOf(k);
				listaKupljenogNamestaja.remove(k);
				return idx;
			}
		}
		return -1;
	}
	
	public int clearAllKomadiNamestaja(){
		try{
			listaKupljenogNamestaja.clear();
			return 1;
		}
		catch(Exception ex){
			return -1;
		}
	}
	
	public int getCountKomadiNamestaja(){
		return listaKupljenogNamestaja.size();
	}
	
	public KomadNamestaja getElementKomadiNamestaja(int i){
		return listaKupljenogNamestaja.get(i);
	}
	
	public int findKomadNamestaja(KomadNamestaja kor){
		for(KomadNamestaja k:listaKupljenogNamestaja){
			if(k.getSifra().equals(kor.getSifra())){
				return listaKupljenogNamestaja.indexOf(k);
			}
		}
		return -1;
	}
	
	
	public int addDodatnaUsluga(DodatneUsluge du){
		for(DodatneUsluge k:listaDodatnihUsluga){
			if(k.getNaziv().equals(du.getNaziv())){
				return -1;
			}
		}
		listaDodatnihUsluga.add(du);
		return listaDodatnihUsluga.indexOf(du);
	}
	
	public int removeDodatnaUsluga(DodatneUsluge du){
		for(DodatneUsluge k:listaDodatnihUsluga){
			if(k.getNaziv().equals(du.getNaziv())){
				int idx = listaDodatnihUsluga.indexOf(k);
				listaDodatnihUsluga.remove(k);
				return idx;
			}
		}
		return -1;
	}
	
	public int clearAllDodatneUsluge(){
		try{
			listaDodatnihUsluga.clear();
			return 1;
		}
		catch(Exception ex){
			return -1;
		}
	}
	
	public int getCountDodatneUsluge(){
		return listaDodatnihUsluga.size();
	}
	
	public DodatneUsluge getElement(int i){
		return listaDodatnihUsluga.get(i);
	}
	
	public int findDodatnaUsluga(DodatneUsluge du){
		for(DodatneUsluge k:listaDodatnihUsluga){
			if(k.getNaziv().equals(du.getNaziv())){
				return listaDodatnihUsluga.indexOf(k);
			}
		}
		return -1;
	}
   
   
}