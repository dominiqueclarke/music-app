import config from '../../../config.js';
import googleMapsLoader from 'google-maps';

export default function($http, musicService) {
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
        console.log(showsData);
        return showsData;
      });
  }

  this.getSampleShows = () => {
    const showsData = musicService.getSamplePreviews();
    getVenuesNextShows(showsData);
    console.log('getSampleShows', showsData);
    return showsData;
  }

  function getVenuesNextShows(shows) {
    const venues = [];
    shows.data.Events.forEach(show => {
      let venueExists = false;
      for(let i = 0; i < venues.length; i++) {
        if(venues[i].venueId === show.Venue.Id) {
          venueExists = true;
          break;
        }
      }
      if(!venueExists) {
        const venueData = {
          showId: show.Id
          , venueId: show.Venue.Id
          , name: show.Venue.Name
          , address: show.Venue.Address
          , city: show.Venue.City
          , state: show.Venue.State
          , nextShow: show
        }
        venues.push(venueData);
      }
    })
    shows.data.Venues = venues;
    //console.log(shows);
  }
  //
  // getJamBaseData().then(function(results) {
  //   console.log(results);
  //   $scope.jamBaseData = results;
  // });

}
