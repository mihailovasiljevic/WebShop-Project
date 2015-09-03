//funkcija rukuje dodavanjem, izmenom, brisanjem i prikazom salona
function fn_kategorije(){
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
    	    	$('#content').children().remove();
    	    	$('#content').append("<div id='kategorije_container'><div id='table_container'></div></div>");
    	    	$('#content').hide();
    	    	$('#content').fadeIn(1000);
    	    	
    	    	kategorije = JSON.parse(data);
    			$('#table_container').append("<table class='paginated'></table>");
				$('.paginated').append("<thead class='table_head'></thead>");
				$('.paginated').append("<tbody class='table_body'></tbody>");
				var theadContentString = "<tr><th>Naziv</th><th>Opis</th><th>Nadkategorija</th>";
				theadContentString += "<th></th><th></th><th><button type='button' class='dodaj_korisnika'></button></th>";
				$('.table_head').append(theadContentString);
				var tbodyContentString = "";
				var upisaneTabeleString="";
				var upisaneTabeleNiz = [];
				var allreadyPut = false;
			for(var j = 0; j < kategorije.Kategorije.length; j++){
				for(var i = 0; i < kategorije.Kategorije[j].length; i++){
					allreadyPut = false;
					for(var k = 0; k < upisaneTabeleNiz.length; k++){
						if(upisaneTabeleNiz[k] == kategorije.Kategorije[j][i].roditelj){
							var string = ""+upisaneTabeleNiz[k];
							var trParent = null;
							for(var s = 0; s < $("table tr td input:hidden").length; s++){
								if($("table tr td input:hidden")[s].value == string){
									trParent = $("table tr td input:hidden")[s].parentNode.parentNode;
									break;
								}
									
							}
							var parentRow = $(trParent);
							tbodyContentString = "<tr>";
							tbodyContentString += "<td>";
							for(var l = 0; l < j*10; l++){
								tbodyContentString += "&nbsp";
							}
							tbodyContentString += kategorije.Kategorije[j][i].naziv+"</td>";
							tbodyContentString += "<td>"+kategorije.Kategorije[j][i].opis+"</td>";
							tbodyContentString += "<td>"+kategorije.Kategorije[j][i].roditelj+"</td>";
							tbodyContentString += "<td><input type='hidden' value='"+kategorije.Kategorije[j][i].naziv+"' id='"+kategorije.Kategorije[j][i].naziv+"'/></td>";
							//tbodyContentString += "<td><button type='button' class='toogle_kategorije' value='"+kategorije.Kategorije[0][i].naziv+"'>prikaži</button></td>";
							tbodyContentString += "<td><button type='button' class='obrisi_korisnika' value='"+kategorije.Kategorije[j][i].naziv+"'></button></td>";
							tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+kategorije.Kategorije[j][i].naziv+"'></button></td>";
							tbodyContentString += "</tr>";
							parentRow.after(tbodyContentString);
							tbodyContentString = "";
							upisaneTabeleString = kategorije.Kategorije[j][i].naziv;
							upisaneTabeleNiz.push(upisaneTabeleString);
							allreadyPut = true;
						}
					}
					if(allreadyPut == false){
						tbodyContentString = "<tr><td>"+kategorije.Kategorije[j][i].naziv+"</td>";
						tbodyContentString += "<td>"+kategorije.Kategorije[j][i].opis+"</td>";
						tbodyContentString += "<td>"+kategorije.Kategorije[j][i].roditelj+"</td>";
						
						tbodyContentString += "<td><input type='hidden' value='"+kategorije.Kategorije[j][i].naziv+"' id='"+kategorije.Kategorije[j][i].naziv+"'/></td>";
						//tbodyContentString += "<td><button type='button' class='toogle_kategorije' value='"+kategorije.Kategorije[0][i].naziv+"'>prikaži</button></td>";
						tbodyContentString += "<td><button type='button' class='obrisi_korisnika' value='"+kategorije.Kategorije[j][i].naziv+"'></button></td>";
						tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+kategorije.Kategorije[j][i].naziv+"'></button></td></tr>";
						$('.table_body').append(tbodyContentString);
						tbodyContentString = "";
						upisaneTabeleString = kategorije.Kategorije[j][i].naziv;
						upisaneTabeleNiz.push(upisaneTabeleString);
					}
				}
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
				
				//obrisi kategoriju
				$(".obrisi_korisnika").click(
			    			function(){
			    				obrisiKategoriju($(this));
			    			}	
			    		);
				
				
				//izmeni kategoriju
				$(".izmeni_korisnika").click(
						function(){
							izmeniKategoriju($(this));
							}
						);
				
				
				//dogadjaj na dodavanje kategorije
				$(".dodaj_korisnika").click(
					function(){
							dodajKategoriju();
					}		
				);
				/*
				//toogle_kategorije, klikom se prikazuje tabela svih podkategorija
				$(".toogle_kategorije").click(
						function(){
							showMoreCategories($(this));
						}
				);
				*/
				
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
	for(var j = 0; j < kategorije.Kategorije.length; j++){
		for(var i = 0; i < kategorije.Kategorije[j].length; i++){
			if(kategorije.Kategorije[j][i].naziv == $("#dialog_kategorije_body_field_naziv_input_naziv").val()){
				if(document.getElementById("naziv_postoji") == null)
				{
					$(".dialog_kategorije").append("<div id='naziv_postoji'>Naziv postoji!</div>");
					$("#dialog_kategorije_body_field_naziv_input_naziv").css("border-color","#ff0000");
				}
				return true;
			}
		}
	}
	if(document.getElementById("naziv_postoji") != null)
	{
		$("#naziv_postoji").remove();
		$("#dialog_kategorije_body_field_naziv_input_naziv").css("border-color","#7fc001");
		return false;
	}
	return false;
}


//niz funkcija za proveru da li postoje takva polja, prilikom izmene
function nazivPostoji(tekuciNaziv){
	for(var j = 0; j < kategorije.Kategorije.length; j++){
		for(var i = 0; i < kategorije.Kategorije[j].length; i++){
			if(kategorije.Kategorije[j][i].naziv == $("#dialog_kategorije_body_field_naziv_input_naziv").val() && $("#dialog_kategorije_body_field_naziv_input_naziv").val() != tekuciNaziv){
				if(document.getElementById("naziv_postoji") == null)
				{
					$(".dialog_kategorije").append("<div id='naziv_postoji'>Naziv postoji!</div>");
					$("#dialog_kategorije_body_field_naziv_input_naziv").css("border-color","#ff0000");
				}
				return true;
			}
		}
	}
	if(document.getElementById("naziv_postoji") != null)
	{
		$("#naziv_postoji").remove();
		$("#dialog_kategorije_body_field_naziv_input_naziv").css("border-color","#7fc001");
		return false;
	}
	return false;
}


//funkcija dodaj kategoriju
function dodajKategoriju(){
	var korisnikZaDodavanje = null;
	//pokupi kategorije u slucaju da je bilo promena
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
		}).done(function(data){ kategorije = JSON.parse(data)});
	//
  	$("#container").find("#dialog_black_background").remove();
  	$("#container").find(".dialog_kategorije").children().remove();
  	$("#container").find(".dialog_kategorije").remove();
  	$("#container").append("<div id='dialog_black_background'></div>");
	$("#container").append("<div class='dialog_kategorije'></div>");
	
	var dialogSaloniContent = "";
	dialogSaloniContent =" <div class='dialog_kategorije_header'> <div class='dialog_kategorije_header_close'> <button type='button' class='dialog_kategorije_header_close_button'>X</button> </div> <div class='dialog_kategorije_header_title'> Dodavanje Nove Kategorije </div> </div> <div class='dialog_kategorije_body'> <div class='dialog_kategorije_body_field_naziv'> <div class='dialog_kategorije_body_field_naziv_label_naziv'> Naziv: </div> <div class='dialog_kategorije_body_field_naziv_input_naziv'> <input type='text' maxlength='64' id='dialog_kategorije_body_field_naziv_input_naziv'/> </div> </div> <div class='dialog_kategorije_body_field_opis'> <div class='dialog_kategorije_body_field_opis_label_opis'> Opis: </div> <div class='dialog_kategorije_body_field_opis_input_opis'><textarea rows='4' cols='50' id ='dialog_kategorije_body_field_opis_textarea_opis'></textarea> </div> </div> <div class='dialog_kategorije_body_field_dodaj_pod_kategoriju'> <div class='dialog_kategorije_body_field_dodaj_podkategoriju_label'> Dodaj kao podkategoriju u: </div> <div class='dialog_kategorije_body_field_dodaj_podkategoriju'> </div> </div> </div>";
	dialogSaloniContent += "<button type='button' class='dodaj_kategoriju'>DODAJ KATEGORIJU</button>";
	var selectionItems="";
	selectionItems = "<select class='select_category'><option value='Nameštaj'>Nameštaj</option>";
	for(var j = 0; j < kategorije.Kategorije.length; j++){
		for(var i = 0; i < kategorije.Kategorije[j].length; i++){
			selectionItems +="<option value='"+kategorije.Kategorije[j][i].naziv+"'>"+kategorije.Kategorije[j][i].naziv+"</option>";
		}
	}
	selectionItems += "</select>"
	$(".dialog_kategorije_body_field_dodaj_podkategoriju").append(selectionItems);
	$(".dialog_kategorije").append(dialogSaloniContent);
	$(".dialog_kategorije").append(selectionItems);
	$(".dialog_kategorije").hide();
	$(".dialog_kategorije").slideDown();
	el = document.getElementById("dialog_black_background");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$(".dialog_kategorije_header_close_button").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_kategorije").remove();
    		$(".dialog_kategorije").hide();
		}		
	)
	
	$("#dialog_kategorije_body_field_naziv_input_naziv").blur(
			function(){
				if(nazivPostoji() == false)
					emptyField($(this));
			}
	);
	
	$("#dialog_kategorije_body_field_opis_textarea_opis").blur(
			function(){
					emptyField($(this));
			}
	);
	$(".dodaj_kategoriju").click(
		function(){
				var e1 = emptyField($("#dialog_kategorije_body_field_naziv_input_naziv"));
				var e2 = emptyField($("#dialog_kategorije_body_field_opis_textarea_opis"));
				
				if(e1 == true || e2 == true){
					if(document.getElementById("praznaPolja") == null)
					{
						$(".dialog_kategorije").append("<div id='praznaPolja'>Polja uokvirena crvenom ne smeju biti prazna!</div>");
					}
				}
				else if(e1 == false && e2 == false) {
			
						if(document.getElementById("praznaPolja") != null)
						{
							$("#praznaPolja").remove();
						}
						
						$.ajaxSetup({async:false});
					  	$.ajax({
					  		  url: "../dodajKategoriju",
					  		  type: 'post',
					
					  		  data: {
					  		   kategorijaPodaci:JSON.stringify({
					  		  	 parametar: $("#dialog_kategorije_body_field_naziv_input_naziv").val()+","+$("#dialog_kategorije_body_field_opis_textarea_opis").val()+","+$(".select_category").val()
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
					  					var kategorijaJSON = JSON.parse(data);
								  		if(kategorijaJSON == "\"kategorija_postoji\""){
								    		el = document.getElementById("dialog_black_background");
								    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
								    		$(".dialog_saloni").children.remove();
								    		$(".dialog_saloni").css({"width": "200px", "height": "100px", "margin-top": "-50px", "margin-left": "-100px"});
								    		$(".dialog_saloni").append("<p>KATEGORIJA POSTOJI!</p>");
							  			}else{
							  	    		el = document.getElementById("dialog_black_background");
							  	    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
							  	    		$(".dialog_kategorije").remove();
							  	    		$(".dialog_kategorije").hide();
							  	    		for(var j = 0; j < kategorije.Kategorije.length; j++){
							  	    			for(var i = 0; i < kategorije.Kategorije[j].length; i++){
							  	    				if(kategorije.Kategorije[j][i].roditelj == kategorijaJSON.Kategorija[0].roditelj){
														var string = ""+kategorije.Kategorije[j][i].naziv ;
														var trParent = null;
														for(var s = 0; s < $("table tr td input:hidden").length; s++){
															if($("table tr td input:hidden")[s].value == string){
																trParent = $("table tr td input:hidden")[s].parentNode.parentNode;
																break;
															}	
														}
														var parentRow = $(trParent);
														
														tbodyContentString = "<tr>";
														tbodyContentString += "<td>";
														for(var l = 0; l < j*10; l++){
															tbodyContentString += "&nbsp";
														}
														tbodyContentString += kategorijaJSON.Kategorija[0].naziv+"</td>";
														tbodyContentString += "<td>"+kategorijaJSON.Kategorija[0].opis+"</td>";
														tbodyContentString += "<td>"+kategorijaJSON.Kategorija[0].roditelj+"</td>";
														tbodyContentString += "<td><input type='hidden' value='"+kategorijaJSON.Kategorija[0].naziv+"' id='"+kategorijaJSON.Kategorija[0].naziv+"'/></td>";
														//tbodyContentString += "<td><button type='button' class='toogle_kategorije' value='"+kategorije.Kategorije[0][i].naziv+"'>prikaži</button></td>";
														tbodyContentString += "<td><button type='button' class='obrisi_korisnika' value='"+kategorijaJSON.Kategorija[0].naziv+"'></button></td>";
														tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+kategorijaJSON.Kategorija[0].naziv+"'></button></td>";
														tbodyContentString += "</tr>";
														parentRow.after(tbodyContentString);
														tbodyContentString = "";
														break;
							  	    				}
							  	    			}
							  	    		}
							  			}
								  		
										$(".obrisi_korisnika").click(
								    			function(){
								    				obrisiKategoriju($(this));
								    			}	
								    		);
									
									
									
									
									//izmeni kategoriju
										$(".izmeni_korisnika").click(
												function(){
													izmeniKategoriju($(this));
													}
												);
								  		
					  				}
					  		);
					}
		});
	$.ajaxSetup({async:true});
}

//funkcija dodaj kategoriju
function izmeniKategoriju(polje){
	var korisnikZaDodavanje = null;
	//pokupi kategorije u slucaju da je bilo promena
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
		}).done(function(data){ kategorije = JSON.parse(data)});
	//
  	$("#container").find("#dialog_black_background").remove();
  	$("#container").find(".dialog_kategorije").children().remove();
  	$("#container").find(".dialog_kategorije").remove();
  	$("#container").append("<div id='dialog_black_background'></div>");
	$("#container").append("<div class='dialog_kategorije'></div>");
	
	var dialogSaloniContent = "";
	dialogSaloniContent =" <div class='dialog_kategorije_header'> <div class='dialog_kategorije_header_close'> <button type='button' class='dialog_kategorije_header_close_button'>X</button> </div> <div class='dialog_kategorije_header_title'> Dodavanje Nove Kategorije </div> </div> <div class='dialog_kategorije_body'> <div class='dialog_kategorije_body_field_naziv'> <div class='dialog_kategorije_body_field_naziv_label_naziv'> Naziv: </div> <div class='dialog_kategorije_body_field_naziv_input_naziv'> <input type='text' maxlength='64' id='dialog_kategorije_body_field_naziv_input_naziv' disabled/> </div> </div> <div class='dialog_kategorije_body_field_opis'> <div class='dialog_kategorije_body_field_opis_label_opis'> Opis: </div> <div class='dialog_kategorije_body_field_opis_input_opis'><textarea rows='4' cols='50' id ='dialog_kategorije_body_field_opis_textarea_opis'></textarea> </div> </div> <div class='dialog_kategorije_body_field_dodaj_pod_kategoriju'> <div class='dialog_kategorije_body_field_dodaj_podkategoriju_label'> Dodaj kao podkategoriju u: </div> <div class='dialog_kategorije_body_field_dodaj_podkategoriju'> </div> </div> </div>";
	dialogSaloniContent += "<button type='button' class='izmeni_kategoriju'>IZMENI KATEGORIJU</button>";
	var selectionItems="";
	selectionItems = "<select class='select_category'><option value='Nameštaj'>Nameštaj</option>";
	for(var j = 0; j < kategorije.Kategorije.length; j++){
		for(var i = 0; i < kategorije.Kategorije[j].length; i++){
			selectionItems +="<option value='"+kategorije.Kategorije[j][i].naziv+"'>"+kategorije.Kategorije[j][i].naziv+"</option>";
		}
	}
	selectionItems += "</select>"
	$(".dialog_kategorije_body_field_dodaj_podkategoriju").append(selectionItems);
	$(".dialog_kategorije").append(dialogSaloniContent);
	$(".dialog_kategorije").append(selectionItems);
	$(".dialog_kategorije").hide();
	$(".dialog_kategorije").slideDown();
	el = document.getElementById("dialog_black_background");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	$(".dialog_kategorije_header_close_button").click(
		function(){
    		el = document.getElementById("dialog_black_background");
    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    		$(".dialog_kategorije").remove();
    		$(".dialog_kategorije").hide();
		}		
	)
	
	var kategorijaZaIzmenu = null;
	for(var j = 0; j < kategorije.Kategorije.length; j++){
		for(var i = 0; i < kategorije.Kategorije[j].length; i++){
			if(polje.val() == kategorije.Kategorije[j][i].naziv){
				kategorijaZaIzmenu = kategorije.Kategorije[j][i];
				break;
			}
		} 
	}
	
	$("#dialog_kategorije_body_field_naziv_input_naziv").val(""+kategorijaZaIzmenu.naziv);
	$("#dialog_kategorije_body_field_opis_textarea_opis").val(""+kategorijaZaIzmenu.naziv);
	$(".select_category option[value='"+kategorijaZaIzmenu.roditelj+"']").attr('selected','selected');
	$("#dialog_kategorije_body_field_naziv_input_naziv").css("border","none");
	$("#dialog_kategorije_body_field_naziv_input_naziv").blur(
			function(){
				if(nazivPostoji(kategorijaZaIzmenu.naziv) == false)
					emptyField($(this));
			}
	);
	
	$("#dialog_kategorije_body_field_opis_textarea_opis").blur(
			function(){
					emptyField($(this));
			}
	);
	$(".izmeni_kategoriju").click(
		function(){
				var e1 = emptyField($("#dialog_kategorije_body_field_naziv_input_naziv"));
				var e2 = emptyField($("#dialog_kategorije_body_field_opis_textarea_opis"));
				
				if(e1 == true || e2 == true){
					if(document.getElementById("praznaPolja") == null)
					{
						$(".dialog_kategorije").append("<div id='praznaPolja'>Polja uokvirena crvenom ne smeju biti prazna!</div>");
					}
				}
				else if(e1 == false || e2 == false) {
			
						if(document.getElementById("praznaPolja") != null)
						{
							$("#praznaPolja").remove();
						}
						
						$.ajaxSetup({async:false});
					  	$.ajax({
					  		  url: "../izmeniKategoriju",
					  		  type: 'post',
					
					  		  data: {
					  		   kategorijaPodaci:JSON.stringify({
					  		  	 parametar: $("#dialog_kategorije_body_field_naziv_input_naziv").val()+","+$("#dialog_kategorije_body_field_opis_textarea_opis").val()+","+$(".select_category").val()+","+kategorijaZaIzmenu.roditelj
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
					  					var kategorijaJSON = JSON.parse(data);
								  		if(kategorijaJSON == "\"kategorija_ne_postoji\""){
								    		el = document.getElementById("dialog_black_background");
								    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
								    		$(".dialog_kategorije").remove();
								    		$(".dialog_kategorije").hide();
							  			}else{
							  	    		el = document.getElementById("dialog_black_background");
							  	    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
							  	    		$(".dialog_kategorije").remove();
							  	    		$(".dialog_kategorije").hide();
							  				iscrtajCeluTabelu(data);
							  				paginacija();
							  			}
								  		
										$(".obrisi_korisnika").click(
								    			function(){
								    				obrisiKategoriju($(this));
								    			}	
								    		);
									
									
									
									
									//izmeni kategoriju
										$(".izmeni_korisnika").click(
												function(){
													izmeniKategoriju($(this));
													}
												);
										
										//dogadjaj na dodavanje kategorije
										$(".dodaj_korisnika").click(
											function(){
													dodajKategoriju();
											}		
										);
					  				}
					  		);
					}
		});
	$.ajaxSetup({async:true});
}


function obrisiKategoriju(polje){
	//pokupi kategorije u slucaju da je bilo promena
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
		}).done(function(data){ kategorije = JSON.parse(data)});
	
	var kategorijaZaBrisanje = null;
	for(var j = 0; j < kategorije.Kategorije.length; j++){
		for(var i = 0; i < kategorije.Kategorije[j].length; i++){
			if(polje.val() == kategorije.Kategorije[j][i].naziv){
				kategorijaZaBrisanje = kategorije.Kategorije[j][i];
				break;
			}
		} 
	}
	
  	$("#container").find("#dialog_black_background").remove();
  	$("#container").find(".dialog_warning_container").children().remove();
  	$("#container").find(".dialog_warning_container").remove();
  	$("#container").append("<div id='dialog_black_background'></div>");
	$("#container").append("<div class='dialog_warning_container'></div>");
	
	var dialogSaloniContent = "";
	dialogSaloniContent = "<div class='dialog_header_container'> <p class='dialog_header_title'>Da li ste sigurni?</p> <p class='dialog_header_exit'>X</p> </div> <div class='dialog_body_container'> <p class='dialog_body_txt'>Ukoliko nastavite obrisaćete i sve podkategorije. Da li želite da nastavite?</p> <button type='button' class='dialog_warning_nastavi'>nastavi</button> <button type='button' class='dialog_warning_odustani'>odustani</button> </div>";
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
	$(".dialog_warning_nastavi").click(
		function(){
	
			$.ajaxSetup({async:false});
		  	$.ajax({
		  		  url: "../obrisiKategoriju",
		  		  type: 'post',
		
		  		  data: {
		  		   kategorijaPodaci:JSON.stringify({
		  			 parametar: kategorijaZaBrisanje.naziv+","+kategorijaZaBrisanje.opis+","+kategorijaZaBrisanje.roditelj
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
		  				if(data == "\"kategorija_ne_postoji\"")
		  					$("#"+kategorija.Kategorija[0].naziv+"").parent().parent().parent().append("<p>NE POSTOJI SALON!</p>");
		  				
		  				//zbog mogucnosti da se je obrisana nadkategorija koja sadrzi veliki broj podkategorija, itd. citava tabela se iscrtava ponovo
		  	    		el = document.getElementById("dialog_black_background");
		  	    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
		  	    		$(".dialog_warning_container").remove();
		  	    		$(".dialog_warning_container").hide();
		  				iscrtajCeluTabelu(data);
		  				paginacija();
						$(".obrisi_korisnika").click(
				    			function(){
				    				obrisiKategoriju($(this));
				    			}	
				    		);
					
					
					
					
					//izmeni kategoriju
						$(".izmeni_korisnika").click(
								function(){
									izmeniKategoriju($(this));
									}
								);
		  			});
			//dogadjaj na dodavanje kategorije
			$(".dodaj_korisnika").click(
				function(){
						dodajKategoriju();
				}		
			);
		});
	$.ajaxSetup({async:true});
	
}

function iscrtajCeluTabelu(data){
	$('#content').children().remove();
	$('#content').append("<div id='kategorije_container'><div id='table_container'></div></div>");
	
	kategorije = JSON.parse(data);
	$('#table_container').append("<table class='paginated'></table>");
	$('.paginated').append("<thead class='table_head'></thead>");
	$('.paginated').append("<tbody class='table_body'></tbody>");
	var theadContentString = "<tr><th>Naziv</th><th>Opis</th><th>Nadkategorija</th>";
	theadContentString += "<th></th><th></th><th><button type='button' class='dodaj_korisnika'></button></th>";
	$('.table_head').append(theadContentString);
	var tbodyContentString = "";
	var upisaneTabeleString="";
	var upisaneTabeleNiz = [];
	var allreadyPut = false;
	for(var j = 0; j < kategorije.Kategorije.length; j++){
		for(var i = 0; i < kategorije.Kategorije[j].length; i++){
			allreadyPut = false;
			for(var k = 0; k < upisaneTabeleNiz.length; k++){
				if(upisaneTabeleNiz[k] == kategorije.Kategorije[j][i].roditelj){
					var string = ""+upisaneTabeleNiz[k];
					var trParent = null;
					for(var s = 0; s < $("table tr td input:hidden").length; s++){
						if($("table tr td input:hidden")[s].value == string){
							trParent = $("table tr td input:hidden")[s].parentNode.parentNode;
							break;
						}
							
					}
					var parentRow = $(trParent);
					tbodyContentString = "<tr>";
					tbodyContentString += "<td>";
					for(var l = 0; l < j*10; l++){
						tbodyContentString += "&nbsp";
					}
					tbodyContentString += kategorije.Kategorije[j][i].naziv+"</td>";
					tbodyContentString += "<td>"+kategorije.Kategorije[j][i].opis+"</td>";
					tbodyContentString += "<td>"+kategorije.Kategorije[j][i].roditelj+"</td>";
					tbodyContentString += "<td><input type='hidden' value='"+kategorije.Kategorije[j][i].naziv+"' id='"+kategorije.Kategorije[j][i].naziv+"'/></td>";
					//tbodyContentString += "<td><button type='button' class='toogle_kategorije' value='"+kategorije.Kategorije[0][i].naziv+"'>prikaži</button></td>";
					tbodyContentString += "<td><button type='button' class='obrisi_korisnika' value='"+kategorije.Kategorije[j][i].naziv+"'></button></td>";
					tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+kategorije.Kategorije[j][i].naziv+"'></button></td>";
					tbodyContentString += "</tr>";
					parentRow.after(tbodyContentString);
					tbodyContentString = "";
					upisaneTabeleString = kategorije.Kategorije[j][i].naziv;
					upisaneTabeleNiz.push(upisaneTabeleString);
					allreadyPut = true;
				}
			}
			if(allreadyPut == false){
				tbodyContentString = "<tr><td>"+kategorije.Kategorije[j][i].naziv+"</td>";
				tbodyContentString += "<td>"+kategorije.Kategorije[j][i].opis+"</td>";
				tbodyContentString += "<td>"+kategorije.Kategorije[j][i].roditelj+"</td>";
				
				tbodyContentString += "<td><input type='hidden' value='"+kategorije.Kategorije[j][i].naziv+"' id='"+kategorije.Kategorije[j][i].naziv+"'/></td>";
				//tbodyContentString += "<td><button type='button' class='toogle_kategorije' value='"+kategorije.Kategorije[0][i].naziv+"'>prikaži</button></td>";
				tbodyContentString += "<td><button type='button' class='obrisi_korisnika' value='"+kategorije.Kategorije[j][i].naziv+"'></button></td>";
				tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+kategorije.Kategorije[j][i].naziv+"'></button></td></tr>";
				$('.table_body').append(tbodyContentString);
				tbodyContentString = "";
				upisaneTabeleString = kategorije.Kategorije[j][i].naziv;
				upisaneTabeleNiz.push(upisaneTabeleString);
			}
		}
	}
	
}
function paginacija(){
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
}