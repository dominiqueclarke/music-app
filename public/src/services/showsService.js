import moment from "moment";

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
      }
    });
  }
  this.pullShow = show => {
    console.log('show to pull', show);
    return $http({
      url: `/api/users/${userService.currentUser._id}/removeShow`
      , method: 'PUT'
      , data: {_id: show._id}
    })
    .then(user => {
      console.log('user after pulling', user)
      if(user.status === 200) {
        return user;
      }
    });
  }
  this.getShowsData = (currentUser, zipCode, key) => {
      return new Promise((resolve, reject) => {
        $http({
         url: `/api/shows/${zipCode}`
         , type: 'GET'
      })
      .then((shows) => {
          let showsData = shows;
          const lastShowsRequest = new Date().getTime();
          $http({
            url: `/api/users/${currentUser._id}`
            , method: 'PUT'
            , data: {lastShowsRequest, zipCode}
          })
          formatShows(showsData);
          resolve(showsData);
      })
    });
  }

  this.getSampleShows = () => {
    const showsData = musicService.getSamplePreviews();
    formatShows(showsData);
    return showsData;
  }

  function formatShows(shows) {
    const venues = [];
    shows.data.Events.forEach(show => {
      show.dateObj = dateToObj(show.Date);
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

  function dateToObj(dateString) {
    const weekDay = moment(dateString).format('ddd');
    const day = moment(dateString).format('DD');
    const time = moment(dateString).format('hh:mm');
    const period = moment(dateString).format('A');
    const month = moment(dateString).format('MMM');
    return {
      weekDay,
      month,
      day,
      period,
      time
    }
  };
}
