//import config from "../../../config.js";
import googleMapsLoader from 'google-maps';
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
  this.getShowsData = (currentUser, zipCode) => {
      return new Promise((resolve, reject) => {
        $http({
         url: `http://api.jambase.com/events?zipCode=${zipCode}&radius=25&page=0&` + (process.env.JAMBASE_KEY || config.jamBase.apiKey)
         , type: 'GET'
      })
      .then(function(shows) {
          musicService.getMusicPreviews(shows).then(results => {
          let showsData = results;
          const lastShowsRequest = new Date().getTime();
          $http({
            url: `/api/users/${currentUser._id}`
            , method: 'PUT'
            , data: {lastShowsRequest, zipCode}
          })
          formatShows(showsData);
          resolve(showsData);
        });
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
    const date = moment(dateString).toDate();
    // Use an array to format the month numbers
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    var days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ];

    // Use an object to format the timezone identifiers

    var month = months[date.getMonth()];
    var day = date.getDate();
    var weekDay = days[date.getDay()];
    var hour = date.getHours();
    var minutes = date.getMinutes();
    if(minutes < 10) {
      minutes = `0${minutes}`;
    }
    var time = (hour > 11 ? (hour - 11) : (hour + 1)) + ":" + minutes + (hour > 11 ? "PM" : "AM");
    var period = time.slice(-2);
    var time = time.slice(0, time.length - 2);

    return {
      weekDay,
      month,
      day,
      time,
      hour,
      period,
    }
  };
  //
  // getJamBaseData().then(function(results) {
  //   console.log(results);
  //   $scope.jamBaseData = results;
  // });

}
