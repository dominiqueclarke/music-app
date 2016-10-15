import config from "../../../config.js";
import googleMapsLoader from 'google-maps';
import $ from 'jquery';

export default function($http) {
  let center;
  let map;
  let places;
  googleMapsLoader.KEY = config.googleMaps.apiKey;
  googleMapsLoader.LIBRARIES = ['geometry', 'places'];

  this.getMap = (shows) => {
    getMap(shows);
  }

  this.getPlaceData = (show, index) => {
    var request = {
    location: center,
    radius: '500',
    name: show.Venue.Name
  };

  places = new google.maps.places.PlacesService(map);

  places.nearbySearch(request, callback);

    function callback(results, status) {
      console.log(status);
      console.log(results);
      console.log(results[0].photos[0].getUrl);
      console.log(results[0].photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35}));
      $(`.show${index}`).fadeTo( "slow", 1 ).attr('style', `background-image: url(${results[0].photos[0].getUrl({'maxWidth': 350, 'maxHeight': 350})})`);
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        document.getE
      }
    }
  }



  function getMap(shows) {
    googleMapsLoader.load(function(google) {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({
        'address': `${shows[0].Venue.Address}, ${shows[0].Venue.City}, ${shows[0].Venue.State}`
      }, function(centerResults, status) {

        if (status == google.maps.GeocoderStatus.OK) {
          center = centerResults[0].geometry.location;
          const el = document.getElementById('map');

          map = new google.maps.Map(el, {
            center,
            zoom: 11
          });
          shows.forEach(function(entry) {
            geocoder.geocode({
              'address': `${entry.Venue.Address}, ${entry.Venue.City}, ${entry.Venue.State}`
            }, function(markerResults, status) {
              console.log(status);
              console.log(markerResults[0].geometry.location);
              console.log(markerResults, `${entry.Venue.Address}, ${entry.Venue.City}, ${entry.Venue.State}`);
              if (markerResults) {
                new google.maps.Marker({
                  position: markerResults[0].geometry.location,
                  map: map,
                  title: 'Hello World!'
                });
              }
            });
          });

        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    });
  }
}
