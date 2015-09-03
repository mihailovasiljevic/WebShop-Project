package beans.model;

import java.io.Serializable;

public class ShoppingCartItemUsluga implements Serializable{

	private static final long serialVersionUID = -3415140062097379303L;
	
	private DodatneUsluge dodatnaUsluga;
	private int besplatna;
	public ShoppingCartItemUsluga(){}

	public ShoppingCartItemUsluga(DodatneUsluge dodatnaUsluga, int besplatna) {
		this.dodatnaUsluga = dodatnaUsluga;
		this.besplatna = besplatna;

	};
	public ShoppingCartItemUsluga(ShoppingCartItemUsluga sciu) {
		this.dodatnaUsluga = sciu.dodatnaUsluga;
		this.dodatnaUsluga = sciu.dodatnaUsluga;
	}

	public DodatneUsluge getDodatnaUsluga() {
		return dodatnaUsluga;
	}

	public void setDodatnaUsluga(DodatneUsluge dodatnaUsluga) {
		this.dodatnaUsluga = dodatnaUsluga;
	}
	
	
	
	public int getBesplatna() {
		return besplatna;
	}

	public void setBesplatna(int besplatna) {
		this.besplatna = besplatna;
	}

	public double getTotal(){
		double besp = (double)besplatna;
		return besp * dodatnaUsluga.getCena();
	}
	
	

}
