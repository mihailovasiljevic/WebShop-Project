function doOnTextChangeDodatne()
{

	var dodatneUsluge = [];
		/*DOVUCI DODATNE USLUGE NAMESTAJA*/
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
		}).done(
				function(data){
		          dodatneUsluge = JSON.parse(data);
				});
		$.ajaxSetup({async:true});
		/*PRONADJI KOMADE NAMESTAJA KOJI SU NA AKCIJI*/

	listaFiltera = [];
	tmpList = [];
	prenosnaListaDodatnihUsluga = [];

	for(var i = 0; i < dodatneUsluge.DodatneUsluge.length;i++){
		prenosnaListaDodatnihUsluga.push(dodatneUsluge.DodatneUsluge[i]);
	}
    pokupiStringoveDodatne();
    pronadjiUListiDodatne();
    ispisiDodatneUsluge();
}
function pokupiStringoveDodatne()
{
	listaFiltera = [];
    listaFiltera.push($("#naziv_kn_input").val());
    listaFiltera.push($("#cena_od_kn_input").val());
}

function pronadjiUListiDodatne()
{
    var prazni = 0;
    for (var i = 0; i < listaFiltera.length; i++)
    {
    	tmpList = [];
        if (listaFiltera[i] != (""))
        {
            
            //ako je 0 znaci da je u pitanju resurs
            switch (i)
            {
                case 0:
	                	if(prenosnaListaDodatnihUsluga == 0){
	                        for(var j = 0; j < dodatneUsluge.DodatneUsluge.length; j++){
	                        	if(dodatneUsluge.DodatneUsluge[j].naziv.toUpperCase().includes(listaFiltera[i].toUpperCase())){
	                        		tmpList.push(komadiNamestaja.KomadiNamestaja[j]);
	                        	}
	                        }
	            		}else{
	                        for(var j = 0; j < prenosnaListaDodatnihUsluga.length; j++){
	                        	if(prenosnaListaDodatnihUsluga[j].naziv.toUpperCase().includes(listaFiltera[i].toUpperCase())){
	                        		tmpList.push(prenosnaListaDodatnihUsluga[j]);
	                        	}
	                        }
	            		}
	                	prenosnaListaDodatnihUsluga = [];
                        for (var j = 0; j < tmpList.length; j++)
                        {
                        	prenosnaListaDodatnihUsluga.push(tmpList[j]);
                        }
                        if(prenosnaListaDodatnihUsluga.length == 0)
                        	return;
                        break;
                case 1:
                	if(prenosnaListaDodatnihUsluga == 0){
                        for(var j = 0; j < dodatneUsluge.DodatneUsluge.length; j++){
                        	if(dodatneUsluge.DodatneUsluge[j].opis.toUpperCase().includes(listaFiltera[i].toUpperCase())){
                        		tmpList.push(komadiNamestaja.KomadiNamestaja[j]);
                        	}
                        }
            		}else{
                        for(var j = 0; j < prenosnaListaDodatnihUsluga.length; j++){
                        	if(prenosnaListaDodatnihUsluga[j].opis.toUpperCase().includes(listaFiltera[i].toUpperCase())){
                        		tmpList.push(prenosnaListaDodatnihUsluga[j]);
                        	}
                        }
            		}
                	prenosnaListaDodatnihUsluga = [];
                    for (var j = 0; j < tmpList.length; j++)
                    {
                        prenosnaListaDodatnihUsluga.push(tmpList[j]);
                    }
                    if(prenosnaListaDodatnihUsluga.length == 0)
                    	return;
                    break;
            }
        }
    }
}

function ispisiDodatneUsluge(){
	$("#content").children().remove();
	$("#body").find(".tabela_sa_podacima_o_kupovini").remove();
	if(prenosnaListaDodatnihUsluga.length == 0){
		$("#content").append("<div style='color:#FF0000;border:#FF0000; background-color:#FFCCFF;font-family:Raleway-Light;font-weight:bold;font-size:32px'>Ne postoje dodatne usluge za zadatu pretragu.</div>");
	}
	else{
		for(var i = 0; i < prenosnaListaDodatnihUsluga.length; i++){
			if(prenosnaListaDodatnihUsluga.length == 0){
				$("#content").append("<div style='color:#FF0000;border:#FF0000; background-color:#FFCCFF;font-family:Raleway-Light;font-weight:bold;font-size:32px'>Ne postoje dodatne usluge! Hvala na razumevanju.</div>");
			}
			else{
				for(var i = 0; i < prenosnaListaDodatnihUsluga.length; i++){
					showDivs = "<div><p class='besplatne_du_title'>"+prenosnaListaDodatnihUsluga[i].naziv+"</p>";
					showDivs += "<p class='besplatne_du_opis'>"+prenosnaListaDodatnihUsluga[i].opis+"</p>";
					showDivs += "<p class='besplatne_du_cena'>Cena:<strong>"+prenosnaListaDodatnihUsluga[i].cena+"</strong> din.</p>";
					showDivs += "<button type='button' class='naplatne_du_kupi' value='"+prenosnaListaDodatnihUsluga[i].naziv+"'>U korpu</button></div>";
					$("#content").append(showDivs);
				}
			}
			$(".naplatne_du_kupi").click(
					function(){
						kupiDodatnuUslugu($(this),1);
					}
			);
		}
	}
}
