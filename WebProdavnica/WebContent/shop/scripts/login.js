function fn_loguj_se(){
	var uname = $("#korisnik_username_input").val();
	var pass = $("#korisnik_password_input").val();
	varallGood = false;
	
    if( uname == "" || uname == undefined || uname == null ) {
          $(".korisnik_prazno_username").css("visibility","visible");
          allGood = false;
    } else {
    	$(".korisnik_prazno_username").css("visibility","hidden");
    	allGood = true;
    }  
    
    if( pass == "" || pass == undefined || pass == null ) {
          $(".korisnik_prazno_password").css("visibility","visible");
          allGood = false;
    } else {
    	$(".korisnik_prazno_password").css("visibility","hidden");
  		if(allGood != false)
  			allGood = true;
    }  
   
    if(allGood == true){
    	$.ajaxSetup({async:false});
    	$.ajax({
    		  url: "../korisnik-login",
    		  type: 'post',

    		  data: {
    		   loginPodaci:JSON.stringify({
    		   username:uname,
    		   password:pass,
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
         
    			if(data == "greska"){
            		$(".korisnik_neispravni_podaci").css('visibility','visible');
            	}
            	else if(data == "-1"){
            		$(".korisnik_neispravni_podaci").css('visibility','visible');
            	}				//provera odgovora servera:
            	else{
            		prijavljenKorisnik = JSON.parse(data);
            		$("#container").children().remove();
            		iscrtajKomponente();
            	}
    		});
    	$.ajaxSetup({async:true});
    }
}

function iscrtajKomponente(){
	var komadiNamestaja = [];
	var kategorije = [];
	var dodatneUsluge = [];
	var akcije = [];
	$("#container").load("pages/index_page.txt",function(){
        $(this).fadeIn(2000);
    });
	
	/*Dovuci sve kategorije i popuni meni*/
	kategorije = [];
	popuniMeni();
	
	/*Iscrtaj komade namestaja koji su na akciji*/
	komadiNamestaja = [];
	kategorije = [];
	dodatneUsluge = [];
	akcije = [];
	iscrtajNaAkciji();
	
	/*Ispuni selekcije kod pretrage*/
	komadiNamestaja = [];
	kategorije = [];
	ispuniSelekcije();
	
	/*iscrtaj korpu*/
	iscrtajKorpuUUglu();
	
	/*Registruj dogadjaj klika na .zavrsi_kupovinu_dugme*/
	
	$(".zavrsi_kupovinu_dugme").click(
			function(){
				zavrsiKupovinu();
			}
	);
	
	$("#odjavise_korisnik").click(
			function(){
				odjaviSe();
			}
	);
	
	$(".trazi").click(
			function(){
				doOnTextChange();
			}
	);
	
	
}
function odjaviSe(){
	var prijavljenKorpa;
	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../korisnik-login",
		  type: 'get',
		  success: function (data, status) {
		    console.log(data);
		    console.log(status);
		  },
		  error: function (xhr, desc, err) {
		    console.log(xhr);
		  },
		}).done(function(data){
     
			if(data == "greska"){
        		$(".korisnik_neispravni_podaci").css('visibility','visible');
        	}
        	else if(data == "-1"){
        		$(".korisnik_neispravni_podaci").css('visibility','visible');
        	}				//provera odgovora servera:
        	else{
        		prijavljenKorpa = JSON.parse(data);
        	}
		});
	$.ajaxSetup({async:true});
	var success = false;
   	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../odjavi_se",
		  type: 'post',

		  data: {
			  komadNamestajaPodaci:JSON.stringify({
		  	 parametar:prijavljenKorpa.Korisnik.korisnickoIme
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
		}).done(function(data){ success = JSON.parse(data)});
		$.ajaxSetup({async:true});
		window.location.href = "/WebProdavnica/shop/index.jsp";
}
function zavrsiKupovinu(){
	$("#content").children().remove();
	$("#body").find(".tabela_sa_podacima_o_kupovini").remove();

	var prijavljenKorpa;
	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../korisnik-login",
		  type: 'get',
		  success: function (data, status) {
		    console.log(data);
		    console.log(status);
		  },
		  error: function (xhr, desc, err) {
		    console.log(xhr);
		  },
		}).done(function(data){
     
			if(data == "greska"){
        		$(".korisnik_neispravni_podaci").css('visibility','visible');
        	}
        	else if(data == "-1"){
        		$(".korisnik_neispravni_podaci").css('visibility','visible');
        	}				//provera odgovora servera:
        	else{
        		prijavljenKorpa = JSON.parse(data);
        	}
		});
	$.ajaxSetup({async:true});
	
	var stringApend="";
	var ukupno = 0;
	
	var iscrtajContent = " <div class='tabela_sa_podacima_o_kupovini'> <table> <thead> <tr> <th>Naziv </th> <th>Količina </th> <th>Ukupna cena </th> <th></th> <th></th> <th></th> </tr> </thead> <tbody id='table_prikaz_body'> </tbody> </table> </div>";
	$("#body").append(iscrtajContent);
	
	for(var i = 0; i < prijavljenKorpa.Korisnik.KomadiNamestaja.length; i++){
		ukupno += prijavljenKorpa.Korisnik.KomadiNamestaja[i].ukupnoItem.toFixed(2);
		stringApend = "<tr><td>"+prijavljenKorpa.Korisnik.KomadiNamestaja[i].naziv+"</td>";
		stringApend += "<td>"+prijavljenKorpa.Korisnik.KomadiNamestaja[i].brojKomadaNamestaja+"</td>";
		stringApend += "<td>"+prijavljenKorpa.Korisnik.KomadiNamestaja[i].ukupnoItem+"</td>";
		stringApend += "<td><button class='ukloni_jedan_iz_prikaza' value='"+prijavljenKorpa.Korisnik.KomadiNamestaja[i].sifra+"'>Ukloni 1</button></td>";
		stringApend += "<td><button class='ukloni_sve_iz_prikaza' value='"+prijavljenKorpa.Korisnik.KomadiNamestaja[i].sifra+"'>Ukloni sve</button></td></tr>";
		$("#table_prikaz_body").append(stringApend);
	}

	for(var i = 0; i < prijavljenKorpa.Korisnik.DodatneUsluge.length; i++){
		ukupno += prijavljenKorpa.Korisnik.DodatneUsluge[i].ukupnoItem;
		stringApend = "<tr><td>"+prijavljenKorpa.Korisnik.DodatneUsluge[i].naziv+"</td>";
		stringApend += "<td>1</td>";
		stringApend += "<td>"+prijavljenKorpa.Korisnik.DodatneUsluge[i].ukupnoItem.toFixed(2)+"</td>";
		stringApend += "<td><button class='ukloni_jedan_iz_prikaza_du' value='"+prijavljenKorpa.Korisnik.DodatneUsluge[i].naziv+"'>Ukloni 1</button></td>";
		stringApend += "</tr>";
		$("#table_prikaz_body").append(stringApend);
	}
	
	stringApend = "<tr><td></td><td></td><td id='"+ukupno+"'>Ukupno: <strong>"+ukupno+"</strong></td>";
	stringApend += "<td><input type='hidden' value='"+prijavljenKorpa.Korisnik.korisnickoIme+"' /></td>";
	stringApend +="<td><a href='#' class='idi_nazad_iz_prikaza_korpe'>Nazad na kupovinu</a></td>";
	stringApend +="<td><button class='kupi_dugme_iz_prikaza' value='"+prijavljenKorpa.Korisnik.korisnickoIme+"'>KUPI</button></td></tr>";
	$("#table_prikaz_body").append(stringApend);
	
	
	$(".ukloni_jedan_iz_prikaza").click(
			function(){
				var success = false;
			   	$.ajaxSetup({async:false});
				$.ajax({
					  url: "../ukloniIzKorpeKomadNamestaja",
					  type: 'post',

					  data: {
						  komadNamestajaPodaci:JSON.stringify({
					  	 parametar:$(".ukloni_jedan_iz_prikaza").val()+","+1
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
					}).done(function(data){ success = JSON.parse(data)});
				
				if(success==true){
					iscrtajKorpuUUgluPosleUklanjanja();
					zavrsiKupovinu();
				}else{
					ispisiGresku();
				}
			});
	$.ajaxSetup({async:true});
	$(".ukloni_sve_iz_prikaza").click(
			function(){
				var success = false;
			   	$.ajaxSetup({async:false});
				$.ajax({
					  url: "../ukloniIzKorpeKomadNamestaja",
					  type: 'post',

					  data: {
						  komadNamestajaPodaci:JSON.stringify({
					  	 parametar:$(".ukloni_sve_iz_prikaza").val()+",1000"
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
					}).done(function(data){ success = JSON.parse(data)});
				
				if(success==true){
					iscrtajKorpuUUgluPosleUklanjanja();
					zavrsiKupovinu();
				}else{
					ispisiGresku();
				}
			});
	$.ajaxSetup({async:true});
	
	$(".ukloni_jedan_iz_prikaza_du").click(
			function(){
				var success = false;
			   	$.ajaxSetup({async:false});
				$.ajax({
					  url: "../ukloniIzKorpeDodatnuUslugu",
					  type: 'post',

					  data: {
						  dodatnaUslugaPodaci:JSON.stringify({
					  	 parametar:$(".ukloni_jedan_iz_prikaza_du").val()
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
					}).done(function(data){ success = JSON.parse(data)});
				
				if(success==true){
					iscrtajKorpuUUgluPosleUklanjanja();
					zavrsiKupovinu();
				}else{
					ispisiGresku();
				}
			});
	$.ajaxSetup({async:true});
	//KUPI
	$(".kupi_dugme_iz_prikaza").click(
			function(){
				if(ukupno > 0){
					var success = false;
				   	$.ajaxSetup({async:false});
					$.ajax({
						  url: "../kupi",
						  type: 'post',
	
						  data: {
							  dodatnaUslugaPodaci:JSON.stringify({
						  	 parametar:$(".kupi_dugme_iz_prikaza").val()
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
						}).done(function(data){ success = JSON.parse(data)});
					
					if(success==true){
						ispisiUspeh();
						iscrtajKorpuUUgluPosleUklanjanja();
						zavrsiKupovinu();
					}else{
						ispisiGresku();
					}
				}
				
			});
	
	$.ajaxSetup({async:true});
}

function popuniMeni(){
	for(var i = 1; i < $("#kn_meni").children().length;i++){
		$("#kn_meni").children()[i].remove();
	}
	var tbodyContentString = "";
	var upisaneTabeleString="";
	var upisaneTabeleNiz = [];
	var allreadyPut = false;
	
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
	/*Popuni prvi nivo*/
	var liString = "";
	var dodate = [];
	liString = "<ul class='Nameštaj'>";
	for(var j = 0; j < kategorije.Kategorije.length; j++){
		for(var i = 0; i < kategorije.Kategorije[j].length; i++){
			
			if(kategorije.Kategorije[j][i].roditelj == "Nameštaj"){
				liString += "<li id='"+kategorije.Kategorije[j][i].naziv.replace(/\s+/g, '_')+"'>";
				liString += "<a href='#'>";
				liString += kategorije.Kategorije[j][i].naziv+"</a></li>";
				dodate.push(kategorije.Kategorije[j][i]);
			}
		}
	}
	liString += "</ul>";
	$("#kn_meni").append(liString);
	
	for(var j = 1; j < kategorije.Kategorije.length; j++){
		for(var i = 0; i < kategorije.Kategorije[j].length; i++){
			var parent = document.getElementById(kategorije.Kategorije[j][i].roditelj.replace(/\s+/g, '_'));
			if(parent != null){
				if(parent.childNodes.length == 1){
					var liString = "";
					liString = "<ul class='"+kategorije.Kategorije[j][i].roditelj.replace(/\s+/g, '_')+"'>";
					liString += "<li id='"+kategorije.Kategorije[j][i].naziv.replace(/\s+/g, '_')+"'>";
					liString += "<a href='#'>";
					liString += kategorije.Kategorije[j][i].naziv+"</a></li>";
					liString += "</ul>";
					var selector =  $(parent);;
					selector.append(liString);
					dodate.push(kategorije.Kategorije[j][i]);
				}else{
					var liString = "";
					liString += "<li id='"+kategorije.Kategorije[j][i].naziv.replace(/\s+/g, '_')+"'>";
					liString += "<a href='#'>";
					liString += kategorije.Kategorije[j][i].naziv+"</a></li>";
					var x = document.getElementsByClassName(kategorije.Kategorije[j][i].roditelj.replace(/\s+/g, '_'));
					var selector2 = $(x[0]);
					selector2.append(liString);
					dodate.push(kategorije.Kategorije[j][i]);
				}
			}else{
				var liString = "";
				liString = "<ul class='Nameštaj'>";
				liString += "<li id='"+kategorije.Kategorije[j][i].naziv.replace(/\s+/g, '_')+"'>";
				liString += "<a href='#'>";
				liString += kategorije.Kategorije[j][i].naziv+"</a></li>";
				liString += "</ul>";
				dodate.push(kategorije.Kategorije[j][i]);
				$("#kn_meni").append(liString);
			}
		}
	}
	var funcpar="";
	/*
	var createPopuniMeniHandler = function(naziv) {
	  return function() {
		  prikaziElementeKategorije(naziv);
	  };
	};

	for(var i = 0; i < dodate.length; i++) {
		dodate[i].addEventListener("click", createPopuniMeniHandler(dodate[i].naziv));
	}*/
	
	/*JEDINI DELEGATOR KOJI RADI! PREUZMI KLIK MISTA NA STA GOD BILO I PROSLEDI GA FUNKCIJI!*/
	navigation = document.getElementById("main_navigation");
	navigation.addEventListener("click", function(e) {
		  var button = e.target;
		  if(button.innerHTML == "Dodatne usluge")
			  prikaziDodatneUsluge(button);
		  else if(button.innerHTML == "Akcije")
			  iscrtajNaAkcijiSaMenijem();
		  else if(button.innerHTML == "Korpa")
			  zavrsiKupovinu();
	});
	knMeni = document.getElementById("kn_meni")
	knMeni.addEventListener("click", function(e) {
		  var button = e.target;
		  prikaziElementeKategorije(button);
		});
	/*
	for(var j = 0; j < dodate.length; j++){
		funcpar = dodate[j].naziv.replace(/\s+/g, '_');
			$("#kn_meni").on('click', '#'+dodate[j].naziv.replace(/\s+/g, '_'), function(funcpar){prikaziElementeKategorije(funcpar);});
	}
	*/
}


function iscrtajNaAkciji(){
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
	/*DOVUCI AKCIJE*/
  	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../table",
		  type: 'get',

		  data: {
		   tabelaPodaci:JSON.stringify({
		  	 parametar:"akcije"
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
	    	akcije = JSON.parse(data);
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
	/*PRONADJI KOMADE NAMESTAJA KOJI SU NA AKCIJI*/
	var ceneSaPopustom = [];
	var akcijeSifre = [];
	for(var i = 0; i < akcije.Akcije.length; i++){

		for(var j = 0; j < akcije.Akcije[i].komadiNamestaja.length; j++){
			akcijeSifre.push(akcije.Akcije[i].komadiNamestaja[j].sifra);
			ceneSaPopustom.push((akcije.Akcije[i].popust/100)); 
		}
	}
	var sifra = [];
	var naziv= [];
	var boja= [];
	var zemljaProizvodnje= [];
	var nazivProizvodjaca= [];
	var jedinicnaCena= [];
	var kolicinaUMagacinu= [];
	var kategorija= [];
	var godinaProizvodnje= [];
	var salon= [];
	var slika= [];
	var video= [];

	for(var i = 0; i < komadiNamestaja.KomadiNamestaja.length; i++){
		for(var j = 0; j < akcijeSifre.length; j++){
			if(akcijeSifre[j] == komadiNamestaja.KomadiNamestaja[i].sifra){
				sifra.push(komadiNamestaja.KomadiNamestaja[i].sifra);
				naziv.push(komadiNamestaja.KomadiNamestaja[i].naziv);
				boja.push(komadiNamestaja.KomadiNamestaja[i].boja);
				zemljaProizvodnje.push(komadiNamestaja.KomadiNamestaja[i].zemljaProizvodnje);
				nazivProizvodjaca.push(komadiNamestaja.KomadiNamestaja[i].nazivProizvodjaca);
				jedinicnaCena.push(komadiNamestaja.KomadiNamestaja[i].jedinicnaCena);
				kolicinaUMagacinu.push(komadiNamestaja.KomadiNamestaja[i].kolicinaUMagacinu);
				kategorija.push(komadiNamestaja.KomadiNamestaja[i].kategorija);
				godinaProizvodnje.push(komadiNamestaja.KomadiNamestaja[i].godinaProizvodnje);
				salon.push(komadiNamestaja.KomadiNamestaja[i].salon);
				slika.push(komadiNamestaja.KomadiNamestaja[i].slika);
				video.push(komadiNamestaja.KomadiNamestaja[i].video);
				break;
			}
		}
	}
	
	
	$("#content").children().remove();
	$("#body").find(".tabela_sa_podacima_o_kupovini").remove();
	for(var i = 0; i < sifra.length; i++){
		var showDivs = "";
		ceneSaPopustom[i] = ceneSaPopustom[i]*jedinicnaCena[i];
		showDivs = "<div><img src='"+slika[i]+"' /> <p class='kn_title'>"+naziv[i]+"</p>";
		showDivs += "<img src='images/akcija_icon.png' class='akcija' style='visibility:visible'/>";
		showDivs += "<p class='kn_cena'>Cena: <strong style='color:red'>"+ceneSaPopustom[i].toFixed(2)+"</strong> din</p>";
		showDivs += "<button type='button' class='kn_opsirnije' value='"+sifra[i]+"'>opširnije</button>";
		showDivs += "<button type='button' class='kn_kupi' value='"+sifra[i]+"'>U korpu</button></div>";
		$("#content").append(showDivs);
		
	}
	//Delegiraj dogadje. Delegiranje se koristi kad se dodaju dogadjaji na decu elemente koji mogu i da ne postoje
	$("#content").on('click', '.kn_opsirnije', function(){prikaziOpsirnije($(this));});
	$("#content").on('click', '.kn_kupi', function(){pripremiZaDodavanje($(this),1);});
}
function iscrtajNaAkcijiSaMenijem(){
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
	/*DOVUCI AKCIJE*/
  	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../table",
		  type: 'get',

		  data: {
		   tabelaPodaci:JSON.stringify({
		  	 parametar:"akcije"
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
	    	akcije = JSON.parse(data);
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
	/*PRONADJI KOMADE NAMESTAJA KOJI SU NA AKCIJI*/
	var ceneSaPopustom = [];
	var akcijeSifre = [];
	for(var i = 0; i < akcije.Akcije.length; i++){

		for(var j = 0; j < akcije.Akcije[i].komadiNamestaja.length; j++){
			akcijeSifre.push(akcije.Akcije[i].komadiNamestaja[j].sifra);
			ceneSaPopustom.push((akcije.Akcije[i].popust/100)); 
		}
	}
	var sifra = [];
	var naziv= [];
	var boja= [];
	var zemljaProizvodnje= [];
	var nazivProizvodjaca= [];
	var jedinicnaCena= [];
	var kolicinaUMagacinu= [];
	var kategorija= [];
	var godinaProizvodnje= [];
	var salon= [];
	var slika= [];
	var video= [];

	for(var i = 0; i < komadiNamestaja.KomadiNamestaja.length; i++){
		for(var j = 0; j < akcijeSifre.length; j++){
			if(akcijeSifre[j] == komadiNamestaja.KomadiNamestaja[i].sifra){
				sifra.push(komadiNamestaja.KomadiNamestaja[i].sifra);
				naziv.push(komadiNamestaja.KomadiNamestaja[i].naziv);
				boja.push(komadiNamestaja.KomadiNamestaja[i].boja);
				zemljaProizvodnje.push(komadiNamestaja.KomadiNamestaja[i].zemljaProizvodnje);
				nazivProizvodjaca.push(komadiNamestaja.KomadiNamestaja[i].nazivProizvodjaca);
				jedinicnaCena.push(komadiNamestaja.KomadiNamestaja[i].jedinicnaCena);
				kolicinaUMagacinu.push(komadiNamestaja.KomadiNamestaja[i].kolicinaUMagacinu);
				kategorija.push(komadiNamestaja.KomadiNamestaja[i].kategorija);
				godinaProizvodnje.push(komadiNamestaja.KomadiNamestaja[i].godinaProizvodnje);
				salon.push(komadiNamestaja.KomadiNamestaja[i].salon);
				slika.push(komadiNamestaja.KomadiNamestaja[i].slika);
				video.push(komadiNamestaja.KomadiNamestaja[i].video);
				break;
			}
		}
	}
	
	
	$("#content").children().remove();
	$("#body").find(".tabela_sa_podacima_o_kupovini").remove();
	for(var i = 0; i < sifra.length; i++){
		var showDivs = "";
		ceneSaPopustom[i] = ceneSaPopustom[i]*jedinicnaCena[i];
		showDivs = "<div><img src='"+slika[i]+"' /> <p class='kn_title'>"+naziv[i]+"</p>";
		showDivs += "<img src='images/akcija_icon.png' class='akcija' style='visibility:visible'/>";
		showDivs += "<p class='kn_cena'>Cena: <strong style='color:red'>"+ceneSaPopustom[i].toFixed(2)+"</strong> din</p>";
		showDivs += "<button type='button' class='kn_opsirnije' value='"+sifra[i]+"'>opširnije</button>";
		showDivs += "<button type='button' class='kn_kupi' value='"+sifra[i]+"'>U korpu</button></div>";
		$("#content").append(showDivs);
		
	}
	
	/*PONOVO ISCRTAJ PRETRAGU*/
	$("#komadiNamestaja_pretraga").children().remove();
	var zaAppend = "";
	zaAppend = "<p class='title'>Pretraga komada nameštaja</p> <label for='naziv_kn_input' class='naziv_kn_label'>Naziv:</label> <input type='text' id='naziv_kn_input' /> <label for='cena_od_kn_input' class='cena_od_kn_label'>Cena od:</label> <input type='number' id='cena_od_kn_input' value='0' min='0'/> <label for='cena_do_kn_input' class='cena_do_kn_label'>Cena do:</label> <input type='number' id='cena_do_kn_input' min='0'/> <label for='kolicina_kn_input' class='kolicina_kn_label'>Količina:</label> <input type='number' id='kolicina_kn_input' value='0' min='0'/> <label for='kategorija_kn_input' class='kategorija_kn_label'>Kategorija:</label> <select id='kategorija_kn_input'></select> <label for='zemlja_kn_input' class='zemlja_kn_label'>Zemlja proizvodnje:</label> <select id='zemlja_kn_input'></select> <label for='godina_kn_input' class='godina_kn_label'>Godina proizvodnje:</label> <select id='godina_kn_input'></select> <label for='boja_kn_input' class='godina_kn_label'>Boja:</label> <select id='boja_kn_input'></select> <label for='nazivp_kn_input' class='nazivp_kn_label'>Naziv proizvođača:</label> <select id='nazivp_kn_input'></select> <button type='button' class='trazi'>traži</button>";
	$("#komadiNamestaja_pretraga").append(zaAppend);
	 ispuniSelekcije();
}

function ispuniSelekcije(){
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

function prikaziOpsirnije(dugme){
	//console.log(dugme.val());
	
	//DOVUCI KOMADE NAMESTAJA U SLUCAJU DA JE BILO NEKIH PROMENA
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
		}).done(function(data){ komadiNamestaja = JSON.parse(data)});
	$.ajaxSetup({async:true});
  	$("#container").find("#dialog_black_background").remove();
  	$("#container").find("#opsirnije_container").children().remove();
  	$("#container").find("#opsirnije_container").remove();
  	$("#container").append("<div id='dialog_black_background'></div>");
	$("#container").append("<div id='opsirnije_container'></div>");
	
	var dialogOpsirnijeContent = "";
	dialogOpsirnijeContent = " <button type='button' class='exit_opsirnije'>X</button> <img src='' class='big_image_opsirnije' /> <img src='' class='small_image_opsirnije' /> <embed src='' class='big_video_opsirnije' /> <embed src='' class='small_video_opsirnije' /><!--images/20140619_201955.mp4--> <p class='naziv_opsirnije'></p> <p class='sifra_opsirnije'></p> <p class='boja_opsirnije'></p> <p class='zemlja_opsirnije'></p> <p class='proizvodjac_opsirnije'></p> <p class='cena_opsirnije'></p> <p class='kolicina_opsirnije'></p> <p class='kategorija_opsirnije'></p> <p class='godina_opsirnije'></p> <p class='salon_opsirnije'></p> <label for='kolicina_opsirnije_input' class='kolicina_opsirnije_label'>Količina:</label> <input type='number' id='kolicina_opsirnije_input' value='0' min='0'/> <input type='hidden' /> <button type='button' class='opsirnije_dodaj'>Dodaj u korpu</button> <div id='kolicina_greska'></div>";
	$("#opsirnije_container").append(dialogOpsirnijeContent);
	
	$("#opsirnije_container").hide();
	$("#opsirnije_container").slideDown();
	el = document.getElementById("dialog_black_background");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$(".exit_opsirnije").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$("#opsirnije_container").remove();
    		//$(".dialog_komadnamestaja_container").hide();
		}		
	)
	var komadZaPrikaz = null;
	for(var i = 0; i < komadiNamestaja.KomadiNamestaja.length; i++){
		if(dugme.val() == komadiNamestaja.KomadiNamestaja[i].sifra){
			komadZaPrikaz = komadiNamestaja.KomadiNamestaja[i];
		}
	}
	/*
        <p class='naziv_opsirnije'><strong></strong></p>
        <p class='sifra_opsirnije'>Šifra: <strong></strong></p>
        <p class='boja_opsirnije'>Boja: <strong></strong></p>
        <p class='zemlja_opsirnije'>Zemlja proizvodnje: <strong></strong></p>
        <p class='proizvodjac_opsirnije'>Proizvođač: <strong></strong></p>
        <p class='cena_opsirnije'>Cena(kom.): <strong></strong> din</p>
        <p class='kolicina_opsirnije'>Količina(u br. kom.): <strong></strong></p>
        <p class='kategorija_opsirnije'>Kategorija: <strong></strong></p>
        <p class='godina_opsirnije'>Godina proizvodnje: <strong></strong> </p>
        <p class='salon_opsirnije'>Salon: <strong></strong></p>
	 */
	
	$(".naziv_opsirnije").append("<strong>"+komadZaPrikaz.naziv+"</strong>");
	$(".sifra_opsirnije").append("Šifra: <strong>"+komadZaPrikaz.sifra+"</strong>");
	$(".boja_opsirnije").append("Boja: <strong>"+komadZaPrikaz.boja+"</strong>");
	$(".zemlja_opsirnije").append("Zemlja proizvodnje: <strong>"+komadZaPrikaz.zemljaProizvodnje+"</strong>");
	$(".proizvodjac_opsirnije").append("Proizvođač: <strong>"+komadZaPrikaz.nazivProizvodjaca+"</strong>");
	$(".cena_opsirnije").append("Cena(kom.): <strong>"+komadZaPrikaz.jedinicnaCena.toFixed(2)+"</strong> din");
	$(".kolicina_opsirnije").append("Količina(u br. kom.): <strong>"+komadZaPrikaz.kolicinaUMagacinu+"</strong>");
	$(".kategorija_opsirnije").append("Kategorija: <strong>"+komadZaPrikaz.kategorija+"</strong>");
	$(".godina_opsirnije").append("Godina proizvodnje: <strong>"+komadZaPrikaz.godinaProizvodnje+"</strong>");
	$(".salon_opsirnije").append("Salon: <strong>"+komadZaPrikaz.salon+"</strong>");
	$(".big_image_opsirnije").attr("src",komadZaPrikaz.slika);
	$(".small_image_opsirnije").attr("src",komadZaPrikaz.slika);
	
	$("#kolicina_opsirnije_input").change(
			function(){
				izborKolicina($(this),komadZaPrikaz);
			}
	);
	
	$(".opsirnije_dodaj").click(
			function(){
				if(izborKolicina($("#kolicina_opsirnije_input").val(),komadZaPrikaz) != false){
					pripremiZaDodavanjeVise(komadZaPrikaz.sifra,$("#kolicina_opsirnije_input").val());
				}
			}
	);
}

function izborKolicina(dugme, kn){
	//DOVUCI KOMADE NAMESTAJA U SLUCAJU DA JE BILO NEKIH PROMENA
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
		}).done(function(data){ komadiNamestaja = JSON.parse(data)});
	$.ajaxSetup({async:true});
	var komadZaPrikaz;
	for(var i = 0; i < komadiNamestaja.KomadiNamestaja.length; i++){
		if(kn.sifra == komadiNamestaja.KomadiNamestaja[i].sifra){
			komadZaPrikaz = komadiNamestaja.KomadiNamestaja[i];
		}
	}
	if(dugme[0].value <= 0){
		$("#kolicina_greska").text("MORATE IZABRATI 0 ILI VIŠE DA BISTE MOGLI DA DODATE!");
		$("#kolicina_greska").css("visibility", "visible");
		return false
	}
	else if((komadZaPrikaz.kolicinaUMagacinu - dugme[0].value ) < 0){
		$("#kolicina_greska").text("NEMA DOVOLJNO ROBE U MAGACINU!");
		$("#kolicina_greska").css("visibility", "visible");
		return false;
	}else{
		$("#kolicina_greska").text("MOŽETE DODATI JOŠ: " + (komadZaPrikaz.kolicinaUMagacinu - dugme[0].value ) + "KOMADA!");
		$("#kolicina_greska").css("visibility", "visible");
		return true;
	}
}
function pripremiZaDodavanjeVise(sifra,brKomada){
	var popust = -1;
	for(var i = 0; i < akcije.Akcije.length; i++){
		for(var j = 0; j < akcije.Akcije[i].komadiNamestaja.length; j++){
			if(sifra == akcije.Akcije[i].komadiNamestaja[j].sifra){
				popust = akcije.Akcije[i].popust;
				break;
			}
		}
	}
	
	//izvrsi dodavanje u korpu
	dodajUKorpu(sifra, popust,brKomada);
}
function pripremiZaDodavanje(polje,brKomada){
	var popust = -1;
	for(var i = 0; i < akcije.Akcije.length; i++){
		for(var j = 0; j < akcije.Akcije[i].komadiNamestaja.length; j++){
			if(polje.val() == akcije.Akcije[i].komadiNamestaja[j].sifra){
				popust = akcije.Akcije[i].popust;
				break;
			}
		}
	}
	
	//izvrsi dodavanje u korpu
	dodajUKorpu(polje.val(), popust,brKomada);
}
function dodajUKorpu(oznaka, popust, brKomada){
	/*Akcija dodavanja proizvoda u korpu*/
	
	var success = false;
   	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../dodajUKorpuKomadNamestaja",
		  type: 'post',

		  data: {
			  komadNamestajaPodaci:JSON.stringify({
		  	 parametar:oznaka+","+popust+","+brKomada
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
		}).done(function(data){ success = JSON.parse(data)});
	
	if(success==true){
		pokaziBesplatneUsluge(oznaka);
	}else{
		ispisiGresku();
	}
}

function obrisiKomadNamestaja(dugme, brKomada){
	/*Akcija za uklanjanje jednog proizvoda iz korpe*/
	var success = false;
   	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../ukloniIzKorpeKomadNamestaja",
		  type: 'post',

		  data: {
			  komadNamestajaPodaci:JSON.stringify({
		  	 parametar:dugme.val()+","+brKomada
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
		}).done(function(data){ success = JSON.parse(data)});
	
	if(success==true){
		iscrtajKorpuUUgluPosleUklanjanja();
	}else{
		ispisiGresku();
	}
}

function obrisiDodatnuUslugu(dugme, brKomada){
	/*Akcija za uklanjanje jednog proizvoda iz korpe*/
	var success = false;
   	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../ukloniIzKorpeDodatnuUslugu",
		  type: 'post',

		  data: {
			  dodatnaUslugaPodaci:JSON.stringify({
		  	 parametar:dugme.val()
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
		}).done(function(data){ success = JSON.parse(data)});
	
	if(success==true){
		iscrtajKorpuUUgluPosleUklanjanja();
	}else{
		ispisiGresku();
	}
}
function ispisiGresku(){
 	$("#container").find("#dialog_black_background").remove();
  	$("#container").find(".dialog_warning_container").children().remove();
  	$("#container").find(".dialog_warning_container").remove();
  	$("#container").append("<div id='dialog_black_background'></div>");
	$("#container").append("<div class='dialog_warning_container'></div>");
	
	var dialogSaloniContent = "";
	dialogSaloniContent = "<div class='dialog_header_container'> <p class='dialog_header_title'>GRESKA!</p> <p class='dialog_header_exit'>X</p> </div> <div class='dialog_body_container'> <p class='dialog_body_txt'>Izvinite ali došlo je do greške. Molimo osvezite stranicu.Hvala</p><button type='button' class='dialog_warning_odustani'>odustani</button> </div>";
	$(".dialog_warning_container").append(dialogSaloniContent);
	$(".dialog_warning_container").hide();
	$(".dialog_warning_container").slideDown();
	el = document.getElementById("dialog_black_background");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$(".dialog_header_exit").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_warning_container").remove();
    		$(".dialog_warning_container").hide();
    		return;
		}		
	)
	$(".dialog_warning_odustani").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_warning_container").remove();
    		$(".dialog_warning_container").hide();
			return;
		}	
	);
}

function ispisiUspeh(){
 	$("#container").find("#dialog_black_background").remove();
  	$("#container").find(".dialog_success_container").children().remove();
  	$("#container").find(".dialog_success_container").remove();
  	$("#container").append("<div id='dialog_black_background'></div>");
	$("#container").append("<div class='dialog_success_container'></div>");
	
	var dialogSaloniContent = "";
	dialogSaloniContent = "<div class='dialog_header_container'> <p class='dialog_header_title'>USPEH!</p> <p class='dialog_header_exit'>X</p> </div> <div class='dialog_body_container'> <p class='dialog_body_txt'>Uspešno ste naručili! Hvala.</p><button type='button' class='dialog_success_odustani'>odustani</button> </div>";
	$(".dialog_success_container").append(dialogSaloniContent);
	$(".dialog_success_container").hide();
	$(".dialog_success_container").slideDown();
	el = document.getElementById("dialog_black_background");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$(".dialog_header_exit").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_success_container").remove();
    		$(".dialog_success_container").hide();
    		return;
		}		
	)
	$(".dialog_success_odustani").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_success_container").remove();
    		$(".dialog_success_container").hide();
			return;
		}	
	);
}

function pokaziBesplatneUsluge(oznaka){
	//DOBAVI DODATNE USLUGE
	var dodatneUsluge = [];
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
		}).done(function(data){dodatneUsluge = JSON.parse(data)});	
			
		$.ajaxSetup({async:true});
	//DOVUCI KOMADE NAMESTAJA U SLUCAJU DA JE BILO NEKIH PROMENA
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
		}).done(function(data){ komadiNamestaja = JSON.parse(data)});
	
	var dodatneUslugeZaPrikaz = [];
	for(var i = 0; i < dodatneUsluge.DodatneUsluge.length; i++){
		for(var j = 0; j < dodatneUsluge.DodatneUsluge[i].komadiNamestaja.length; j++){
			for(var k = 0; k < komadiNamestaja.KomadiNamestaja.length; k++){
				if(dodatneUsluge.DodatneUsluge[i].komadiNamestaja[j] == komadiNamestaja.KomadiNamestaja[k]){
					dodatneUslugeZaPrikaz.push(dodatneUsluge.DodatneUsluge[i]);
				}
			}
		}
	}
 	$("#container").find("#dialog_black_background").remove();
  	$("#container").find("#besplatne_du_show").children().remove();
  	$("#container").find("#besplatne_du_show").remove();
  	$("#container").append("<div id='dialog_black_background'></div>");
	$("#container").append("<div id='besplatne_du_show'></div>");
	
	var dialogSaloniContent = "";
	dialogSaloniContent = "<button type='button' class='exit_besplatne_du_show'>X</button>";
	$("#besplatne_du_show").append(dialogSaloniContent);
	$("#besplatne_du_show").hide();
	$("#besplatne_du_show").slideDown();
	el = document.getElementById("dialog_black_background");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$(".exit_besplatne_du_show").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$("#besplatne_du_show").remove();
    		//$(".besplatne_du_show").hide();
    		return;
		}		
	);
	
	var appendString = ""
	if(dodatneUslugeZaPrikaz.length > 0){
		for(var i = 0; i < dodatneUslugeZaPrikaz.length; i++){
			appendString+="<div><p class='besplatne_du_title'>"+dodatneUslugeZaPrikaz.naziv+"</p>";
			appendString+="<p class='besplatne_du_opis'>"+dodatneUslugeZaPrikaz.opis+"</p>";
			appendString+="<button type='button' class='besplatne_du_kupi'>U korpu</button></div>";
		}
		$("#besplatne_du_show").append(appendString);
	}else{
		appendString="<div><p class='besplatne_du_title'>NEMA BESPLATNIH USLUGA ZA OVAJ KOMAD NAMEŠTAJA! HVALA.</p>";
		$("#besplatne_du_show").append(appendString);
	}
	// UPDATE KORPE i PRIKAZA KORPE
	iscrtajKorpuUUglu();

	
}

function iscrtajKorpuUUglu(){
	
	var prijavljenKorpa;
	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../korisnik-login",
		  type: 'get',
		  success: function (data, status) {
		    console.log(data);
		    console.log(status);
		  },
		  error: function (xhr, desc, err) {
		    console.log(xhr);
		  },
		}).done(function(data){
     
			if(data == "greska"){
        		$(".korisnik_neispravni_podaci").css('visibility','visible');
        	}
        	else if(data == "-1"){
        		$(".korisnik_neispravni_podaci").css('visibility','visible');
        	}				//provera odgovora servera:
        	else{
        		prijavljenKorpa = JSON.parse(data);
        	}
		});
	$.ajaxSetup({async:true});
	
	
	$(".ovde_idu_li_evi").children().remove();
	
	var ukupno = 0;
    var trenutnaCena = [];
    var brKomada = [];
    var ukupno = 0;
    var stringApend = "";
	for(var i = 0; i < prijavljenKorpa.Korisnik.KomadiNamestaja.length; i++){
		   trenutnaCena.push(0);
		   brKomada.push(0);
	}
	for(var i = 0; i < prijavljenKorpa.Korisnik.KomadiNamestaja.length; i++){
		    trenutnaCena[i]+=prijavljenKorpa.Korisnik.KomadiNamestaja[i].ukupnoItem;
		    brKomada[i]+=prijavljenKorpa.Korisnik.KomadiNamestaja[i].brojKomadaNamestaja;
		    ukupno += prijavljenKorpa.Korisnik.KomadiNamestaja[i].ukupnoItem;
			var vecPostoji = document.getElementById((prijavljenKorpa.Korisnik.KomadiNamestaja[i].sifra+prijavljenKorpa.Korisnik.KomadiNamestaja[i].naziv));
			var jqueryVecPostoji = $(vecPostoji);
			if(vecPostoji != null){
				jqueryVecPostoji.find($(".sc_br_komada")).children().remove();
				jqueryVecPostoji.find($(".sc_br_komada")).append("Broj komada: <strong>"+brKomada[i]+"</strong> kom.")
				jqueryVecPostoji.find($(".sc_cena")).children().remove();
				jqueryVecPostoji.find($(".sc_cena")).append("Ukupna cena: <strong>"+trenutnaCena[i].toFixed(2)+"</strong> din.")
			}else{
				var slikica = "";
				if(prijavljenKorpa.Korisnik.KomadiNamestaja[i].slika == "nema")
					slikica = "";
				else
					slikica = prijavljenKorpa.Korisnik.KomadiNamestaja[i].slika;
				
				stringApend =  "<li> <div> <img src='"+slikica+"' alt='komad namestaja slika' class='sc_image'/> <p class='sc_title'><strong>"+prijavljenKorpa.Korisnik.KomadiNamestaja[i].naziv+"</strong></p> <p class='sc_br_komada'>Broj komada: <strong>"+brKomada[i]+"</strong> kom.</p> <p class='sc_cena'>Ukupna cena: <strong> "+trenutnaCena[i].toFixed(2)+"</strong> din.</p> <button type='button' class='sc_ukloni_jedan' value='"+prijavljenKorpa.Korisnik.KomadiNamestaja[i].sifra+"'>Ukloni 1</button> <button type='button' class='sc_ukloni_sve' value='"+prijavljenKorpa.Korisnik.KomadiNamestaja[i].sifra+"'>Ukloni sve</button> </div> </li>";
				$(".ovde_idu_li_evi").append(stringApend);
			}
	}
    trenutnaCena = [];
    brKomada = [];
	for(var i = 0; i < prijavljenKorpa.Korisnik.DodatneUsluge.length; i++){
		   trenutnaCena.push(0);
		   brKomada.push(0);
	}
	for(var i = 0; i < prijavljenKorpa.Korisnik.DodatneUsluge.length; i++){
		ukupno += prijavljenKorpa.Korisnik.DodatneUsluge[i].ukupnoItem;
			stringApend= "<li> <div> <p class='sc_du_title'><strong>"+prijavljenKorpa.Korisnik.DodatneUsluge[i].naziv+"</strong></p> <p class='sc_du_opis'>"+prijavljenKorpa.Korisnik.DodatneUsluge[i].opis+"</p> <button type='button' class='sc_ukloni_jedan_du'>Ukloni 1</button> <button type='button' class='sc_ukloni_sve_du'>Ukloni sve</button> </div> </li>";
			$(".ovde_idu_li_evi").append(stringApend);

	}

	$(".ukupno_kosta_u_korpi").text("");
	
	
	$(".ukupno_kosta_u_korpi").append("Ukupno: <strong>"+ukupno.toFixed(2)+"</strong>");

	
	/*Pozovi obrisi 1, obrisi sve*/
	$(".sc_ukloni_jedan").click(function(){obrisiKomadNamestaja($(this),1)});
	$(".sc_ukloni_sve").click(function(){obrisiKomadNamestaja($(this),100)});
	/*AKO JE STIGLO IZ OPSIRNIJE SKLONI CRNU POZADINU!*/
	el = document.getElementById("dialog_black_background");
	if(el != null){
		el.style.visibility = "visible";
	}
	//$("#besplatne_du_show").remove();
	$(".dialog_warning_container").remove();
	$("#opsirnije_container").remove();
	$(".uspesnoDodato").css("visibility","visible").show().delay(2000).fadeOut().css("visibility","hidden");
}

