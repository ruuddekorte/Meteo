(function main(){
var result="";
var nomVille="";

$('#selec').on('click',function(){
	readVille();
	getJqAjax();
})

function readVille(){
	nomVille=$("#ville").val();
}

function getJqAjax(){
	$.ajax({
		url:"http://api.openweathermap.org/data/2.5/weather?q="+nomVille+"&units=metric&APPID=6b0093ca3ed371f163ae90b3957b8b98",	datatype:'json',
		success: function(data){
			$(".meteoVille").html(data.name);
			$(".meteoLon").html(data.coord.lon);
			$(".meteoLat").html(data.coord.lat);
			$(".meteoVent").html(data.wind.speed);
			$(".meteoHumiditee").html(data.main.humidity);
			$(".meteoPression").html(data.main.pressure);
			$(".meteoTempActu").html(data.main.temp);
			$(".meteoTempMin").html(data.main.temp_min);
			$(".meteoTempMax").html(data.main.temp_max);
            $(".meteoIcon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");


			console.log(data);	// debugging info
		},
		error: function(){
			$(".meteoVille").html("Ville pas trouvée");
			// en cas d'erreur met l'info meteo à zero
			$(".meteoLon").html("0");
			$(".meteoLat").html("0");
			$(".meteoVent").html("0");
			$(".meteoHumiditee").html("0");
			$(".meteoPression").html("0");
			$(".meteoTempActu").html("0");
			$(".meteoTempMin").html("0");
			$(".meteoTempMax").html("0");
			console.log("error, no data available");	// debugging info
		}
	})
}

$("#meteodiv").html('<object data="http://api.openweathermap.org/data/2.5/weather?id=6427003&APPID=6b0093ca3ed371f163ae90b3957b8b98&mode=html"/>');
})();