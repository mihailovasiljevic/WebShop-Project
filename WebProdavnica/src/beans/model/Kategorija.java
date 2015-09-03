/***********************************************************************
 * Module:  Kategorija.java
 * Author:  Misa
 * Purpose: Defines the Class Kategorija
 ***********************************************************************/

package beans.model;

import java.io.Serializable;
import java.util.*;

import beans.repositories.KategorijaRepository;


public class Kategorija implements Serializable{

   private static final long serialVersionUID = 6009102981870254329L;

   private TreeNode cvor;
    
   
   public Kategorija(){}
	public Kategorija(String naziv, String opis, TreeNode parent) {
		super();
		this.cvor = new TreeNode();
		cvor.setNaziv(naziv);
		cvor.setOpis(opis);
		cvor.setChildren(new ArrayList<TreeNode>());
		cvor.setParent(parent);
	}
	
	public Kategorija(Kategorija kat) {
		super();
		this.cvor = new TreeNode();
		cvor.setNaziv(kat.getCvor().getNaziv());
		cvor.setOpis(kat.getCvor().getOpis());
		cvor.setChildren(kat.getCvor().getChildren());
		cvor.setParent(kat.getCvor().getParent());
	}
	public TreeNode getCvor() {
		return cvor;
	}
	public void setCvor(TreeNode cvor) {
		this.cvor = cvor;
	}

}