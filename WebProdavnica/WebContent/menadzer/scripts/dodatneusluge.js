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
			
			
		});
	$.ajaxSetup({async:true});
}

