export default function($http, userService, musicService) {

   const vm = this;

   const getCurrentUser = userService.getCurrentUser;

   getCurrentUser().then(function(currentUser) {
      vm.currentUser = currentUser;
   });

   vm.shows = musicService.getMusicPreviews();
   console.log(vm.shows);

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
