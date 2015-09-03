function ispuniPolja(){
	/*DOVUCI KATEGORIJE*/
	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../table",
		  type: 'get',

		  data: {
		   tabelaPodaci:JSON.stringify({
		  	 parametar:"kategorije"
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
		}).done(function(data){
	    	kategorije = JSON.parse(data);
		});
	$.ajaxSetup({async:true});
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
	/*popuni selekciju za kategorije*/
	var kategorijeSelectItems = "";
	kategorijeSelectItems += "<option value=''>";
	kategorijeSelectItems += "";
	kategorijeSelectItems += "</option>";
	for(var j = 0; j < kategorije.Kategorije.length; j++){
		for(var i = 0; i < kategorije.Kategorije[j].length; i++){
			kategorijeSelectItems += "<option value='"+kategorije.Kategorije[j][i].naziv+"'>";
			kategorijeSelectItems += kategorije.Kategorije[j][i].naziv;
			kategorijeSelectItems += "</option>";
		}
	}
	$("#kategorija_kn_input").append(kategorijeSelectItems);
	var zemljaSelectItems = "";
	var godinaSelectItems = "";
	var bojaSelectItems = "";
	var npSelectItems = "";
	zemljaSelectItems += "<option value=''>";
	zemljaSelectItems += "";
	zemljaSelectItems += "</option>";
	godinaSelectItems += "<option value=''>";
	godinaSelectItems += "";
	godinaSelectItems += "</option>";
	bojaSelectItems += "<option value=''>";
	bojaSelectItems += "";
	bojaSelectItems += "</option>";
	npSelectItems += "<option value=''>";
	npSelectItems += "";
	npSelectItems += "</option>";
	
	for(var i = 0; i < komadiNamestaja.KomadiNamestaja.length; i++){
		zemljaSelectItems += "<option value='"+komadiNamestaja.KomadiNamestaja[i].zemljaProizvodnje+"'>";
		zemljaSelectItems += komadiNamestaja.KomadiNamestaja[i].zemljaProizvodnje;
		zemljaSelectItems += "</option>";	
		
		godinaSelectItems += "<option value='"+komadiNamestaja.KomadiNamestaja[i].godinaProizvodnje+"'>";
		godinaSelectItems += komadiNamestaja.KomadiNamestaja[i].godinaProizvodnje;
		godinaSelectItems += "</option>";
		
		bojaSelectItems += "<option value='"+komadiNamestaja.KomadiNamestaja[i].boja+"'>";
		bojaSelectItems += komadiNamestaja.KomadiNamestaja[i].boja;
		bojaSelectItems += "</option>";
		
		npSelectItems += "<option value='"+komadiNamestaja.KomadiNamestaja[i].nazivProizvodjaca+"'>";
		npSelectItems += komadiNamestaja.KomadiNamestaja[i].nazivProizvodjaca;
		npSelectItems += "</option>";
		
		
	}
	$("#zemlja_kn_input").append(zemljaSelectItems);
	$("#godina_kn_input").append(godinaSelectItems);
	$("#boja_kn_input").append(bojaSelectItems);
	$("#nazivp_kn_input").append(npSelectItems);
	
}

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
	$('#content').children().remove();
	$('#content').append("<div id='komadiNamestaja_container'><div id='table_container'></div></div>");
	$('#content').hide();
	$('#content').fadeIn(1000);
	//alert("Data: "+data);

	// kreiraj tabelu i prikazi je na stranici
	$('#table_container').append("<table class='paginated'></table>");
	$('.paginated').append("<thead class='table_head'></thead>");
	$('.paginated').append("<tbody class='table_body'></tbody>");
	var theadContentString = "<tr><th>Sifra</th><th>Naziv</th>";
	theadContentString += "<th>Boja</th><th>Zemlja proizvodnje</th><th>Prozvođač</th>";
	theadContentString += "<th>Jedinična cena</th><th>Količina u magacinu</th>";
	theadContentString += "<th>Kategorija nameštaja</th><th>Godina proizvodnje</th>";
	theadContentString += "<th>Salon</th><th>Slika</th><th>Video</th>";
	theadContentString += "<th></th><th></th><th></th><th></th><th><button type='button' class='dodaj_korisnika'></button></th>";
	$('.table_head').append(theadContentString);
	theadContentString = null;
	for(var i = 0; i < prenosnaListaKomadaNamestaj.length; i++){
		var spanClass="";
		var tbodyContentString = "<tr><td>"+prenosnaListaKomadaNamestaj[i].sifra+"</td><td>"+prenosnaListaKomadaNamestaj[i].naziv;
		tbodyContentString += "</td><td>"+prenosnaListaKomadaNamestaj[i].boja+"</td><td>"+prenosnaListaKomadaNamestaj[i].zemljaProizvodnje;
		tbodyContentString += "</td><td>"+prenosnaListaKomadaNamestaj[i].nazivProizvodjaca+"</td><td>"+prenosnaListaKomadaNamestaj[i].jedinicnaCena;
		tbodyContentString += "</td><td>"+prenosnaListaKomadaNamestaj[i].kolicinaUMagacinu+"</td><td>";
		tbodyContentString += prenosnaListaKomadaNamestaj[i].kategorija+"</td>";
		tbodyContentString += "<td>"+prenosnaListaKomadaNamestaj[i].godinaProizvodnje+"</td>";
		tbodyContentString += "<td>"+prenosnaListaKomadaNamestaj[i].salon+"</td>";
		tbodyContentString += "<td><img src='"+prenosnaListaKomadaNamestaj[i].slika+"' width='64px' height='64px' alt='"+prenosnaListaKomadaNamestaj[i].sifra+"'/></td>";
		tbodyContentString += "<td>"+"ima"+"</td>";//komadiNamestaja.KomadiNamestaja[i].video
		tbodyContentString += "<td><input type='hidden' value='"+komadiNamestaja.KomadiNamestaja[i].sifra+"' id='"+prenosnaListaKomadaNamestaj[i].sifra+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+prenosnaListaKomadaNamestaj[i].sifra+"'></button></td>";
		tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+prenosnaListaKomadaNamestaj[i].sifra+"'></button></td></tr>";
		$('.table_body').append(tbodyContentString);
		tbodyContentString = "";
	}
	paginacija();
	$('#content').append("<div id='pretragaKomadaNamestaja'></div>");
	var stringForAppend = "<p class='title'>Pretraga komada nameštaja</p> <label for='naziv_kn_input' class='naziv_kn_label'>Naziv:</label> <input type='text' id='naziv_kn_input' /> <label for='cena_od_kn_input' class='cena_od_kn_label'>Cena od:</label> <input type='number' id='cena_od_kn_input' value='0' min='0'/> <label for='cena_do_kn_input' class='cena_do_kn_label'>Cena do:</label> <input type='number' id='cena_do_kn_input' min='0'/> <label for='kolicina_kn_input' class='kolicina_kn_label'>Količina:</label> <input type='number' id='kolicina_kn_input' value='0' min='0'/> <label for='kategorija_kn_input' class='kategorija_kn_label'>Kategorija:</label> <select id='kategorija_kn_input'></select> <label for='zemlja_kn_input' class='zemlja_kn_label'>Zemlja proizvodnje:</label> <select id='zemlja_kn_input'></select> <label for='godina_kn_input' class='godina_kn_label'>Godina proizvodnje:</label> <select id='godina_kn_input'></select> <label for='boja_kn_input' class='godina_kn_label'>Boja:</label> <select id='boja_kn_input'></select> <label for='nazivp_kn_input' class='nazivp_kn_label'>Naziv proizvođača:</label> <select id='nazivp_kn_input'></select> <button type='button' class='trazi'>traži</button>";
	$('#pretragaKomadaNamestaja').append(stringForAppend);
	ispuniPolja();
	$(".trazi").click(
			function(){
				doOnTextChange();
			}
	);
	//obrisi komad namestaja
	$(".obrisi_korisnika").click(
    			function(){
    				obrisiKomadNamestaja($(this));
    			}	
    		);
	
	
	
	
	//izmeni komad namestaja
	$(".izmeni_korisnika").click(
			function(){
				izmeniKomadNamestaja($(this));
				}
			);
	
	
	
	
	
	//dogadjaj na dodavanje komada namestaja
	$(".dodaj_korisnika").click(
		function(){
				dodajKomadNamestaja();
		}		
	);
}







