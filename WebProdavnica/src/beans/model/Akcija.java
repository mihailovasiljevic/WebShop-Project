package beans.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

public class Akcija implements Serializable{

	private static final long serialVersionUID = -4705298872427905896L;
	
	private Date datumPocetka = null;
	private Date datumZavrsetka = null;
	private int popust = -1;
	private Salon salon = null;
	private ArrayList<String> listaKomadaNamestaja = null;
	private ArrayList<String> listaKategorija = null;
	private String naziv = null;
	
	public Akcija(){}
	
	public Akcija(Date datumPocetka, Date datumZavrsetka, int popust, Salon salon,ArrayList<String> listaKomadaNamestaja,ArrayList<String> listaKategorija, String naziv ){
		this.datumPocetka = datumPocetka;
		this.datumZavrsetka = datumZavrsetka;
		this.popust = popust;
		this.salon = salon;
		this.listaKomadaNamestaja = listaKomadaNamestaja;
		this.listaKategorija = listaKategorija;
		this.naziv = naziv;
	}
	public Akcija(Akcija a){
		this.datumPocetka = a.datumPocetka;
		this.datumZavrsetka = a.datumZavrsetka;
		this.popust = a.popust;
		this.salon = a.salon;
		this.listaKomadaNamestaja = a.listaKomadaNamestaja;
		this.listaKategorija = a.listaKategorija;
		this.naziv = a.naziv;
	}

	public Date getDatumPocetka() {
		return datumPocetka;
	}

	public void setDatumPocetka(Date datumPocetka) {
		this.datumPocetka = datumPocetka;
	}

	public Date getDatumZavrsetka() {
		return datumZavrsetka;
	}

	public void setDatumZavrsetka(Date datumZavrsetka) {
		this.datumZavrsetka = datumZavrsetka;
	}

	public int getPopust() {
		return popust;
	}

	public void setPopust(int popust) {
		this.popust = popust;
	}

	public Salon getSalon() {
		return salon;
	}

	public void setSalon(Salon salon) {
		this.salon = salon;
	}

	public ArrayList<String> getListaKomadaNamestaja() {
		return listaKomadaNamestaja;
	}

	public void setListaKomadaNamestaja(ArrayList<String> listaKomadaNamestaja) {
		this.listaKomadaNamestaja = listaKomadaNamestaja;
	}
	
	public int addKomadNamestaja(KomadNamestaja kor){
		for(String k:listaKomadaNamestaja){
			if(k.equals(kor.getSifra())){
				return -1;
			}
		}
		listaKomadaNamestaja.add(kor.getSifra());
		return listaKomadaNamestaja.indexOf(kor.getSifra());
	}
	
	public int removeKomadNamestaja(KomadNamestaja kor){
		for(String k:listaKomadaNamestaja){
			if(k.equals(kor.getSifra())){
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
	
	public String getElement(int i){
		return listaKomadaNamestaja.get(i);
	}

	public ArrayList<String> getListaKategorija() {
		return listaKategorija;
	}

	public void setListaKategorija(ArrayList<String> listaKategorija) {
		this.listaKategorija = listaKategorija;
	}
	
	public int addKategorija(Kategorija kor){
		for(String k:listaKategorija){
			if(k.equals(kor.getCvor().getNaziv())){
				return -1;
			}
		}
		listaKategorija.add(kor.getCvor().getNaziv());
		return listaKategorija.indexOf(kor.getCvor().getNaziv());
	}
	
	public int removeKategorija(Kategorija kor){
		for(String k:listaKategorija){
			if(k.equals(kor.getCvor().getNaziv())){
				int idx = listaKategorija.indexOf(k);
				listaKategorija.remove(k);
				return idx;
			}
		}
		return -1;
	}
	
	public int clearAllKategorija(){
		try{
			listaKategorija.clear();
			return 1;
		}
		catch(Exception ex){
			return -1;
		}
	}
	
	public int getCountKategorija(){
		return listaKategorija.size();
	}
	
	public String getElementKategorija(int i){
		return listaKategorija.get(i);
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	
	
}
