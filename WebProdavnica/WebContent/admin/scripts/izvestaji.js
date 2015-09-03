function fn_izvestaji(){
	$('#content').children().remove();
	$('#content').append("<div class='izvestaji_container'></div>");
	$('#content').hide();
	$('#content').fadeIn(1000);
	
	$('.izvestaji_container').append(" <div class='izvestaji_forma'> <label for='izvestaj_select_type' class='izvestaj_select_label'>Izaberite vrstu izveštaja:</label> <select id='izvestaj_select_type'> <option value='dan'>Po danima</option> <option value='kategorija'>Po kategorijama</option> </select> <label for='izvestaj_select_dan_date_od' class='izvestaj_select_dan_date_label_od'>Odaberite period(od):</label> <select id='izvestaj_select_dan_date_od'> </select> <label for='izvestaj_select_dan_date_do' class='izvestaj_select_dan_date_label_do'>Odaberite period(do):</label> <select id='izvestaj_select_dan_date_do'> </select> <label for='izvestaj_select_kategorija' class='izvestaj_select_kategorija_label'>Odaberite kategoriju:</label> <select id='izvestaj_select_kategorija'> </select> </div> <div class='izvestaji_tabele'> </div>");
	$('.izvestaj_select_dan_date_label_od').css("visibility","visible");
	$('#izvestaj_select_dan_date_od').css("visibility","visible");
	$('.izvestaj_select_dan_date_label_do').css("visibility","visible");
	$('#izvestaj_select_dan_date_do').css("visibility","visible");
	$('#izvestaj_select_type').change(
			function(){
				if($('#izvestaj_select_type').val() == "dan"){
					$('.izvestaj_select_dan_date_label_od').css("visibility","visible");
					$('#izvestaj_select_dan_date_od').css("visibility","visible");
					$('.izvestaj_select_dan_date_label_do').css("visibility","visible");
					$('#izvestaj_select_dan_date_do').css("visibility","visible");
					$(".izvestaj_select_kategorija_label").css("visibility","hidden");
					$("#izvestaj_select_kategorija").css("visibility","hidden");
				}else{
					$('.izvestaj_select_dan_date_label_od').css("visibility","visible");
					$('#izvestaj_select_dan_date_od').css("visibility","visible");
					$('.izvestaj_select_dan_date_label_do').css("visibility","visible");
					$('#izvestaj_select_dan_date_do').css("visibility","visible");
					$(".izvestaj_select_kategorija_label").css("visibility","visible");
					$("#izvestaj_select_kategorija").css("visibility","visible");
				}
			}
	);

	
	//pokupi racune
	racuni = [];
	kategorije = [];
  	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../table",
		  type: 'get',

		  data: {
		   tabelaPodaci:JSON.stringify({
		  	 parametar:"racuni"
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
			console.log(data);
			racuni = jQuery.parseJSON(data);
			});
	$.ajaxSetup({async:true});
	//pokupi kategorije
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
		}).done(function(data){kategorije = JSON.parse(data)});
	$.ajaxSetup({async:true});
	saloni = [];
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
		}).done(function(data){ saloni = JSON.parse(data);});
	$.ajaxSetup({async:true});
            
	var kategorijaSelectors="";
	for(var j = 0; j < kategorije.Kategorije.length; j++){
		for(var i = 0; i < kategorije.Kategorije[j].length; i++)
			kategorijaSelectors+="<option value='"+kategorije.Kategorije[j][i].naziv+"'>"+kategorije.Kategorije[j][i].naziv+"</option>";
	}
	$("#izvestaj_select_kategorija").append(kategorijaSelectors);
	var datumOdSelectors="";
	/*Fri Jul 03 00:00:00 CEST 2015*/
	
	
	
	for(var j = 0; j < racuni.Racuni.length; j++){
		var splittedString = (racuni.Racuni[j].datum).split(" ");
		var datum = pronadjiDatum(splittedString);
		datumOdSelectors+="<option value='"+datum+"'>"+datum+"</option>";	
	}
	
	$("#izvestaj_select_dan_date_od").append(datumOdSelectors);
	

	$("#izvestaj_select_dan_date_do").append(datumOdSelectors);
	var zbiroviPoDatumima = [];
	var sveUkupno = [];
	for(var i = 0; i < saloni.Saloni.length; i++){
		sveUkupno[i] = 0;
		for(var j = 0; j < racuni.Racuni.length; j++){
				zbiroviPoDatumima[j] = 0;
				var splittedString = (racuni.Racuni[j].datum).split(" ");
				var datum = pronadjiDatum(splittedString);
				var rez = uporediDatume($("#izvestaj_select_dan_date_od").val(),datum);
				var rez2 = uporediDatume(datum,$("#izvestaj_select_dan_date_do").val());
				if((rez == true) && (rez2 == true)){
					for(var k=0; k <racuni.Racuni[j].KomadiNamestaja.length;k++ ){
						if(saloni.Saloni[i].pib == racuni.Racuni[j].KomadiNamestaja[k].salon){
							zbiroviPoDatumima[j]+=racuni.Racuni[j].KomadiNamestaja[k].jedinicnaCena;
							sveUkupno[i]+=racuni.Racuni[j].KomadiNamestaja[k].jedinicnaCena;
						}
					}
				}
		}
	}

	for(var i = 0; i < saloni.Saloni.length; i++){
		var tableString = "<div><table><tr><th>Datum</th><th>Zarada</th></tr>";


		for(var j = 0; j < racuni.Racuni.length; j++){
			var splittedString = (racuni.Racuni[j].datum).split(" ");
			var datum = pronadjiDatum(splittedString);
			var rez = uporediDatume($("#izvestaj_select_dan_date_od").val(),datum);
			var rez2 = uporediDatume(datum,$("#izvestaj_select_dan_date_do").val());
			if((rez == true) && (rez2 == true)){
				tableString+="<tr><td>"+datum+"</td>";
				/*RADI 100% NESTO SERVER BAGUJE 100%*/
				tableString+="<td>"+zbiroviPoDatumima[j]+"</td></tr>";
			}
		}
		tableString+="<tr><td>Sve ukupno: </td><td>"+sveUkupno[i]+"</td></tr></table></div>";
		$(".izvestaji_tabele").children().remove();
		$(".izvestaji_tabele").append(tableString);
	}
	
	
	$("#izvestaj_select_dan_date_od").change(
		function(){
			$("#izvestaj_select_dan_date_do").children().remove();
			var datumOdSelectors="";
			for(var j = 0; j < racuni.Racuni.length; j++){
				var splittedString = (racuni.Racuni[j].datum).split(" ");
				var datum = pronadjiDatum(splittedString);
				var rez = uporediDatume($("#izvestaj_select_dan_date_od").val(),datum);
				if(rez == true)
					datumOdSelectors+="<option value='"+datum+"'>"+datum+"</option>";	
			}
			$("#izvestaj_select_dan_date_do").append(datumOdSelectors);
		}
	);
	$("#izvestaj_select_dan_date_do").change(
			function(){
				
				
				var zbiroviPoDatumima = [];
				var sveUkupno = [];
				for(var i = 0; i < saloni.Saloni.length; i++){
					sveUkupno[i] = 0;
					for(var j = 0; j < racuni.Racuni.length; j++){
							zbiroviPoDatumima[j] = 0;
							var splittedString = (racuni.Racuni[j].datum).split(" ");
							var datum = pronadjiDatum(splittedString);
							var rez = uporediDatume($("#izvestaj_select_dan_date_od").val(),datum);
							var rez2 = uporediDatume(datum,$("#izvestaj_select_dan_date_do").val());
							if((rez == true) && (rez2 == true)){
								for(var k=0; k <racuni.Racuni[j].KomadiNamestaja.length;k++ ){
									if(saloni.Saloni[i].pib == racuni.Racuni[j].KomadiNamestaja[k].salon){
										zbiroviPoDatumima[j]+=racuni.Racuni[j].KomadiNamestaja[k].jedinicnaCena;
										sveUkupno[i]+=racuni.Racuni[j].KomadiNamestaja[k].jedinicnaCena;
									}
								}
							}
					}
				}

				for(var i = 0; i < saloni.Saloni.length; i++){
					var tableString = "<div><table><tr><th>Datum</th><th>Zarada</th></tr>";


					for(var j = 0; j < racuni.Racuni.length; j++){
						var splittedString = (racuni.Racuni[j].datum).split(" ");
						var datum = pronadjiDatum(splittedString);
						var rez = uporediDatume($("#izvestaj_select_dan_date_od").val(),datum);
						var rez2 = uporediDatume(datum,$("#izvestaj_select_dan_date_do").val());
						if((rez == true) && (rez2 == true)){
							tableString+="<tr><td>"+datum+"</td>";
							tableString+="<td>"+zbiroviPoDatumima[j]+"</td></tr>";
						}
					}
					tableString+="<tr><td>Sve ukupno: </td><td>"+sveUkupno[i]+"</td></tr></table></div>";
					$(".izvestaji_tabele").children().remove();
					$(".izvestaji_tabele").append(tableString);
				}
				
				
				
			}	
		);

	$("#izvestaj_select_kategorija").change(
			function(){
				$(".izvestaji_tabele").children().remove();
				
				var upisaneTabeleNiz=[];
				var ukupnoPoKategorijama = [];
				var ukupnoPoDatumima = [];
				var kategorijeFor = [];
				for(var j = 0; j < kategorije.Kategorije.length; j++){
					for(var i = 0; i < kategorije.Kategorije[j].length; i++){
						kategorijeFor.push(kategorije.Kategorije[j][i]);
					}
				}
				var startNode;
				for(var i = 0; i < kategorijeFor.length; i++){
					if(kategorijeFor[i].naziv == $("#izvestaj_select_kategorija").val()){
						startNode = kategorijeFor[i];
						break;
					}
				}
				kategorijeCenaPo = 0;
				kategorijeBrNamestaja = 0;
				callRecursion(startNode, kategorijeFor);
				
				for(var j = 0; j < racuni.Racuni.length; j++){
					var splittedString = (racuni.Racuni[j].datum).split(" ");
					var datum = pronadjiDatum(splittedString);
					var rez = uporediDatume($("#izvestaj_select_dan_date_od").val(),datum);
					var rez2 = uporediDatume(datum,$("#izvestaj_select_dan_date_do").val());
					if((rez == true) && (rez2 == true)){
						for(var k=0; k <racuni.Racuni[j].KomadiNamestaja.length;k++ ){
							if(startNode.naziv == racuni.Racuni[j].KomadiNamestaja[k].kategorija){
								kategorijeCenaPo += racuni.Racuni[j].KomadiNamestaja[k].jedinicnaCena;
								kategorijeBrNamestaja++;
							}
						}
					}
				}
				
				var tableString = "<div><table><tr><th>Naziv</th><th>Broj komada</th></tr>";
				tableString+="<tr><td>"+startNode.naziv+"</td>";
				tableString+="<td>"+kategorijeBrNamestaja+"</td></tr>";
				tableString+="<tr><td>Sve ukupno: </td><td>"+kategorijeCenaPo+"</td></tr></table></div>";
				$(".izvestaji_tabele").children().remove();
				$(".izvestaji_tabele").append(tableString);
				
				
			}
	
	
	);
}


