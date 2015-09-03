
function doOnTextChange()
{

	var komadiNamestaja = [];
		/*DOVUCI KOMADE NAMESTAJA*/
		$.ajaxSetup({async:false});
		$.ajax({
			  url: "../table",
			  type: 'get',

			  data: {
			   tabelaPodaci:JSON.stringify({
			  	 parametar:"komadiNamestaja"
			   }),    
			   cache: false,
			   dataType:'json'
			},
			  success: function (data, status) {
			    console.log(data);
			    console.log(status);
			  },
			  error: function (xhr, desc, err) {
			    console.log(xhr);
			  },
			}).done(
				function(data){
		          komadiNamestaja = JSON.parse(data);
				});
		$.ajaxSetup({async:true});
		/*PRONADJI KOMADE NAMESTAJA KOJI SU NA AKCIJI*/

	listaFiltera = [];
	tmpList = [];
	prenosnaListaKomadaNamestaj = [];

	for(var i = 0; i < komadiNamestaja.KomadiNamestaja.length;i++){
		prenosnaListaKomadaNamestaj.push(komadiNamestaja.KomadiNamestaja[i]);
	}
    pokupiStringove();
    pronadjiUListi();
    ispisiKomadeNamestaja();
}
function pokupiStringove()
{
	listaFiltera = [];
    listaFiltera.push($("#naziv_kn_input").val());
    listaFiltera.push($("#cena_od_kn_input").val());
    listaFiltera.push($("#cena_do_kn_input").val());
    listaFiltera.push($("#kolicina_kn_input").val());
    listaFiltera.push($("#kategorija_kn_input").val());
    listaFiltera.push($("#zemlja_kn_input").val());
    listaFiltera.push($("#godina_kn_input").val());
    listaFiltera.push($("#boja_kn_input").val());
    listaFiltera.push($("#nazivp_kn_input").val());

}

