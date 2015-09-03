package beans.model;

import java.io.Serializable;

public class Video implements Serializable{

	private static final long serialVersionUID = 8587729014523938132L;
	
	private String oznaka;
	private String putanja;
	
	public Video(){}
	public Video(String oznaka, String putanja){
		this.oznaka = oznaka;
		this.putanja = putanja;
	}
	public Video(Video s){
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