function iscrtajKorpuUUgluPosleUklanjanja(){
	var prijavljenKorpa;
	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../korisnik-login",
		  type: 'get',
		  success: function (data, status) {
		    console.log(data);
		    console.log(status);
		  },
		  error: function (xhr, desc, err) {
		    console.log(xhr);
		  },
		}).done(function(data){
     
			if(data == "greska"){
        		$(".korisnik_neispravni_podaci").css('visibility','visible');
        	}
        	else if(data == "-1"){
        		$(".korisnik_neispravni_podaci").css('visibility','visible');
        	}				//provera odgovora servera:
        	else{
        		prijavljenKorpa = JSON.parse(data);
        	}
		});
	$.ajaxSetup({async:true});
	
	
	$(".ovde_idu_li_evi").children().remove();
	
	var ukupno = 0;
    var trenutnaCena = [];
    var brKomada = [];
    var ukupno = 0;
    var stringApend = "";
	for(var i = 0; i < prijavljenKorpa.Korisnik.KomadiNamestaja.length; i++){
		   trenutnaCena.push(0);
		   brKomada.push(0);
	}
	for(var i = 0; i < prijavljenKorpa.Korisnik.KomadiNamestaja.length; i++){
		    trenutnaCena[i]+=prijavljenKorpa.Korisnik.KomadiNamestaja[i].ukupnoItem;
		    brKomada[i]+=prijavljenKorpa.Korisnik.KomadiNamestaja[i].brojKomadaNamestaja;
		    ukupno += prijavljenKorpa.Korisnik.KomadiNamestaja[i].ukupnoItem;
			var vecPostoji = document.getElementById((prijavljenKorpa.Korisnik.KomadiNamestaja[i].sifra+prijavljenKorpa.Korisnik.KomadiNamestaja[i].naziv));
			var jqueryVecPostoji = $(vecPostoji);
			if(vecPostoji != null){
				jqueryVecPostoji.find($(".sc_br_komada")).children().remove();
				jqueryVecPostoji.find($(".sc_br_komada")).append("Broj komada: <strong>"+brKomada[i]+"</strong> kom.")
				jqueryVecPostoji.find($(".sc_cena")).children().remove();
				jqueryVecPostoji.find($(".sc_cena")).append("Ukupna cena: <strong>"+trenutnaCena[i].toFixed(2)+"</strong> din.")
			}else{
				var slikica = "";
				if(prijavljenKorpa.Korisnik.KomadiNamestaja[i].slika == "nema")
					slikica = "";
				else
					slikica = prijavljenKorpa.Korisnik.KomadiNamestaja[i].slika;
				
				stringApend =  "<li> <div> <img src='"+slikica+"' alt='komad namestaja slika' class='sc_image'/> <p class='sc_title'><strong>"+prijavljenKorpa.Korisnik.KomadiNamestaja[i].naziv+"</strong></p> <p class='sc_br_komada'>Broj komada: <strong>"+brKomada[i]+"</strong> kom.</p> <p class='sc_cena'>Ukupna cena: <strong> "+trenutnaCena[i].toFixed(2)+"</strong> din.</p> <button type='button' class='sc_ukloni_jedan' value='"+prijavljenKorpa.Korisnik.KomadiNamestaja[i].sifra+"'>Ukloni 1</button> <button type='button' class='sc_ukloni_sve' value='"+prijavljenKorpa.Korisnik.KomadiNamestaja[i].sifra+"'>Ukloni sve</button> </div> </li>";
				$(".ovde_idu_li_evi").append(stringApend);
			}
	}
    trenutnaCena = [];
    brKomada = [];
	for(var i = 0; i < prijavljenKorpa.Korisnik.DodatneUsluge.length; i++){
		   trenutnaCena.push(0);
		   brKomada.push(0);
	}
	for(var i = 0; i < prijavljenKorpa.Korisnik.DodatneUsluge.length; i++){
		ukupno += prijavljenKorpa.Korisnik.DodatneUsluge[i].ukupnoItem;
			stringApend= "<li> <div> <p class='sc_du_title'><strong>"+prijavljenKorpa.Korisnik.DodatneUsluge[i].naziv+"</strong></p> <p class='sc_du_opis'>"+prijavljenKorpa.Korisnik.DodatneUsluge[i].opis+"</p> <button type='button' class='sc_ukloni_jedan_du' value='"+ prijavljenKorpa.Korisnik.DodatneUsluge[i].naziv+"'>Ukloni 1</button> <button type='button' class='sc_ukloni_sve_du'>Ukloni sve</button> </div> </li>";
			$(".ovde_idu_li_evi").append(stringApend);
	}

	$(".ukupno_kosta_u_korpi").text("");
	
	ukupnoSPorezom = ukupno*1.2;
	$(".ukupno_kosta_u_korpi").append("Ukupno: <strong>"+ukupnoSPorezom.toFixed(2)+"</strong>");

	
	/*Pozovi obrisi 1, obrisi sve*/
	$(".sc_ukloni_jedan").click(function(){obrisiKomadNamestaja($(this),1)});
	$(".sc_ukloni_sve").click(function(){obrisiKomadNamestaja($(this),100)});
	$(".sc_ukloni_jedan_du").click(function(){obrisiDodatnuUslugu($(this))});
}

