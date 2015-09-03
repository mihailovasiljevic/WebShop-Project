package beans.model;

import java.io.Serializable;


public class ShoppingCartItemNamestaj implements Serializable{

	private static final long serialVersionUID = 7454972124308727197L;
	
	private KomadNamestaja komadNamestaja;
	private int brojKomadaNamestaja;
	private int popust;
	
	public ShoppingCartItemNamestaj(){}

	public ShoppingCartItemNamestaj(KomadNamestaja komadNamestaja, int brojKomadaNamestaja, int popust) {
		this.komadNamestaja = komadNamestaja;
		this.brojKomadaNamestaja = brojKomadaNamestaja;
		this.popust = popust;
	}
	public ShoppingCartItemNamestaj(ShoppingCartItemNamestaj scin) {
		this.komadNamestaja = scin.komadNamestaja;
		this.brojKomadaNamestaja = scin.brojKomadaNamestaja;
		this.popust = scin.popust;
	}

	public KomadNamestaja getKomadNamestaja() {
		return komadNamestaja;
	}

	public void setKomadNamestaja(KomadNamestaja komadNamestaja) {
		this.komadNamestaja = komadNamestaja;
	}

	public int getBrojKomadaNamestaja() {
		return brojKomadaNamestaja;
	}

	public void setBrojKomadaNamestaja(int brojKomadaNamestaja) {
		this.brojKomadaNamestaja = brojKomadaNamestaja;
	}
	
	
	public int getPopust() {
		return popust;
	}

	public void setPopust(int popust) {
		this.popust = popust;
	}

	public double getTotal(){
		if(popust != -1){
			double p = (double)popust;
			return brojKomadaNamestaja*(komadNamestaja.getJedinicnaCena()*(p/100));
		}
		else
			return brojKomadaNamestaja*komadNamestaja.getJedinicnaCena();
	}
	
	

}