function callRecursion(startniCvor, kategorijeFor){
	
	for(var i = 0; i <kategorijeFor.length;i++){
		if(startniCvor.naziv == kategorijeFor[i].roditelj){
			for(var j = 0; j < racuni.Racuni.length; j++){
				var splittedString = (racuni.Racuni[j].datum).split(" ");
				var datum = pronadjiDatum(splittedString);
				var rez = uporediDatume($("#izvestaj_select_dan_date_od").val(),datum);
				var rez2 = uporediDatume(datum,$("#izvestaj_select_dan_date_do").val());
				if((rez == true) && (rez2 == true)){
					for(var k=0; k <racuni.Racuni[j].KomadiNamestaja.length;k++ ){
						if(kategorijeFor[i].naziv == racuni.Racuni[j].KomadiNamestaja[k].kategorija){
							kategorijeCenaPo += racuni.Racuni[j].KomadiNamestaja[k].jedinicnaCena;
							kategorijeBrNamestaja++;
						}
					}
				}
			}
			callRecursion(kategorijeFor[i], kategorijeFor)
		}
		
		
	}
	
}

function pronadjiDatum(splittedString){
	/*
	Converts this Date object to a String of the form: 

		 dow mon dd hh:mm:ss zzz yyyy
		where:•dow is the day of the week (Sun, Mon, Tue, Wed, Thu, Fri, Sat). 
		•mon is the month (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec). 
		•dd is the day of the month (01 through 31), as two decimal digits. 
		•hh is the hour of the day (00 through 23), as two decimal digits. 
		•mm is the minute within the hour (00 through 59), as two decimal digits. 
		•ss is the second within the minute (00 through 61, as two decimal digits. 
		•zzz is the time zone (and may reflect daylight saving time). Standard time zone abbreviations include those recognized by the method parse. If time zone information is not available, then zzz is empty - that is, it consists of no characters at all. 
		•yyyy is the year, as four decimal digits.
		*/
	var dan = splittedString[2];
	var mesec;
	if(splittedString[1] == "Jan"){
		mesec = 1;
	}else if(splittedString[1] == "Feb"){
		mesec = 2;
	}else if(splittedString[1] == "Mar"){
		mesec = 3;
	}else if(splittedString[1] == "Apr"){
		mesec = 4;
	}else if(splittedString[1] == "May"){
		mesec = 5;
	}else if(splittedString[1] == "Jun"){
		mesec = 6;
	}else if(splittedString[1] == "Jul"){
		mesec = 7;
	}else if(splittedString[1] == "Aug"){
		mesec = 8;
	}else if(splittedString[1] == "Sep"){
		mesec = 9;
	}else if(splittedString[1] == "Oct"){
		mesec = 10;
	}else if(splittedString[1] == "Nov"){
		mesec = 11;
	}else if(splittedString[1] == "Dec"){
		mesec = 12;
	}
	/*
	switch(splittedString[2]){
		case "Jan": mesec = 1; break;case "Feb": mesec = 2; break;case "Mar": mesec =3; break;
		case "Apr": mesec = 4; break;case "May": mesec = 5; break;case "Jun": mesec = 6; break;
		case "Jul": mesec = 7; break;case "Aug": mesec = 8; break;case "Sep": mesec = 9; break;
		case "Oct": mesec = 10; break;case "Nov": mesec = 11; break;case "Dec": mesec =12; break;
	}*/
	godina = splittedString[5];
	
	return dan+"."+mesec+"."+godina;
}

function uporediDatume(datum1, datum2){
	var dat1Ar = datum1.split(".");
	var dat2Ar = datum2.split(".");
	var d1 = parseInt(dat1Ar[0]);
	var m1 = parseInt(dat1Ar[1]);
	var g1 = parseInt(dat1Ar[2]);
	var d2 = parseInt(dat2Ar[0]);
	var m2 = parseInt(dat2Ar[1]);
	var g2 = parseInt(dat2Ar[2]);
	
	if(g2 > g1){
		return true;
	}else if(g2 < g1){
		return false;
	}else if(g1 == g2){
		if(m2 > m1){
			return true;
		}else if(m2 < m1){
			return false;
		}else if(m1 == m2){
			if(d2 >= d1){
				return true;
			}else{
				return false;
			}	
		}
	}
}