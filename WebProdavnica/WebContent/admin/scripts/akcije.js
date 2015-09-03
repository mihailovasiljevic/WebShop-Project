function fn_akcije(){
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
	    	$('#content').children().remove();
	    	$('#content').append("<div id='akcije_container'><div id='table_container'></div></div>");
	    	$('#content').hide();
	    	$('#content').fadeIn(1000);
			//alert("Data: "+data);
	    	akcije = JSON.parse(data);
			// kreiraj tabelu i prikazi je na stranici
			$('#table_container').append("<table class='paginated'></table>");
			$('.paginated').append("<thead class='table_head'></thead>");
			$('.paginated').append("<tbody class='table_body'></tbody>");
			var theadContentString = "<tr><th>Naziv</th><th>Datum pocetka</th>";
			var theadContentString = "<th>Datum zavrsetka</th><th>Popust(%)</th>";
			var theadContentString = "<th>Salon</th><th>Kategorije</th>";
			var theadContentString = "<th>Komadi namestaja</th>";
			theadContentString += "<th></th><th></th><th></th><th></th><th><button type='button' class='dodaj_korisnika'></button></th>";
			$('.table_head').append(theadContentString);
			theadContentString = null;
			
			for(var i = 0; i < akcije.Akcije.length; i++){
				var tbodyContentString = "<tr><td>"+akcije.Akcije[i].naziv+"</td><td>"+akcije.Akcije[i].datumPocetka;
				tbodyContentString += "</td><td>"+akcije.Akcije[i].datumZavrsetka+"</td>";
				tbodyContentString += "<td>"+akcije.Akcije[i].popust+"</td>";
				tbodyContentString += "<td>"+akcije.Akcije[i].salon+"</td>";
				tbodyContentString += "<td>";
				for(var j = 0; j < akcije.Akcije[i].kategorije.length; j++){
					tbodyContentString += akcije.Akcije[i].kategorije[j].naziv+"; ";
				}
				tbodyContentString += "</td>";
				tbodyContentString += "<td>";
				for(var j = 0; j < akcije.Akcije[i].komadiNamestaja.length; j++){
					tbodyContentString += akcije.Akcije[i].komadiNamestaja[j].sifra+"; ";
				}
				tbodyContentString += "</td>";
				tbodyContentString += "<td><input type='hidden' value='"+akcije.Akcije[i].naziv+"' id='"+akcije.Akcije[i].naziv+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+akcije.Akcije[i].naziv+"'></button></td>";
				tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+akcije.Akcije[i].naziv+"'></button></td></tr>";
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
			
			//obrisi korisnika
			$(".obrisi_korisnika").click(
		    			function(){
		    				obrisiAkciju($(this));
		    			}	
		    		);
			
			
			
			
			//izmeni korisnika
			$(".izmeni_korisnika").click(
					function(){
						izmeniAkciju($(this));
						}
					);
			
			
			
			
			
			//dogadjaj na dodavanje korisnika
			$(".dodaj_korisnika").click(
				function(){
						dodajAkciju();
				}		
			);
			
			
		});
	$.ajaxSetup({async:true});
}




