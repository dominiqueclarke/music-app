import $ from 'jquery';
import urlencode from 'urlencode'


export default function($http) {

  const mapBoxKey = 'pk.eyJ1IjoiZGVlY2xhcmtlIiwiYSI6ImNpbGJlZjFobjB1aXl0eWx4ajJ2emNsNHcifQ.2mpHkUWA9o2RgI2q7w1UHA';

  this.getMap = (venues) => {
    mapboxgl.accessToken = mapBoxKey;
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
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapBoxKey}`
            , type: 'GET'
          }).then(pointRes => {
            const showPoint = pointRes.data.features[0]
                showPoint.properties.title = venue.name;
                showPoints.data.features.push(showPoint);
            resolve(showPoint);
          })
        }
      ));
    });
    return Promise.all(promiseArray).then(results => {
      return createMap(showPoints);
    })
  }
  function createMap(showPoints) {
      const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/deeclarke/ciucpivod00462jmoqy29jigb',
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
}
