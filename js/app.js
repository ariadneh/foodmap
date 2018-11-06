window.onload = function() {
  spMap();
  everyMarker();
}

var map;
function spMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -23.557069, lng: -46.661892},
    zoom: 15,
  });  
}

var lat;
var lng;
var title;
function everyMarker() {
  for (var i = 0; i < restaurantes.length; i++) {
    lat = restaurantes[i]['latitude'];
    lng = restaurantes[i]['longitude'];
    title = restaurantes[i]['name'];
    mapMarker();
  }
}
var allMarkers = [];
function mapMarker() {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    title: title,
  });
  allMarkers.push(marker);
}

function setMapOnAll(map) {
  for (var i = 0; i < allMarkers.length; i++) {
    allMarkers[i].setMap(map);
  }
}

$(document).ready(function() {
  $('.title-splash').delay('1000').fadeIn('slow');
  $('.text-splash').delay('3000').fadeIn('slow');
  $('.text-splash').delay('2000').fadeOut('slow');
  $('.splash').delay('6000').fadeOut('slow');
  setTimeout(function(){$('.title-splash').animate({height: "100%"}, 2000, 'linear');}, 4000);


  $.each(restaurantes, function(ind, val) {
  $('<img>').attr('data-lat', val.latitude).attr('data-lng', val.longitude).attr('src', val.image).attr('data-type', val.type).attr('alt', val.name).attr('class', 'food-display b-radius').attr('id', val.name.replace(/ /g, '').replace(/'/g, '').toLowerCase()).appendTo('.food-photos');
  });

  $('#search').keyup(function() {
    var search = $('#search').val().toUpperCase();
    $('.food-photos img').each(function(ind, val) {
      var rest = '#' + this.id;
      if(this.alt.toUpperCase().startsWith(search) || this.dataset.type.toUpperCase().startsWith(search)) {
        $(rest).addClass('d-inline-block').removeClass('d-none');
      } else {
        $(rest).addClass('d-none').removeClass('d-inline-block');
      }
    });
    clearMarkers();
    $('.food-photos img').each(function(ind, val) {
      if ($(this).is(':visible')) {
       lat = this.dataset.lat;
       lng = this.dataset.lng;
       mapMarker(); 
      }
    });

  });

  $('img').click(function(event) {
    $.each(restaurantes, function(ind, val) {
      if(val.name === event.target.alt) {
        $('#name').text(val.name);
        $('#img').attr('src', val.image);
        $('#type').text(val.type);
        $('#description').text(val.description);
        $('#modal').addClass('d-flex').removeClass('d-none');
      }
    });
  });

  $('.close').click(function() {
    $('#modal').addClass('d-none').removeClass('d-flex');
  });

  function clearMarkers() {
    setMapOnAll(null);
    allMarkers = [];
  }
});