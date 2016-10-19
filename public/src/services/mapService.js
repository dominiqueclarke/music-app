import config from "../../../config.js";
import googleMapsLoader from 'google-maps';
import $ from 'jquery';
//import MapboxClient from 'mapbox';
import urlencode from 'urlencode'
//import mapboxgl from 'mapbox-gl';


export default function($http) {

  this.getMap = (venues) => {
    mapboxgl.accessToken = config.mapBox.apiKey;
    //const client = new MapboxClient(config.mapBox.apiKey);
    const showPoints = {
      type: "geojson"
      , data: {
        type: "FeatureCollection"
        , features: []
      }
    };
    const promiseArray = [];
    venues.forEach(function(venue, index) {
      const query = urlencode(`${venue.address}, ${venue.city}, ${venue.state}`);
      promiseArray.push(new Promise((resolve, reject) => {
          $http({
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${config.mapBox.apiKey}`
            , type: 'GET'
          }).then(pointRes => {
            const showPoint = pointRes.data.features[0]
                showPoint.properties.title = venue.name;
                showPoints.data.features.push(showPoint);
                // if(index === shows.length - 1) {
                //   console.log(showPoints);
                //   //createMap(showPoints);
                // }
            resolve(showPoint);
          })
        }
      ));
    });
    return Promise.all(promiseArray).then(results => {
      return createMap(showPoints);
    })
  }
      // mapboxgl.accessToken = config.mapBox.apiKey;
      // const client = new MapboxClient('YOUR_ACCESS_TOKEN');
      // client.geocodeForward('Chester, NJ', function(err, res) {
      //   // res is the geocoding result as parsed JSON
      // });
  function createMap(showPoints) {
      const map = new mapboxgl.Map({
          container: 'map',
          style: config.mapBox.styles,
          center: showPoints.data.features[0].geometry.coordinates,
          zoom: 10
      });

      // const nav = new mapboxgl.NavigationControl({
      //     position: 'top-left'
      // });
      //console.log('this is supposed to be the nav', nav);
      // position is optional
      map.addControl(new mapboxgl.NavigationControl());

      map.on('load', () => {
          //should not have put on scope
          map.addSource('points', showPoints);
          map.addLayer({
              "id": "points",
              "type": "symbol",
              "source": "points",
              "layout": {
                  "icon-image": "venue-becon",
                  "text-field": "{title}",
                  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                  "text-offset": [0, 0.6],
                  "text-anchor": "top"
              }
          });
      });

      map.on('mousemove', function(e) {
          var features = map.queryRenderedFeatures(e.point, {
              layers: ['points']
          });
          map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      });
      return map;
  }

  function getGeoCoordinates(places) {
      var geoJson = {};
      geoJson.type = "geojson";
      geoJson.data = {
          "type": "FeatureCollection",
          "features": []
      };
      for(var place in places) {
          if (places[place].display) {
              var points = {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [places[place].lon, places[place].lat]
                  },
                  "properties": {
                      "title": places[place].name,
                      "img": '<img style="height:100px; width:100px" src="' + places[place].activities[0].thumbnail + '" />',
                  }
              }
              geoJson.data.features.push(points);
          }
      };
      return geoJson;
  }
  // let center;
  // let map;
  // let places;
  // googleMapsLoader.KEY = config.googleMaps.apiKey;
  // googleMapsLoader.LIBRARIES = ['geometry', 'places'];
  //
  // this.getMap = (shows) => {
  //   getMap(shows);
  // }
  //
  // this.getPlaceData = (show, index) => {
  //   var request = {
  //   location: center,
  //   radius: '500',
  //   name: show.Venue.Name
  // };
  //
  // places = new google.maps.places.PlacesService(map);
  //
  // places.nearbySearch(request, callback);
  //
  //   function callback(results, status) {
  //     console.log(status);
  //     console.log(results);
  //     console.log(results[0].photos[0].getUrl);
  //     console.log(results[0].photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35}));
  //     $(`.show${index}`).fadeTo( "slow", 1 ).attr('style', `background-image: url(${results[0].photos[0].getUrl({'maxWidth': 350, 'maxHeight': 350})})`);
  //     if (status == google.maps.places.PlacesServiceStatus.OK) {
  //       document.getE
  //     }
  //   }
  // }
  //
  //
  //
  // function getMap(shows) {
  //   googleMapsLoader.load(function(google) {
  //     const geocoder = new google.maps.Geocoder();
  //
  //     geocoder.geocode({
  //       'address': `${shows[0].Venue.Address}, ${shows[0].Venue.City}, ${shows[0].Venue.State}`
  //     }, function(centerResults, status) {
  //
  //       if (status == google.maps.GeocoderStatus.OK) {
  //         center = centerResults[0].geometry.location;
  //         const el = document.getElementById('map');
  //
  //         map = new google.maps.Map(el, {
  //           center,
  //           zoom: 11
  //         });
  //         shows.forEach(function(entry) {
  //           geocoder.geocode({
  //             'address': `${entry.Venue.Address}, ${entry.Venue.City}, ${entry.Venue.State}`
  //           }, function(markerResults, status) {
  //             console.log(status);
  //             console.log(markerResults[0].geometry.location);
  //             console.log(markerResults, `${entry.Venue.Address}, ${entry.Venue.City}, ${entry.Venue.State}`);
  //             if (markerResults) {
  //               new google.maps.Marker({
  //                 position: markerResults[0].geometry.location,
  //                 map: map,
  //                 title: 'Hello World!'
  //               });
  //             }
  //           });
  //         });
  //
  //       } else {
  //         alert("Geocode was not successful for the following reason: " + status);
  //       }
  //     });
  //   });
  // }
}
