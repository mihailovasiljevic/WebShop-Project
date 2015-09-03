package beans.model;

import java.io.Serializable;

public class Slika implements Serializable{

	private static final long serialVersionUID = 6746408324620865578L;
	private String oznaka;
	private String putanja;
	
	public Slika(){}
	public Slika(String oznaka, String putanja){
		this.oznaka = oznaka;
		this.putanja = putanja;
	}
	public Slika(Slika s){
		this.oznaka = s.oznaka;
		this.putanja = s.putanja;
	}
	public String getOznaka() {
		return oznaka;
	}
	public void setOznaka(String oznaka) {
		this.oznaka = oznaka;
	}
	public String getPutanja() {
		return putanja;
	}
	public void setPutanja(String putanja) {
		this.putanja = putanja;
	}

}
