//funkcija rukuje dodavanjem, izmenom, brisanjem i prikazom salona
function fn_saloni(){
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
    	    	$('#content').children().remove();
    	    	$('#content').append("<div id='saloni_container'><div id='table_container'></div></div>");
    	    	$('#content').hide();
    	    	$('#content').fadeIn(1000);
    			//alert("Data: "+data);
                saloni = JSON.parse(data);
				// kreiraj tabelu i prikazi je na stranici
				$('#table_container').append("<table class='paginated'></table>");
				$('.paginated').append("<thead class='table_head'></thead>");
				$('.paginated').append("<tbody class='table_body'></tbody>");
				var theadContentString = "<tr><th>Naziv</th><th>PIB</th><th>Matični broj</th>";
				theadContentString += "<th>Broj žiro računa</th><th>Adresa</th><th>Telefon</th>";
				theadContentString += "<th>Email</th><th>Adresa sajta</th><th></th><th></th><th></th><th></th><th><button type='button' class='dodaj_korisnika'></button></th>";
				$('.table_head').append(theadContentString);
				theadContentString = null;
				for(var i = 0; i < saloni.Saloni.length; i++){
					var spanClass="";
					
					var tbodyContentString = "<tr><td>"+saloni.Saloni[i].naziv+"</td><td>"+saloni.Saloni[i].pib;
					tbodyContentString += "</td><td>"+saloni.Saloni[i].maticniBroj+"</td><td>"+saloni.Saloni[i].brojZiroRacuna;
					tbodyContentString += "</td><td>"+saloni.Saloni[i].adresa+"</td><td>"+saloni.Saloni[i].telefon;
					tbodyContentString += "</td><td>"+saloni.Saloni[i].email+"</td><td>";
					tbodyContentString += saloni.Saloni[i].adresaInternetSajta+"</td><td><input type='hidden' value='"+saloni.Saloni[i].pib+"' id='"+saloni.Saloni[i].pib+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+saloni.Saloni[i].pib+"'></button></td>";
					tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+saloni.Saloni[i].pib+"'></button></td></tr>";
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
				//obrisi salon
				$(".obrisi_korisnika").click(
			    			function(){
			    				obrisiSalon($(this));
			    			}	
			    		);
				
				
				
				
				//izmeni salon
				$(".izmeni_korisnika").click(
						function(){
							izmeniSalon($(this));
							}
						);
				
				
				
				
				
				//dogadjaj na dodavanje salona
				$(".dodaj_korisnika").click(
					function(){
							dodajSalon();
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
function pibPostoji(){
	for(var i = 0; i < saloni.Saloni.length; i++){
		if(saloni.Saloni[i].pib == $("#dialog_saloni_body_field_pib_input_pib").val()){
			if(document.getElementById("pib_postoji") == null)
			{
				$(".dialog_saloni").append("<div id='pib_postoji'>Pib postoji!</div>");
				$("#dialog_saloni_body_field_pib_input_pib").css("border-color","#ff0000");
			}
			return true;
		}
	}
	if(document.getElementById("pib_postoji") != null)
	{
		$("#pib_postoji").remove();
		$("#dialog_saloni_body_field_pib_input_pib").css("border-color","#7fc001");
		return false;
	}
	return false;
}
function mbrPostoji(){
	for(var i = 0; i < saloni.Saloni.length; i++){
		if(saloni.Saloni[i].maticniBroj == $("#dialog_saloni_body_field_mbr_input_mbr").val()){
			if(document.getElementById("mbr_postoji") == null)
			{
				$(".dialog_saloni").append("<div id='mbr_postoji'>Matični broj postoji!</div>");
				$("#dialog_saloni_body_field_mbr_input_mbr").css("border-color","#ff0000");
			}
			return true;
		}
	}
	if(document.getElementById("mbr_postoji") != null)
	{
		$("#mbr_postoji").remove();
		$("#dialog_saloni_body_field_mbr_input_mbr").css("border-color","#7fc001");
		return false;
	}
	return false;
}
function zbrPostoji(){
	for(var i = 0; i < saloni.Saloni.length; i++){
		if(saloni.Saloni[i].brojZiroRacuna == $("#dialog_saloni_body_field_zbr_input_zbr").val()){
			if(document.getElementById("broj_ziro_racuna_postoji") == null)
			{
				$(".dialog_saloni").append("<div id='broj_ziro_racuna_postoji'>Broj žiro računa postoji!</div>");
				$("#dialog_saloni_body_field_zbr_input_zbr").css("border-color","#ff0000");
			}
			return true;
		}
	}
	if(document.getElementById("broj_ziro_racuna_postoji") != null)
	{
		$("#broj_ziro_racuna_postoji").remove();
		$("#dialog_saloni_body_field_zbr_input_zbr").css("border-color","#7fc001");
		return false;
	}
	return false;
}

//niz funkcija za proveru da li postoje takva polja, prilikom izmene
function pibPostoji(tekuciPib){
	for(var i = 0; i < saloni.Saloni.length; i++){
		if(saloni.Saloni[i].pib == $("#dialog_saloni_body_field_pib_input_pib").val() && $("#dialog_saloni_body_field_pib_input_pib").val() != tekuciPib){
			if(document.getElementById("pib_postoji") == null)
			{
				$(".dialog_saloni").append("<div id='pib_postoji'>Pib postoji!</div>");
				$("#dialog_saloni_body_field_pib_input_pib").css("border-color","#ff0000");
			}
			return true;
		}
	}
	if(document.getElementById("pib_postoji") != null)
	{
		$("#pib_postoji").remove();
		$("#dialog_saloni_body_field_pib_input_pib").css("border-color","#7fc001");
		return false;
	}
	return false;
}
function mbrPostoji(tekuciMbr){
	for(var i = 0; i < saloni.Saloni.length; i++){
		if(saloni.Saloni[i].maticniBroj == $("#dialog_saloni_body_field_mbr_input_mbr").val() && $("#dialog_saloni_body_field_mbr_input_mbr").val() != tekuciMbr){
			if(document.getElementById("mbr_postoji") == null)
			{
				$(".dialog_saloni").append("<div id='mbr_postoji'>Matični broj postoji!</div>");
				$("#dialog_saloni_body_field_mbr_input_mbr").css("border-color","#ff0000");
			}
			return true;
		}
	}
	if(document.getElementById("mbr_postoji") != null)
	{
		$("#mbr_postoji").remove();
		$("#dialog_saloni_body_field_mbr_input_mbr").css("border-color","#7fc001");
		return false;
	}
	return false;
}
function zbrPostoji(tekuciZbr){
	for(var i = 0; i < saloni.Saloni.length; i++){
		if(saloni.Saloni[i].brojZiroRacuna == $("#dialog_saloni_body_field_zbr_input_zbr").val() && $("#dialog_saloni_body_field_zbr_input_zbr").val() != tekuciZbr){
			if(document.getElementById("broj_ziro_racuna_postoji") == null)
			{
				$(".dialog_saloni").append("<div id='broj_ziro_racuna_postoji'>Broj žiro računa postoji!</div>");
				$("#dialog_saloni_body_field_zbr_input_zbr").css("border-color","#ff0000");
			}
			return true;
		}
	}
	if(document.getElementById("broj_ziro_racuna_postoji") != null)
	{
		$("#broj_ziro_racuna_postoji").remove();
		$("#dialog_saloni_body_field_zbr_input_zbr").css("border-color","#7fc001");
		return false;
	}
	return false;
}

//funkcija dodaj korisnika
function dodajSalon(){
	//pokupi salone u slucaju da je bilo promena
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
		}).done(function(data){ saloni = JSON.parse(data)});
	//
  	$("#container").find("#dialog_black_background").remove();
  	$("#container").find(".dialog_saloni").children().remove();
  	$("#container").find(".dialog_saloni").remove();
  	$("#container").append("<div id='dialog_black_background'></div>");
	$("#container").append("<div class='dialog_saloni'></div>");
	
	var dialogSaloniContent = "";
	dialogSaloniContent = " <div class='dialog_saloni_header'> <div class='dialog_saloni_header_close'> <button type='button' class='dialog_saloni_header_close_button'>X</button> </div> <div class='dialog_saloni_header_title'> Dodavanje Novog Salona </div> </div> <div class='dialog_saloni_body'> <div class='dialog_saloni_body_field_naziv'> <div class='dialog_saloni_body_field_naziv_label_naziv'> Naziv: </div> <div class='dialog_saloni_body_field_naziv_input_naziv'> <input type='text' maxlength='64' id='dialog_saloni_body_field_naziv_input_naziv'/> </div> </div> <div class='dialog_saloni_body_field_pib'> <div class='dialog_saloni_body_field_pib_label_pib'> PIB: </div> <div class='dialog_saloni_body_field_pib_input_pib'> <input type='text' maxlength='10' id='dialog_saloni_body_field_pib_input_pib'/> </div> </div> <div class='dialog_saloni_body_field_mbr'> <div class='dialog_saloni_body_field_mbr_label_mbr'> Matični broj: </div> <div class='dialog_saloni_body_field_mbr_input_mbr'> <input type='text' maxlength='8' id='dialog_saloni_body_field_mbr_input_mbr'/> </div> </div> <div class='dialog_saloni_body_field_zbr'> <div class='dialog_saloni_body_field_zbr_label_zbr'> Broj žiro računa: </div> <div class='dialog_saloni_body_field_zbr_input_zbr'> <input type='text' maxlength='18' id='dialog_saloni_body_field_zbr_input_zbr'/> </div> </div> <div class='dialog_saloni_body_field_adresa'> <div class='dialog_saloni_body_field_adresa_label_adresa'> Adresa: </div> <div class='dialog_saloni_body_field_adresa_input_adresa'> <input type='text' maxlength='128' id='dialog_saloni_body_field_adresa_input_adresa'/> </div> </div><div class='dialog_saloni_body_field_telefon'> <div class='dialog_saloni_body_field_telefon_label_telefon'> Telefon: </div> <div class='dialog_saloni_body_field_telefon_input_telefon'> <input type='text' maxlength='128' id='dialog_saloni_body_field_telefon_input_telefon'/> </div> </div> <div class='dialog_saloni_body_field_email'> <div class='dialog_saloni_body_field_email_label_email'> Email: </div> <div class='dialog_saloni_body_field_email_input_email'> <input type='text' maxlength='128' id='dialog_saloni_body_field_email_input_email'/> </div> </div> <div class='dialog_saloni_body_field_sadresa'> <div class='dialog_saloni_body_field_sadresa_label_sadresa'> Adresa web sajta: </div> <div class='dialog_saloni_body_field_sadresa_input_sadresa'> <input type='text' maxlength='128' id='dialog_saloni_body_field_sadresa_input_sadresa'/> </div> </div> </div>";
	dialogSaloniContent += "<button type='button' class='dodaj_salon'>DODAJ SALON</button>";
	$(".dialog_saloni").append(dialogSaloniContent);
	$(".dialog_saloni").hide();
	$(".dialog_saloni").slideDown();
	el = document.getElementById("dialog_black_background");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$(".dialog_saloni_header_close_button").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_saloni").remove();
    		$(".dialog_saloni").hide();
		}		
	)

	$("#dialog_saloni_body_field_naziv_input_naziv").blur(
			function(){
				emptyField($(this));
			}
	);
	$("#dialog_saloni_body_field_pib_input_pib").blur(
			function(){
				if(pibPostoji() == false)
					emptyField($(this));
			}
	);
	$("#dialog_saloni_body_field_mbr_input_mbr").blur(
			function(){
				if(mbrPostoji() == false)
					emptyField($(this));
			}
	);
	$("#dialog_saloni_body_field_zbr_input_zbr").blur(
			function(){
				if(zbrPostoji() == false)
					emptyField($(this));
			}
	);
	$("#dialog_saloni_body_field_adresa_input_adresa").blur(			
	function(){
		emptyField($(this));
	});
	$("#dialog_saloni_body_field_telefon_input_telefon").blur(			function(){
		emptyField($(this));
	});
	$("#dialog_saloni_body_field_email_input_email").blur(			function(){
		emptyField($(this));
	});
	$("#dialog_saloni_body_field_sadresa_input_sadresa").blur(			function(){
		emptyField($(this));
	});

	
	$(".dodaj_salon").click(
		function(){
			var e1 = emptyField($("#dialog_saloni_body_field_naziv_input_naziv"));
			var e2 = emptyField($("#dialog_saloni_body_field_pib_input_pib"));
			var e3 = emptyField($("#dialog_saloni_body_field_mbr_input_mbr"));
			var e4 = emptyField($("#dialog_saloni_body_field_zbr_input_zbr"));
			var e5 = emptyField($("#dialog_saloni_body_field_adresa_input_adresa"));
			var e6 = emptyField($("#dialog_saloni_body_field_telefon_input_telefon"));
			var e7 = emptyField($("#dialog_saloni_body_field_email_input_email"));
			var e8 = emptyField($("#dialog_saloni_body_field_sadresa_input_sadresa"));
			if(e1 == true || e2 == true ||e3 == true ||e4 == true ||e5 == true ||e5 == true ||e7 == true || e8 == true){
				if(document.getElementById("praznaPolja") == null)
				{
					$(".dialog_saloni").append("<div id='praznaPolja'>Polja uokvirena crvenom ne smeju biti prazna!</div>");
				}
			}
			else if(e1 == false && e2 == false && e3 == false && e4 == false && e5 == false && e5 == false && e7 == false && e8 == false) {

				if(document.getElementById("praznaPolja") != null)
				{
					$("#praznaPolja").remove();
				}
				
				$.ajaxSetup({async:false});
			  	$.ajax({
			  		  url: "../dodajSalon",
			  		  type: 'post',
			
			  		  data: {
			  		   salonPodaci:JSON.stringify({
			  		  	 naziv: $("#dialog_saloni_body_field_naziv_input_naziv").val(),
			  		  	 adresa:$("#dialog_saloni_body_field_adresa_input_adresa").val(),
			  		  	 telefon:$("#dialog_saloni_body_field_telefon_input_telefon").val(),
			  		  	 email:$("#dialog_saloni_body_field_email_input_email").val(),
			  		  	 adresaInternetSajta:$("#dialog_saloni_body_field_sadresa_input_sadresa").val(),
			  		     pib:$("#dialog_saloni_body_field_pib_input_pib").val(),
			  		     maticniBroj:$("#dialog_saloni_body_field_mbr_input_mbr").val(),
			  		     brojZiroRacuna:$("#dialog_saloni_body_field_zbr_input_zbr").val(),
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
					  		var salonJSON = JSON.parse(data);
					  		if(salonJSON == "\"salon_postoji\""){
					    		el = document.getElementById("dialog_black_background");
					    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
					    		$(".dialog_saloni").children.remove();
					    		$(".dialog_saloni").css({"width": "200px", "height": "100px", "margin-top": "-50px", "margin-left": "-100px"});
					    		$(".dialog_saloni").append("<p>KATEGORIJA POSTOJI!</p>");
				  			}else{
				  	    		el = document.getElementById("dialog_black_background");
				  	    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
				  	    		$(".dialog_saloni").remove();
				  	    		$(".dialog_saloni").hide();
								var tbodyContentString = "<tr><td>"+salonJSON.Salon.naziv+"</td><td>"+salonJSON.Salon.pib;
								tbodyContentString += "</td><td>"+salonJSON.Salon.maticniBroj+"</td><td>"+salonJSON.Salon.brojZiroRacuna;
								tbodyContentString += "</td><td>"+salonJSON.Salon.adresa+"</td><td>"+salonJSON.Salon.telefon;
								tbodyContentString += "</td><td>"+salonJSON.Salon.email+"</td><td>";
								tbodyContentString += salonJSON.Salon.adresaInternetSajta+"</td><td><input type='hidden' value='"+salonJSON.Salon.pib+"' id='"+salonJSON.Salon.pib+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+salonJSON.Salon.pib+"'></button></td>";
								tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+salonJSON.Salon.pib+"'></button></td></tr>";
								$('.table_body').append(tbodyContentString);
								tbodyContentString = "";
								$(".obrisi_korisnika").click(
						    			function(){
						    				obrisiSalon($(this));
						    			}	
						    		);
							
							
							
							
							//izmeni korisnika
								$(".izmeni_korisnika").click(
										function(){
											izmeniSalon($(this));
											}
										);
					  			}
					  		
					  		
			  			}
			  		);
			}


		});
	$.ajaxSetup({async:true});
}

function izmeniSalon(dugme){
	//pokupi salone u slucaju da je bilo promena
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
		}).done(function(data){ saloni = JSON.parse(data)});
	
  	$("#container").find("#dialog_black_background").remove();
  	$("#container").find(".dialog_saloni").children().remove();
  	$("#container").find(".dialog_saloni").remove();
  	$("#container").append("<div id='dialog_black_background'></div>");
	$("#container").append("<div class='dialog_saloni'></div>");
	
	var dialogSaloniContent = "";
	dialogSaloniContent = "<div class='dialog_saloni_header'> <div class='dialog_saloni_header_close'> <button type='button' class='dialog_saloni_header_close_button'>X</button> </div> <div class='dialog_saloni_header_title'> Dodavanje Novog Salona </div> </div> <div class='dialog_saloni_body'> <div class='dialog_saloni_body_field_naziv'> <div class='dialog_saloni_body_field_naziv_label_naziv'> Naziv: </div> <div class='dialog_saloni_body_field_naziv_input_naziv'> <input type='text' maxlength='64' id='dialog_saloni_body_field_naziv_input_naziv'/> </div> </div> <div class='dialog_saloni_body_field_pib'> <div class='dialog_saloni_body_field_pib_label_pib'> PIB: </div> <div class='dialog_saloni_body_field_pib_input_pib'> <input type='text' maxlength='10' id='dialog_saloni_body_field_pib_input_pib' disabled/> </div> </div> <div class='dialog_saloni_body_field_mbr'> <div class='dialog_saloni_body_field_mbr_label_mbr'> Matični broj: </div> <div class='dialog_saloni_body_field_mbr_input_mbr'> <input type='text' maxlength='8' id='dialog_saloni_body_field_mbr_input_mbr' disabled/> </div> </div> <div class='dialog_saloni_body_field_zbr'> <div class='dialog_saloni_body_field_zbr_label_zbr'> Broj žiro računa: </div> <div class='dialog_saloni_body_field_zbr_input_zbr'> <input type='text' maxlength='18' id='dialog_saloni_body_field_zbr_input_zbr' disabled/> </div> </div> <div class='dialog_saloni_body_field_adresa'> <div class='dialog_saloni_body_field_adresa_label_adresa'> Adresa: </div> <div class='dialog_saloni_body_field_adresa_input_adresa'> <input type='text' maxlength='128' id='dialog_saloni_body_field_adresa_input_adresa'/> </div> </div><div class='dialog_saloni_body_field_telefon'> <div class='dialog_saloni_body_field_telefon_label_telefon'> Telefon: </div> <div class='dialog_saloni_body_field_telefon_input_telefon'> <input type='text' maxlength='128' id='dialog_saloni_body_field_telefon_input_telefon'/> </div> </div> <div class='dialog_saloni_body_field_email'> <div class='dialog_saloni_body_field_email_label_email'> Email: </div> <div class='dialog_saloni_body_field_email_input_email'> <input type='text' maxlength='128' id='dialog_saloni_body_field_email_input_email'/> </div> </div> <div class='dialog_saloni_body_field_sadresa'> <div class='dialog_saloni_body_field_sadresa_label_sadresa'> Adresa web sajta: </div> <div class='dialog_saloni_body_field_sadresa_input_sadresa'> <input type='text' maxlength='128' id='dialog_saloni_body_field_sadresa_input_sadresa'/> </div> </div> </div>";
	dialogSaloniContent += "<button type='button' class='izmeni_salon'>IZMENI SALON</button>";
	$(".dialog_saloni").append(dialogSaloniContent);
	$(".dialog_saloni").hide();
	$(".dialog_saloni").slideDown();
	el = document.getElementById("dialog_black_background");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$(".dialog_saloni_header_close_button").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_saloni").remove();
    		$(".dialog_saloni").hide();
		}		
	)
	
	var salonZaIzmenu = null;
	for(var i = 0; i < saloni.Saloni.length; i++){
		if(dugme.val() == saloni.Saloni[i].pib){
			salonZaIzmenu = saloni.Saloni[i];
			break;
		} 
	}
	$("#dialog_saloni_body_field_naziv_input_naziv").val(""+salonZaIzmenu.naziv);
	$("#dialog_saloni_body_field_adresa_input_adresa").val(""+salonZaIzmenu.adresa);
	$("#dialog_saloni_body_field_telefon_input_telefon").val(""+salonZaIzmenu.telefon);
	$("#dialog_saloni_body_field_email_input_email").val(""+salonZaIzmenu.email);
	$("#dialog_saloni_body_field_sadresa_input_sadresa").val(""+salonZaIzmenu.adresaInternetSajta);
	$("#dialog_saloni_body_field_pib_input_pib").val(""+salonZaIzmenu.pib);
	$("#dialog_saloni_body_field_mbr_input_mbr").val(""+salonZaIzmenu.maticniBroj);
	$("#dialog_saloni_body_field_zbr_input_zbr").val(""+salonZaIzmenu.brojZiroRacuna);
	
	$("#dialog_saloni_body_field_pib_input_pib").css("border","none");
	$("#dialog_saloni_body_field_mbr_input_mbr").css("border","none");
	$("#dialog_saloni_body_field_zbr_input_zbr").css("border","none");
	
	$("#dialog_saloni_body_field_naziv_input_naziv").blur(
			function(){
				emptyField($(this));
			}
	);
	$("#dialog_saloni_body_field_pib_input_pib").blur(
			function(){
				if(pibPostoji(salonZaIzmenu.pib) == false)
					emptyField($(this));
			}
	);
	$("#dialog_saloni_body_field_mbr_input_mbr").blur(
			function(){
				if(mbrPostoji(salonZaIzmenu.maticniBroj) == false)
					emptyField($(this));
			}
	);
	$("#dialog_saloni_body_field_zbr_input_zbr").blur(
			function(){
				if(zbrPostoji(salonZaIzmenu.brojZiroRacuna) == false)
					emptyField($(this));
			}
	);
	$("#dialog_saloni_body_field_adresa_input_adresa").blur(			
	function(){
		emptyField($(this));
	});
	$("#dialog_saloni_body_field_telefon_input_telefon").blur(			function(){
		emptyField($(this));
	});
	$("#dialog_saloni_body_field_email_input_email").blur(			function(){
		emptyField($(this));
	});
	$("#dialog_saloni_body_field_sadresa_input_sadresa").blur(			function(){
		emptyField($(this));
	});
	
	$(".izmeni_salon").click(
			function(){
				var e1 = emptyField($("#dialog_saloni_body_field_naziv_input_naziv"));
				var e2 = emptyField($("#dialog_saloni_body_field_pib_input_pib"));
				var e3 = emptyField($("#dialog_saloni_body_field_mbr_input_mbr"));
				var e4 = emptyField($("#dialog_saloni_body_field_zbr_input_zbr"));
				var e5 = emptyField($("#dialog_saloni_body_field_adresa_input_adresa"));
				var e6 = emptyField($("#dialog_saloni_body_field_telefon_input_telefon"));
				var e7 = emptyField($("#dialog_saloni_body_field_email_input_email"));
				var e8 = emptyField($("#dialog_saloni_body_field_sadresa_input_sadresa"));;
				if(e1 == true || e2 == true ||e3 == true ||e4 == true ||e5 == true ||e5 == true ||e7 == true || e8 == true){
					if(document.getElementById("praznaPolja") == null)
					{
						$(".dialog_saloni").append("<div id='praznaPolja'>Polja uokvirena crvenom ne smeju biti prazna!</div>");
					}
				}
				else if(e1 == false || e2 == false ||e3 == false ||e4 == false ||e5 == false ||e5 == false ||e7 == false || e8 == false){
					var izmenjenSalon = null;
					$.ajaxSetup({async:false});
				  	$.ajax({
				  		  url: "../izmeniSalon",
				  		  type: 'post',
				
				  		  data: {
				  		   salonPodaci:JSON.stringify({
				  		  	 naziv: $("#dialog_saloni_body_field_naziv_input_naziv").val(),
				  		  	 adresa:$("#dialog_saloni_body_field_adresa_input_adresa").val(),
				  		  	 telefon:$("#dialog_saloni_body_field_telefon_input_telefon").val(),
				  		  	 email:$("#dialog_saloni_body_field_email_input_email").val(),
				  		  	 adresaInternetSajta:$("#dialog_saloni_body_field_sadresa_input_sadresa").val(),
				  		     pib:$("#dialog_saloni_body_field_pib_input_pib").val(),
				  		     maticniBroj:$("#dialog_saloni_body_field_mbr_input_mbr").val(),
				  		     brojZiroRacuna:$("#dialog_saloni_body_field_zbr_input_zbr").val(),
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
						  		var salonJSON = JSON.parse(data);
						  		if(salonJSON == "\"salon_postoji\""){
						    		el = document.getElementById("dialog_black_background");
						    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
						    		$(".dialog_saloni").children.remove();
						    		$(".dialog_saloni").css({"width": "200px", "height": "100px", "margin-top": "-50px", "margin-left": "-100px"});
						    		$(".dialog_saloni").append("<p>KORISNIK POSTOJI!</p>");
					  			}else{
					  	    		el = document.getElementById("dialog_black_background");
					  	    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
					  	    		$(".dialog_saloni").remove();
					  	    		$(".dialog_saloni").hide();
					

									
									var tableRow = $("#"+salonJSON.Salon.pib+"").parent().parent();
						    		tableRow.children().remove();
									var tbodyContentString = "<td>"+salonJSON.Salon.naziv+"</td><td>"+salonJSON.Salon.pib;
									tbodyContentString += "</td><td>"+salonJSON.Salon.maticniBroj+"</td><td>"+salonJSON.Salon.brojZiroRacuna;
									tbodyContentString += "</td><td>"+salonJSON.Salon.adresa+"</td><td>"+salonJSON.Salon.telefon;
									tbodyContentString += "</td><td>"+salonJSON.Salon.email+"</td><td>";
									tbodyContentString += salonJSON.Salon.adresaInternetSajta+"</td><td><input type='hidden' value='"+salonJSON.Salon.pib+"' id='"+salonJSON.Salon.pib+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+salonJSON.Salon.pib+"'></button></td>";
									tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+salonJSON.Salon.pib+"'></button></td>";
									tableRow.append(tbodyContentString);
									tbodyContentString = "";
									
									$(".obrisi_korisnika").click(
							    			function(){
							    				obrisiSalon($(this));
							    			}	
							    		);
									//izmeni korisnika
									$(".izmeni_korisnika").click(
											function(){
												izmeniSalon($(this));
												}
											);
					  			}
				  				
				  			});
				
				}
			});
	$.ajaxSetup({async:true});
}

function obrisiSalon(dugme){
	//pokupi salone u slucaju da je bilo promena
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
		}).done(function(data){ saloni = JSON.parse(data)});
	
	var salonZaBrisanje = null;
	for(var i = 0; i < saloni.Saloni.length; i++){
		if(dugme.val() == saloni.Saloni[i].pib){
			salonZaBrisanje = saloni.Saloni[i];
			break;
		} 
	}
	$.ajaxSetup({async:false});
  	$.ajax({
  		  url: "../obrisiSalon",
  		  type: 'post',

  		  data: {
  		   salonPodaci:JSON.stringify({
  		  	 naziv: salonZaBrisanje.naziv,
  		  	 adresa:salonZaBrisanje.adresa,
  		  	 telefon:salonZaBrisanje.telefon,
  		  	 email:salonZaBrisanje.email,
  		  	 adresaInternetSajta:salonZaBrisanje.adresaInternetSajta,
  		     pib:salonZaBrisanje.pib,
  		     maticniBroj:salonZaBrisanje.maticniBroj,
  		     brojZiroRacuna:salonZaBrisanje.brojZiroRacuna,
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
  				if(data == "\"korisnik_ne_postoji\"")
  					$("#"+salonZaBrisanje.Salon.pib+"").parent().parent().parent().append("<p>NE POSTOJI SALON!</p>");
  				var salonJSON = JSON.parse(data);
  				$("#"+salonJSON.Salon.pib+"").parent().parent().remove();
  			}
  			
  		);
  	$.ajaxSetup({async:true});
	
}
