var map;
var service;
var infowindow;

var request = {
  query: 'Ukraine',
  fields: ['name', 'geometry']
};

var viewZoom = 6;

function initMap() {
  var sydney = new google.maps.LatLng(-33.867, 151.195);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
    document.getElementById('map'), { center: sydney, zoom: viewZoom });



  service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

$('.name').mouseover(function () {
  request.query = $(this).text();
  viewZoom = Number($(this).attr('zoom'));
  
  setTimeout(initMap(), 1000);
});