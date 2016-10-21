////import config from "../../../config.js;
import googleMapsLoader from 'google-maps';
import $ from 'jquery';
//import MapboxClient from 'mapbox';
import urlencode from 'urlencode'
//import mapboxgl from 'mapbox-gl';


export default function($http) {

  this.getMap = (venues) => {
    mapboxgl.accessToken = process.env.MAPBOX_KEY || config.mapBox.apiKey;
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
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.MAPBOX_KEY || config.mapBox.apiKey}`
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
          style: process.env.MAPBOX_STYLES || config.mapBox.styles,
          center: showPoints.data.features[0].geometry.coordinates,
          zoom: 12
      });

      map.scrollZoom.disable();
      map.addControl(new mapboxgl.NavigationControl());

      map.on('load', () => {
          //should not have put on scope
          map.addSource('points', showPoints);
          map.addLayer({
              "id": "points",
              "type": "symbol",
              "source": "points",
              "layout": {
                  "icon-image": "venue-beacon",
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
}
