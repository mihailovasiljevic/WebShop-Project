package beans.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;


public class TreeNode implements Iterable<TreeNode>, Serializable {


	private static final long serialVersionUID = 943391706715027415L;
	
	private String naziv;
    private String opis;
    private TreeNode parent;


	private ArrayList<TreeNode> children;
    
    public TreeNode(){}
    
    public TreeNode(String naziv, String opis, TreeNode parent) {
        this.naziv = naziv;
        this.opis = opis;
        this.parent = parent;
        this.children = new ArrayList<TreeNode>();
    }
    public TreeNode(TreeNode nd) {
        this.naziv = nd.naziv;
        this.opis = nd.opis;
        this.parent = nd.parent;
        this.children = new ArrayList<TreeNode>();
        this.children = nd.children;
    }

    public TreeNode addChild(TreeNode child) {
    	
    	for(TreeNode ch:children){
    		if(ch.naziv.equals(child.getNaziv())){
    			return null;
    		}
    	}
		TreeNode childNode = child;
		childNode.parent = this;
		this.children.add(childNode);
		return this;
    	
    }
    
    public TreeNode removeChild(TreeNode child) {
    	
    	for(TreeNode ch:children){
    		if(ch.naziv.equals(child.getNaziv())){
    			TreeNode childNode = child;
    			this.children.remove(ch);
    			return this;
    		}
    	}
    	return null;
    }
    
    
    public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public TreeNode getParent() {
		return parent;
	}

	public void setParent(TreeNode parent) {
		this.parent = parent;
	}

	public ArrayList<TreeNode> getChildren() {
		return children;
	}

	public void setChildren(ArrayList<TreeNode> children) {
		this.children = children;
	}
	

	@Override
	public Iterator<TreeNode> iterator() {
		// TODO Auto-generated method stub
		return null;
	}

    // other features ...

}