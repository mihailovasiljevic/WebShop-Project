<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Administratorski sistem - stranica za prijavu</title>

<link rel="stylesheet" type="text/css" href="css/login.css" />
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Raleway" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<script>
$(document).ready(function(){
	
	var adminLoggedIn = "${sessionScope.menadzer}";
	
	if(adminLoggedIn != null){
    	$.ajax({
  		  url: "../menadzer-login",
  		  type: 'get',
  		  contentType: "application/x-www-form-urlencoded",
  		  data: {
  		   loginPodaci:JSON.stringify({
  		   username:"",
  		   password:"",
  		   }),    
  		   cache: false,
  		   dataType:'json'
  		},
  		  success: function (data, status) {
  			  
  			$( ".data" ).append( "<p class='dataValue'>"+data+"</p>");
  			//alert("Data: "+ data);
  		    console.log(data);
  		    console.log(status);
  		  },
  		  error: function (xhr, desc, err) {
  		    console.log(xhr);
  		  },
  		});
	}
	
	
    $(document).ajaxComplete(function(){
    	if($('.dataValue').text() == "\"prijavljen\""){
       		 $("#login_panel").fadeOut();
       		$("#header_info").load("../header.txt");
    		$("#header_info").hide();
    		$("#header_info").load("../header.txt",function(){
                $(this).fadeIn(2000);
            });
    	}
    	if($('.dataValue').text() == "\"greska\""){
    		$(".user_doesnt_exist").css("display", "block");
    	}
    	if($('.dataValue').text() == "\"vec_prijavljen\""){
    		$("#login_panel").css('display','none');
    		$("#header_info").hide();
    		$("#header_info").load("../header.txt",function(){
                $(this).fadeIn(2000);
            });
    	}
    	$('.dataValue').remove();
    });
		$(".submit_button").click(
			function(){
				var uname = $("#korisnik").val();
				var pass = $("#lozinka").val();
				var allGood = false;
				
			        if( uname == "" || uname == undefined || uname == null ) {
			              $(".empty_username").css("display","block");
			              allGood = false;
			        } else {
			        	$(".empty_username").css("display","none");
			        	allGood = true;
			        }  
			        
			        if( pass == "" || pass == undefined || pass == null ) {
			              $(".empty_password").css("display","block");
			              allGood = false;
			        } else {
			        	$(".empty_password").css("display","none");
			      		if(allGood != false)
			      			allGood = true;
			        }  
			        var answer="";
			        if(allGood == true){
			        	$.ajax({
			        		  url: "../admin-login",
			        		  type: 'post',
			        		  contentType: "application/x-www-form-urlencoded",
			        		  data: {
			        		   loginPodaci:JSON.stringify({
			        		   username:uname,
			        		   password:pass,
			        		   }),    
			        		   cache: false,
			        		   dataType:'json'
			        		},
			        		  success: function (data, status) {
			        			  
			        			$( ".data" ).append( "<p class='dataValue'>"+data+"</p>");
			        			//alert("Data: "+ data);
			        		    console.log(data);
			        		    console.log(status);
			        		  },
			        		  error: function (xhr, desc, err) {
			        		    console.log(xhr);
			        		  },
			        		});
					}

			}

		);
        
});
</script>

</head>
<body>
	<div id="container">
	
		<div id="header_info">
		</div>
		
		<div id="side_bar">
		</div>
		
		<div id="login_panel">
			<p class="heading">Administratorski sistem</p>
			<p class="sub_heading">Stranica za prijavu administratora. Oba polja su obavezna.</p>
			<input type="text" id="korisnik" placeholder="Korisničko ime" />
			<input type="password" id="lozinka" placeholder="Lozinka" maxlength="32"/>
			<div class="show_password"></div>
			<button type="button" class="submit_button">PRIJAVI SE</button>
			<a class="forgotten_password_link" href="forgotten-password">Zaboravljena lozinka?</a>
			<div class="empty_username"></div>
			<div class="empty_password"></div>
			<div class="user_doesnt_exist"></div>
			<div class="data"></div>
		</div>
		
	</div>
</body>
</html>