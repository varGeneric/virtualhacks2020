function handleLocationError(isGeolocationSupported, center) {
  if (!isGeolocationSupported)
    // Geo unsupported
    alert(
      "Geolocation is unsupported in your browser. Please visit this page with a recent browser that supports this feature."
    );
  else {
    // Geo rejected
    alert(
      "WhatsWhere requires access to your location to perform location-based lookups. Please enable location services and reload the page."
    );
    document.getElementById("allow-loc-services-text").innerHTML =
      "Please enable location services to use WhatsWhere.";
    //if(!alert('Alert For your User!')) {window.location.reload();}
  }
}

("use strict");

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let service;
let infowindow;
var initLoc;
var locations = [];
function initMap(location) {
  var loc1 = new google.maps.LatLng(0, 0);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: loc1,
    zoom: 2,
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
        map.setZoom(14);
        update();
      },
      function () {
        handleLocationError(true, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
    update();
  }
  // google.maps.event.addListener(map, 'bounds_changed', function () {
  //
  //     if(true)(
  //       update()
  //     )
  // });
}
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      locations[i] = createMarker(results[i]);
    }
    updateCards(results);
  }
}

function createMarker(place) {
  var photos = place.photos;
  var marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  (function (marker) {
    google.maps.event.addListener(marker, "click", function (e) {
      //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
      console.log(place);
      document.querySelector(`#${place.place_id}`).scrollIntoView({
        behavior: 'smooth'
      });
      var placePhoto =
        "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1024x576.png";
      try {
        placePhoto = photos[0].getUrl({ maxWidth: 300, maxHeight: 200 });
      } catch (e) { }
      infowindow.setContent(
        `<img style="max-width:300px; max-height:200px;" src="${placePhoto}">
        <br/><br/>
        <h4>${place.name}</h4>
        <i class="fa fa-directions"></i>
        <a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.name)}&destination_place_id=${place.place_id}">${place.vicinity}</a>`
      );
      //Insert HTML
      infowindow.open(map, marker);
    });
  })(marker);
  return marker;
}
//google.maps.event.addDomListener(window, 'load', update);
function update() {
  const request = {
    location: map.getCenter(),
    radius: "10000",
    type: ["supermarket"],
  };
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}
// function debug(){
//   for(var i = 0; i<location.length; i++)
//   {
//       locations[i].addListener("click", () => {
//       infowindow.setContent(place.name);
//       infowindow.open(map);
//     });
//   }
// }
//google.maps.event.addDomListener(window, 'load', initMap);
function updateCards(results) {
  var promotedFooter = "";
  var html = "";
  for (var i = 0; i < results.length; i++) {
    var result = results[i];
    var placePhoto =
      "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1024x576.png";
    try {
      placePhoto = result.photos[0].getUrl();
    } catch (e) { }
    // href="genericstorepage.html?name=${results[i].name}&place_id=${results[i].place_id}&vicinity=${results[i].vicinity}&url=${placePhoto}"
    html += `
      <a name="${results[i].place_id}" id="${results[i].place_id}">
        <div class="card shadow ml-3 mr-3 mb-4">
          <div class="d-flex">
            <div class="img-square-wrapper">
              <img id="storecardimg"
                loading="lazy"
                src="${placePhoto}"
                style="height: 180px; width: 300px;">
            </div>
            <div class="card-body">
              <h4 class="card-title" id="storecardname">${results[i].name}</h4>
              <p class="card-text">
                <i class="fa fa-directions"></i>
                <a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(results[i].name)}&destination_place_id=${results[i].place_id}">${results[i].vicinity}</a>
              </p>
            </div>
          </div>
          <div class="card-footer">
            <small class="text-muted promoted-footer">${promotedFooter}</small>
            <div class="text-right" style="float: right;">
              <a class="btn btn-outline-success" href="GenericStorePage.html?name=${encodeURIComponent(results[i].name)}&place_id=${results[i].place_id}&vicinity=${results[i].vicinity}&url=${encodeURIComponent(placePhoto)}">
                See stock
              </a>
            </div>
          </div>
        </div>
      </a>
        `;
  }
  document.getElementById("cardlist").innerHTML = html;
}