function pronadjiUListi()
{
    var prazni = 0;
    for (var i = 0; i < listaFiltera.length; i++)
    {
    	tmpList = [];
        if (listaFiltera[i] != (""))
        {
            
            //ako je 0 znaci da je u pitanju resurs
            switch (i)
            {
                case 0:
	                	if(prenosnaListaKomadaNamestaj == 0){
	                        for(var j = 0; j < komadiNamestaja.KomadiNamestaja.length; j++){
	                        	if(komadiNamestaja.KomadiNamestaja[j].naziv.toUpperCase().includes(listaFiltera[i].toUpperCase())){
	                        		tmpList.push(komadiNamestaja.KomadiNamestaja[j]);
	                        	}
	                        }
	            		}else{
	                        for(var j = 0; j < prenosnaListaKomadaNamestaj.length; j++){
	                        	if(prenosnaListaKomadaNamestaj[j].naziv.toUpperCase().includes(listaFiltera[i].toUpperCase())){
	                        		tmpList.push(prenosnaListaKomadaNamestaj[j]);
	                        	}
	                        }
	            		}
	                	prenosnaListaKomadaNamestaj = [];
                        for (var j = 0; j < tmpList.length; j++)
                        {
                        	prenosnaListaKomadaNamestaj.push(tmpList[j]);
                        }
                        if(prenosnaListaKomadaNamestaj.length == 0)
                        	return;
                        break;
                case 1:
                	if(prenosnaListaKomadaNamestaj == 0){
                        for(var j = 0; j < komadiNamestaja.KomadiNamestaja.length; j++){
                        	if((komadiNamestaja.KomadiNamestaja[j].jedinicnaCena >= listaFiltera[i])==true){
                        		tmpList.push(komadiNamestaja.KomadiNamestaja[j]);
                        	}
                        }
            		}else{
                        for(var j = 0; j < prenosnaListaKomadaNamestaj.length; j++){
                        	if((prenosnaListaKomadaNamestaj[j].jedinicnaCena >= listaFiltera[i])==true){
                        		tmpList.push(prenosnaListaKomadaNamestaj[j]);
                        	}
                        }
            		}
                	prenosnaListaKomadaNamestaj = [];
                    for (var j = 0; j < tmpList.length; j++)
                    {
                        prenosnaListaKomadaNamestaj.push(tmpList[j]);
                    }
                    if(prenosnaListaKomadaNamestaj.length == 0)
                    	return;
                    break;
                case 2:
                	if(prenosnaListaKomadaNamestaj == 0){
                        for(var j = 0; j < komadiNamestaja.KomadiNamestaja.length; j++){
                        	if((komadiNamestaja.KomadiNamestaja[j].jedinicnaCena <= listaFiltera[i])==true){
                        		tmpList.push(komadiNamestaja.KomadiNamestaja[j]);
                        	}
                        }
            		}else{
                        for(var j = 0; j < prenosnaListaKomadaNamestaj.length; j++){
                        	if((prenosnaListaKomadaNamestaj[j].jedinicnaCena <= listaFiltera[i])==true){
                        		tmpList.push(prenosnaListaKomadaNamestaj[j]);
                        	}
                        }
            		}
                	prenosnaListaKomadaNamestaj = [];
                    for (var j = 0; j < tmpList.length; j++)
                    {
                        prenosnaListaKomadaNamestaj.push(tmpList[j]);
                    }
                    if(prenosnaListaKomadaNamestaj.length == 0)
                    	return;
                    break;
                case 3:
                	if(prenosnaListaKomadaNamestaj == 0){
                        for(var j = 0; j < komadiNamestaja.KomadiNamestaja.length; j++){
                        	if((komadiNamestaja.KomadiNamestaja[j].kolicinaUMagacinu >= listaFiltera[i])==true){
                        		tmpList.push(komadiNamestaja.KomadiNamestaja[j]);
                        	}
                        }
            		}else{
                        for(var j = 0; j < prenosnaListaKomadaNamestaj.length; j++){
                        	if((prenosnaListaKomadaNamestaj[j].kolicinaUMagacinu >=listaFiltera[i])==true){
                        		tmpList.push(prenosnaListaKomadaNamestaj[j]);
                        	}
                        }
            		}
                	prenosnaListaKomadaNamestaj = [];
                    for (var j = 0; j < tmpList.length; j++)
                    {
                        prenosnaListaKomadaNamestaj.push(tmpList[j]);
                    }
                    if(prenosnaListaKomadaNamestaj.length == 0)
                    	return;
                    break;
                case 4:
                	if(prenosnaListaKomadaNamestaj == 0){
                        for(var j = 0; j < komadiNamestaja.KomadiNamestaja.length; j++){
                        	if(komadiNamestaja.KomadiNamestaja[j].kategorija == listaFiltera[i]){
                        		tmpList.push(komadiNamestaja.KomadiNamestaja[j]);
                        	}
                        }
            		}else{
                        for(var j = 0; j < prenosnaListaKomadaNamestaj.length; j++){
                        	if(prenosnaListaKomadaNamestaj[j].kategorija ==listaFiltera[i]){
                        		tmpList.push(prenosnaListaKomadaNamestaj[j]);
                        	}
                        }
            		}
                	prenosnaListaKomadaNamestaj = [];
                    for (var j = 0; j < tmpList.length; j++)
                    {
                        prenosnaListaKomadaNamestaj.push(tmpList[j]);
                    }
                    if(prenosnaListaKomadaNamestaj.length == 0)
                    	return;
                    break;
                case 5:
                	if(prenosnaListaKomadaNamestaj == 0){
                        for(var j = 0; j < komadiNamestaja.KomadiNamestaja.length; j++){
                        	if(komadiNamestaja.KomadiNamestaja[j].zemljaProizvodnje == listaFiltera[i]){
                        		tmpList.push(komadiNamestaja.KomadiNamestaja[j]);
                        	}
                        }
            		}else{
                        for(var j = 0; j < prenosnaListaKomadaNamestaj.length; j++){
                        	if(prenosnaListaKomadaNamestaj[j].zemljaProizvodnje ==listaFiltera[i]){
                        		tmpList.push(prenosnaListaKomadaNamestaj[j]);
                        	}
                        }
            		}
                	prenosnaListaKomadaNamestaj = [];
                    for (var j = 0; j < tmpList.length; j++)
                    {
                        prenosnaListaKomadaNamestaj.push(tmpList[j]);
                    }
                    if(prenosnaListaKomadaNamestaj.length == 0)
                    	return;
                    break;
                case 6:
                	if(prenosnaListaKomadaNamestaj == 0){
                        for(var j = 0; j < komadiNamestaja.KomadiNamestaja.length; j++){
                        	if(komadiNamestaja.KomadiNamestaja[j].godinaProizvodnje == listaFiltera[i]){
                        		tmpList.push(komadiNamestaja.KomadiNamestaja[j]);
                        	}
                        }
            		}else{
                        for(var j = 0; j < prenosnaListaKomadaNamestaj.length; j++){
                        	if(prenosnaListaKomadaNamestaj[j].godinaProizvodnje ==listaFiltera[i]){
                        		tmpList.push(prenosnaListaKomadaNamestaj[j]);
                        	}
                        }
            		}
                	prenosnaListaKomadaNamestaj = [];
                    for (var j = 0; j < tmpList.length; j++)
                    {
                        prenosnaListaKomadaNamestaj.push(tmpList[j]);
                    }
                    if(prenosnaListaKomadaNamestaj.length == 0)
                    	return;
                    break;
                case 7:
                	if(prenosnaListaKomadaNamestaj == 0){
                        for(var j = 0; j < komadiNamestaja.KomadiNamestaja.length; j++){
                        	if(komadiNamestaja.KomadiNamestaja[j].boja == listaFiltera[i]){
                        		tmpList.push(komadiNamestaja.KomadiNamestaja[j]);
                        	}
                        }
            		}else{
                        for(var j = 0; j < prenosnaListaKomadaNamestaj.length; j++){
                        	if(prenosnaListaKomadaNamestaj[j].boja ==listaFiltera[i]){
                        		tmpList.push(prenosnaListaKomadaNamestaj[j]);
                        	}
                        }
            		}
                	prenosnaListaKomadaNamestaj = [];
                    for (var j = 0; j < tmpList.length; j++)
                    {
                        prenosnaListaKomadaNamestaj.push(tmpList[j]);
                    }
                    if(prenosnaListaKomadaNamestaj.length == 0)
                    	return;
                    break;
            }
        }
    }
}

