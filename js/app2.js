(function main(){
var result="";

$('#mybtn').on('click',function(){
	getJqAjax();
})

function getJqAjax(){
	$.ajax({
		url:"http://api.openweathermap.org/data/2.5/weather?lat=44.350201&lon=2.5748&units=metric&APPID=6b0093ca3ed371f163ae90b3957b8b98",	datatype:'json',
		success: function(data){
			result= "<p><b>Rodez</b></p><hr /><p> "+
					"GPS : "+data.coord.lon+" lon, "+data.coord.lat+" lat<br />"+
					"Vitesse vent : "+data.wind.speed+" m/s<br />"+
					"Humidtée : "+data.main.humidity+" % <br />"+
					"Pression : "+data.main.pressure+" hpa <br />"+
					"Temperature : "+data.main.temp+" °C<br />"+
					"min temp : "+data.main.temp_min+" °C<br />"+
					"max temp : "+data.main.temp_max+" °C<br />"+
					"</p><hr />";
			console.log(data);
			$("#meteocard").html(result);
		},
		error: function(){
			console.log("sorry, error");
		}
	})
}

$("#meteodiv").html('<object data="http://api.openweathermap.org/data/2.5/weather?id=6427003&APPID=6b0093ca3ed371f163ae90b3957b8b98&mode=html"/>');
})();