function prikaziElementeKategorije(polje){
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
	
	/*DOVUCI AKCIJE*/
  	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../table",
		  type: 'get',

		  data: {
		   tabelaPodaci:JSON.stringify({
		  	 parametar:"akcije"
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
	    	akcije = JSON.parse(data);
		});
	$.ajaxSetup({async:true});
	
	/*PRONADJI KOMADE NAMESTAJA KOJI PRIPADAJU KATAGORII NA KOJU SE KLIKNULO*/
	var knIzKategorije = [];

			for(var s = 0; s < komadiNamestaja.KomadiNamestaja.length; s++){
				if(polje.innerHTML.replace(/\s+/g, '_') == komadiNamestaja.KomadiNamestaja[s].kategorija.replace(/\s+/g, '_')){
					knIzKategorije.push(komadiNamestaja.KomadiNamestaja[s]);
				}
			}
	
	
	$("#content").children().remove();
	$("#body").find(".tabela_sa_podacima_o_kupovini").remove();
	if(knIzKategorije.length == 0){
		$("#content").append("<div style='color:#FF0000;border:#FF0000; background-color:#FFCCFF;font-family:Raleway-Light;font-weight:bold;font-size:32px'>Ne postoje komadi nameštaja u zadatoj kategoriji.</div>");
	}
	else{
		var akcijeSifre = [];
		for(var i = 0; i < akcije.Akcije.length; i++){

			for(var j = 0; j < akcije.Akcije[i].komadiNamestaja.length; j++){
				akcijeSifre.push(akcije.Akcije[i].komadiNamestaja[j].sifra);
			}
		}
		for(var i = 0; i < knIzKategorije.length; i++){
			if(knIzKategorije[i].kolicinaUMagacinu>0){
				
				for(var j = 0; j <akcijeSifre.length; j++ ){
					if(akcijeSifre[j] == knIzKategorije[i].sifra){
						naAkciji = true;
						break;
					}else{
						naAkciji = false;
					}
				}
				
				var showDivs = "";
				var slikica = "";
				if(knIzKategorije[i].slika == "nema"){
					slikica="";
				}else{
					slikica = knIzKategorije[i].slika;
				}
				showDivs = "<div><img src='"+slikica+"' /> <p class='kn_title'>"+knIzKategorije[i].naziv+"</p>";
				if(naAkciji == true)
					showDivs += "<img src='images/akcija_icon.png' class='akcija' style='visibility:visible'/>";
				else
					showDivs += "<img src='images/akcija_icon.png' class='akcija' />";
				showDivs += "<p class='kn_cena'>Cena: <strong style='color:red'>"+knIzKategorije[i].jedinicnaCena.toFixed(2)+"</strong> din</p>";
				showDivs += "<button type='button' class='kn_opsirnije' value='"+knIzKategorije[i].sifra+"'>opširnije</button>";
				showDivs += "<button type='button' class='kn_kupi' value='"+knIzKategorije[i].sifra+"'>U korpu</button></div>";
				$("#content").append(showDivs);
			}
			if(knIzKategorije[i].kolicinaUMagacinu==0 && knIzKategorije.length == 1){
				$("#content").append("<div style='color:#FF0000;border:#FF0000; background-color:#FFCCFF;font-family:Raleway-Light;font-weight:bold;font-size:32px'>Ne postoje komadi nameštaja u zadatoj kategoriji.</div>");
			}
		}
	}

	/*PONOVO ISCRTAJ PRETRAGU*/
	$("#komadiNamestaja_pretraga").children().remove();
	var zaAppend = "";
	zaAppend = "<p class='title'>Pretraga komada nameštaja</p> <label for='naziv_kn_input' class='naziv_kn_label'>Naziv:</label> <input type='text' id='naziv_kn_input' /> <label for='cena_od_kn_input' class='cena_od_kn_label'>Cena od:</label> <input type='number' id='cena_od_kn_input' value='0' min='0'/> <label for='cena_do_kn_input' class='cena_do_kn_label'>Cena do:</label> <input type='number' id='cena_do_kn_input' min='0'/> <label for='kolicina_kn_input' class='kolicina_kn_label'>Količina:</label> <input type='number' id='kolicina_kn_input' value='0' min='0'/> <label for='kategorija_kn_input' class='kategorija_kn_label'>Kategorija:</label> <select id='kategorija_kn_input'></select> <label for='zemlja_kn_input' class='zemlja_kn_label'>Zemlja proizvodnje:</label> <select id='zemlja_kn_input'></select> <label for='godina_kn_input' class='godina_kn_label'>Godina proizvodnje:</label> <select id='godina_kn_input'></select> <label for='boja_kn_input' class='godina_kn_label'>Boja:</label> <select id='boja_kn_input'></select> <label for='nazivp_kn_input' class='nazivp_kn_label'>Naziv proizvođača:</label> <select id='nazivp_kn_input'></select> <button type='button' class='trazi'>traži</button>";
	$("#komadiNamestaja_pretraga").append(zaAppend);
	 ispuniSelekcije();

}

function prikaziDodatneUsluge(){
	//DOBAVI DODATNE USLUGE
	var dodatneUsluge = [];
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
		}).done(function(data){dodatneUsluge = JSON.parse(data)});	
			
		$.ajaxSetup({async:true});
		
		
		$("#content").children().remove();
		$("#body").find(".tabela_sa_podacima_o_kupovini").remove();
		if(dodatneUsluge.length == 0){
			$("#content").append("<div style='color:#FF0000;border:#FF0000; background-color:#FFCCFF;font-family:Raleway-Light;font-weight:bold;font-size:32px'>Ne postoje dodatne usluge! Hvala na razumevanju.</div>");
		}
		else{
			for(var i = 0; i < dodatneUsluge.DodatneUsluge.length; i++){
				showDivs = "<div><p class='besplatne_du_title'>"+dodatneUsluge.DodatneUsluge[i].naziv+"</p>";
				showDivs += "<p class='besplatne_du_opis'>"+dodatneUsluge.DodatneUsluge[i].opis+"</p>";
				showDivs += "<p class='besplatne_du_cena'>Cena:<strong>"+dodatneUsluge.DodatneUsluge[i].cena+"</strong> din.</p>";
				showDivs += "<button type='button' class='naplatne_du_kupi' value='"+dodatneUsluge.DodatneUsluge[i].naziv+"'>U korpu</button></div>";
				$("#content").append(showDivs);
			}
		}
		$(".naplatne_du_kupi").click(
				function(){
					kupiDodatnuUslugu($(this),1);
				}
		);
		
		//pretraga za dodatne usluge
		$("#komadiNamestaja_pretraga").children().remove();
		var zaAppend = "";
		zaAppend = "<p class='title'>Pretraga dodatnih usluga</p><label for='naziv_kn_input' class='naziv_kn_label'>Naziv:</label><input type='text' id='naziv_kn_input' />";
		zaAppend += "<label for='cena_od_kn_input' class='cena_od_kn_label'>Opis:</label><input type='text' id='cena_od_kn_input' />";
		zaAppend += "<button type='button' class='trazi'>traži</button>";
		$("#komadiNamestaja_pretraga").append(zaAppend);
		var width = $("#naziv_kn_input").css("width");
		$("#cena_od_kn_input").css("width",width);

		$(".trazi").css("top","100px");
		$(".trazi").click(
				function (){
					doOnTextChangeDodatne();
				}
		);
}

