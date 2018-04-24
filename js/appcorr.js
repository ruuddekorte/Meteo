(function main(){
var cityname;
var humidity;
var pressure;
var tempmin,tempmax;
var message;
var map= L.map('myMap').setView([46.318392, 2.975921], 8);
var monStockage = localStorage;
//les boutons************************************************
var select = $("#selectVille");
for (i=1;i<monStockage.length;i++){
	select.append('<option value='+ i+'>'+ monStockage.getItem(i) + '</option>');
}
$('#selectVille').on('change',function(){
	$('#ville').val($('#selectVille option:selected').text());
})
$('#selec').on('click',function(){
	myStockage();
	getJqAjax();
})
$('#idpurge').on('click',function(){
	monStockage.clear();
	select.empty();
})

//le local storage****************************************************
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

// acces aux données***********************************************
function getJqAjax(){
	var mylat , mylng ;
	var box=$("#InnerBox"),nom=$("#ville"), citytitle=$('#cityTitle');
	var url;
	var mycity = $('#ville').val();
	var template = box.html();
	var mustacheCity = citytitle.html();

	$.ajax({
		url:"http://api.openweathermap.org/data/2.5/forecast?q="+mycity+",fr&APPID=b857719d49c22028c58751ced0101d64",
		datatype:'json',
		success: function(data){
			console.log("success");
			cityname="<ul><li><b>Ville:</b>"+data.city.name+"</li>";
			humidity ="<li><b>humidité:</b>"+data.list[0].main.humidity+"</li>";
			pressure="<li><b>Pression:</b>"+data.list[0].main.pressure+"</li>";
			tempmin= data.list[0].main.temp_min;
			tempmax = data.list[0].main.temp_max;
			tempmin =tempmin-273.15;
			tempmax = tempmax-273.15;
			tempmin = "<li><b>Temp Min:</b>"+tempmin.toFixed(2)+"</li>";
			tempmax = "<li><b>Temp max:</b>"+tempmax.toFixed(2)+"</li>";
			mylat = "<li><b>Latitude:</b>"+data.city.coord.lat+"</li>";
			mylng = "<li><b>Latitude:</b>"+data.city.coord.lon+"</li>";
			message = "<li><b>Alerte:</b>ce soir, vous ne rentrez pas chez vous</li></ul>";
			
			
			var rendered = Mustache.render(template,data.city);
			var renderCity=Mustache.render(mustacheCity,data.city);
			
			citytitle.html(renderCity);
			//$('#mycity').text(data.city.name);
			box.html(rendered);
			box.html(humidity+pressure+tempmin+tempmax+mylat+mylng+message)
			setmap(data.city.coord.lon,data.city.coord.lat);
			
			
		},
		error: function(){
			console.log("erreur de chargement du JSON");
		}
	})
	function setmap(x,y){
		map.setView([y, x], 14);
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    		attribution: '&amp;copy; &lt;a href="http://osm.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors'
		}).addTo(map);
		var marker = L.marker([y, x]).addTo(map);
	}
}

})();