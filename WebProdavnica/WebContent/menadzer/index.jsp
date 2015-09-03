<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="css/admin.css" />
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Raleway" />

<script src="scripts/jquery-2.1.4.js"></script>
<script src="scripts/menadzerLogin.js"></script>
<script src="scripts/korisnici.js"></script>
<script src="scripts/saloni.js"></script>
<script src="scripts/kategorije.js"></script>
<script src="scripts/komadinamestaja.js"></script>
<script src="scripts/dodatneusluge.js"></script>
<script src="scripts/akcije.js"></script>
<script src="scripts/izvestaji.js"></script>
<script src="scripts/selekcionaPolja.js"></script>
<script src="scripts/jquery-ui.min.js"></script>
<script>
$(document).ready(function(){
	//proveri da li je administrator vec ulogovan
	var adminLoggedIn = "${sessionScope.administrator}";

	if(adminLoggedIn != ""){
		$("#login_panel").css('display','none');
		$("#header_info").hide();
		$("#header_info").load("header.txt",function(){
            $(this).fadeIn(2000);
        });
		$("#side_bar").hide();
		$("#side_bar").load("side_bar.txt",function(){
            $(this).fadeIn(2000);
        });
		$("#content").hide();
		$("#content").load("pocetna.txt",function(){
            $(this).fadeIn(2000);
        });
	}

	//na dogadjaj klika na dugme forme pozovi funkciju za logovanje
	$(".submit_button").click(fn_loguj_se);
	
	//Delegiraj dogadje. Delegiranje se koristi kad se dodaju dogadjaji na decu elemente koji mogu i da ne postoje
	//registriuj dogadjaj klika na hiperlink #korisnici i prikazi sadrzaj stranice
	var korisnici = [];
    $('#side_bar').on('click', '#korisnici', fn_korisnici);
	
    //registruj dogadjaj klika na hiperlink #saloni i prikazi sadrzaj stranice
    var saloni = [];
    $('#side_bar').on('click', '#saloni', fn_saloni);
    
    //registruj dogadjaj klika na hiperlink #kategorije i prikazi sadrzaj stranice
    var kategorije = [];
    $('#side_bar').on('click', '#kategorije', fn_kategorije);
    
    //registruj dogadjaj klika na hiperlink #komadi i prikazi sadrzaj stranice
    var komadiNamestaja = [];
    $('#side_bar').on('click', '#komadi', fn_komadiNamestaja);
    
    //registruj dogadjaj klika na hiperlink #dodatne_usluge i prikazi sadrzaj stranice
    var dodatneUsluge = [];
    $('#side_bar').on('click', '#dodatne_usluge', fn_dodatneUsluge);
    //registruj dogadjaj klika na hiperlink #akcije i prikazi sadrzaj stranice
    var akcije = [];
    $('#side_bar').on('click', '#akcije', fn_akcije);
    
    //registruj dogadjaj klika na hiperlink #izvestaji i prikazi sadrzaj stranice
    var izvestaji = [];
    $('#side_bar').on('click', '#izvestaji', fn_izvestaji);
    
  //registriuj dogadjaj klika na hiperlink #pocetna i prikazi sadrzaj stranice
    $('#side_bar').on('click', '#pocetna', fn_pocetna);
    function fn_pocetna(){
    	$('#content').children().hide();
    	$('#content').hide();
		$("#content").load("pocetna.txt",function(){
            $(this).fadeIn(2000);
        });
		/*
		google.load("visualization", "1", {packages:["corechart"]});
		google.setOnLoadCallback(drawChart1);
		  var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
		  chart.draw(data, options);
	    google.load("visualization", "1", {packages:["corechart"]});
	    google.setOnLoadCallback(drawChart2);
	    */
    }

	
	

		
});
</script>
<script type="text/javascript">
function overlay() {
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}
</script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>

<script type="text/javascript">
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart1);
function drawChart1() {
  var data = google.visualization.arrayToDataTable([
    ['Dan', 'Broj kategorija'],
    ['Danas',     11],
    ['Juče',      2],
    ['Pre 7 dana',  2],
    ['Pre više od 7 dana', 2],
  ]);

  var options = {
    title: 'Broj kategorija po danima',
    pieHole: 0.4,
    backgroundColor: 'white',
    opacity: 0.2,
    height: 200,
    width: 200
    
  };

  var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);
}
</script>
 
<script type="text/javascript">
    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawChart2);
    function drawChart2() {
      var data = google.visualization.arrayToDataTable([
        ['Mesec', 'Broj kupaca', 'Zarada'],
        ['Maj',  1000,      400],
        ['Jun',  1170,      460],
        ['Jul',  660,       1120],
        ['Avgust',  1030,      540]
      ]);

      var options = {
        title: 'Uspešnost prodaje',
        hAxis: {title: 'Mesec',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0}
      };

      var chart = new google.visualization.AreaChart(document.getElementById('corechart'));
      chart.draw(data, options);
    }
</script>
</head>
<body>
	<div id="container">
	
		<div id="header_info">
		</div>
		
		<div id="side_bar">

		</div>
		
		<div id="login_panel">
				<p class="heading">Menadžerski sistem</p>
				<p class="sub_heading">Stranica za prijavu menadžera. Oba polja su obavezna.</p>
				<input type="text" id="korisnik" placeholder="Korisničko ime" />
				<input type="password" id="lozinka" placeholder="Lozinka" maxlength="32"/>
				<div class="show_password"></div>
				<button type="button" class="submit_button">PRIJAVI SE</button>
				<a class="forgotten_password_link" href="#" onclick='overlay();'>Zaboravljena lozinka?</a>
				<div class="empty_username"></div>
				<div class="empty_password"></div>
				<div class="user_doesnt_exist"></div>
				<div class="data"></div>
		</div>
		
		<div id="content">
		</div>
		
		<div id="overlay">
     		<div>
          		
    		</div>
		</div>
	</div>
</body>
</html>