function kupiDodatnuUslugu(polje,besplatna){

		/*Akcija dodavanja proizvoda u korpu*/
		var vecIspisano = false;
		var success = false;
	   	$.ajaxSetup({async:false});
		$.ajax({
			  url: "../dodajUKorpuDodatnuUslugu",
			  type: 'post',

			  data: {
				  dodatnaUslugaPodaci:JSON.stringify({
			  	 parametar:polje.val()+","+besplatna
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
				if(data=="vec_dodato"){
					ispisiGresku("Usluga je već dodata!");
					vecIspisano = true;
				}else{	
				success = JSON.parse(data)
				}
				});
		
		if(success==true){
			iscrtajKorpuUUgluPosleUklanjanja();
		}
		else if(vecIspisano == true){
			return;
		}
		else{
			ispisiGresku();
		}
}
function ispisiGresku(poruka){
 	$("#container").find("#dialog_black_background").remove();
  	$("#container").find(".dialog_warning_container").children().remove();
  	$("#container").find(".dialog_warning_container").remove();
  	$("#container").append("<div id='dialog_black_background'></div>");
	$("#container").append("<div class='dialog_warning_container'></div>");
	
	var dialogSaloniContent = "";
	dialogSaloniContent = "<div class='dialog_header_container'> <p class='dialog_header_title'>GRESKA!</p> <p class='dialog_header_exit'>X</p> </div> <div class='dialog_body_container'> <p class='dialog_body_txt'>"+poruka+"</p><button type='button' class='dialog_warning_odustani'>odustani</button> </div>";
	$(".dialog_warning_container").append(dialogSaloniContent);
	$(".dialog_warning_container").hide();
	$(".dialog_warning_container").slideDown();
	el = document.getElementById("dialog_black_background");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$(".dialog_header_exit").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_warning_container").remove();
    		$(".dialog_warning_container").hide();
    		return;
		}		
	)
	$(".dialog_warning_odustani").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_warning_container").remove();
    		$(".dialog_warning_container").hide();
			return;
		}	
	);
}
