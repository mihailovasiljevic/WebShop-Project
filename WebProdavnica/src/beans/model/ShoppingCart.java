package beans.model;

import java.io.Serializable;
import java.util.ArrayList;


public class ShoppingCart implements Serializable{

	private static final long serialVersionUID = 8628940708514801335L;
	
	private ArrayList<ShoppingCartItemNamestaj> listaNamestaja;
	private ArrayList<ShoppingCartItemUsluga> listaUsluga;
    public ShoppingCart(){}
	

	
	
	public ShoppingCart(ArrayList<ShoppingCartItemNamestaj> listaNamestaja,
			ArrayList<ShoppingCartItemUsluga> listaUsluga) {
		super();
		this.listaNamestaja = new ArrayList<ShoppingCartItemNamestaj>();
		this.listaUsluga = new ArrayList<ShoppingCartItemUsluga>();
		this.listaNamestaja = listaNamestaja;
		this.listaUsluga = listaUsluga;
	}

	public ShoppingCart(ShoppingCart sc) {
		super();
		this.listaNamestaja = new ArrayList<ShoppingCartItemNamestaj>();
		this.listaUsluga = new ArrayList<ShoppingCartItemUsluga>();
		this.listaNamestaja = sc.listaNamestaja;
		this.listaUsluga = sc.listaUsluga;
	}


	public void addNamestaj(KomadNamestaja kn,int brojKn, int popust) {
		if(listaNamestaja != null){
		for(ShoppingCartItemNamestaj sc:listaNamestaja){
			if(sc.getKomadNamestaja().getSifra().equals(kn.getSifra())){
				sc.setBrojKomadaNamestaja(sc.getBrojKomadaNamestaja()+brojKn);
				sc.setKomadNamestaja(kn);
				sc.setPopust(popust);
				return;
			}
		}
		listaNamestaja.add(new ShoppingCartItemNamestaj(kn, brojKn,popust));
		}
	}

	public int addUsluga(DodatneUsluge du, int besplatna) {
		if(listaUsluga != null){
		for(ShoppingCartItemUsluga sc:listaUsluga){
			if(sc.getDodatnaUsluga().getNaziv().equals(du.getNaziv())){
				return -1;
			}
		}
		listaUsluga.add(new ShoppingCartItemUsluga(du,besplatna));
		return 0;
		}
		return -1;
	}
	
	public void removeNamestaj(KomadNamestaja kn){
		for(ShoppingCartItemNamestaj scin:listaNamestaja){
			if(scin.getKomadNamestaja().getSifra().equals(kn.getSifra())){
				listaNamestaja.remove(scin);
				break;
			}
		}
	}
	public void removeUsluga(DodatneUsluge du){
		for(ShoppingCartItemUsluga sciu:listaUsluga){
			if(sciu.getDodatnaUsluga().getNaziv().equals(du.getNaziv())){
				listaUsluga.remove(sciu);
				break;
			}
		}
	}
	
	public void removeAllNamestaj(){
		listaNamestaja.clear();
	}
	public void removeAllUsluge(){
		listaUsluga.clear();
	}




	public ArrayList<ShoppingCartItemNamestaj> getListaNamestaja() {
		return listaNamestaja;
	}




	public void setListaNamestaja(ArrayList<ShoppingCartItemNamestaj> listaNamestaja) {
		this.listaNamestaja = listaNamestaja;
	}




	public ArrayList<ShoppingCartItemUsluga> getListaUsluga() {
		return listaUsluga;
	}

	public void setListaUsluga(ArrayList<ShoppingCartItemUsluga> listaUsluga) {
		this.listaUsluga = listaUsluga;
	}
	

	public double getTotal() {
		double retVal = 0;
		for (ShoppingCartItemNamestaj item : listaNamestaja) {
			retVal += item.getTotal();
		}
		for (ShoppingCartItemUsluga item : listaUsluga) {
			retVal += item.getTotal();
		}
		return retVal;
	}
	

}