/*DODATNE*/


function doOnTextChangeDodatne()
{

	var dodatneUsluge = [];
		/*DOVUCI DODATNE USLUGE NAMESTAJA*/
  	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../table",
		  type: 'get',

		  data: {
		   tabelaPodaci:JSON.stringify({
		  	 parametar:"dodatneUsluge"
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
		          dodatneUsluge = JSON.parse(data);
				});
		$.ajaxSetup({async:true});
		/*PRONADJI KOMADE NAMESTAJA KOJI SU NA AKCIJI*/

	listaFiltera = [];
	tmpList = [];
	prenosnaListaDodatnihUsluga = [];

	for(var i = 0; i < dodatneUsluge.DodatneUsluge.length;i++){
		prenosnaListaDodatnihUsluga.push(dodatneUsluge.DodatneUsluge[i]);
	}
    pokupiStringoveDodatne();
    pronadjiUListiDodatne();
    ispisiDodatneUsluge();
}
function pokupiStringoveDodatne()
{
	listaFiltera = [];
    listaFiltera.push($("#naziv_kn_input").val());
    listaFiltera.push($("#cena_od_kn_input").val());
}

function pronadjiUListiDodatne()
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
	                	if(prenosnaListaDodatnihUsluga == 0){
	                        for(var j = 0; j < dodatneUsluge.DodatneUsluge.length; j++){
	                        	if(dodatneUsluge.DodatneUsluge[j].naziv.toUpperCase().includes(listaFiltera[i].toUpperCase())){
	                        		tmpList.push(komadiNamestaja.KomadiNamestaja[j]);
	                        	}
	                        }
	            		}else{
	                        for(var j = 0; j < prenosnaListaDodatnihUsluga.length; j++){
	                        	if(prenosnaListaDodatnihUsluga[j].naziv.toUpperCase().includes(listaFiltera[i].toUpperCase())){
	                        		tmpList.push(prenosnaListaDodatnihUsluga[j]);
	                        	}
	                        }
	            		}
	                	prenosnaListaDodatnihUsluga = [];
                        for (var j = 0; j < tmpList.length; j++)
                        {
                        	prenosnaListaDodatnihUsluga.push(tmpList[j]);
                        }
                        if(prenosnaListaDodatnihUsluga.length == 0)
                        	return;
                        break;
                case 1:
                	if(prenosnaListaDodatnihUsluga == 0){
                        for(var j = 0; j < dodatneUsluge.DodatneUsluge.length; j++){
                        	if(dodatneUsluge.DodatneUsluge[j].opis.toUpperCase().includes(listaFiltera[i].toUpperCase())){
                        		tmpList.push(komadiNamestaja.KomadiNamestaja[j]);
                        	}
                        }
            		}else{
                        for(var j = 0; j < prenosnaListaDodatnihUsluga.length; j++){
                        	if(prenosnaListaDodatnihUsluga[j].opis.toUpperCase().includes(listaFiltera[i].toUpperCase())){
                        		tmpList.push(prenosnaListaDodatnihUsluga[j]);
                        	}
                        }
            		}
                	prenosnaListaDodatnihUsluga = [];
                    for (var j = 0; j < tmpList.length; j++)
                    {
                        prenosnaListaDodatnihUsluga.push(tmpList[j]);
                    }
                    if(prenosnaListaDodatnihUsluga.length == 0)
                    	return;
                    break;
            }
        }
    }
}

