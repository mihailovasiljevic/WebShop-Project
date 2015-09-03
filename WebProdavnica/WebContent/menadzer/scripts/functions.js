function proveriSesiju(){
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
}

//ajax post metoda
function ajaxPost(jsonString, funkcija){
	$.ajaxSetup({async:false});
	$.ajax({
		  url: "../admin-login",
		  type: 'post',

		  data: {
		   loginPodaci:JSON.stringify(jsonString),    
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
			funkcija(data);
			return data;
	});
	$.ajaxSetup({async:true});
}








