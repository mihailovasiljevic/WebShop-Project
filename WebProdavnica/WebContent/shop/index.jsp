<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="css/shop.css" />
<script src="scripts/jquery-2.1.4.js"></script>
<script src="scripts/jquery-ui.min.js"></script>
<script src="scripts/login.js"></script>
<script src="scripts/pretraga.js"></script>
<script src="scripts/pretrageDodatne.js"></script>
<title>Web prodavnica nameštaja - Dobro došli</title>
<script>
$(document).ready(function(){
	//proveri da li je korisnik vec ulogovan
		var prijavljenKorisnik = null;
    	$.ajaxSetup({async:false});
    	$.ajax({
    		  url: "../korisnik-login",
    		  type: 'get',
    		  success: function (data, status) {
    		    console.log(data);
    		    console.log(status);
    		  },
    		  error: function (xhr, desc, err) {
    		    console.log(xhr);
    		  },
    		}).done(function(data){
         
    			if(data == "greska"){
            		$(".korisnik_neispravni_podaci").css('visibility','visible');
            	}
            	else if(data == "-1"){
            		//$(".korisnik_neispravni_podaci").css('visibility','visible');
            	}				//provera odgovora servera:
            	else{
            		prijavljenKorisnik = JSON.parse(data);
            		$("#container").children().remove();
            		iscrtajKomponente();
            	}
    		});
    	$.ajaxSetup({async:true});
    
	//na dogadjaj klika na dugme forme pozovi funkciju za logovanje
	$(".korisnik_prijavi_se").click(fn_loguj_se);
	/*meni fiksiran ako dodje do skrolovanja */
	$(window).bind('scroll', function () {
	    if ($(window).scrollTop() > 50) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});
});
</script>
</head>
<body>

<div id="container">
	<p class='korisnik_login_naslov'>Prijava korisnika za kupovinu </p>
	<p class='korisnik_login_podnaslov'>Da biste mogli da kupujete neophodno je da se prijavite.<br />Koristite korisničko ime i lozinku koju ste dobili. </p>
	<div id='korisnik_login_container'>
	      <input type='text' id='korisnik_username_input' maxlength='64' placeholder='Korisničko ime'/>
	      <input type='text' id='korisnik_password_input' maxlength='16' placeholder='Lozinka'/>
	      <button type='button' class='korisnik_prijavi_se'>prijavi se</button>
	      <img src='images/empty_field_error.png' class='korisnik_prazno_username'/>
	      <img src='images/empty_field_error.png' class='korisnik_prazno_password'/>
	      <img src='images/wrong_uname_or_pass.png' class='korisnik_neispravni_podaci'/>
	</div>
</div>

</body>
</html>