function ispisiKomadeNamestaja(){
	$("#content").children().remove();
	$("#body").find(".tabela_sa_podacima_o_kupovini").remove();
	if(prenosnaListaKomadaNamestaj.length == 0){
		$("#content").append("<div style='color:#FF0000;border:#FF0000; background-color:#FFCCFF;font-family:Raleway-Light;font-weight:bold;font-size:32px'>Ne postoje komadi nameštaja za zadatu pretragu.</div>");
	}
	else{
		for(var i = 0; i < prenosnaListaKomadaNamestaj.length; i++){
			if(prenosnaListaKomadaNamestaj[i].kolicinaUMagacinu>0){
				var showDivs = "";
				var slikica = "";
				if(prenosnaListaKomadaNamestaj[i].slika == "nema"){
					slikica="";
				}else{
					slikica = prenosnaListaKomadaNamestaj[i].slika;
				}
				showDivs = "<div><img src='"+slikica+"' /> <p class='kn_title'>"+prenosnaListaKomadaNamestaj[i].naziv+"</p>";
				showDivs += "<img src='images/akcija_icon.png' class='akcija' style='visibility:visible'/>";
				showDivs += "<p class='kn_cena'>Cena: <strong style='color:red'>"+prenosnaListaKomadaNamestaj[i].jedinicnaCena.toFixed(2)+"</strong> din</p>";
				showDivs += "<button type='button' class='kn_opsirnije' value='"+prenosnaListaKomadaNamestaj[i].sifra+"'>opširnije</button>";
				showDivs += "<button type='button' class='kn_kupi' value='"+prenosnaListaKomadaNamestaj[i].sifra+"'>U korpu</button></div>";
				$("#content").append(showDivs);
			}
			if(prenosnaListaKomadaNamestaj[i].kolicinaUMagacinu==0 && prenosnaListaKomadaNamestaj.length == 1){
				$("#content").append("<div style='color:#FF0000;border:#FF0000; background-color:#FFCCFF;font-family:Raleway-Light;font-weight:bold;font-size:32px'>Ne postoje komadi nameštaja za zadatu pretragu.</div>");
			}
		}
	}
	
	ispuniPolja();
	//obrisi korisnika
	$(".obrisi_korisnika").click(
    			function(){
    				obrisiDodatnuUslugu($(this));
    			}	
    		);
	
	
	
	
	//izmeni korisnika
	$(".izmeni_korisnika").click(
			function(){
				izmeniDodatnuUslugu($(this));
				}
			);
	
	
	
	
	
	//dogadjaj na dodavanje korisnika
	$(".dodaj_korisnika").click(
		function(){
				dodajDodatnuUslugu();
		}		
	);
	
	
}