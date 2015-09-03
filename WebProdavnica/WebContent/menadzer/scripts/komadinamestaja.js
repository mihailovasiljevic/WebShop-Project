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
					$(".trazi").click(
							function(){
								doOnTextChange();
							}
					);
					ispuniPolja();
					
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

