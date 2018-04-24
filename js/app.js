(function main(){
var result="";
var nomVille="";
var myMap="";
var map= L.map('myMap').setView([46.318392, 2.975921], 8);
var monStockage = localStorage;
var select = $("#selectVille");
var audiotypes={
	"mp3": "audio/mpeg",
	"mp4": "audio/mp4",
	"ogg": "audio/ogg",
	"wav": "audio/wav"
}


//  ######################## LOAD INPUT MENU ############################
for (i=1;i<monStockage.length;i++){
	select.append('<option value='+ i+'>'+ monStockage.getItem(i) + '</option>');
}
// ########################  BUTTON(S)  ##################################
$('#selec').on('click',function(){
	readVille();
	getJqAjax();
})




//  #######################  LOCAL STORAGE  ##############################
function myStockage(){
	var myswitch=false;
	if ($('#ville').val()=="") {return false}  // si la ville est vide on ne fait rien
	for (i=0;i<monStockage.length;i++){
		if(monStockage.getItem(i)==$('#ville').val()){
			myswitch=true;
		}
	}
	if (myswitch ==false){
		monStockage.setItem(monStockage.length,$('#ville').val())
	}
}


function readVille(){
	nomVille=$("#ville").val();
}


function showMap(iLat, iLon){
	myMap = L.map('mapid').setView([iLat, iLon], 12);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
		maxZoom: 18 }).addTo(myMap);

	var marker = L.marker([iLat, iLon]).addTo(map);	
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
            showMap(data.coord.lat, data.coord.lon);
            addLocalStorage(data.name);
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
			myMap=""
		}
	})
}

function ss_soundbits(sound){
    var audio_element = document.createElement('audio')
    if (audio_element.canPlayType){
        for (var i=0; i<arguments.length; i++){
            var source_element = document.createElement('source')
            source_element.setAttribute('src', arguments[i])
            if (arguments[i].match(/\.(\w+)$/i))
                source_element.setAttribute('type', audiotypes[RegExp.$1])
            audio_element.appendChild(source_element)
        }
        audio_element.load()
        audio_element.playclip=function(){
            audio_element.pause()
            audio_element.currentTime=0
            audio_element.play()
        }
        return audio_element
    }
}

// After that you can initialize as many audio as you like:
// 
		// var clicksound  = ss_soundbits('your/path/to/click.ogg', "your/path/to/click.mp3");
		// var plopsound  = ss_soundbits('your/path/to/plopp.ogg', "your/path/to/plopp.mp3");

// Now you can reach the initialized audio element whereever you like with simple event calls like

			// onclick="clicksound.playclip()"
			// onmouseover="plopsound.playclip()"


$("#meteodiv").html('<object data="http://api.openweathermap.org/data/2.5/weather?id=6427003&APPID=6b0093ca3ed371f163ae90b3957b8b98&mode=html"/>');
})();