function ispisiDodatneUsluge(){
	$('#content').children().remove();
	$('#content').append("<div id='dodatneusluge_container'><div id='table_container'></div></div>");
	$('#content').hide();
	$('#content').fadeIn(1000);
	//alert("Data: "+data);
	// kreiraj tabelu i prikazi je na stranici
	$('#table_container').append("<table class='paginated'></table>");
	$('.paginated').append("<thead class='table_head'></thead>");
	$('.paginated').append("<tbody class='table_body'></tbody>");
	var theadContentString = "<tr><th>Naziv</th><th>Opis</th>";
	theadContentString += "<th>Cena</th>";
	theadContentString += "<th></th><th></th><th><button type='button' class='dodaj_korisnika'></button></th>";
	$('.table_head').append(theadContentString);
	theadContentString = null;
	
	for(var i = 0; i < prenosnaListaDodatnihUsluga.length; i++){
		var tbodyContentString = "<tr><td>"+prenosnaListaDodatnihUsluga[i].naziv+"</td><td>"+prenosnaListaDodatnihUsluga[i].opis;
		tbodyContentString += "</td><td>"+prenosnaListaDodatnihUsluga[i].cena+"</td>";
		tbodyContentString += "<td><input type='hidden' value='"+prenosnaListaDodatnihUsluga.naziv+"' id='"+prenosnaListaDodatnihUsluga.naziv+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+prenosnaListaDodatnihUsluga[i].naziv+"'></button></td>";
		tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+prenosnaListaDodatnihUsluga[i].naziv+"'></button></td></tr>";
		$('.table_body').append(tbodyContentString);
		tbodyContentString = "";
	}
	
	//Napravi paginaciju tabele
	$('table.paginated').each(function() {
    var currentPage = 0;
    var numPerPage = 10;
    var $table = $(this);
    $table.bind('repaginate', function() {
        $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
    });
    $table.trigger('repaginate');
    var numRows = $table.find('tbody tr').length;
    var numPages = Math.ceil(numRows / numPerPage);
    var $pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
        $('<span class="page-number"></span>').text(page + 1).bind('click', {
            newPage: page
        }, function(event) {
            currentPage = event.data['newPage'];
            $table.trigger('repaginate');
            $(this).addClass('active').siblings().removeClass('active');
        }).appendTo($pager).addClass('clickable');
    }
    $pager.insertBefore($table).find('span.page-number:first').addClass('active');
	});
	var uloge=[];
	var tmpUloga = null;
	
	$('#content').append("<div id='pretragaDodatnihUsluga'></div>");
	var zaAppend = "";
	zaAppend = "<p class='title'>Pretraga dodatnih usluga</p><label for='naziv_kn_input' class='naziv_kn_label'>Naziv:</label><input type='text' id='naziv_kn_input' />";
	zaAppend += "<label for='cena_od_kn_input' class='cena_od_kn_label'>Opis:</label><input type='text' id='cena_od_kn_input' />";
	zaAppend += "<button type='button' class='trazi'>traži</button>";
	$('#pretragaDodatnihUsluga').append(zaAppend);
	var width = $("#naziv_kn_input").css("width");
	$("#cena_od_kn_input").css("width",width);

	$(".trazi").css("top","100px");
	$(".trazi").click(
			function (){
				doOnTextChangeDodatne();
			}
	);
	
	
}

