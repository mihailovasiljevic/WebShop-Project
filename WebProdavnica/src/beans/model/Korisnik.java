/***********************************************************************
 * Module:  Korisnik.java
 * Author:  Misa
 * Purpose: Defines the Class Korisnik
 ***********************************************************************/
package beans.model;

import java.io.Serializable;


public class Korisnik implements Serializable{

	private static final long serialVersionUID = -2291482774895236568L;

	private String korisnickoIme = null;

   private String lozinka = null;

   private String ime = null;

   private String prezime = null;

   private String kontaktTelefon = null;

   private String email = null;
   
   private Uloga uloga = null;
   
   private boolean prijavljen = false;
   
   private ShoppingCart shoppingCart = null;
   
   private String putanja = null;

   public String getPutanja() {
	return putanja;
}

public void setPutanja(String putanja) {
	this.putanja = putanja;
}

public ShoppingCart getShoppingCart() {
	   return shoppingCart;
   }

   public void setShoppingCart(ShoppingCart shoppingCart) {
	   this.shoppingCart = shoppingCart;
	}

public boolean isPrijavljen() {
	   return prijavljen;
   }
	
	public void setPrijavljen(boolean prijavljen) {
		this.prijavljen = prijavljen;
	}

public Korisnik(){}
   
   public Korisnik(String korisnickoIme, String lozinka, String ime,
			String prezime, String kontaktTelefon, String email, Uloga uloga, ShoppingCart shoppingCart, String putanja) {
		this.korisnickoIme = korisnickoIme;
		this.lozinka = lozinka;
		this.ime = ime;
		this.prezime = prezime;
		this.kontaktTelefon = kontaktTelefon;
		this.email = email;
		this.uloga = uloga;
		this.shoppingCart = shoppingCart;
		this.putanja = putanja;
	}
	
	public Korisnik(Korisnik k) {
		this.korisnickoIme = k.korisnickoIme;
		this.lozinka = k.lozinka;
		this.ime = k.ime;
		this.prezime = k.prezime;
		this.kontaktTelefon = k.kontaktTelefon;
		this.email = k.email;
		this.uloga = k.uloga;
		this.shoppingCart = k.shoppingCart;
		this.putanja = k.putanja;
	}

	public String getKorisnickoIme() {
		return korisnickoIme;
	}

	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}

	public String getLozinka() {
		return lozinka;
	}

	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public String getKontaktTelefon() {
		return kontaktTelefon;
	}

	public void setKontaktTelefon(String kontaktTelefon) {
		this.kontaktTelefon = kontaktTelefon;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Uloga getUloga() {
		return uloga;
	}

	public void setUloga(Uloga uloga) {
		this.uloga = uloga;
	}

}