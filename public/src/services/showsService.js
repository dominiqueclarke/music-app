import config from '../../../config.js';

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
        console.log(showsData)
        return showsData;
      });
  }

  this.getSampleShows = () => {
    return musicService.getSamplePreviews()
  }
  //
  // getJamBaseData().then(function(results) {
  //   console.log(results);
  //   $scope.jamBaseData = results;
  // });

}
