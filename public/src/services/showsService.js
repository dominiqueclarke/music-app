import config from '../../../config.js';
import googleMapsLoader from 'google-maps';

export default function($http, musicService) {
  // this.getPlaceData = (show) => {
  //   googleMapsLoader.KEY = config.googleMaps.apiKey;
  //   googleMapsLoader.LIBRARIES = ['geometry', 'places'];
  //   const places = new google.maps.places.PlacesService(map);
  //   geocoder.geocode({
  //     'address': `${shows[0].Venue.Address}, ${shows[0].Venue.City}, ${shows[0].Venue.State}`
  //   }, function (centerResults, status) {
  //     places.nearbySearch(request, function (markerResults, status) {
  //       location: centerResults[0].geometry.location,
  //       radius: '500',
  //       types: ['store']
  //     });
  //   });
  //
  // }
  this.getShowsData = (currentUser, zipCode) => {
      //const jamBaseUrl =
      return $http({
         url: `http://api.jambase.com/events?zipCode=${zipCode}&radius=25&page=0&${config.jamBase.apiKey}`
         , type: 'GET'
       })
      .then(function(shows) {
        console.log('shows', shows);
        const showsData = musicService.getMusicPreviews(shows);
        const lastShowsRequest = new Date().getTime();
        $http({
          url: `/api/users/${currentUser._id}`
          , method: 'PUT'
          , data: {lastShowsRequest, zipCode}
        })
        console.log(showsData)
        return showsData;
      });
  }

  this.getSampleShows = () => {
    return musicService.getSamplePreviews();
  }
  //
  // getJamBaseData().then(function(results) {
  //   console.log(results);
  //   $scope.jamBaseData = results;
  // });

}