function dodajAkciju(){
	//pokupi akcije u slucaju da je bilo promena
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
		}).done(function(data){akcije=JSON.parse(data)});
	
	//pokupi komade namestaja da bi ih ponudio korisniku
	
	var komadiNamestajaa = [];
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
		}).done(function(data){komadiNamestajaa = JSON.parse(data)});
	//pokupi salone da bi ih ponudio korisniku
	var salonia = [];
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
		  }}).done(function(data){salonia = JSON.parse(data)});
	//pokupi komade namestaja da bi ih ponudio korisniku
	var kategorijea = [];
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
		}).done(function(data){kategorijea = JSON.parse(data)});
	
	
  	$("#container").find("#dialog_black_background").remove();
  	$("#container").find(".dialog_akcije_container").children().remove();
  	$("#container").find(".dialog_akcije_container").remove();
  	$("#container").append("<div id='dialog_black_background'></div>");
	$("#container").append("<div class='dialog_akcije_container'></div>");
	
	var dialogSaloniContent = "";
	dialogSaloniContent =" <div class='dialog_akcije_header'> <p class='dialog_akcije_header_title'>Dodavanje Nove Akcije</p> <button type='button' class='exit_dialog_akcije'>X</button> </div> <div class='dialog_akcije_body'> <p class='akcije_datum_od_label'>Datum od:</p> <input type='text' id='akcije_datum_od__input' /> <p class='akcije_datum_do_label'>Datum do:</p> <input type='text' id='akcije_datum_do_input' /> <p class='akcije_popust_label'>Popust:</p> <input type='number' id='akcije_popust_input' min='0' max='100' /> <p class='akcije_kategorije_label'>Kategorije:</p> <select class='akcije_kategorije_select' multiple> </select> <p class='akcije_kn_label'>Komadi nameštaja:</p> <select class='akcije_kn_select' multiple> </select> <p class='akcije_naziv_label'>Naziv:</p> <input type='text' id='akcije_naziv_input' maxlength='64' /> <p class='akcije_salon_label'>Salon:</p> <select class='akcije_salon_select'> </select> </div> <div id='popust_mora'> Popust mora biti ceo broj u opsegu 0-100! </div> <div id='datum_od_mora'> Greska kod datuma! </div> <div id='datum_do_mora'> Greska kod datuma! </div> <div id='naziv_mora'> Naziv postoji! </div>";
	dialogSaloniContent += "<button type='button' class='dodaj_akciju'>DODAJ AKCIJU</button>";
	$(".dialog_akcije_container").append(dialogSaloniContent);
	
	el = document.getElementById("dialog_black_background");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$(".exit_dialog_akcije").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_akcije_container").remove();
    		$(".dialog_akcije_container").hide();
		}		
	)
	
	var selectItems="";
	selectItems+="<option value='-1'>ništa</option>";
	for(var i = 0; i < komadiNamestajaa.KomadiNamestaja.length; i++){
		selectItems+="<option value='"+komadiNamestajaa.KomadiNamestaja[i].sifra+"'>";
		selectItems+=komadiNamestajaa.KomadiNamestaja[i].naziv;
		selectItems+="</option>";
	}
	$(".akcije_kn_select").append(selectItems);
	
	selectItems="";
	selectItems+="<option value='-1'>ništa</option>";
		for(var j = 0; j < kategorijea.Kategorije.length; j++){
			for(var i = 0; i < kategorijea.Kategorije[j].length; i++){
				selectItems+="<option value='"+kategorijea.Kategorije[j][i].naziv+"'>";
				selectItems+=kategorijea.Kategorije[j][i].naziv;
				selectItems+="</option>";
			}
		}
	$(".akcije_kategorije_select").append(selectItems);
	
	selectItems="";
	for(var j = 0; j < salonia.Saloni.length; j++){
			selectItems+="<option value='"+salonia.Saloni[j].pib+"'>";
			selectItems+=salonia.Saloni[j].naziv;
			selectItems+="</option>";
	}
	$(".akcije_salon_select").append(selectItems);
	
	$(".dialog_akcije_container").hide();
	$(".dialog_akcije_container").slideDown();
	el = document.getElementById("dialog_black_background");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$(".exit_dialog_akcije").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_akcije_container").remove();
    		$(".dialog_akcije_container").hide();
		}		
	)
	
	$("#akcije_naziv_input").blur(
			function(){
				if(nazivPostoji($(this)) == false)
					emptyField($(this));
			}
	);
	$("#akcije_popust_input").keyup(
		function(){
			popustGreska($(this));
		}
	);
	$("#akcije_popust_input").blur(
			function(){
					emptyField($(this));
					popustGreska($(this));
			}
	);
	
	
	$("#akcije_datum_od__input").keyup(
			function(){
				parseDatumOd($(this));
			}
		);
	
	$("#akcije_datum_od__input").blur(
			function(){
					emptyField($(this));
					parseDatumOd($(this))
			}
	);
	
	$("#akcije_datum_do_input").keyup(
			function(){
					parseDatumDo($(this))
			}
	);
	
	$("#akcije_datum_do_input").blur(
			function(){
					emptyField($(this));
					parseDatumDo($(this))
			}
	);
	
	$(".dodaj_akciju").click(
			function(){
				
				var e1 = emptyField($("#akcije_naziv_input"));
				var e2 = emptyField($("#akcije_popust_input"));
				var e3 = emptyField($("#akcije_datum_od__input"));
				var e4 = emptyField($("#akcije_datum_do_input"));
				
				var e5 = nazivPostoji($("#akcije_naziv_input"));
				var e6 = popustGreska($("#akcije_popust_input"));
				var e7 = parseDatumDo($("#akcije_datum_do_input"));
				var e8 = parseDatumOd($("#akcije_datum_od__input"));
				
				var e9 = emptyField($(".akcije_kategorije_select"));
				var e10 = emptyField($(".akcije_kn_select"));
				var e11 = emptyField($(".akcije_salon_select"));
				if(e1 == true || e2 == true || e3 == true || e4 == true || e5 == true || e6 == true || e7 == true || e8 == true || e9 == true || e10 == true || e11 == true){
					if(document.getElementById("praznaPolja") == null)
					{
						$(".dialog_akcije_container").append("<div id='praznaPolja'>Polja uokvirena crvenom ne smeju biti prazna!</div>");
					}
				}
				else if(e9 == true && e11 == true){
					$(".dialog_akcije_container").append("<div id='praznaPolja'>Morate odabrati ili kategoriju ili komad nameštaja!</div>");
				}
				else{
					if(document.getElementById("praznaPolja") != null)
					{
						$("#praznaPolja").remove();
					}
					
					var stringForAppend = "";
					stringForAppend +=$("#akcije_datum_od__input").val()+",";
					stringForAppend +=$("#akcije_datum_do_input").val()+",";
					stringForAppend +=$("#akcije_popust_input").val()+",";
					stringForAppend +=$("#akcije_naziv_input").val()+",";
					stringForAppend +=$(".akcije_salon_select").val()+",";
					
					var stringOfSelectedCategories = $(".akcije_kategorije_select").val();
					stringForAppend =" ";
					for(var i = 0; i < (stringOfSelectedCategories.length-1); i++){
						stringForAppend +=$(".akcije_datum_od__input").val()+",";
					}
					stringForAppend += stringOfSelectedCategories[stringOfSelectedCategories.length-1];
					
					var stringOfSelectedItems = $(".akcije_kn_select").val();
					stringForAppend =" ";
					for(var i = 0; i < (stringOfSelectedItems.length-1); i++){
						stringForAppend +=$(".akcije_datum_od__input").val()+",";
					}
					stringForAppend += stringOfSelectedItems[stringOfSelectedItems.length-1];
					
					$.ajaxSetup({async:false});
				  	$.ajax({
				  		  url: "../dodajAkciju",
				  		  type: 'post',
				
				  		  data: {
				  		   akcijaPodaci:JSON.stringify({
				  			   parametar:stringForAppend
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
				  				var akcijaJSON=null;
			  					
						  		if(data == "greska"){
						    		el = document.getElementById("dialog_black_background");
						    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
						    		$(".dialog_komadnamestaja_container").children.remove();
						    		$(".dialog_komadnamestaja_container").css({"width": "200px", "height": "100px", "margin-top": "-50px", "margin-left": "-100px"});
						    		$(".dialog_komadnamestaja_container").append("<p>NISTE DOBRO POPUNILI POLJA!</p>");
					  			}
						  		else if(data == "akcija_postoji"){
						    		el = document.getElementById("dialog_black_background");
						    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
						    		$(".dialog_komadnamestaja_container").children.remove();
						    		$(".dialog_komadnamestaja_container").css({"width": "200px", "height": "100px", "margin-top": "-50px", "margin-left": "-100px"});
						    		$(".dialog_komadnamestaja_container").append("<p>AKCIJA VEC POSTOJI!</p>");
					  			}
						  		else{
						  			akcijaJSON = JSON.parse(data);
						  			
						    		el = document.getElementById("dialog_black_background");
						    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
						    		$(".dialog_akcije_container").remove();
						    		$(".dialog_akcije_container").hide();
						    		
									var tbodyContentString = "<tr><td>"+akcijaJSON.Akcija.naziv+"</td><td>"+akcijaJSON.Akcija.datumPocetka;
									tbodyContentString += "</td><td>"+akcijaJSON.Akcija.datumZavrsetka+"</td>";
									tbodyContentString += "<td>"+aakcijaJSON.Akcija.popust+"</td>";
									tbodyContentString += "<td>"+akcijaJSON.Akcija.salon+"</td>";
									tbodyContentString += "<td>";
									for(var j = 0; j < akcijaJSON.Akcija.kategorije.length; j++){
										tbodyContentString += akcijaJSON.Akcija.kategorije[j].naziv+"; ";
									}
									tbodyContentString += "</td>";
									tbodyContentString += "<td>";
									for(var j = 0; j < akcijaJSON.Akcija.komadiNamestaja.length; j++){
										tbodyContentString += akcijaJSON.Akcija.komadiNamestaja[j].sifra+"; ";
									}
									tbodyContentString += "</td>";
									tbodyContentString += "<td><input type='hidden' value='"+akcijaJSON.Akcija.naziv+"' id='"+akcijaJSON.Akcija.naziv+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+akcijaJSON.Akcija.naziv+"'></button></td>";
									tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+akcijaJSON.Akcija.naziv+"'></button></td></tr>";
									$('.table_body').append(tbodyContentString);
									tbodyContentString = "";
					  			}
			  				});
					

									$(".obrisi_korisnika").click(
							    			function(){
							    				obrisiAkciju($(this));
							    			}	
							    		);
								
								
								
								
								//izmeni korisnika
									$(".izmeni_korisnika").click(
											function(){
												izmeniAkciju($(this));
												}
											);
				}
				
				
			}
	);
	$.ajaxSetup({async:false});

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
function nazivPostoji(tekuciNaziv){
	for(var i = 0; i < akcije.Akcije.length; i++){
		if(akcije.Akcije[i].naziv == $("#akcije_naziv_input").val() && $("#akcije_naziv_input").val()!=tekuciNaziv){
			if($("#naziv_mora").css("visibility") == "hidden")
			{
				$("#naziv_mora").css("visibility","visible");
				$("#akcije_naziv_input").css("border-color","#ff0000");
			}
			return true;
		}
	}
	if($("#naziv_mora").css("visibility") == "visible")
	{
		$("#naziv_mora").css("visibility","hidden");
		$("#akcije_naziv_input").css("border-color","#7fc001");
		return false;
	}
	return false;
}

function nazivPostoji(){
	for(var i = 0; i < akcije.Akcije.length; i++){
		if(akcije.Akcije[i].naziv == $("#akcije_naziv_input").val()){
			if($("#naziv_mora").css("visibility") == "hidden")
			{
				$("#naziv_mora").css("visibility","visible");
				$("#akcije_naziv_input").css("border-color","#ff0000");
			}
			return true;
		}
	}
	if($("#naziv_mora").css("visibility") == "visible")
	{
		$("#naziv_mora").css("visibility","hidden");
		$("#akcije_naziv_input").css("border-color","#7fc001");
		return false;
	}
	return false;
}

//niz funkcija za proveru onoga sta je uneseno
function daLiJeCeoBroj(field){
	return /^\+?(0|[1-9]\d*)$/.test(field[0].value);
}
function datum(field){
	return /^(0?[1-9]|[12][0-9]|3[01])[\-](0?[1-9]|1[012])[\-]\d{4}$/.test(field[0].value);
}
function parseDatumOd(field){
	if (/^(\d{2})-(\d{2})-(\d{4})$/.test(field[0].value) == true){
		var dan = field[0].value.substr(0,2);
		var mesec = field[0].value.substr(3,2);
		var godina = field[0].value.substr(6,4);
		var brDana=-1;
		if(godina<2015 || godina>2018){
    		if($("#datum_od_mora").css("visibility") == "hidden"){
    			$("#datum_od_mora").css("visibility","visible");
    			$("#datum_od_mora").text("Godina je broj izmedju 2015 i 2018");
    		}else{
    			$("#datum_od_mora").text("Godina je broj izmedju 2015 i 2018");
    		}
			return false;
		}
		else if(mesec >12 || mesec<1){
    		if($("#datum_od_mora").css("visibility") == "hidden"){
    			$("#datum_od_mora").css("visibility","visible");
    			$("#datum_od_mora").text("Mesec mora biti broj izmedju 1 i 12");
    		}else{
    			$("#datum_od_mora").text("Mesec mora biti broj izmedju 1 i 12");
    		}
			return false;
		}
		else{
			 switch (mesec)
	            {
	                case 1: brDana = 31; break;
	                case 3: brDana = 31; break;
	                case 5: brDana = 31; break;
	                case 7: brDana = 31; break;
	                case 8: brDana = 31; break;
	                case 10: brDana = 31; break;
	                case 12: brDana = 31; break;

	                case 4: brDana = 30; break;
	                case 6: brDana = 30; break;
	                case 9: brDana = 30; break;
	                case 11: brDana = 30; break;
	                
	                case 2:
	                    var prestupna = false;
	                    if ((godina % 4 == 0 && godina % 100 != 0 || godina % 400 == 0)==true)
	                        var prestupna = true;
	                    if(prestupna)
	                        brDana = 29;
	                    else
	                    	var brDana = 28; break;
	            }
	            if ((mesec == 2 && (godina % 4 == 0 && godina % 100 != 0 || godina % 400 == 0) && dan > 29) == true)
	            {
	        		if($("#datum_od_mora").css("visibility") == "hidden"){
	        			$("#datum_od_mora").css("visibility","visible");
	        			$("#datum_od_mora").text("U prestupnoj godini februar ima najviše 29 dana!");
	        		}else{
	        			$("#datum_od_mora").text("U prestupnoj godini februar ima najviše 29 dana!");
	        		}
	            	return true;
	            }
	            else if ((mesec == 2 && !(godina % 4 == 0 && godina % 100 != 0 || godina % 400 == 0) && dan > 28) == true)
	            {
	        		if($("#datum_od_mora").css("visibility") == "hidden"){
	        			$("#datum_od_mora").css("visibility","visible");
	        			$("#datum_od_mora").text("U godini koja nije prestupna februar ima najviše 28 dana!");
	        		}else{
	        			$("#datum_od_mora").text("U godini koja nije prestupna februar ima najviše 28 dana!");
	        		}
	            	return true;
	            }
	            else if (((mesec == 1 || mesec == 3 || mesec == 5 || mesec == 7 || mesec == 8 || mesec == 10) && dan > 31) == true)
	            {
	        		if($("#datum_od_mora").css("visibility") == "hidden"){
	        			$("#datum_od_mora").css("visibility","visible");
	        			$("#datum_od_mora").text("Mesec '" + mesec + "' može imati najviše 31 dan!");
	        		}else{
	        			$("#datum_od_mora").text("Mesec '" + mesec + "' može imati najviše 31 dan!");
	        		}
	            	return true;
	            }
	            else if (((mesec == 4 || mesec == 6 || mesec == 9 || mesec == 11) && dan > 30)==true)
	            {
	        		if($("#datum_od_mora").css("visibility") == "hidden"){
	        			$("#datum_od_mora").css("visibility","visible");
	        			$("#datum_do_mora").text("Mesec '" + mesec + "' može imati najviše 30 dana!");
	        		}else{
	        			$("#datum_od_mora").text("Mesec '" + mesec + "' može imati najviše 30 dana!");
	        		}
	            	return true;
	            }
	            else if (dan < 1)
	            {
	        		if($("#datum_od_mora").css("visibility") == "hidden"){
	        			$("#datum_od_mora").css("visibility","visible");
	        			$("#datum_do_mora").text("Svaki mesec mora imati najmanje 1 dan!");
	        		}else{
	        			$("#datum_od_mora").text("Svaki mesec mora imati najmanje 1 dan!");
	        		}
	            	return true;
	            }
	    		if($("#datum_od_mora").css("visibility") == "visible")
	    			$("#datum_od_mora").css("visibility","hidden");

	            return false;
		}
	}else{
		if($("#datum_od_mora").css("visibility") == "hidden"){
			$("#datum_od_mora").css("visibility","visible");
			$("#datum_od_mora").text("Format dd-mm-gggg");
		}else{
			$("#datum_od_mora").text("Format dd-mm-gggg");
		}
	}
}
function parseDatumDo(field){
	if (/^(\d{2})-(\d{2})-(\d{4})$/.test(field[0].value) == true){
		var dan = field[0].value.substr(0,2);
		var mesec = field[0].value.substr(3,2);
		var godina = field[0].value.substr(6,4);
		var brDana=-1;
		if(godina<2015 || godina>2018){
    		if($("#datum_do_mora").css("visibility") == "hidden"){
    			$("#datum_do_mora").css("visibility","visible");
    			$("#datum_do_mora").text("Godina je broj izmedju 2015 i 2018");
    		}else{
    			$("#datum_do_mora").text("Godina je broj izmedju 2015 i 2018");
    		}
			return false;
		}
		else if(mesec >12 || mesec<1){
    		if($("#datum_do_mora").css("visibility") == "hidden"){
    			$("#datum_do_mora").css("visibility","visible");
    			$("#datum_do_mora").text("Mesec mora biti broj izmedju 1 i 12");
    		}else{
    			$("#datum_do_mora").text("Mesec mora biti broj izmedju 1 i 12");
    		}
			return false;
		}
		else{
			 switch (mesec)
	            {
	                case 1: brDana = 31; break;
	                case 3: brDana = 31; break;
	                case 5: brDana = 31; break;
	                case 7: brDana = 31; break;
	                case 8: brDana = 31; break;
	                case 10: brDana = 31; break;
	                case 12: brDana = 31; break;

	                case 4: brDana = 30; break;
	                case 6: brDana = 30; break;
	                case 9: brDana = 30; break;
	                case 11: brDana = 30; break;
	                
	                case 2:
	                    var prestupna = false;
	                    if ((godina % 4 == 0 && godina % 100 != 0 || godina % 400 == 0)==true)
	                        var prestupna = true;
	                    if(prestupna)
	                        brDana = 29;
	                    else
	                    	var brDana = 28; break;
	            }
	            if ((mesec == 2 && (godina % 4 == 0 && godina % 100 != 0 || godina % 400 == 0) && dan > 29) == true)
	            {
	        		if($("#datum_do_mora").css("visibility") == "hidden"){
	        			$("#datum_do_mora").css("visibility","visible");
	        			$("#datum_do_mora").text("U prestupnoj godini februar ima najviše 29 dana!");
	        		}else{
	        			$("#datum_do_mora").text("U prestupnoj godini februar ima najviše 29 dana!");
	        		}
	            	return true;
	            }
	            else if ((mesec == 2 && !(godina % 4 == 0 && godina % 100 != 0 || godina % 400 == 0) && dan > 28) == true)
	            {
	        		if($("#datum_do_mora").css("visibility") == "hidden"){
	        			$("#datum_do_mora").css("visibility","visible");
	        			$("#datum_do_mora").text("U godini koja nije prestupna februar ima najviše 28 dana!");
	        		}else{
	        			$("#datum_do_mora").text("U godini koja nije prestupna februar ima najviše 28 dana!");
	        		}
	            	return true;
	            }
	            else if (((mesec == 1 || mesec == 3 || mesec == 5 || mesec == 7 || mesec == 8 || mesec == 10) && dan > 31) == true)
	            {
	        		if($("#datum_do_mora").css("visibility") == "hidden"){
	        			$("#datum_do_mora").css("visibility","visible");
	        			$("#datum_do_mora").text("Mesec '" + mesec + "' može imati najviše 31 dan!");
	        		}else{
	        			$("#datum_do_mora").text("Mesec '" + mesec + "' može imati najviše 31 dan!");
	        		}
	            	return true;
	            }
	            else if (((mesec == 4 || mesec == 6 || mesec == 9 || mesec == 11) && dan > 30)==true)
	            {
	        		if($("#datum_do_mora").css("visibility") == "hidden"){
	        			$("#datum_do_mora").css("visibility","visible");
	        			$("#datum_do_mora").text("Mesec '" + mesec + "' može imati najviše 30 dana!");
	        		}else{
	        			$("#datum_do_mora").text("Mesec '" + mesec + "' može imati najviše 30 dana!");
	        		}
	            	return true;
	            }
	            else if (dan < 1)
	            {
	        		if($("#datum_do_mora").css("visibility") == "hidden"){
	        			$("#datum_do_mora").css("visibility","visible");
	        			$("#datum_do_mora").text("Svaki mesec mora imati najmanje 1 dan!");
	        		}else{
	        			$("#datum_do_mora").text("Svaki mesec mora imati najmanje 1 dan!");
	        		}
	            	return true;
	            }
	    		if($("#datum_do_mora").css("visibility") == "visible")
	    			$("#datum_do_mora").css("visibility","hidden");

	            return false;
		}
	}else{
		if($("#datum_do_mora").css("visibility") == "hidden"){
			$("#datum_do_mora").css("visibility","visible");
			$("#datum_do_mora").text("Format dd-mm-gggg");
		}else{
			$("#datum_do_mora").text("Format dd-mm-gggg");
		}
	}
}
function popustGreska(field){
	var result;
	result = /^[0-9]+(\.[0-9]{1,2})?$/.test(field[0].value);
	if(result == false){
		if($("#popust_mora").css("visibility") == "hidden")
			$("#popust_mora").css("visibility","visible");
		return true;
	}
	else{
		if(parseInt(field[0].value) > 100 || parseInt(field[0].value) < 0){
			if($("#popust_mora").css("visibility") == "hidden")
				$("#popust_mora").css("visibility","visible");
			return true;
		}
		if($("#popust_mora").css("visibility") == "visible")
			$("#popust_mora").css("visibility","hidden");
		return false;
	}
}