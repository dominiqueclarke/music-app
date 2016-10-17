import config from "../../../config.js";
import googleMapsLoader from 'google-maps';
export default function($http, userService, musicService, showsService, mapService) {

   const vm = this;
   const getCurrentUser = userService.getCurrentUser;

   const shows2 = showsService.getShowsData;

   getCurrentUser().then(function(currentUser) {
      vm.currentUser = currentUser;
      shows2(vm.currentUser, sessionStorage.zipCode).then(function(shows) {
        vm.shows = shows.data.Events;
        mapService.getMap(vm.shows);
      })
   });


  //  vm.shows = showsService.getSampleShows();
  //  vm.shows = vm.shows.data.Events;
   //mapService.getMap(vm.shows)



   console.log('shows', vm.shows);
}
