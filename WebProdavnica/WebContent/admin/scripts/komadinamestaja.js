//funkcija rukuje dodavanjem, izmenom, brisanjem i prikazom komada namestaja
function fn_komadiNamestaja(){
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
	    	    	$('#content').children().remove();
	    	    	$('#content').append("<div id='komadiNamestaja_container'><div id='table_container'></div></div>");
	    	    	$('#content').hide();
	    	    	$('#content').fadeIn(1000);
	    			//alert("Data: "+data);
	                komadiNamestaja = JSON.parse(data);
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
					for(var i = 0; i < komadiNamestaja.KomadiNamestaja.length; i++){
						var spanClass="";
						var tbodyContentString = "<tr><td>"+komadiNamestaja.KomadiNamestaja[i].sifra+"</td><td>"+komadiNamestaja.KomadiNamestaja[i].naziv;
						tbodyContentString += "</td><td>"+komadiNamestaja.KomadiNamestaja[i].boja+"</td><td>"+komadiNamestaja.KomadiNamestaja[i].zemljaProizvodnje;
						tbodyContentString += "</td><td>"+komadiNamestaja.KomadiNamestaja[i].nazivProizvodjaca+"</td><td>"+komadiNamestaja.KomadiNamestaja[i].jedinicnaCena;
						tbodyContentString += "</td><td>"+komadiNamestaja.KomadiNamestaja[i].kolicinaUMagacinu+"</td><td>";
						tbodyContentString += komadiNamestaja.KomadiNamestaja[i].kategorija+"</td>";
						tbodyContentString += "<td>"+komadiNamestaja.KomadiNamestaja[i].godinaProizvodnje+"</td>";
						tbodyContentString += "<td>"+komadiNamestaja.KomadiNamestaja[i].salon+"</td>";
						tbodyContentString += "<td><img src='"+komadiNamestaja.KomadiNamestaja[i].slika+"' width='64px' height='64px' alt='"+komadiNamestaja.KomadiNamestaja[i].sifra+"'/></td>";
						tbodyContentString += "<td>"+"ima"+"</td>";//komadiNamestaja.KomadiNamestaja[i].video
						tbodyContentString += "<td><input type='hidden' value='"+komadiNamestaja.KomadiNamestaja[i].sifra+"' id='"+komadiNamestaja.KomadiNamestaja[i].sifra+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+komadiNamestaja.KomadiNamestaja[i].sifra+"'></button></td>";
						tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+komadiNamestaja.KomadiNamestaja[i].sifra+"'></button></td></tr>";
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
		);
	$.ajaxSetup({async:true});
}

function paginacija(){
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
}

function emptyField(field){
	if(field.val() == "" || field.val() == undefined || field.val() == null){
		field.css("border-color","#ff0000");
		return true;
	}else{
		field.css("border-color","#7fc001");
		return false;
	}
}

//niz funkcija za proveru da li postoje takva polja
function sifraPostoji(){
	for(var i = 0; i < komadiNamestaja.KomadiNamestaja.length; i++){
		if(komadiNamestaja.KomadiNamestaja[i].sifra == $("#dialog_komadanamestaja_sifra_input").val()){
			if(document.getElementById("sifra_postoji") == null)
			{
				$(".dialog_komadnamestaja_container").append("<div id='sifra_postoji'>Sifra postoji!</div>");
				$("#dialog_komadanamestaja_sifra_input").css("border-color","#ff0000");
			}
			return true;
		}
	}
	if(document.getElementById("sifra_postoji") != null)
	{
		$("#sifra_postoji").remove();
		$("#dialog_komadanamestaja_sifra_input").css("border-color","#7fc001");
		return false;
	}
	return false;
}

//niz funkcija za proveru da li postoje takva polja
function sifraPostoji(tekucaSifra){
	for(var i = 0; i < komadiNamestaja.KomadiNamestaja.length; i++){
		if(komadiNamestaja.KomadiNamestaja[i].sifra  == $("#dialog_komadanamestaja_sifra_input").val() &&$("#dialog_komadanamestaja_sifra_input").val()!= tekucaSifra ){
			if(document.getElementById("sifra_postoji") == null)
			{
				$(".dialog_komadnamestaja_container").append("<div id='sifra_postoji'>Sifra postoji!</div>");
				$("#dialog_komadanamestaja_sifra_input").css("border-color","#ff0000");
			}
			return true;
		}
	}
	if(document.getElementById("sifra_postoji") != null)
	{
		$("#sifra_postoji").remove();
		$("#dialog_komadanamestaja_sifra_input").css("border-color","#7fc001");
		return false;
	}
	return false;
}
function cenaGreska(field){
	var result;
	result = /^[0-9]+(\.[0-9]{1,2})?$/.test(field[0].value);
	if(result == false){
		if(document.getElementById("cena_greska") == null)
			$(".dialog_komadnamestaja_container").append("<div id='cena_greska'>Cena mora biti razlomljen ili ceo broj!(1,12 npr)</div>");
		return true;
	}
	else{
		if(document.getElementById("cena_greska") != null)
			$("#cena_greska").remove();
		return false;
	}
}

function kolicinaGreska(field){
			var result;
			result = /^\+?(0|[1-9]\d*)$/.test(field[0].value);
			if(result == false){
				if(document.getElementById("kolicina_greska") == null)
					$(".dialog_komadnamestaja_container").append("<div id='kolicina_greska'>Kolicina mora biti ceo broj!</div>");
				return true;
			}
			else{
				if(document.getElementById("kolicina_greska") != null)
					$("#kolicina_greska").remove();
				return false;
			}
}

function godinaGreska(field){
			var result;
			result = /^\+?(0|[1-9]\d*)$/.test(field[0].value);
			if(result == false){
				if(document.getElementById("godina_greska") == null)
					$(".dialog_komadnamestaja_container").append("<div id='godina_greska'>Godina mora biti ceo broj!</div>");
				return true;
			}
			else{
				if(document.getElementById("godina_greska") != null)
					$("#godina_greska").remove();
				return false;
			}
}
//niz funkcija za proveru onoga sta je uneseno
function daLiJeCeoBroj(field){
	return /^\+?(0|[1-9]\d*)$/.test(field[0].value);
}
function daLiJeRazlomljeniBroj(field){
    return /^[0-9]+(\.[0-9]{1,2})?$/.test(field[0].value);
}

