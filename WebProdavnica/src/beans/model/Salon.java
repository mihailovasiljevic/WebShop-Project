/***********************************************************************
 * Module:  Salon.java
 * Author:  Misa
 * Purpose: Defines the Class Salon
 ***********************************************************************/

package beans.model;

import java.io.Serializable;


public class Salon implements Serializable{

	private static final long serialVersionUID = -8146284736241773836L;

	private String naziv = null;

   private String adresa = null;

   private String telefon = null;

   private String email = null;

   private String adresaInternetSajta = null;

   private String pib = null;

   private String maticniBroj = null;

   private String brojZiroRacuna = null;

   public Salon(){}
   
	public Salon(String naziv, String adresa, String telefon, String email,
			String adresaInternetSajta, String pib, String maticniBroj,
			String brojZiroRacuna) {
		super();
		this.naziv = naziv;
		this.adresa = adresa;
		this.telefon = telefon;
		this.email = email;
		this.adresaInternetSajta = adresaInternetSajta;
		this.pib = pib;
		this.maticniBroj = maticniBroj;
		this.brojZiroRacuna = brojZiroRacuna;
	}
   
	public Salon(Salon s) {
		super();
		this.naziv = s.naziv;
		this.adresa = s.adresa;
		this.telefon = s.telefon;
		this.email = s.email;
		this.adresaInternetSajta = s.adresaInternetSajta;
		this.pib = s.pib;
		this.maticniBroj = s.maticniBroj;
		this.brojZiroRacuna = s.brojZiroRacuna;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getAdresa() {
		return adresa;
	}

	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}

	public String getTelefon() {
		return telefon;
	}

	public void setTelefon(String telefon) {
		this.telefon = telefon;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAdresaInternetSajta() {
		return adresaInternetSajta;
	}

	public void setAdresaInternetSajta(String adresaInternetSajta) {
		this.adresaInternetSajta = adresaInternetSajta;
	}

	public String getPib() {
		return pib;
	}

	public void setPib(String pib) {
		this.pib = pib;
	}

	public String getMaticniBroj() {
		return maticniBroj;
	}

	public void setMaticniBroj(String maticniBroj) {
		this.maticniBroj = maticniBroj;
	}

	public String getBrojZiroRacuna() {
		return brojZiroRacuna;
	}

	public void setBrojZiroRacuna(String brojZiroRacuna) {
		this.brojZiroRacuna = brojZiroRacuna;
	}
   

}