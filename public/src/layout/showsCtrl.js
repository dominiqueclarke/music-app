import config from "../../../config.js";
import googleMapsLoader from 'google-maps';
export default function($http, userService, musicService, showsService, mapService) {

   const vm = this;
   console.log(mapService);
   const getCurrentUser = userService.getCurrentUser;

   const shows2 = showsService.getShowsData;
   console.log('from showsCtrl', sessionStorage.zipCode);

   getCurrentUser().then(function(currentUser) {
      vm.currentUser = currentUser;
      // shows2(vm.currentUser, sessionStorage.zipCode).then(function(results) {
      //   //console.log(vm.currentUser)
      //   console.log('results of api call', results);
      // })
   });

  //  shows2(vm.currentUser).then(function(results) {
  //    console.log(vm.currentUser)
  //    console.log(results);
  //  })




   vm.shows = showsService.getSampleShows();
   vm.shows = vm.shows.data.Events;
   mapService.getMap(vm.shows);



   console.log('shows', vm.shows);

   // function getJamBaseData() {
   //   return $http({
   //     url: 'http://api.jambase.com/events?zipCode=75201&radius=25&page=0&api_key=mg7dkv3nzbyb79cdu9gcbesb&o=json'
   //   , type: 'GET'
   //   })
   //   .then(function(results) {
   //     console.log(results);
   //     return results;
   //   });
   // }
   //
   // getJamBaseData().then(function(results) {
   //   console.log(results);
   //   $scope.jamBaseData = results;
   // });

   // var wavesurfer = WaveSurfer.create({
   //   container: '#waveform',
   //   waveColor: 'violet',
   //   progressColor: 'purple'
   // });
   //
   // wavesurfer.on('ready', function () {
   //   wavesurfer.play();
   // });
   //wavesurfer.load(currentSong);
}