//funkcija dodaj komad namestaja
function dodajKomadNamestaja(){
	//pokupi komade u slucaju da je bilo promena
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
	
	

	//
  	$("#container").find("#dialog_black_background").remove();
  	$("#container").find(".dialog_saloni").children().remove();
  	$("#container").find(".dialog_saloni").remove();
  	$("#container").append("<div id='dialog_black_background'></div>");
	$("#container").append("<div class='dialog_komadnamestaja_container'></div>");
	
	var dialogSaloniContent = "";
	dialogSaloniContent = " <div class='dialog_komadanamestaja_header'> <p class='dialog_komadanamestaja_header_title'>Dodavanje Novog Komada Nameštaja</p> <button type='button' class='dialog_komadanamestaja_header_exit'>X</button> </div> <div class='dialog_komadanamestaja_body'> <div class='dialog_komadanamestaja_sifra_field'> <p class='dialog_komadanamestaja_sifra_label'>Šifra:</p> <input type='text' id='dialog_komadanamestaja_sifra_input' maxlength='18' /> </div> <div class='dialog_komadanamestaja_naziv_field'> <p class='dialog_komadanamestaja_naziv_label'>Naziv:</p> <input type='text' id='dialog_komadanamestaja_naziv_input' maxlength='64' /> </div> <div class='dialog_komadanamestaja_boja_field'> <p class='dialog_komadanamestaja_boja_label'>Boja:</p> <input type='text' id='dialog_komadanamestaja_boja_input' maxlength='64' /> </div> <div class='dialog_komadanamestaja_zemlja_field'> <p class='dialog_komadanamestaja_zemlja_label'>Zemlja proizvodnje:</p> <input type='text' id='dialog_komadanamestaja_zemlja_input' maxlength='86' /> </div> <div class='dialog_komadanamestaja_proizvodjac_field'> <p class='dialog_komadanamestaja_proizvodjac_label'>Proizvođač:</p> <input type='text' id='dialog_komadanamestaja_proizvodjac_input' maxlength='86' /> </div> <div class='dialog_komadanamestaja_cena_field'> <p class='dialog_komadanamestaja_cena_label'>Jedinična cena:</p> <input type='text' id='dialog_komadanamestaja_cena_input' maxlength='86' /> </div> <div class='dialog_komadanamestaja_kolicina_field'> <p class='dialog_komadanamestaja_kolicina_label'>Količina:</p> <input type='number' id='dialog_komadanamestaja_kolicina_input' min='0'  /> </div> <div class='dialog_komadanamestaja_kategorija_field'> <p class='dialog_komadanamestaja_kategorija_label'>Kategorija nameštaja:</p> <select class='dialog_komadanamestaja_kategorija_select'> </select> </div> <div class='dialog_komadanamestaja_datum_field'> <p class='dialog_komadanamestaja_datum_label'>Godina proizvodnje:</p> <input type='number' min='1' max='2015' id='dialog_komadanamestaja_datum_input' /> </div> <div class='dialog_komadanamestaja_salon_field'> <p class='dialog_komadanamestaja_salon_label'>Salon:</p> <select class='dialog_komadanamestaja_salon_select'> </select> </div> <div class='dialog_komadanamestaja_upload_field'> <p class='dialog_komadanamestaja_upload_label'>Slika:</p> <div class='upload'> <input type='file' id='dialog_komadanamestaja_upload_input' name='dialog_komadanamestaja_upload_input' accept='image/*' onchange='changePicturePath()' /> </div> <!-- <div id='dodaj_dugme_upload'><input id='uploadBtn' type='button' value='Dodaj' onClick='performAjaxSubmit();'></input></div>--> <input type='text' id='upload_path' disabled/> <p class='dialog_komadanamestaja_upload_video_label'>Video:</p> <div class='upload_video'> <input type='file' id='dialog_komadanamestaja_upload_video_input' name='dialog_komadanamestaja_video_input' accept='video/*' onchange='changeVideoPath()'/> </div> <!--<div id='dodaj_dugme_upload_video'><input id='uploadBtn' type='button' value='Dodaj' onClick='performAjaxSubmit();'></input></div>--> <input type='text' id='upload_video_path' disabled/> </div><input type='hidden' id='slika_sifra_hidden' /> <input type='hidden' id='video_sifra_hidden' /></div>";
	dialogSaloniContent += "<button type='button' class='dodaj_komadnamestaja'>DODAJ KOMAD NAMEŠTAJA</button>";
	$(".dialog_komadnamestaja_container").append(dialogSaloniContent);
	var komadiKategorije = [];
	var komadiSaloni = [];

	/*Pokupi kategorije*/
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
			komadiKategorije = JSON.parse(data);
		});
	$.ajaxSetup({async:true});
	/*Pokupi salone*/
   	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../table",
		  type: 'get',

		  data: {
		   tabelaPodaci:JSON.stringify({
		  	 parametar:"saloni"
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
			komadiSaloni = JSON.parse(data);
		});
	$.ajaxSetup({async:true});
	
	//popuni selekciju za kategorije
	var komadiSelectionItems="";
	for(var j = 0; j < komadiKategorije.Kategorije.length; j++){
		for(var i = 0; i < komadiKategorije.Kategorije[j].length; i++){
			komadiSelectionItems +="<option value='"+komadiKategorije.Kategorije[j][i].naziv+"'>"+komadiKategorije.Kategorije[j][i].naziv+"</option>";
		}
	}
	$(".dialog_komadanamestaja_kategorija_select").append(komadiSelectionItems);
	//popuni selekciju za salone
	komadiSelectionItems="";
	for(var i = 0; i < komadiSaloni.Saloni.length; i++){
		komadiSelectionItems +="<option value='"+komadiSaloni.Saloni[i].pib+"'>"+komadiSaloni.Saloni[i].naziv+"</option>";

	}
	$(".dialog_komadanamestaja_salon_select").append(komadiSelectionItems);
	
	
	$(".dialog_komadnamestaja_container").hide();
	$(".dialog_komadnamestaja_container").slideDown();
	el = document.getElementById("dialog_black_background");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$(".dialog_komadanamestaja_header_exit").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_komadnamestaja_container").remove();
    		$(".dialog_komadnamestaja_container").hide();
		}		
	)
	


	$("#dialog_komadanamestaja_sifra_input").blur(
			function(){
				if(sifraPostoji() == false)
					emptyField($(this));
			}
	);
	
	$("#dialog_komadanamestaja_naziv_input").blur(
			function(){
				emptyField($(this));
			}
	);
	
	$("#dialog_komadanamestaja_boja_input").blur(
			function(){
				emptyField($(this));
			}
	);
	
	$("#dialog_komadanamestaja_zemlja_input").blur(
			function(){
				emptyField($(this));
			}
	);

	$("#dialog_komadanamestaja_proizvodjac_input").blur(
			function(){
				emptyField($(this));
			}
	);
	
	$("#dialog_komadanamestaja_cena_input").blur(
			function(){
				emptyField($(this));
				cenaGreska($(this));
			}
	);

	$("#dialog_komadanamestaja_cena_input").keyup(
			function(){
				var result;
				result = daLiJeRazlomljeniBroj($(this));
				if(result == false){
					if(document.getElementById("cena_greska") == null)
						$(".dialog_komadnamestaja_container").append("<div id='cena_greska'>Cena mora biti razlomljen ili ceo broj!(1,12 npr)</div>");
				}
				else{
					if(document.getElementById("cena_greska") != null)
						$("#cena_greska").remove();
				}
			}
	);
	
	$("#dialog_komadanamestaja_kolicina_input").blur(
			function(){
				emptyField($(this));
				kolicinaGreska($(this));
			}
	);
	
	$("#dialog_komadanamestaja_kolicina_input").keyup(
			function(){
				var result;
				result = daLiJeCeoBroj($(this));
				if(result == false){
					if(document.getElementById("kolicina_greska") == null)
						$(".dialog_komadnamestaja_container").append("<div id='kolicina_greska'>Kolicina mora biti ceo broj!</div>");
				}
				else{
					if(document.getElementById("kolicina_greska") != null)
						$("#kolicina_greska").remove();
				}
			}
	);
	
	$("#dialog_komadanamestaja_datum_input").blur(
			function(){
				emptyField($(this));
				godinaGreska($(this));
			}
	);
	
	$("#dialog_komadanamestaja_datum_input").keyup(
			function(){
				var result;
				result = daLiJeCeoBroj($(this));
				if(result == false){
					if(document.getElementById("godina_greska") == null)
						$(".dialog_komadnamestaja_container").append("<div id='godina_greska'>Godina mora biti ceo broj!</div>");
				}
				else{
					if(document.getElementById("godina_greska") != null)
						$("#godina_greska").remove();
				}
			}
	);
	
	$("#dialog_komadanamestaja_upload_input").blur(
			function(){
				emptyField($(this));
			}
	);
	
	
	
	
	$(".dodaj_komadnamestaja").click(
			function(){
				var e1 = emptyField($("#dialog_komadanamestaja_sifra_input"));
				var e2 = emptyField($("#dialog_komadanamestaja_naziv_input"));
				var e3 = emptyField($("#dialog_komadanamestaja_boja_input"));
				var e4 = emptyField($("#dialog_komadanamestaja_zemlja_input"));
				var e5 = emptyField($("#dialog_komadanamestaja_proizvodjac_input"));
				var e6 = emptyField($("#dialog_komadanamestaja_cena_input"));
				var e7 = emptyField($("#dialog_komadanamestaja_kolicina_input"));
				var e8 = emptyField($("#dialog_komadanamestaja_datum_input"));
				var e9 = emptyField($("#upload_path"));
				//var e10 = emptyField($("#upload_video_path"));
				var e11 = cenaGreska($("#dialog_komadanamestaja_cena_input"));
				var e12 = kolicinaGreska($("#dialog_komadanamestaja_kolicina_input"));
				var e13 = godinaGreska($("#dialog_komadanamestaja_datum_input"));
				if(e1 == true || e2 == true ||e3 == true ||e4 == true ||e5 == true ||e5 == true ||e7 == true || e8 == true || e9 == true  || e11 == true || e12==true || e13==true){
					if(document.getElementById("praznaPolja") == null)
					{
						$(".dialog_komadnamestaja_container").append("<div id='praznaPolja'>Polja uokvirena crvenom ne smeju biti prazna!</div>");
					}
				}
				else if(e1 == false && e2 == false && e3 == false && e4 == false && e5 == false && e5 == false && e7 == false && e8 == false && e9 == false  && e11 == false && e12==false && e13==false) {

					if(document.getElementById("praznaPolja") != null)
					{
						$("#praznaPolja").remove();
					}
					//uploaduj na server
					$("#slika_sifra_hidden").val($("#dialog_komadanamestaja_sifra_input").val());
					performAjaxSubmitSlika();
					
					if(emptyField($("#upload_video_path")) == false){
						$("#video_sifra_hidden").val($("#dialog_komadanamestaja_sifra_input").val());
						performAjaxSubmitVideo();
					}
					
					//nadjiKategoriju
					var kategorijaZaSlanje = null;
					var nazivZaSlanje = "";
					for(var j = 0; j < komadiKategorije.Kategorije.length; j++){
						for(var i = 0; i < komadiKategorije.Kategorije[j].length; i++){
							if(komadiKategorije.Kategorije[j][i].naziv == $(".dialog_komadanamestaja_kategorija_select").val()){
								kategorijaZaSlanje = komadiKategorije.Kategorije[j][i];
								nazivZaSlanje = komadiKategorije.Kategorije[j][i].naziv
								break;
							}
						}
					}

					//nadji salon
					var salonZaSlanje = null;
					var pibZaSlanje = "";
					for(var i = 0; i < komadiSaloni.Saloni.length; i++){
						if(komadiSaloni.Saloni[i].pib == $(".dialog_komadanamestaja_salon_select").val()){
							salonZaSlanje=komadiSaloni.Saloni[i];
							pibZaSlanje = komadiSaloni.Saloni[i].pib;
							break;
						}
					}
					
					var zaPoslati =$("#dialog_komadanamestaja_sifra_input").val()+",";
					zaPoslati +=$("#dialog_komadanamestaja_naziv_input").val()+",";
					zaPoslati +=$("#dialog_komadanamestaja_boja_input").val()+",";
					zaPoslati +=$("#dialog_komadanamestaja_zemlja_input").val()+",";
					zaPoslati +=$("#dialog_komadanamestaja_proizvodjac_input").val()+",";
					zaPoslati +=$("#dialog_komadanamestaja_cena_input").val()+",";
					zaPoslati +=$("#dialog_komadanamestaja_kolicina_input").val()+",";
					zaPoslati +=$("#dialog_komadanamestaja_datum_input").val()+",";
					zaPoslati +=nazivZaSlanje+",";
					zaPoslati +=pibZaSlanje;
					$.ajaxSetup({async:false});
				  	$.ajax({
				  		  url: "../dodajKomadNamestaja",
				  		  type: 'post',
				
				  		  data: {
				  		   komadNamestajaPodaci:JSON.stringify({
				  			   /*
				  		  	 sifra: $("#dialog_komadanamestaja_sifra_input").val(),
				  		  	 naziv:$("#dialog_komadanamestaja_naziv_input").val(),
				  		  	 boja:$("#dialog_komadanamestaja_boja_input").val(),
				  		  	 zemljaProizvodnje:$("#dialog_komadanamestaja_zemlja_input").val(),
				  		  	 nazivProizvodjaca:$("#dialog_komadanamestaja_proizvodjac_input").val(),
				  		     jedinicnaCena:$("#dialog_komadanamestaja_cena_input").val(),
				  		     kolicinaUMagacinu:$("#dialog_komadanamestaja_kolicina_input").val(),
				  		     godinaProizvodnje:$("#dialog_komadanamestaja_datum_input").val(),
				  		  	 akcija:null,
				  		     kategorija:kategorijaZaSlanje,
				  		     slika:null,
				  		     video:null,
				  		     salon:salonZaSlanje
				  		     */
				  			   parametar:zaPoslati
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
					  				var komadnamestajaJSON=null;
				  					
							  		if(data == "greska"){
							    		el = document.getElementById("dialog_black_background");
							    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
							    		$(".dialog_komadnamestaja_container").children.remove();
							    		$(".dialog_komadnamestaja_container").css({"width": "200px", "height": "100px", "margin-top": "-50px", "margin-left": "-100px"});
							    		$(".dialog_komadnamestaja_container").append("<p>NISTE DOBRO POPUNILI POLJA!</p>");
						  			}
							  		else if(data == "komad_postoji"){
							    		el = document.getElementById("dialog_black_background");
							    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
							    		$(".dialog_komadnamestaja_container").children.remove();
							    		$(".dialog_komadnamestaja_container").css({"width": "200px", "height": "100px", "margin-top": "-50px", "margin-left": "-100px"});
							    		$(".dialog_komadnamestaja_container").append("<p>KOMAD VEC POSTOJI!</p>");
						  			}
							  		else{
							  			komadnamestajaJSON = JSON.parse(data);
					  		    		el = document.getElementById("dialog_black_background");
					  		    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
					  		    		$(".dialog_komadnamestaja_container").remove();
					  		    		$(".dialog_komadnamestaja_container").hide();
										var tbodyContentString = "<tr><td>"+komadnamestajaJSON.KomadNamestaja[0].sifra+"</td><td>"+komadnamestajaJSON.KomadNamestaja[0].naziv;
										tbodyContentString += "</td><td>"+komadnamestajaJSON.KomadNamestaja[0].boja+"</td><td>"+komadnamestajaJSON.KomadNamestaja[0].zemljaProizvodnje;
										tbodyContentString += "</td><td>"+komadnamestajaJSON.KomadNamestaja[0].nazivProizvodjaca+"</td><td>"+komadnamestajaJSON.KomadNamestaja[0].jedinicnaCena;
										tbodyContentString += "</td><td>"+komadnamestajaJSON.KomadNamestaja[0].kolicinaUMagacinu+"</td><td>";
										tbodyContentString += komadnamestajaJSON.KomadNamestaja[0].kategorija+"</td>";
										tbodyContentString += "<td>"+komadnamestajaJSON.KomadNamestaja[0].godinaProizvodnje+"</td>";
										tbodyContentString += "<td>"+komadnamestajaJSON.KomadNamestaja[0].salon+"</td>";
										tbodyContentString += "<td><img src='"+komadnamestajaJSON.KomadNamestaja[0].slika+"' width='64px' height='64px' alt='"+komadnamestajaJSON.KomadNamestaja[0].sifra+"'/></td>";
										tbodyContentString += "<td>"+"ima"+"</td>";//komadiNamestaja.KomadiNamestaja[i].video
										tbodyContentString += "<td><input type='hidden' value='"+komadiNamestaja.KomadiNamestaja[i].sifra+"' id='"+komadnamestajaJSON.KomadNamestaja[0].sifra+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+komadnamestajaJSON.KomadNamestaja[0].sifra+"'></button></td>";
										tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+komadnamestajaJSON.KomadNamestaja[0].sifra+"'></button></td></tr>";
										$('.table_body').append(tbodyContentString);
										tbodyContentString = "";
						  			}
									//obrisi komad namestaja
									$(".obrisi_korisnika").click(
							    			function(){
							    				obrisiKomadNamestaja($(this));
							    			}	
							    		);
								
								
								
								
								//izmeni korisnika
									$(".izmeni_korisnika").click(
											function(){
												izmeniKomadNamestaja($(this));
												}
											);
				  				}
				  		);
					
							
				}
				
			}
	);

	$.ajaxSetup({async:true});
}

function performAjaxSubmitSlika() {
	var uploadItem = document.getElementById("dialog_komadanamestaja_upload_input").files[0];
	var oznaka = document.getElementById("slika_sifra_hidden").value;
	oznaka+="_slika";
	var formdata = new FormData();
	formdata.append("slika_sifra_hidden",oznaka);
	formdata.append("dialog_komadanamestaja_upload_input", uploadItem);	  
	
	var xhr = new XMLHttpRequest();
	
	xhr.open("POST","/WebProdavnica/fileUpload", true);
	xhr.send(formdata);
	
	xhr.onload = function(e) {
			if (this.status == 200) {
			   alert(this.responseText);
			}
	};	        		
}
function performAjaxSubmitVideo() {
	var oznaka = document.getElementById("video_sifra_hidden").value;
	var uploadItem = document.getElementById("dialog_komadanamestaja_upload_video_input").files[0];
	oznaka+="_video";
	var formdata = new FormData();
	formdata.append("video_sifra_hidden",oznaka);
	formdata.append("dialog_komadanamestaja_upload_video_input", uploadItem);	        		
	var xhr = new XMLHttpRequest();
	
	xhr.open("POST","/WebProdavnica/fileUpload", true);
	xhr.send(formdata);
	
	xhr.onload = function(e) {
			if (this.status == 200) {
			   alert(this.responseText);
			}
	};	        		
}

function changePicturePath() {
	var uploadItem = document.getElementById("dialog_komadanamestaja_upload_input").files[0];
	$("#upload_path").val(uploadItem.name);	   
	$("#upload_path").css("border-color","#7fc001")
}
function changeVideoPath() {
	var uploadItem = document.getElementById("dialog_komadanamestaja_upload_video_input").files[0];
	$("#upload_video_path").val(uploadItem.name);	 
	$("#upload_video_path").css("border-color","#7fc001")
}

function izmeniKomadNamestaja(dugme){
	var komadNamestajaJSON;
	//pokupi komade u slucaju da je bilo promena
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
	/*ISCRTAJ DIJALOG*/
  	$("#container").find("#dialog_black_background").remove();
  	$("#container").find(".dialog_saloni").children().remove();
  	$("#container").find(".dialog_saloni").remove();
  	$("#container").append("<div id='dialog_black_background'></div>");
	$("#container").append("<div class='dialog_komadnamestaja_container'></div>");
	var dialogSaloniContent = "";
	dialogSaloniContent = " <div class='dialog_komadanamestaja_header'> <p class='dialog_komadanamestaja_header_title'>Dodavanje Novog Komada Nameštaja</p> <button type='button' class='dialog_komadanamestaja_header_exit'>X</button> </div> <div class='dialog_komadanamestaja_body'> <div class='dialog_komadanamestaja_sifra_field'> <p class='dialog_komadanamestaja_sifra_label'>Šifra:</p> <input type='text' id='dialog_komadanamestaja_sifra_input' maxlength='18' disabled/> </div> <div class='dialog_komadanamestaja_naziv_field'> <p class='dialog_komadanamestaja_naziv_label'>Naziv:</p> <input type='text' id='dialog_komadanamestaja_naziv_input' maxlength='64' /> </div> <div class='dialog_komadanamestaja_boja_field'> <p class='dialog_komadanamestaja_boja_label'>Boja:</p> <input type='text' id='dialog_komadanamestaja_boja_input' maxlength='64' /> </div> <div class='dialog_komadanamestaja_zemlja_field'> <p class='dialog_komadanamestaja_zemlja_label'>Zemlja proizvodnje:</p> <input type='text' id='dialog_komadanamestaja_zemlja_input' maxlength='86' /> </div> <div class='dialog_komadanamestaja_proizvodjac_field'> <p class='dialog_komadanamestaja_proizvodjac_label'>Proizvođač:</p> <input type='text' id='dialog_komadanamestaja_proizvodjac_input' maxlength='86' /> </div> <div class='dialog_komadanamestaja_cena_field'> <p class='dialog_komadanamestaja_cena_label'>Jedinična cena:</p> <input type='text' id='dialog_komadanamestaja_cena_input' maxlength='86' /> </div> <div class='dialog_komadanamestaja_kolicina_field'> <p class='dialog_komadanamestaja_kolicina_label'>Količina:</p> <input type='number' id='dialog_komadanamestaja_kolicina_input' min='0'  /> </div> <div class='dialog_komadanamestaja_kategorija_field'> <p class='dialog_komadanamestaja_kategorija_label'>Kategorija nameštaja:</p> <select class='dialog_komadanamestaja_kategorija_select'> </select> </div> <div class='dialog_komadanamestaja_datum_field'> <p class='dialog_komadanamestaja_datum_label'>Godina proizvodnje:</p> <input type='number' min='1' max='2015' id='dialog_komadanamestaja_datum_input' /> </div> <div class='dialog_komadanamestaja_salon_field'> <p class='dialog_komadanamestaja_salon_label'>Salon:</p> <select class='dialog_komadanamestaja_salon_select'> </select> </div> <div class='dialog_komadanamestaja_upload_field'> <p class='dialog_komadanamestaja_upload_label'>Slika:</p> <div class='upload'> <input type='file' id='dialog_komadanamestaja_upload_input' name='dialog_komadanamestaja_upload_input' accept='image/*' onchange='changePicturePath()' /> </div> <!-- <div id='dodaj_dugme_upload'><input id='uploadBtn' type='button' value='Dodaj' onClick='performAjaxSubmit();'></input></div>--> <input type='text' id='upload_path' disabled/> <p class='dialog_komadanamestaja_upload_video_label'>Video:</p> <div class='upload_video'> <input type='file' id='dialog_komadanamestaja_upload_video_input' name='dialog_komadanamestaja_video_input' accept='video/*' onchange='changeVideoPath()'/> </div> <!--<div id='dodaj_dugme_upload_video'><input id='uploadBtn' type='button' value='Dodaj' onClick='performAjaxSubmit();'></input></div>--> <input type='text' id='upload_video_path' disabled/> </div><input type='hidden' id='slika_sifra_hidden' /> <input type='hidden' id='video_sifra_hidden' /></div>";
	dialogSaloniContent += "<button type='button' class='izmeni_komadnamestaja'>IZMENI KOMAD NAMEŠTAJA</button>";
	$(".dialog_komadnamestaja_container").append(dialogSaloniContent);
	var komadiKategorije = [];
	var komadiSaloni = [];

	/*Pokupi kategorije*/
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
			komadiKategorije = JSON.parse(data);
		});
	$.ajaxSetup({async:true});
	/*Pokupi salone*/
   	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../table",
		  type: 'get',

		  data: {
		   tabelaPodaci:JSON.stringify({
		  	 parametar:"saloni"
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
			komadiSaloni = JSON.parse(data);
		});
	$.ajaxSetup({async:true});
	
	//popuni selekciju za kategorije
	var komadiSelectionItems="";
	for(var j = 0; j < komadiKategorije.Kategorije.length; j++){
		for(var i = 0; i < komadiKategorije.Kategorije[j].length; i++){
			komadiSelectionItems +="<option value='"+komadiKategorije.Kategorije[j][i].naziv+"'>"+komadiKategorije.Kategorije[j][i].naziv+"</option>";
		}
	}
	$(".dialog_komadanamestaja_kategorija_select").append(komadiSelectionItems);
	//popuni selekciju za salone
	komadiSelectionItems="";
	for(var i = 0; i < komadiSaloni.Saloni.length; i++){
		komadiSelectionItems +="<option value='"+komadiSaloni.Saloni[i].pib+"'>"+komadiSaloni.Saloni[i].naziv+"</option>";

	}
	$(".dialog_komadanamestaja_salon_select").append(komadiSelectionItems);
	
	
	$(".dialog_komadnamestaja_container").hide();
	$(".dialog_komadnamestaja_container").slideDown();
	el = document.getElementById("dialog_black_background");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$(".dialog_komadanamestaja_header_exit").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_komadnamestaja_container").remove();
    		$(".dialog_komadnamestaja_container").hide();
		}		
	)
	/*KRAJ ISCRTAVANJA*/
	/*NADJI KOMAD ZA IZMENU*/
	var komadZaIzmenu = null;
	for(var i = 0; i < komadiNamestaja.KomadiNamestaja.length; i++){
		if(dugme.val() == komadiNamestaja.KomadiNamestaja[i].sifra){
			komadZaIzmenu = komadiNamestaja.KomadiNamestaja[i];
			break;
		} 
	}
	/*KRAJ PRETRAGE KOMADA ZA IZMENU*/
	
	/*POPUNI POLJA*/
	$("#dialog_komadanamestaja_sifra_input").val(komadZaIzmenu.sifra+"");
	$("#dialog_komadanamestaja_naziv_input").val(komadZaIzmenu.naziv+"");
	$("#dialog_komadanamestaja_boja_input").val(komadZaIzmenu.boja+"");
	$("#dialog_komadanamestaja_zemlja_input").val(komadZaIzmenu.zemljaProizvodnje+"");
	$("#dialog_komadanamestaja_proizvodjac_input").val(komadZaIzmenu.nazivProizvodjaca+"");
	$("#dialog_komadanamestaja_cena_input").val(komadZaIzmenu.jedinicnaCena+"");
	$("#dialog_komadanamestaja_kolicina_input").val(komadZaIzmenu.kolicinaUMagacinu+"");
	$("#dialog_komadanamestaja_datum_input").val(komadZaIzmenu.godinaProizvodnje+"");
	$("#upload_path").val(komadZaIzmenu.slika+"");
	$("#upload_video_path").val(komadZaIzmenu.video+"");
	$(".dialog_komadanamestaja_kategorija_select option[value='"+komadZaIzmenu.kategorija+"']").attr('selected','selected');
	$(".dialog_komadanamestaja_salon_select option[value='"+komadZaIzmenu.salon+"']").attr('selected','selected');
	
	$("#dialog_komadanamestaja_sifra_input").css("border","none");
	/*KRAJ POPUNE*/
	
	/*PROVERI POLJA*/
	$("#dialog_komadanamestaja_sifra_input").blur(
			function(){
				if(sifraPostoji(komadZaIzmenu.sifra) == false)
					emptyField($(this));
			}
	);
	
	$("#dialog_komadanamestaja_naziv_input").blur(
			function(){
				emptyField($(this));
			}
	);
	
	$("#dialog_komadanamestaja_boja_input").blur(
			function(){
				emptyField($(this));
			}
	);
	
	$("#dialog_komadanamestaja_zemlja_input").blur(
			function(){
				emptyField($(this));
			}
	);

	$("#dialog_komadanamestaja_proizvodjac_input").blur(
			function(){
				emptyField($(this));
			}
	);
	
	$("#dialog_komadanamestaja_cena_input").blur(
			function(){
				emptyField($(this));
				cenaGreska($(this));
			}
	);

	$("#dialog_komadanamestaja_cena_input").keyup(
			function(){
				var result;
				result = daLiJeRazlomljeniBroj($(this));
				if(result == false){
					if(document.getElementById("cena_greska") == null)
						$(".dialog_komadnamestaja_container").append("<div id='cena_greska'>Cena mora biti razlomljen ili ceo broj!(1,12 npr)</div>");
				}
				else{
					if(document.getElementById("cena_greska") != null)
						$("#cena_greska").remove();
				}
			}
	);
	
	$("#dialog_komadanamestaja_kolicina_input").blur(
			function(){
				emptyField($(this));
				kolicinaGreska($(this));
			}
	);
	
	$("#dialog_komadanamestaja_kolicina_input").keyup(
			function(){
				var result;
				result = daLiJeCeoBroj($(this));
				if(result == false){
					if(document.getElementById("kolicina_greska") == null)
						$(".dialog_komadnamestaja_container").append("<div id='kolicina_greska'>Kolicina mora biti ceo broj!</div>");
				}
				else{
					if(document.getElementById("kolicina_greska") != null)
						$("#kolicina_greska").remove();
				}
			}
	);
	
	$("#dialog_komadanamestaja_datum_input").blur(
			function(){
				emptyField($(this));
				godinaGreska($(this));
			}
	);
	
	$("#dialog_komadanamestaja_datum_input").keyup(
			function(){
				var result;
				result = daLiJeCeoBroj($(this));
				if(result == false){
					if(document.getElementById("godina_greska") == null)
						$(".dialog_komadnamestaja_container").append("<div id='godina_greska'>Godina mora biti ceo broj!</div>");
				}
				else{
					if(document.getElementById("godina_greska") != null)
						$("#godina_greska").remove();
				}
			}
	);
	
	$("#dialog_komadanamestaja_upload_input").blur(
			function(){
				emptyField($(this));
			}
	);
	/*KRAJ PROVERE*/
	$(".izmeni_komadnamestaja").click(
			function(){
				var e1 = emptyField($("#dialog_komadanamestaja_sifra_input"));
				var e2 = emptyField($("#dialog_komadanamestaja_naziv_input"));
				var e3 = emptyField($("#dialog_komadanamestaja_boja_input"));
				var e4 = emptyField($("#dialog_komadanamestaja_zemlja_input"));
				var e5 = emptyField($("#dialog_komadanamestaja_proizvodjac_input"));
				var e6 = emptyField($("#dialog_komadanamestaja_cena_input"));
				var e7 = emptyField($("#dialog_komadanamestaja_kolicina_input"));
				var e8 = emptyField($("#dialog_komadanamestaja_datum_input"));
				var e9 = emptyField($("#upload_path"));
				//var e10 = emptyField($("#upload_video_path"));
				var e11 = cenaGreska($("#dialog_komadanamestaja_cena_input"));
				var e12 = kolicinaGreska($("#dialog_komadanamestaja_kolicina_input"));
				var e13 = godinaGreska($("#dialog_komadanamestaja_datum_input"));
				if(e1 == true || e2 == true ||e3 == true ||e4 == true ||e5 == true ||e5 == true ||e7 == true || e8 == true || e9 == true  || e11 == true || e12==true || e13==true){
					if(document.getElementById("praznaPolja") == null)
					{
						$(".dialog_komadnamestaja_container").append("<div id='praznaPolja'>Polja uokvirena crvenom ne smeju biti prazna!</div>");
					}
				}
				else if(e1 == false && e2 == false && e3 == false && e4 == false && e5 == false && e5 == false && e7 == false && e8 == false && e9 == false  && e11 == false && e12==false && e13==false) {

					if(document.getElementById("praznaPolja") != null)
					{
						$("#praznaPolja").remove();
					}
					//uploaduj na server
					//var slika_ime = komadZaIzmenu.slika.substr(17);
					if($("#upload_path").val()!=komadZaIzmenu.slika){
						$("#slika_sifra_hidden").val($("#dialog_komadanamestaja_sifra_input").val());
						performAjaxSubmitSlika();
					}
					//var video_ime = komadZaIzmenu.video.substr(17);
					if(komadZaIzmenu.video != $("#upload_video_path").val())
						if(emptyField($("#upload_video_path")) == false){
							$("#video_sifra_hidden").val($("#dialog_komadanamestaja_sifra_input").val());
							performAjaxSubmitVideo();
						}
					
					//nadjiKategoriju
					var kategorijaZaSlanje = null;
					var nazivZaSlanje = "";
					for(var j = 0; j < komadiKategorije.Kategorije.length; j++){
						for(var i = 0; i < komadiKategorije.Kategorije[j].length; i++){
							if(komadiKategorije.Kategorije[j][i].naziv == $(".dialog_komadanamestaja_kategorija_select").val()){
								kategorijaZaSlanje = komadiKategorije.Kategorije[j][i];
								nazivZaSlanje = komadiKategorije.Kategorije[j][i].naziv
								break;
							}
						}
					}

					//nadji salon
					var salonZaSlanje = null;
					var pibZaSlanje = "";
					for(var i = 0; i < komadiSaloni.Saloni.length; i++){
						if(komadiSaloni.Saloni[i].pib == $(".dialog_komadanamestaja_salon_select").val()){
							salonZaSlanje=komadiSaloni.Saloni[i];
							pibZaSlanje = komadiSaloni.Saloni[i].pib;
							break;
						}
					}
					
					var zaPoslati =$("#dialog_komadanamestaja_sifra_input").val()+",";
					zaPoslati +=$("#dialog_komadanamestaja_naziv_input").val()+",";
					zaPoslati +=$("#dialog_komadanamestaja_boja_input").val()+",";
					zaPoslati +=$("#dialog_komadanamestaja_zemlja_input").val()+",";
					zaPoslati +=$("#dialog_komadanamestaja_proizvodjac_input").val()+",";
					zaPoslati +=$("#dialog_komadanamestaja_cena_input").val()+",";
					zaPoslati +=$("#dialog_komadanamestaja_kolicina_input").val()+",";
					zaPoslati +=$("#dialog_komadanamestaja_datum_input").val()+",";
					zaPoslati +=nazivZaSlanje+",";
					zaPoslati +=pibZaSlanje;
					$.ajaxSetup({async:false});
				  	$.ajax({
				  		  url: "../izmeniKomadNamestaja",
				  		  type: 'post',
				
				  		  data: {
				  		   komadNamestajaPodaci:JSON.stringify({
				  			   /*
				  		  	 sifra: $("#dialog_komadanamestaja_sifra_input").val(),
				  		  	 naziv:$("#dialog_komadanamestaja_naziv_input").val(),
				  		  	 boja:$("#dialog_komadanamestaja_boja_input").val(),
				  		  	 zemljaProizvodnje:$("#dialog_komadanamestaja_zemlja_input").val(),
				  		  	 nazivProizvodjaca:$("#dialog_komadanamestaja_proizvodjac_input").val(),
				  		     jedinicnaCena:$("#dialog_komadanamestaja_cena_input").val(),
				  		     kolicinaUMagacinu:$("#dialog_komadanamestaja_kolicina_input").val(),
				  		     godinaProizvodnje:$("#dialog_komadanamestaja_datum_input").val(),
				  		  	 akcija:null,
				  		     kategorija:kategorijaZaSlanje,
				  		     slika:null,
				  		     video:null,
				  		     salon:salonZaSlanje
				  		     */
				  			   parametar:zaPoslati
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
					    		el = document.getElementById("dialog_black_background");
					    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
					    		$(".dialog_komadnamestaja_container").children.remove();
					    		$(".dialog_komadnamestaja_container").css({"width": "200px", "height": "100px", "margin-top": "-50px", "margin-left": "-100px"});
					    		$(".dialog_komadnamestaja_container").append("<p>NISTE DOBRO POPUNILI POLJA!</p>");
				  			}
					  		else if(data == "komad_ne_postoji"){
					    		el = document.getElementById("dialog_black_background");
					    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
					    		$(".dialog_komadnamestaja_container").children.remove();
					    		$(".dialog_komadnamestaja_container").css({"width": "200px", "height": "100px", "margin-top": "-50px", "margin-left": "-100px"});
					    		$(".dialog_komadnamestaja_container").append("<p>KOMAD NE POSTOJI!</p>");
				  			}else{
				  				komadnamestajaJSON = JSON.parse(data);
				  				var tableRow = $("#"+komadnamestajaJSON.KomadNamestaja[0].sifra+"").parent().parent();
				  				tableRow.children().remove();
				  				el = document.getElementById("dialog_black_background");
			  		    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
			  		    		$(".dialog_komadnamestaja_container").remove();
			  		    		$(".dialog_komadnamestaja_container").hide();
								var tbodyContentString = "<td>"+komadnamestajaJSON.KomadNamestaja[0].sifra+"</td><td>"+komadnamestajaJSON.KomadNamestaja[0].naziv;
								tbodyContentString += "</td><td>"+komadnamestajaJSON.KomadNamestaja[0].boja+"</td><td>"+komadnamestajaJSON.KomadNamestaja[0].zemljaProizvodnje;
								tbodyContentString += "</td><td>"+komadnamestajaJSON.KomadNamestaja[0].nazivProizvodjaca+"</td><td>"+komadnamestajaJSON.KomadNamestaja[0].jedinicnaCena;
								tbodyContentString += "</td><td>"+komadnamestajaJSON.KomadNamestaja[0].kolicinaUMagacinu+"</td><td>";
								tbodyContentString += komadnamestajaJSON.KomadNamestaja[0].kategorija+"</td>";
								tbodyContentString += "<td>"+komadnamestajaJSON.KomadNamestaja[0].godinaProizvodnje+"</td>";
								tbodyContentString += "<td>"+komadnamestajaJSON.KomadNamestaja[0].salon+"</td>";
								tbodyContentString += "<td><img src='"+komadnamestajaJSON.KomadNamestaja[0].slika+"' width='64px' height='64px' alt='"+komadnamestajaJSON.KomadNamestaja[0].sifra+"'/></td>";
								tbodyContentString += "<td>"+"ima"+"</td>";//komadiNamestaja.KomadiNamestaja[i].video
								tbodyContentString += "<td><input type='hidden' value='"+komadiNamestaja.KomadiNamestaja[i].sifra+"' id='"+komadnamestajaJSON.KomadNamestaja[0].sifra+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+komadnamestajaJSON.KomadNamestaja[0].sifra+"'></button></td>";
								tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+komadnamestajaJSON.KomadNamestaja[0].sifra+"'></button></td>";
								tableRow.append(tbodyContentString);
								tbodyContentString = "";
				  			}
				  			
							//obrisi komad namestaja
							$(".obrisi_korisnika").click(
					    			function(){
					    				obrisiKomadNamestaja($(this));
					    			}	
					    		);
						
						
						
						
						//izmeni korisnika
							$(".izmeni_korisnika").click(
									function(){
										izmeniKomadNamestaja($(this));
										}
									);
				  			
				  		});
				}
				
			}	
	);
	
}

function obrisiKomadNamestaja(dugme){
	//pokupi komade u slucaju da je bilo promena
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
	/*NADJI KOMAD ZA BRISANJE*/
	var komadZaBrisanje = null;
	for(var i = 0; i < komadiNamestaja.KomadiNamestaja.length; i++){
		if(dugme.val() == komadiNamestaja.KomadiNamestaja[i].sifra){
			komadZaBrisanje = komadiNamestaja.KomadiNamestaja[i];
			break;
		} 
	}
	/*KRAJ PRETRAGE KOMADA ZA BRISANJE*/

	$.ajaxSetup({async:false});
  	$.ajax({
  		  url: "../obrisiKomadNamestaja",
  		  type: 'post',

  		  data: {
  		   komadNamestajaPodaci:JSON.stringify({
  			   /*
  		  	 sifra: $("#dialog_komadanamestaja_sifra_input").val(),
  		  	 naziv:$("#dialog_komadanamestaja_naziv_input").val(),
  		  	 boja:$("#dialog_komadanamestaja_boja_input").val(),
  		  	 zemljaProizvodnje:$("#dialog_komadanamestaja_zemlja_input").val(),
  		  	 nazivProizvodjaca:$("#dialog_komadanamestaja_proizvodjac_input").val(),
  		     jedinicnaCena:$("#dialog_komadanamestaja_cena_input").val(),
  		     kolicinaUMagacinu:$("#dialog_komadanamestaja_kolicina_input").val(),
  		     godinaProizvodnje:$("#dialog_komadanamestaja_datum_input").val(),
  		  	 akcija:null,
  		     kategorija:kategorijaZaSlanje,
  		     slika:null,
  		     video:null,
  		     salon:salonZaSlanje
  		     */
  			   parametar:komadZaBrisanje.sifra
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
  			
  			if(data == "komad_ne_postoji"){
	    		$("#content").append("<p id='ne_postoji_komad'>KOMAD NE POSTOJI!</p>");
  			}else{
  				var element = document.getElementById("ne_postoji_komad");
  				if(element != null)
  					element.remove();
  				var komadnamestajaJSON = JSON.parse(data);
  				$("#"+komadnamestajaJSON.KomadNamestaja[0].sifra+"").parent().parent().remove();
  			}
			//obrisi komad namestaja
			$(".obrisi_korisnika").click(
	    			function(){
	    				obrisiKomadNamestaja($(this));
	    			}	
	    		);
		
		
		
		
		//izmeni korisnika
			$(".izmeni_korisnika").click(
					function(){
						izmeniKomadNamestaja($(this));
						}
					);
  			
  		});
}

