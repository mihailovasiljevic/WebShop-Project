function fn_dodatneUsluge(){
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
		}).done(function(data){
	    	$('#content').children().remove();
	    	$('#content').append("<div id='dodatneusluge_container'><div id='table_container'></div></div>");
	    	$('#content').hide();
	    	$('#content').fadeIn(1000);
			//alert("Data: "+data);
            dodatneUsluge = JSON.parse(data);
			// kreiraj tabelu i prikazi je na stranici
			$('#table_container').append("<table class='paginated'></table>");
			$('.paginated').append("<thead class='table_head'></thead>");
			$('.paginated').append("<tbody class='table_body'></tbody>");
			var theadContentString = "<tr><th>Naziv</th><th>Opis</th>";
			theadContentString += "<th>Cena</th>";
			theadContentString += "<th></th><th></th><th><button type='button' class='dodaj_korisnika'></button></th>";
			$('.table_head').append(theadContentString);
			theadContentString = null;
			
			for(var i = 0; i < dodatneUsluge.DodatneUsluge.length; i++){
				var tbodyContentString = "<tr><td>"+dodatneUsluge.DodatneUsluge[i].naziv+"</td><td>"+dodatneUsluge.DodatneUsluge[i].opis;
				tbodyContentString += "</td><td>"+dodatneUsluge.DodatneUsluge[i].cena+"</td>";
				tbodyContentString += "<td><input type='hidden' value='"+dodatneUsluge.DodatneUsluge[i].naziv+"' id='"+dodatneUsluge.DodatneUsluge[i].naziv+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+dodatneUsluge.DodatneUsluge[i].naziv+"'></button></td>";
				tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+dodatneUsluge.DodatneUsluge[i].naziv+"'></button></td></tr>";
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
			
			
		});
	$.ajaxSetup({async:true});
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
function nazivPostoji(){
	for(var i = 0; i < dodatneUsluge.DodatneUsluge.length; i++){
		if(dodatneUsluge.DodatneUsluge[i].naziv == $("#dodatnausluga_naziv_input").val()){
			if($(".naziv_jedinstven_mora").css("visibility") == "hidden")
			{
				$(".naziv_jedinstven_mora").css("visibility","visible");
				$("#dialog_saloni_body_field_pib_input_pib").css("border-color","#ff0000");
			}
			return true;
		}
	}
	if($(".naziv_jedinstven_mora").css("visibility") == "visible")
	{
		$(".naziv_jedinstven_mora").css("visibility","hidden");
		$("#dialog_saloni_body_field_pib_input_pib").css("border-color","#7fc001");
		return false;
	}
	return false;
}
function nazivPostoji(tekuciNaziv){
	for(var i = 0; i < dodatneUsluge.DodatneUsluge.length; i++){
		if(dodatneUsluge.DodatneUsluge[i].naziv == $("#dodatnausluga_naziv_input").val() && $("#dodatnausluga_naziv_input").val()!=tekuciNaziv){
			if($(".naziv_jedinstven_mora").css("visibility") == "hidden")
			{
				$(".naziv_jedinstven_mora").css("visibility","visible");
				$("#dialog_saloni_body_field_pib_input_pib").css("border-color","#ff0000");
			}
			return true;
		}
	}
	if($(".naziv_jedinstven_mora").css("visibility") == "visible")
	{
		$(".naziv_jedinstven_mora").css("visibility","hidden");
		$("#dialog_saloni_body_field_pib_input_pib").css("border-color","#7fc001");
		return false;
	}
	return false;
}

function daLiJeRazlomljeniBroj(field){
    return /^[0-9]+(\.[0-9]{1,2})?$/.test(field[0].value);
}

function cenaGreska(field){
	var result;
	result = /^[0-9]+(\.[0-9]{1,2})?$/.test(field[0].value);
	if(result == false){
		if($(".cena_broj_mora").css("visibility") == "hidden")
			$(".cena_broj_mora").css("visibility","visible");
		return true;
	}
	else{
		if($(".cena_broj_mora").css("visibility") == "visible")
			$(".cena_broj_mora").css("visibility","hidden");
		return false;
	}
}
function dodajDodatnuUslugu(){
	//pokupi dodatne usluge u slucaju da je bilo promena
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
		}).done(function(data){dodatneUsluge=JSON.parse(data)});
	
	//pokupi komade namestaja da bi ih ponudio korisniku
	
	var komadiNamestajadu = [];
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
		}).done(function(data){komadiNamestajadu = JSON.parse(data)});
	
  	$("#container").find("#dialog_black_background").remove();
  	$("#container").find(".dialog_dodatnausluga_container").children().remove();
  	$("#container").find(".dialog_dodatnausluga_container").remove();
  	$("#container").append("<div id='dialog_black_background'></div>");
	$("#container").append("<div class='dialog_dodatnausluga_container'></div>");
	
	var dialogSaloniContent = "";
	dialogSaloniContent = " <div class='dialog_dodatnausluga_header'> <p class='dialog_dodatnausluga_header_title'>Dodavanje Nove Dodatne Usluge</p> <button type='button' class='exit_dialog_dodatnausluga'>X</button> </div> <div class='dialog_dodatnausluga_body'> <p class='dodatnausluga_naziv_label'>Naziv:</p> <input type='text' id='dodatnausluga_naziv_input' /> <p class='dodatnausluga_opis_label'>Opis:</p> <textarea rows='4' cols='50' id ='dodatnausluga_opis_input'></textarea> <p class='dodatnausluga_cena_label'>Cena:</p> <input type='text' id='dodatnausluga_cena_input' /> <p class='dodatnausluga_kn_label'>Usluga besplatna u:</p> <select class='dodatnausluga_kn_select' multiple> </select> </div> <div class='naziv_jedinstven_mora'> Naziv mora biti jedinstven! </div> <div class='cena_broj_mora'> Cena mora biti decimalan ili ceo broj! </div>";
	dialogSaloniContent += "<button type='button' class='dodaj_dodatnuUslugu'>DODAJ DODATNU USLUGU</button>";
	$(".dialog_dodatnausluga_container").append(dialogSaloniContent);
	
	var selectItems="";
	for(var i = 0; i < komadiNamestajadu.KomadiNamestaja.length; i++){
		selectItems+="<option value='"+komadiNamestajadu.KomadiNamestaja[i].sifra+"'>";
		selectItems+=komadiNamestajadu.KomadiNamestaja[i].naziv;
		selectItems+="</option>";
	}
	$(".dodatnausluga_kn_select").append(selectItems);
	
	$(".dialog_dodatnausluga_container").hide();
	$(".dialog_dodatnausluga_container").slideDown();
	el = document.getElementById("dialog_black_background");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$(".exit_dialog_dodatnausluga").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_dodatnausluga_container").remove();
    		$(".dialog_dodatnausluga_container").hide();
		}		
	)
	
	$("#dodatnausluga_naziv_input").blur(
			function(){
				if(nazivPostoji($(this)) == false)
					emptyField($(this));
			}
	);
	$("#dodatnausluga_cena_input").keyup(
		function(){
			cenaGreska($(this));
		}
	);
	$("#dodatnausluga_cena_input").blur(
			function(){
					emptyField($(this));
					cenaGreska($(this));
			}
	);
	$("#dodatnausluga_opis_input").blur(
			function(){
					emptyField($(this));
			}
	);
	
	$(".dodaj_dodatnuUslugu").click(
			function(){
				var e1 = emptyField($("#dodatnausluga_naziv_input"));
				var e2 = emptyField($("#dodatnausluga_cena_input"));
				var e3 = emptyField($("#dodatnausluga_opis_input"));
				
				if(e1 == true || e2 == true || e3 == true){
					if(document.getElementById("praznaPolja") == null)
					{
						$(".dialog_dodatnausluga_container").append("<div id='praznaPolja'>Polja uokvirena crvenom ne smeju biti prazna!</div>");
					}
				}else{
					if(document.getElementById("praznaPolja") != null)
					{
						$("#praznaPolja").remove();
					}
					/*
					var listaIzabranih=[];
					var izbori = $(".dodatnausluga_kn_select").val();
					for(var i = 0; i < komadiNamestajadu.KomadiNamestaja.length; i++){
						for(var j = 0; j < izbori.length; j++){
							if(komadiNamestajadu.KomadiNamestaja[i].sifra == izbori[j])
								listaIzabranih.push(komadiNamestajadu.KomadiNamestaja[i]);
						}
					}
					*/
					
					
					$.ajaxSetup({async:false});
				  	$.ajax({
				  		  url: "../dodajDodatnuUslugu",
				  		  type: 'post',
				
				  		  data: {
				  		   dodatneUslugePodaci:JSON.stringify({
				  		  	 naziv: $("#dodatnausluga_naziv_input").val(),
				  		  	 opis:$("#dodatnausluga_opis_input").val(),
				  		  	 cena:$("#dodatnausluga_cena_input").val(),
				  		  	 listaKomadaNamestajaUKojimaJeBesplatna:$(".dodatnausluga_kn_select").val()
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
				  					if(data == "dodatna_usluga_postoji"){
							    		el = document.getElementById("dialog_black_background");
							    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
							    		$(".dialog_dodatnausluga_container").children.remove();
							    		$(".dialog_dodatnausluga_container").css({"width": "200px", "height": "100px", "margin-top": "-50px", "margin-left": "-100px"});
							    		$(".dialog_dodatnausluga_container").append("<p>DODATNA USLUGA POSTOJI POSTOJI!</p>");
				  					}else{
					  					var dodatneUslugeJSON= JSON.parse(data);
						  	    		el = document.getElementById("dialog_black_background");
						  	    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
						  	    		$(".dialog_dodatnausluga_container").remove();
						  	    		$(".dialog_dodatnausluga_container").hide();
						  	    		
										var tbodyContentString = "<tr><td>"+dodatneUslugeJSON.DodatnaUsluga[0].naziv+"</td><td>"+dodatneUslugeJSON.DodatnaUsluga[0].opis;
										tbodyContentString += "</td><td>"+dodatneUslugeJSON.DodatnaUsluga[0].cena+"</td>";
										tbodyContentString += "<td><input type='hidden' value='"+dodatneUslugeJSON.DodatnaUsluga[0].naziv+"' id='"+dodatneUslugeJSON.DodatnaUsluga[0].naziv+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+dodatneUslugeJSON.DodatnaUsluga[0].naziv+"'></button></td>";
										tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+dodatneUslugeJSON.DodatnaUsluga[0].naziv+"'></button></td></tr>";
										$('.table_body').append(tbodyContentString);
										tbodyContentString = "";
				  					}
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
				  					
				  				}
				  		);
				  	$.ajaxSetup({async:false});
				}
				
				
			}
	);
	$.ajaxSetup({async:false});
}

function izmeniDodatnuUslugu(dugme){
	//pokupi dodatne usluge u slucaju da je bilo promena
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
		}).done(function(data){dodatneUsluge=JSON.parse(data)});
	
	//pokupi komade namestaja da bi ih ponudio korisniku
	
	var komadiNamestajadu = [];
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
		}).done(function(data){komadiNamestajadu = JSON.parse(data)});
	
 	$("#container").find("#dialog_black_background").remove();
  	$("#container").find(".dialog_dodatnausluga_container").children().remove();
  	$("#container").find(".dialog_dodatnausluga_container").remove();
  	$("#container").append("<div id='dialog_black_background'></div>");
	$("#container").append("<div class='dialog_dodatnausluga_container'></div>");
	
	var dialogSaloniContent = "";
	dialogSaloniContent = " <div class='dialog_dodatnausluga_header'> <p class='dialog_dodatnausluga_header_title'>Dodavanje Nove Dodatne Usluge</p> <button type='button' class='exit_dialog_dodatnausluga'>X</button> </div> <div class='dialog_dodatnausluga_body'> <p class='dodatnausluga_naziv_label'>Naziv:</p> <input type='text' id='dodatnausluga_naziv_input' disabled/> <p class='dodatnausluga_opis_label'>Opis:</p> <textarea rows='4' cols='50' id ='dodatnausluga_opis_input'></textarea> <p class='dodatnausluga_cena_label'>Cena:</p> <input type='text' id='dodatnausluga_cena_input' /> <p class='dodatnausluga_kn_label'>Usluga besplatna u:</p> <select class='dodatnausluga_kn_select' multiple> </select> </div> <div class='naziv_jedinstven_mora'> Naziv mora biti jedinstven! </div> <div class='cena_broj_mora'> Cena mora biti decimalan ili ceo broj! </div>";
	dialogSaloniContent += "<button type='button' class='izmeni_dodatnuUslugu'>IZMENI DODATNU USLUGU</button>";
	$(".dialog_dodatnausluga_container").append(dialogSaloniContent);
	
	var selectItems="";
	for(var i = 0; i < komadiNamestajadu.KomadiNamestaja.length; i++){
		selectItems+="<option value='"+komadiNamestajadu.KomadiNamestaja[i].sifra+"'>";
		selectItems+=komadiNamestajadu.KomadiNamestaja[i].naziv;
		selectItems+="</option>";
	}
	$(".dodatnausluga_kn_select").append(selectItems);
	
	$(".dialog_dodatnausluga_container").hide();
	$(".dialog_dodatnausluga_container").slideDown();
	el = document.getElementById("dialog_black_background");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$(".exit_dialog_dodatnausluga").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_dodatnausluga_container").remove();
    		$(".dialog_dodatnausluga_container").hide();
		}		
	)
	
	var uslugaZaIzmenu;
	for(var i=0; i < dodatneUsluge.DodatneUsluge.length;i++){
		if(dodatneUsluge.DodatneUsluge[i].naziv == dugme.val())
			uslugaZaIzmenu = dodatneUsluge.DodatneUsluge[i]
	}
	
	
	
	$("#dodatnausluga_naziv_input").val(uslugaZaIzmenu.naziv+"");
	$("#dodatnausluga_cena_input").val(uslugaZaIzmenu.cena+"");
	$("#dodatnausluga_opis_input").val(uslugaZaIzmenu.opis+"");
	var listaZaSelektovanje = [];
	for(var i = 0; i < uslugaZaIzmenu.komadiNamestaja.length;i++){
		listaZaSelektovanje.push(uslugaZaIzmenu.komadiNamestaja[i]);
	}
	$(".dodatnausluga_kn_select").val(listaZaSelektovanje);
	$("#dodatnausluga_naziv_input").css("border","none");
	
	$("#dodatnausluga_naziv_input").blur(
			function(){
				if(nazivPostoji($(this)) == false)
					emptyField($(this));
			}
	);
	$("#dodatnausluga_cena_input").keyup(
		function(){
			cenaGreska($(this));
		}
	);
	$("#dodatnausluga_cena_input").blur(
			function(){
					emptyField($(this));
					cenaGreska($(this));
			}
	);
	$("#dodatnausluga_opis_input").blur(
			function(){
					emptyField($(this));
			}
	);
	
	$(".izmeni_dodatnuUslugu").click(
			function(){
				var e1 = emptyField($("#dodatnausluga_naziv_input"));
				var e2 = emptyField($("#dodatnausluga_cena_input"));
				var e3 = emptyField($("#dodatnausluga_opis_input"));
				
				if(e1 == true || e2 == true || e3 == true){
					if(document.getElementById("praznaPolja") == null)
					{
						$(".dialog_dodatnausluga_container").append("<div id='praznaPolja'>Polja uokvirena crvenom ne smeju biti prazna!</div>");
					}
				}else{
					if(document.getElementById("praznaPolja") != null)
					{
						$("#praznaPolja").remove();
					}
					/*
					var listaIzabranih=[];
					var izbori = $(".dodatnausluga_kn_select").val();
					for(var i = 0; i < komadiNamestajadu.KomadiNamestaja.length; i++){
						for(var j = 0; j < izbori.length; j++){
							if(komadiNamestajadu.KomadiNamestaja[i].sifra == izbori[j])
								listaIzabranih.push(komadiNamestajadu.KomadiNamestaja[i]);
						}
					}
					*/
					
					
					$.ajaxSetup({async:false});
				  	$.ajax({
				  		  url: "../izmeniDodatneUsluge",
				  		  type: 'post',
				
				  		  data: {
				  		   dodatneUslugePodaci:JSON.stringify({
				  		  	 naziv: $("#dodatnausluga_naziv_input").val(),
				  		  	 opis:$("#dodatnausluga_opis_input").val(),
				  		  	 cena:$("#dodatnausluga_cena_input").val(),
				  		  	 listaKomadaNamestajaUKojimaJeBesplatna:$(".dodatnausluga_kn_select").val()
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
				  					if(data == "dodatna_usluga_ne_postoji"){
							    		el = document.getElementById("dialog_black_background");
							    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
							    		$(".dialog_dodatnausluga_container").children.remove();
							    		$(".dialog_dodatnausluga_container").css({"width": "200px", "height": "100px", "margin-top": "-50px", "margin-left": "-100px"});
							    		$(".dialog_dodatnausluga_container").append("<p>DODATNA USLUGA NE POSTOJI!</p>");
				  					}else{
					  					var dodatneUslugeJSON= JSON.parse(data);
						  	    		el = document.getElementById("dialog_black_background");
						  	    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
						  	    		$(".dialog_dodatnausluga_container").remove();
						  	    		$(".dialog_dodatnausluga_container").hide();
										var tableRow = $("#"+dodatneUslugeJSON.DodatnaUsluga[0].naziv+"").parent().parent();
							    		tableRow.children().remove();
										var tbodyContentString = "<td>"+dodatneUslugeJSON.DodatnaUsluga[0].naziv+"</td><td>"+dodatneUslugeJSON.DodatnaUsluga[0].opis;
										tbodyContentString += "</td><td>"+dodatneUslugeJSON.DodatnaUsluga[0].cena+"</td>";
										tbodyContentString += "<td><input type='hidden' value='"+dodatneUslugeJSON.DodatnaUsluga[0].naziv+"' id='"+dodatneUslugeJSON.DodatnaUsluga[0].naziv+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+dodatneUslugeJSON.DodatnaUsluga[0].naziv+"'></button></td>";
										tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+dodatneUslugeJSON.DodatnaUsluga[0].naziv+"'></button></td>";
										tableRow.append(tbodyContentString);
										tbodyContentString = "";
				  					}
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
				  					
				  				}
				  		);
				  	$.ajaxSetup({async:false});
				}
				
				
			}
	);
	$.ajaxSetup({async:false});
}
function obrisiDodatnuUslugu(dugme){
	
	//pokupi dodatne usluge u slucaju da je bilo promena
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
		}).done(function(data){dodatneUsluge=JSON.parse(data)});
	
	//pokupi komade namestaja da bi ih ponudio korisniku
	
	var komadiNamestajadu = [];
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
		}).done(function(data){komadiNamestajadu = JSON.parse(data)});
	var uslugaZaBrisanje;
	for(var i=0; i < dodatneUsluge.DodatneUsluge.length;i++){
		if(dodatneUsluge.DodatneUsluge[i].naziv == dugme.val())
			uslugaZaBrisanje = dodatneUsluge.DodatneUsluge[i]
	}
	

	
					
					$.ajaxSetup({async:false});
				  	$.ajax({
				  		  url: "../obrisiDodatnuUslugu",
				  		  type: 'post',
				
				  		  data: {
				  		   dodatneUslugePodaci:JSON.stringify({
				  		  	 naziv: uslugaZaBrisanje.naziv,
				  		  	 opis:uslugaZaBrisanje.opis,
				  		  	 cena:uslugaZaBrisanje.cena,
				  		  	 listaKomadaNamestajaUKojimaJeBesplatna:null
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
				  					if(data == "dodatna_usluga_ne_postoji"){
							    		
				  						$("#content").append("<p id='ne_postoji_komad'>DODATNA USLUGA NE POSTOJI!</p>");
				  					}else{
				  		  				var element = document.getElementById("ne_postoji_komad");
				  		  				if(element != null)
				  		  					element.remove();
				  		  				var dodatnaUslugaJSON = JSON.parse(data);
				  		  				$("#"+dodatnaUslugaJSON.DodatnaUsluga[0].naziv+"").parent().parent().remove();
				  					}
				  					
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
				  					
				  				}
				  		);
				  	$.ajaxSetup({async:false});
}