import config from '../../../config.js';
import googleMapsLoader from 'google-maps';

export default function($http, musicService, userService) {
  this.saveShow = show => {
    const showData = {
      Artists: show.Artists
      , Date: show.Date
      , dateObj: show.dateObj
      , epochTime: show.epochTime
      , jamBaseId: show.Id
      , TicketUrl: show.TicketUrl
      , Venue: show.Venue
      , artistData: show.artistData
    };
    return $http.post('/api/shows', showData)
    .then(show => {
      if(show.status === 200) {
        $http({
          url: `/api/users/${userService.currentUser._id}/addShow`
          , method: 'PUT'
          , data: {showId: show.data._id}
        });
        return show;
      } else {
        return "unsaved";  //this is literally the stupidest thing
      }
    });
  }
  this.pullShow = show => {
    return $http({
      url: `/api/users/${userService.currentUser._id}/removeShow`
      , method: 'PUT'
      , data: {_id: show._id}
    })
    .then(user => {
      if(user.status === 200) {
        return user;
      } else {
        return "saved";
      }
    });
  }
  this.getShowsData = (currentUser, zipCode) => {
      //const jamBaseUrl =
      return $http({
         url: `http://api.jambase.com/events?zipCode=${zipCode}&radius=25&page=0&${config.jamBase.apiKey}`
         , type: 'GET'
      })
      .then(function(shows) {
        let showsData;
        return musicService.getMusicPreviews(shows).then(results => {
          showsData = results;
          const lastShowsRequest = new Date().getTime();
          $http({
            url: `/api/users/${currentUser._id}`
            , method: 'PUT'
            , data: {lastShowsRequest, zipCode}
          })
          getVenuesNextShows(showsData);
          return showsData;
        });
      });
  }

  this.getSampleShows = () => {
    const showsData = musicService.getSamplePreviews();
    getVenuesNextShows(showsData);
    return showsData;
  }

  function getVenuesNextShows(shows) {
    const venues = [];
    shows.data.Events.forEach(show => {
      let venueExists = false;
      show.epochTime = new Date(show.Date).getTime();
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
