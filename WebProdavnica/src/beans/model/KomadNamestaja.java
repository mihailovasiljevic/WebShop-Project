/***********************************************************************
 * Module:  KomadNamestaja.java
 * Author:  Misa
 * Purpose: Defines the Class KomadNamestaja
 ***********************************************************************/

package beans.model;

import java.io.Serializable;
import java.util.*;


public class KomadNamestaja implements Serializable{

   private static final long serialVersionUID = 7409418403472597681L;

   private String sifra = null;

   private String naziv = null;

   private String boja = null;

   private String zemljaProizvodnje = null;

   private String nazivProizvodjaca = null;

   private double jedinicnaCena =  -1;

   private int kolicinaUMagacinu = -1;

   private int godinaProizvodnje = -1;


   
   private Kategorija kategorija;
   private Salon salon;
   
   private Slika slika = null;
   private Video video = null;
   
   public KomadNamestaja(){}
   
	public KomadNamestaja(String sifra, String naziv, String boja,
			String zemljaProizvodnje, String nazivProizvodjaca,
			double jedinicnaCena, int kolicinaUMagacinu, int godinaProizvodnje,
			 Kategorija kategorija,
			Slika slika ,Video video, Salon salon) {
		super();
		this.sifra = sifra;
		this.naziv = naziv;
		this.boja = boja;
		this.zemljaProizvodnje = zemljaProizvodnje;
		this.nazivProizvodjaca = nazivProizvodjaca;
		this.jedinicnaCena = jedinicnaCena;
		this.kolicinaUMagacinu = kolicinaUMagacinu;
		this.godinaProizvodnje = godinaProizvodnje;

		this.kategorija = kategorija;
		this.slika = slika;
		this.video = video;
		this.salon = salon;
	}
	public KomadNamestaja(String sifra, String naziv, String boja,
			String zemljaProizvodnje, String nazivProizvodjaca,
			double jedinicnaCena, int kolicinaUMagacinu, int godinaProizvodnje, Kategorija kategorija, Salon salon) {
		super();
		this.sifra = sifra;
		this.naziv = naziv;
		this.boja = boja;
		this.zemljaProizvodnje = zemljaProizvodnje;
		this.nazivProizvodjaca = nazivProizvodjaca;
		this.jedinicnaCena = jedinicnaCena;
		this.kolicinaUMagacinu = kolicinaUMagacinu;
		this.godinaProizvodnje = godinaProizvodnje;
	
		this.kategorija = kategorija;
		this.slika = null;
		this.video = null;
		this.salon = salon;
	}
	public KomadNamestaja(KomadNamestaja kom) {
		super();
		this.sifra = kom.sifra;
		this.naziv = kom.naziv;
		this.boja = kom.boja;
		this.zemljaProizvodnje = kom.zemljaProizvodnje;
		this.nazivProizvodjaca = kom.nazivProizvodjaca;
		this.jedinicnaCena = kom.jedinicnaCena;
		this.kolicinaUMagacinu = kom.kolicinaUMagacinu;
		this.godinaProizvodnje = kom.godinaProizvodnje;
	
		this.kategorija = kom.kategorija;
		this.slika = kom.slika;
		this.video = kom.video;
		this.salon = kom.salon;
	}

	public String getSifra() {
		return sifra;
	}

	public void setSifra(String sifra) {
		this.sifra = sifra;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getBoja() {
		return boja;
	}

	public void setBoja(String boja) {
		this.boja = boja;
	}

	public String getZemljaProizvodnje() {
		return zemljaProizvodnje;
	}

	public void setZemljaProizvodnje(String zemljaProizvodnje) {
		this.zemljaProizvodnje = zemljaProizvodnje;
	}

	public String getNazivProizvodjaca() {
		return nazivProizvodjaca;
	}

	public void setNazivProizvodjaca(String nazivProizvodjaca) {
		this.nazivProizvodjaca = nazivProizvodjaca;
	}

	public double getJedinicnaCena() {
		return jedinicnaCena;
	}

	public void setJedinicnaCena(double jedinicnaCena) {
		this.jedinicnaCena = jedinicnaCena;
	}

	public int getKolicinaUMagacinu() {
		return kolicinaUMagacinu;
	}

	public void setKolicinaUMagacinu(int kolicinaUMagacinu) {
		this.kolicinaUMagacinu = kolicinaUMagacinu;
	}

	public int getGodinaProizvodnje() {
		return godinaProizvodnje;
	}

	public void setGodinaProizvodnje(int godinaProizvodnje) {
		this.godinaProizvodnje = godinaProizvodnje;
	}



	public Kategorija getKategorija() {
		return kategorija;
	}

	public void setKategorija(Kategorija kategorija) {
		this.kategorija = kategorija;
	}


	public Slika getSlika() {
		return slika;
	}

	public void setSlika(Slika slika) {
		this.slika = slika;
	}

	public Video getVideo() {
		return video;
	}

	public void setVideo(Video video) {
		this.video = video;
	}

	public Salon getSalon() {
		return salon;
	}

	public void setSalon(Salon salon) {
		this.salon = salon;
	}
   
   
   
   
}