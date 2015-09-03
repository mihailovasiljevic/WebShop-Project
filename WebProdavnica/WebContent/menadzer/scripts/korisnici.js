function fn_korisnici(){
       	$.ajaxSetup({async:false});
    	$.ajax({
    		  url: "../table",
    		  type: 'get',

    		  data: {
    		   tabelaPodaci:JSON.stringify({
    		  	 parametar:"korisnici"
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
    	    	$('#content').hide();
    			$("#content").load("korisnici.txt",function(){
    	            $(this).fadeIn(2000);
    	        });
    			//alert("Data: "+data);
                korisnici = JSON.parse(data);
				// kreiraj tabelu i prikazi je na stranici
				$('#table_container').append("<table class='paginated'></table>");
				$('.paginated').append("<thead class='table_head'></thead>");
				$('.paginated').append("<tbody class='table_body'></tbody>");
				var theadContentString = "<tr><th>Ime</th><th>Prezime</th><th>Korisničko ime</th>";
				theadContentString += "<th>Lozinka</th><th>Kontakt telefon</th><th>E-mail</th>";
				theadContentString += "<th>Uloga</th><th>Prijavljen</th><th></th><th></th><th><button type='button' class='dodaj_korisnika'></button></th>";
				$('.table_head').append(theadContentString);
				theadContentString = null;
				for(var i = 0; i < korisnici.Korisnici.length; i++){
					var spanClass="";
					if(korisnici.Korisnici[i].prijavljen == "true"){
						var prijavljen = "prijavljen";
						spanClass = "prijavljen_korisnik";
					}
					else{
						prijavljen = "nije prijavljen";
						spanClass = "neprijavljen_korisnik";
					}
					var tbodyContentString = "<tr><td>"+korisnici.Korisnici[i].ime+"</td><td>"+korisnici.Korisnici[i].prezime;
					tbodyContentString += "</td><td>"+korisnici.Korisnici[i].korisnickoIme+"</td><td>"+korisnici.Korisnici[i].lozinka;
					tbodyContentString += "</td><td>"+korisnici.Korisnici[i].kontaktTelefon+"</td><td>"+korisnici.Korisnici[i].email;
					tbodyContentString += "</td><td>"+korisnici.Korisnici[i].uloga+"</td><td><span class='"+spanClass+"'>"+prijavljen;
					tbodyContentString += "</span></td><td><input type='hidden' value='"+korisnici.Korisnici[i].korisnickoIme+"' id='"+korisnici.Korisnici[i].korisnickoIme+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+korisnici.Korisnici[i].korisnickoIme+"'></button></td>";
					tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+korisnici.Korisnici[i].korisnickoIme+"'></button></td></tr>";
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
				//obrisi korisnika
				$(".obrisi_korisnika").click(
			    			function(){
			    				obrisiKorisnika($(this));
			    			}	
			    		);
				
				
				
				
				//izmeni korisnika
				$(".izmeni_korisnika").click(
						function(){
							izmeniKorisnika($(this));
							}
						);
				
				
				
				
				
				//dogadjaj na dodavanje korisnika
				$(".dodaj_korisnika").click(
					function(){
							dodajKorisnika();
					}		
				);
				
				
    		});
    	$.ajaxSetup({async:true});

    }
    
	// Niz funkcija za proveru da li su polja prazna!
	function praznoIme(){

			if($("#ime_dodaj_korisnika").val() == "" || $("#ime_dodaj_korisnika").val() == undefined || $("#ime_dodaj_korisnika").val() == null){
				$("#ime_dodaj_korisnika").css("border-color","#ff0000");
				return true;
			}else{
				$("#ime_dodaj_korisnika").css("border-color","#7fc001");
				return false;
			}
	}
	function praznoPrezime(){
		if($("#prezime_dodaj_korisnika").val() == "" || $("#prezime_dodaj_korisnika").val() == undefined || $("#prezime_dodaj_korisnika").val() == null){
			$("#prezime_dodaj_korisnika").css("border-color","#ff0000");
			return true;
		}else{
			$("#prezime_dodaj_korisnika").css("border-color","#7fc001");
			return false;
		}
   	}
	function praznoKorisnickoIme(){
		if($("#korisnickoime_dodaj_korisnika").val() == "" || $("#korisnickoime_dodaj_korisnika").val() == undefined || $("#korisnickoime_dodaj_korisnika").val() == null){
			$("#korisnickoime_dodaj_korisnika").css("border-color","#ff0000");
			return true;
		}else{
			$("#korisnickoime_dodaj_korisnika").css("border-color","#7fc001");
			return false;
		}
   	}
	function praznoLozinka(){
		if($("#lozinka_dodaj_korisnika").val() == "" || $("#lozinka_dodaj_korisnika").val() == undefined || $("#lozinka_dodaj_korisnika").val() == null){
			$("#lozinka_dodaj_korisnika").css("border-color","#ff0000");
			return true;
		}else{
			$("#lozinka_dodaj_korisnika").css("border-color","#7fc001");
			return false;
		}
   	}
	function praznoKontaktTelefon(){
		if($("#kontakttelefon_dodaj_korisnika").val() == "" || $("#kontakttelefon_dodaj_korisnika").val() == undefined || $("#kontakttelefon_dodaj_korisnika").val() == null){
			$("#kontakttelefon_dodaj_korisnika").css("border-color","#ff0000");
			return true;
		}else{
			$("#kontakttelefon_dodaj_korisnika").css("border-color","#7fc001");
			return false;
		}
   	}
	function praznoEmail(){
		if($("#email_dodaj_korisnika").val() == "" || $("#email_dodaj_korisnika").val() == undefined || $("#email_dodaj_korisnika").val() == null){
			$("#email_dodaj_korisnika").css("border-color","#ff0000");
			return true;
		}else{
			$("#email_dodaj_korisnika").css("border-color","#7fc001");
			return false;
		}
   	}
	function praznoUloga(){
		if($("#uloga_dodaj_korisnika").val() == "" || $("#uloga_dodaj_korisnika").val() == undefined || $("#uloga_dodaj_korisnika").val() == null){
			$("#uloga_dodaj_korisnika").css("border-color","#ff0000");
			return true;
		}else{
			$("#uloga_dodaj_korisnika").css("border-color","#7fc001");
			return false;
		}
   	}
	
	//niz funkcija za proveru da li postoje takva polja
	function korisnickoImePostoji(){
		for(var i = 0; i < korisnici.Korisnici.length; i++){
			if(korisnici.Korisnici[i].korisnickoIme == $("#korisnickoime_dodaj_korisnika").val()){
				if(document.getElementById("korisnickoImePostoji") == null)
				{
					$(".form_div_korisnik").append("<div id='korisnickoImePostoji'>Korisnicko ime<br /> postoji!</div>");
					$("#korisnickoime_dodaj_korisnika").css("border-color","#ff0000");
				}
				return true;
			}
		}
		if(document.getElementById("korisnickoImePostoji") != null)
		{
			$("#korisnickoImePostoji").remove();
			$("#korisnickoime_dodaj_korisnika").css("border-color","#7fc001");
			return false;
		}
		return false;
	}
	/*
	function lozinkaPostoji(){
		for(var i = 0; i < korisnici.Korisnici.length; i++){
			if(korisnici.Korisnici[i].lozinka == $("#lozinka_dodaj_korisnika").val()){
				if(document.getElementById("lozinkaPostoji") == null)
				{
					$(".form_div_korisnik").append("<div id='lozinkaPostoji'>Lozinka<br /> postoji!</div>");
					$("#lozinka_dodaj_korisnika").css("border-color","#ff0000");
				}
				return true;
			}
		}
		if(document.getElementById("lozinkaPostoji") != null)
		{
			$("#lozinkaPostoji").remove();
			$("#lozinka_dodaj_korisnika").css("border-color","#7fc001");
			return false;
		}
		return false;
	}
	*/
	//niz funkcija za proveru da li postoje takva polja
	function korisnickoImePostoji(tekuceIme){
		for(var i = 0; i < korisnici.Korisnici.length; i++){
			if(korisnici.Korisnici[i].korisnickoIme == $("#korisnickoime_dodaj_korisnika").val() && $("#korisnickoime_dodaj_korisnika").val() != tekuceIme){
				if(document.getElementById("korisnickoImePostoji") == null)
				{
					$(".form_div_korisnik").append("<div id='korisnickoImePostoji'>Korisnicko ime<br /> postoji!</div>");
					$("#korisnickoime_dodaj_korisnika").css("border-color","#ff0000");
				}
				return true;
			}
		}
		if(document.getElementById("korisnickoImePostoji") != null)
		{
			$("#korisnickoImePostoji").remove();
			$("#korisnickoime_dodaj_korisnika").css("border-color","#7fc001");
			return false;
		}
		return false;
	}
	/*
	function lozinkaPostoji(tekucaLozinka){
		for(var i = 0; i < korisnici.Korisnici.length; i++){
			if(korisnici.Korisnici[i].lozinka == $("#lozinka_dodaj_korisnika").val() && $("#lozinka_dodaj_korisnika").val() != tekucaLozinka){
				if(document.getElementById("lozinkaPostoji") == null)
				{
					$(".form_div_korisnik").append("<div id='lozinkaPostoji'>Lozinka<br /> postoji!</div>");
					$("#lozinka_dodaj_korisnika").css("border-color","#ff0000");
				}
				return true;
			}
		}
		if(document.getElementById("lozinkaPostoji") != null)
		{
			$("#lozinkaPostoji").remove();
			$("#lozinka_dodaj_korisnika").css("border-color","#7fc001");
			return false;
		}
		return false;
	}
	*/
	
	//funkcija dodaj korisnika
	function dodajKorisnika(){
		//pokupi korisnike u slucaju da je bilo promena
       	$.ajaxSetup({async:false});
    	$.ajax({
    		  url: "../table",
    		  type: 'get',

    		  data: {
    		   tabelaPodaci:JSON.stringify({
    		  	 parametar:"korisnici"
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
    		}).done(function(data){ korisnici = JSON.parse(data)});
		//posalji zhtev serveru za uloge
		$.ajaxSetup({async:false});
	  	$.ajax({
	  		  url: "../table",
	  		  type: 'get',
	
	  		  data: {
	  		   tabelaPodaci:JSON.stringify({
	  		  	 parametar:"uloge"
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
	  		}).done(function(data){uloge = jQuery.parseJSON(data)});
		
	  	$("#container").find("#dodaj_korisnika").remove();
	  	$("#container").find(".form_div_korisnik").children().remove();
	  	$("#container").find(".form_div_korisnik").remove();
	  	
		$("#container").append("<div id='dodaj_korisnika'></div>");
		$("#container").append("<div class='form_div_korisnik'></div>");
		$(".form_div_korisnik").append("<div class='header_form_div_korisnik'><p>Dodavanje novog korisnika</p></div>");
		$(".header_form_div_korisnik").append("<button type='button' class='exit_overlay'></button>");
		
		var formDivKorisnikContentString = "";
		formDivKorisnikContentString += "<p class='ime_dodaj_korisnika'>Ime:</p>";
		formDivKorisnikContentString += "<input type='text' id='ime_dodaj_korisnika' maxlength='64'></input>";
		formDivKorisnikContentString += "<p class='prezime_dodaj_korisnika' >Prezime:</p>";
		formDivKorisnikContentString += "<input type='text' id='prezime_dodaj_korisnika' maxlength='64'></input>";
		formDivKorisnikContentString += "<p class='korisnickoime_dodaj_korisnika'>Korisničko ime:</p>";
		formDivKorisnikContentString += "<input type='text' id='korisnickoime_dodaj_korisnika' maxlength='16'></input>";
		formDivKorisnikContentString += "<p class='lozinka_dodaj_korisnika' >Lozinka:</p>";
		formDivKorisnikContentString += "<input type='text' id='lozinka_dodaj_korisnika' maxlength='12'></input>";
		formDivKorisnikContentString += "<p class='kontakttelefon_dodaj_korisnika'>Kontakt telefon:</p>";
		formDivKorisnikContentString += "<input type='text' id='kontakttelefon_dodaj_korisnika' maxlength='12'></input>";
		formDivKorisnikContentString += "<p class='email_dodaj_korisnika' >E-mail:</p>";
		formDivKorisnikContentString += "<input type='text' id='email_dodaj_korisnika' maxlength='64'></input>";
		formDivKorisnikContentString += "<p class='uloga_dodaj_korisnika'>Uloga:</p>";
		formDivKorisnikContentString += "<select id='uloga_dodaj_korisnika'>";
		for(var j = 0; j < uloge.Uloge.length; j++){
			formDivKorisnikContentString += "<option vale='"+uloge.Uloge[j].oznaka+"'>"+uloge.Uloge[j].naziv+"</option>";
			tmpUloga = uloge.Uloge[j];
		}
		formDivKorisnikContentString += "</select>";
		formDivKorisnikContentString += "<button type='button' class='dodaj_korisnika'>DODAJ KORISNIKA</button>";
		$(".header_form_div_korisnik").append(formDivKorisnikContentString);
		$(".form_div_korisnik").hide();
		$(".form_div_korisnik").slideDown();
		el = document.getElementById("dodaj_korisnika");
		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
		$(".exit_overlay").click(
			function(){
	    		el = document.getElementById("dodaj_korisnika");
	    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	    		$(".form_div_korisnik").remove();
			}		
		)

		$("#ime_dodaj_korisnika").blur(praznoIme);
		$("#prezime_dodaj_korisnika").blur(praznoPrezime);
		$("#korisnickoime_dodaj_korisnika").blur(function(){
			if(korisnickoImePostoji() == false)
				praznoKorisnickoIme();
			
		});
		$("#lozinka_dodaj_korisnika").blur(function(){
				praznoLozinka();
		});
		$("#kontakttelefon_dodaj_korisnika").blur(praznoKontaktTelefon);
		$("#email_dodaj_korisnika").blur(praznoEmail);
		$("#uloga_dodaj_korisnika").blur(praznoUloga);
		$("#korisnickoime_dodaj_korisnika").keyup(korisnickoImePostoji);
		//$("#lozinka_dodaj_korisnika").keyup(lozinkaPostoji());


		
		$(".header_form_div_korisnik .dodaj_korisnika").click(
			function(){
				var e1 = praznoIme();
				var e2 =praznoPrezime();
				var e3 =praznoKorisnickoIme();
				var e4 =praznoLozinka();
				var e5 =praznoKontaktTelefon();
				var e6 =praznoEmail();
				var e7 =praznoUloga();
				if(e1 == true || e2 == true ||e3 == true ||e4 == true ||e5 == true ||e5 == true ||e7 == true){
					if(document.getElementById("praznaPolja") == null)
					{
						$(".form_div_korisnik").append("<div id='praznaPolja'>Polja uokvirena crvenom ne smeju biti prazna!</div>");
					}
				}else{
					if(document.getElementById("praznaPolja") != null)
					{
						$("#praznaPolja").remove();
					}
				}
				var e8 = korisnickoImePostoji();

				
				if(e1 == false && e2 == false && e3 == false && e4 == false && e5 == false && e5 == false && e7 == false && e8 == false){
					var dodatKorisnik;
					//posalji zhtev serveru za dodavanjeKorisnika
					if($("#uloga_dodaj_korisnika").val() == "administrator")
						tmpUloga = uloge.Uloge[0];
					else if($("#uloga_dodaj_korisnika").val() == "menadzer")
						tmpUloga = uloge.Uloge[1];
					else
						tmpUloga = uloge.Uloge[2];
					
					       	$.ajaxSetup({async:false});
						  	$.ajax({
						  		  url: "../dodajKorisnika",
						  		  type: 'post',
						
						  		  data: {
						  		   korisnikPodaci:JSON.stringify({
						  		  	 korisnickoIme: $("#korisnickoime_dodaj_korisnika").val(),
						  		  	 lozinka:$("#lozinka_dodaj_korisnika").val(),
						  		  	 ime:$("#ime_dodaj_korisnika").val(),
						  		  	 prezime:$("#prezime_dodaj_korisnika").val(),
						  		  	 kontaktTelefon:$("#kontakttelefon_dodaj_korisnika").val(),
						  		     email:$("#email_dodaj_korisnika").val(),
						  		     uloga:tmpUloga
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
						  			var korisnikJSON = JSON.parse(data);
						  			
						  			if(korisnikJSON == "\"korisnik_postoji\""){
							    		el = document.getElementById("dodaj_korisnika");
							    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
							    		$(".form_div_korisnik").children.remove();
							    		$(".form_div_korisnik").css({"width": "200px", "height": "100px", "margin-top": "-50px", "margin-left": "-100px"});
							    		$(".form_div_korisnik").append("<p>KORISNIK POSTOJI!</p>");
						  			}else{
										spanClass="";
										if(korisnikJSON.Korisnik.prijavljen == "true"){
											prijavljen = "prijavljen";
											spanClass = "prijavljen_korisnik";
										}
										else{
											prijavljen = "nije prijavljen";
											spanClass = "neprijavljen_korisnik";
										}
							    		el = document.getElementById("dodaj_korisnika");
							    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
							    		$(".form_div_korisnik").children().remove();
							    		$(".form_div_korisnik").remove();
							    		$(".form_div_korisnik").hide();
										tbodyContentString = "<tr><td>"+korisnikJSON.Korisnik.ime+"</td><td>"+korisnikJSON.Korisnik.prezime;
										tbodyContentString += "</td><td>"+korisnikJSON.Korisnik.korisnickoIme+"</td><td>"+korisnikJSON.Korisnik.lozinka;
										tbodyContentString += "</td><td>"+korisnikJSON.Korisnik.kontaktTelefon+"</td><td>"+korisnikJSON.Korisnik.email;
										tbodyContentString += "</td><td>"+korisnikJSON.Korisnik.uloga+"</td><td><span class='"+spanClass+"'>"+prijavljen;
										tbodyContentString += "</span></td><td><input type='hidden' value='"+korisnikJSON.Korisnik.korisnickoIme+"' id='"+korisnikJSON.Korisnik.korisnickoIme+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+korisnikJSON.Korisnik.korisnickoIme+"'></button></td>";
										tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+korisnikJSON.Korisnik.korisnickoIme+"'></button></td></tr>";
										$('.table_body').append(tbodyContentString);
										tbodyContentString = "";
										$(".obrisi_korisnika").click(
								    			function(){
								    				obrisiKorisnika($(this));
								    			}	
								    		);
									
									
									
									
									//izmeni korisnika
									$(".izmeni_korisnika").click(
											function(){
												izmeniKorisnika($(this));
												}
											);
						  			}
						  			
						  			
						  			
						  			
						  		});
				}

			});
		$.ajaxSetup({async:true});
		
	}
	
	
	
	function izmeniKorisnika(dugme){
		//pokupi korisnike u slucaju da je bilo promena
       	$.ajaxSetup({async:false});
    	$.ajax({
    		  url: "../table",
    		  type: 'get',

    		  data: {
    		   tabelaPodaci:JSON.stringify({
    		  	 parametar:"korisnici"
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
    		}).done(function(data){ korisnici = JSON.parse(data)});
		//posalji zhtev serveru za uloge
		$.ajaxSetup({async:false});
	  	$.ajax({
	  		  url: "../table",
	  		  type: 'get',
	
	  		  data: {
	  		   tabelaPodaci:JSON.stringify({
	  		  	 parametar:"uloge"
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
	  		}).done(function(data){uloge = jQuery.parseJSON(data)});
	  	
		
	  	$("#container").find("#dodaj_korisnika").remove();
	  	$("#container").find(".form_div_korisnik").children().remove();
	  	$("#container").find(".form_div_korisnik").remove();
	  	
		$("#container").append("<div id='dodaj_korisnika'></div>");
		$("#container").append("<div class='form_div_korisnik'></div>");
		$(".form_div_korisnik").append("<div class='header_form_div_korisnik'><p>Dodavanje novog korisnika</p></div>");
		$(".header_form_div_korisnik").append("<button type='button' class='exit_overlay'></button>");
		
		var formDivKorisnikContentString = "";
		formDivKorisnikContentString += "<p class='ime_dodaj_korisnika'>Ime:</p>";
		formDivKorisnikContentString += "<input type='text' id='ime_dodaj_korisnika' maxlength='64'></input>";
		formDivKorisnikContentString += "<p class='prezime_dodaj_korisnika' >Prezime:</p>";
		formDivKorisnikContentString += "<input type='text' id='prezime_dodaj_korisnika' maxlength='64'></input>";
		formDivKorisnikContentString += "<p class='korisnickoime_dodaj_korisnika'>Korisničko ime:</p>";
		formDivKorisnikContentString += "<input type='text' id='korisnickoime_dodaj_korisnika' maxlength='16' disabled></input>";
		formDivKorisnikContentString += "<p class='lozinka_dodaj_korisnika' >Lozinka:</p>";
		formDivKorisnikContentString += "<input type='text' id='lozinka_dodaj_korisnika' maxlength='12'></input>";
		formDivKorisnikContentString += "<p class='kontakttelefon_dodaj_korisnika'>Kontakt telefon:</p>";
		formDivKorisnikContentString += "<input type='text' id='kontakttelefon_dodaj_korisnika' maxlength='12'></input>";
		formDivKorisnikContentString += "<p class='email_dodaj_korisnika' >E-mail:</p>";
		formDivKorisnikContentString += "<input type='text' id='email_dodaj_korisnika' maxlength='64'></input>";
		formDivKorisnikContentString += "<p class='uloga_dodaj_korisnika'>Uloga:</p>";
		formDivKorisnikContentString += "<select id='uloga_dodaj_korisnika'>";
		for(var j = 0; j < uloge.Uloge.length; j++){
			formDivKorisnikContentString += "<option vale='"+uloge.Uloge[j].oznaka+"'>"+uloge.Uloge[j].naziv+"</option>";
			tmpUloga = uloge.Uloge[j];
		}
		formDivKorisnikContentString += "</select>";
		formDivKorisnikContentString += "<button type='button' class='izmeni_korisnika'>IZMENI KORISNIKA</button>";
		$(".header_form_div_korisnik").append(formDivKorisnikContentString);
		$(".form_div_korisnik").hide();
		$(".form_div_korisnik").slideDown();
		el = document.getElementById("dodaj_korisnika");
		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
		$(".exit_overlay").click(
			function(){
	    		el = document.getElementById("dodaj_korisnika");
	    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	    		$(".form_div_korisnik").hide();
			}		
		)
		
		var korisnikZaIzmenu = null;
		for(var i = 0; i < korisnici.Korisnici.length; i++){
			if(dugme.val() == korisnici.Korisnici[i].korisnickoIme){
				korisnikZaIzmenu = korisnici.Korisnici[i];
				if(korisnikZaIzmenu.uloga == "administrator")
					tmpUloga = uloge.Uloge[0];
				else if(korisnikZaIzmenu.uloga == "menadzer")
					tmpUloga = uloge.Uloge[1];
				else
					tmpUloga = uloge.Uloge[2];
				break;
			} 
		}
		

		$("#korisnickoime_dodaj_korisnika").css("border","none");
		$("#ime_dodaj_korisnika").val(""+korisnikZaIzmenu.ime);
		$("#prezime_dodaj_korisnika").val(""+korisnikZaIzmenu.prezime);
		$("#korisnickoime_dodaj_korisnika").val(""+korisnikZaIzmenu.korisnickoIme);
		$("#lozinka_dodaj_korisnika").val(""+korisnikZaIzmenu.lozinka);
		$("#kontakttelefon_dodaj_korisnika").val(""+korisnikZaIzmenu.kontaktTelefon);
		$("#email_dodaj_korisnika").val(""+korisnikZaIzmenu.email);
		$(".uloga_dodaj_korisnika option[value='"+tmpUloga.oznaka+"']").attr('selected','selected');
		
		
		$("#ime_dodaj_korisnika").blur(praznoIme);
		$("#prezime_dodaj_korisnika").blur(praznoPrezime);
		$("#korisnickoime_dodaj_korisnika").blur(function(){
			if(korisnickoImePostoji(korisnikZaIzmenu.korisnickoIme) == false)
				praznoKorisnickoIme();
			
		});
		$("#lozinka_dodaj_korisnika").blur(function(){
				praznoLozinka();
		});
		$("#kontakttelefon_dodaj_korisnika").blur(praznoKontaktTelefon);
		$("#email_dodaj_korisnika").blur(praznoEmail);
		$("#uloga_dodaj_korisnika").blur(praznoUloga);
		$("#korisnickoime_dodaj_korisnika").keyup(korisnickoImePostoji(korisnikZaIzmenu.korisnickoIme));
		//$("#lozinka_dodaj_korisnika").keyup(lozinkaPostoji(korisnikZaIzmenu.lozinka));


		
		$(".header_form_div_korisnik .izmeni_korisnika").click(
			function(){
				var e1 = praznoIme();
				var e2 =praznoPrezime();
				var e3 =praznoKorisnickoIme();
				var e4 =praznoLozinka();
				var e5 =praznoKontaktTelefon();
				var e6 =praznoEmail();
				var e7 =praznoUloga();
				if(e1 == true || e2 == true ||e3 == true ||e4 == true ||e5 == true ||e5 == true ||e7 == true){
					if(document.getElementById("praznaPolja") == null)
					{
						$(".form_div_korisnik").append("<div id='praznaPolja'>Polja uokvirena crvenom ne smeju biti prazna!</div>");
					}
				}else{
					if(document.getElementById("praznaPolja") != null)
					{
						$("#praznaPolja").remove();
					}
				}
				var e8 = korisnickoImePostoji(korisnikZaIzmenu.korisnickoIme);

				
				if(e1 == false && e2 == false && e3 == false && e4 == false && e5 == false && e5 == false && e7 == false && e8 == false){
					var dodatKorisnik;
					//posalji zhtev serveru za izmenu korisnika
					if($("#uloga_dodaj_korisnika").val() == "administrator")
						tmpUloga = uloge.Uloge[0];
					else
						tmpUloga = uloge.Uloge[1];
					       	$.ajaxSetup({async:false});
						  	$.ajax({
						  		  url: "../izmeniKorisnika",
						  		  type: 'post',
						
						  		  data: {
						  		   korisnikPodaci:JSON.stringify({
						  		  	 korisnickoIme: $("#korisnickoime_dodaj_korisnika").val(),
						  		  	 lozinka:$("#lozinka_dodaj_korisnika").val(),
						  		  	 ime:$("#ime_dodaj_korisnika").val(),
						  		  	 prezime:$("#prezime_dodaj_korisnika").val(),
						  		  	 kontaktTelefon:$("#kontakttelefon_dodaj_korisnika").val(),
						  		     email:$("#email_dodaj_korisnika").val(),
						  		     uloga:tmpUloga
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
						  			var korisnikJSON = JSON.parse(data);
						  			
						  			if(korisnikJSON == "\"korisnik_postoji\""){
							    		el = document.getElementById("dodaj_korisnika");
							    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
							    		$(".form_div_korisnik").children.remove();
							    		$(".form_div_korisnik").css({"width": "200px", "height": "100px", "margin-top": "-50px", "margin-left": "-100px"});
							    		$(".form_div_korisnik").append("<p>KORISNIK POSTOJI!</p>");
						  			}else{
										spanClass="";
										if(korisnikJSON.Korisnik.prijavljen == "true"){
											prijavljen = "prijavljen";
											spanClass = "prijavljen_korisnik";
										}
										else{
											prijavljen = "nije prijavljen";
											spanClass = "neprijavljen_korisnik";
										}
							    		el = document.getElementById("dodaj_korisnika");
							    		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
							    		$(".form_div_korisnik").children().remove();
							    		$(".form_div_korisnik").remove();
							    		$(".form_div_korisnik").hide();
							    		var tableRow = $("#"+korisnikJSON.Korisnik.korisnickoIme+"").parent().parent();
							    		tableRow.children().remove();
										tbodyContentString = "<td>"+korisnikJSON.Korisnik.ime+"</td><td>"+korisnikJSON.Korisnik.prezime;
										tbodyContentString += "</td><td>"+korisnikJSON.Korisnik.korisnickoIme+"</td><td>"+korisnikJSON.Korisnik.lozinka;
										tbodyContentString += "</td><td>"+korisnikJSON.Korisnik.kontaktTelefon+"</td><td>"+korisnikJSON.Korisnik.email;
										tbodyContentString += "</td><td>"+korisnikJSON.Korisnik.uloga+"</td><td><span class='"+spanClass+"'>"+prijavljen;
										tbodyContentString += "</span></td><td><input type='hidden' value='"+korisnikJSON.Korisnik.korisnickoIme+"' id='"+korisnikJSON.Korisnik.korisnickoIme+"'/></td><td><button type='button' class='obrisi_korisnika' value='"+korisnikJSON.Korisnik.korisnickoIme+"'></button></td>";
										tbodyContentString += "<td><button type='button' class='izmeni_korisnika' value='"+korisnikJSON.Korisnik.korisnickoIme+"'></button></td>";
										tableRow.append(tbodyContentString);
										tbodyContentString = "";
										
										$(".obrisi_korisnika").click(
								    			function(){
								    				obrisiKorisnika($(this));
								    			}	
								    		);
									
									
									
									
									//izmeni korisnika
									$(".izmeni_korisnika").click(
											function(){
												izmeniKorisnika($(this));
												}
											);
										
						  			}
						  			
						  			
						  			
						  			
						  		});
				}

			});
		$.ajaxSetup({async:true});
		
	}
	
	
function obrisiKorisnika(dugme){
	
	//pokupi korisnike u slucaju da je bilo promena
   	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../table",
		  type: 'get',

		  data: {
		   tabelaPodaci:JSON.stringify({
		  	 parametar:"korisnici"
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
		}).done(function(data){ korisnici = JSON.parse(data)});
	//posalji zhtev serveru za uloge
	$.ajaxSetup({async:false});
  	$.ajax({
  		  url: "../table",
  		  type: 'get',

  		  data: {
  		   tabelaPodaci:JSON.stringify({
  		  	 parametar:"uloge"
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
  		}).done(function(data){uloge = jQuery.parseJSON(data)});


var korisnikZaBrisanje = null;
for(var i = 0; i < korisnici.Korisnici.length; i++){
if(dugme.val() == korisnici.Korisnici[i].korisnickoIme){
	korisnikZaBrisanje = korisnici.Korisnici[i];
	if(korisnikZaBrisanje.uloga == "administrator")
		tmpUloga = uloge.Uloge[0];
	else if(korisnikZaBrisanje.uloga == "menadzer")
		tmpUloga = uloge.Uloge[1];
	else
		tmpUloga = uloge.Uloge[2];
	break;
} 
}



$.ajaxSetup({async:false});
$.ajax({
	  url: "../obrisiKorisnika",
	  type: 'post',

	  data: {
	   korisnikPodaci:JSON.stringify({
	  	 korisnickoIme: korisnikZaBrisanje.korisnickoIme,
	  	 lozinka:korisnikZaBrisanje.lozinka,
	  	 ime:korisnikZaBrisanje.ime,
	  	 prezime:korisnikZaBrisanje.prezime,
	  	 kontaktTelefon:korisnikZaBrisanje.kontaktTelefon,
	     email:korisnikZaBrisanje.email,
	     uloga:tmpUloga
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
		var korisnikJSON = JSON.parse(data);
		$("#"+korisnikJSON.Korisnik.korisnickoIme+"").parent().parent().remove();
	});
$.ajaxSetup({async:true});
	
	
}


function odjaviSe(){
	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../menadzer-logout",
		  type: 'post',
		  success: function (data, status) {
		    console.log(data);
		    console.log(status);
		  },
		  error: function (xhr, desc, err) {
		    console.log(xhr);
		  },
		}).done(function(data){
     
		});
	$.ajaxSetup({async:true});
	window.location.href = "/WebProdavnica/menadzer/index.jsp";
	
	
}