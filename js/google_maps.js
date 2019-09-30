/**
 * Inicialize map in region the Bonito/MS
 * @param {Array} data 
 */
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -21.1239194, lng: -56.5083537},
    zoom: 8
  });

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://bonitour-test-api.herokuapp.com/attractions";

  fetch(proxyurl + url)
  .then(response => response.json())
  .then(data => {
    plotMarkers(data.attractions)
  })
  .catch(error => console.error(error))

}


/**
 * Function converter inteiro in hours:minutes:seconds
 * @param {Array} data 
 */
var markers;
var bounds;

function plotMarkers(data) {
  markers = [];
  bounds = new google.maps.LatLngBounds();

  data.forEach(function (marker) {
    var position = new google.maps.LatLng(marker.location.lat, marker.location.long);
    var duration = hours_converter(marker.duration);
    var attractionId = marker.id;

    var iconPoint = new google.maps.MarkerImage('./img/icon.png',
      new google.maps.Size(70,70),
      new google.maps.Point(0,0),
      new google.maps.Point(50,50)
    );

    var markerInfo = new MarkerWithLabel({
      position: position,
      map: map,
      labelContent: '<div class="title">'+marker.name+'</div><div class="duration">Duração: '+duration+'</div>',
      labelAnchor: new google.maps.Point(15, 40),
      labelClass: "labels", // the CSS class for the label
      labelInBackground: true,
      icon: iconPoint
    });

    markerInfo.addListener('click', function(event) {
      showForm(event.latLng, attractionId);
    });

    bounds.extend(position);
  });

  map.fitBounds(bounds);
}


/**
 * Function converter inteiro in hours:minutes:seconds
 * @param {Array} location 
 * @param {int} attractionId 
 */
function showForm (location, attractionId) {
  infowindow = new google.maps.InfoWindow();
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://bonitour-test-api.herokuapp.com/attractions/"+attractionId+'?start_date='+dateToYMD(firstDay)+'&end_date='+dateToYMD(lastDay);
  
  fetch(proxyurl + url)
  .then(function(response){
    response.json().then(function(data){
      var optionData = "";
      var optionDataHour = "";
      
      data.availability.forEach(function(item) {
        Object.keys(item).forEach(function(key) {
          optionData += '<option value="'+key+'">'+formatToDMY(key)+'</option>';
        });
      });

      var arrayHora = data.availability[0][dateToYMD(firstDay)];
      arrayHora.forEach(function(item) {
        Object.keys(item).forEach(function(key) {
          optionDataHour += '<option value="'+key+'">'+key+'</option>';
        });
      });

      var contentString = '<form method="POST" action="#" name="form-tour" id="form-tour">'+
      '<div id="img">'+
        '<img src="./img/nascente-azul.jpg">'+
      '</div>'+
      '<div class="content-form">'+
        '<div class="title">'+data.name+'</div>'+
        '<div class="duration">Duração: '+hours_converter(data.duration)+'</div>'+
        '<div class="selects">'+
          '<select name="select" class="custom-select" onchange="changeData(this.value, '+attractionId+')">'+optionData+'</select>'+
          '<select name="select" class="custom-select" id="optionDataHour">'+optionDataHour+'</select>'+
        '</div>'+
        '<button type="submit"> Adicionar passeio</button>'
      '</div>'+
      '</form>';

      infowindow.setContent(contentString);
      infowindow.setPosition(location);
      infowindow.open(map);
    });
  })
  .catch(function(err){
    console.error('Failed retrieving information', err);
  });
}

/**
 * Function load time by date
 * @param {date} date 
 */
function changeData(date, attractionId){
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://bonitour-test-api.herokuapp.com/attractions/"+attractionId+'?start_date='+date+'&end_date='+date;

  fetch(proxyurl + url)
  .then(response => response.json())
  .then(data => {
    var arrayHora = data.availability[0][date];
    var select = document.getElementById("optionDataHour"); 
    document.querySelectorAll('#optionDataHour option').forEach(option => option.remove());
    
    arrayHora.forEach(function(item) {
      Object.keys(item).forEach(function(key) {
        var opt = key;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      });
    });
  })
  .catch(error => console.error(error))

}



/**
 * Function converter inteiro in hours:minutes:seconds
 * @param {int} time 
 * @returns {timeFormat}
 */
function hours_converter(time){
              
	function two_houses(number){
		if (number <= 9) {
			number = "0"+number;
    }
		return number;
	}

  hour = two_houses(Math.round(time/3600));
  minute = two_houses(Math.floor((time%3600)/60));
  second = two_houses((time%3600)%60);
  
  if (hour != '00')
    timeFormat = hour+":"+minute+":"+second;
  else 
    timeFormat = minute+":"+second;
            
  return timeFormat;
}


/**
 * Function converter inteiro in hours:minutes:seconds
 * @param {date} date 
 */
function dateToYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}


/**
 * Function converter inteiro in hours:minutes:seconds
 * @param {date} date 
 */
function formatToDMY(date) {
  var newDate = date.split('-').reverse().join('/')
  return newDate;
}