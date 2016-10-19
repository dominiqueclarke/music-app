import config from "../../../config.js";
import googleMapsLoader from 'google-maps';
export default function($http, userService, musicService, showsService, mapService, $scope) {

   const vm = this;
   const getCurrentUser = userService.getCurrentUser;

   vm.featuredIndex = "Featured";

   //music,byline,and art

   const getShows = showsService.getShowsData;

   getCurrentUser().then(currentUser => {
      vm.currentUser = currentUser;
      // getShows(vm.currentUser, sessionStorage.zipCode).then().then(function(shows) {
      //   vm.shows = shows.data.Events;
      //   vm.featuredShow = shows.data.Venues[0].nextShow;
      //   $scope.$broadcast('featuredShowAssigned', vm.featuredShow);
      //   const venues = vm.venues = shows.data.Venues;
      //   mapService.getMap(vm.venues).then(map => {
      //     map.on('click', (e) => {
      //         //reset selectedActivity so that all activities show when a new place is selected
      //         //delete $scope.selectedActivity;
      //         // Use queryRenderedFeatures to get features at a click event's point
      //         // Use layer option to avoid getting results from other layers
      //         const features = map.queryRenderedFeatures(e.point, {
      //             layers: ['points']
      //         });
      //         const venueName = features[0].properties.title;
      //         console.log('these are the venues');
      //         $scope.$apply(function() {
      //             for (let venue in venues) {
      //                 if (venueName === venues[venue].name) {
      //                     console.log(venues[venue]);
      //                     vm.featuredShow = venues[venue].nextShow;
      //                     //vm.byline = 'turd';
      //                     //console.log(vm.byline);
      //                     $scope.$broadcast('mapClick', vm.featuredShow.Artists); // going down!
      //                     break;
      //                 }
      //             }
      //         });
      //        //  if there are features within the given radius of the click event,
      //        //  fly to the location of the click event
      //         if (features.length) {
      //             // Get coordinates from the symbol and center the map on those coordinates
      //             map.flyTo({
      //                 center: features[0].geometry.coordinates
      //             });
      //         }
      //
      //         var feature = features[0];
      //
      //         //set pop up with image of location
      //         var popup = new mapboxgl.Popup()
      //           .setLngLat(feature.geometry.coordinates)
      //           .setHTML(feature.properties.img)
      //           .addTo(map);
      //     });
      //   });
      // })
   });


   const showsData = showsService.getSampleShows();
   vm.shows = showsService.getSampleShows().data.Events;
   const venues = vm.venues = showsService.getSampleShows().data.Venues;
   vm.featuredShow = showsService.getSampleShows().data.Venues[0].nextShow;
   mapService.getMap(vm.venues).then(map => {
     map.on('click', (e) => {
         //reset selectedActivity so that all activities show when a new place is selected
         //delete $scope.selectedActivity;
         // Use queryRenderedFeatures to get features at a click event's point
         // Use layer option to avoid getting results from other layers
         const features = map.queryRenderedFeatures(e.point, {
             layers: ['points']
         });
         const venueName = features[0].properties.title;
         console.log('these are the venues');
         $scope.$apply(function() {
             for (let venue in venues) {
                 if (venueName === venues[venue].name) {
                     console.log(venues[venue]);
                     vm.featuredShow = venues[venue].nextShow;
                     //vm.byline = 'turd';
                     //console.log(vm.byline);
                     $scope.$broadcast('mapClick', vm.featuredShow.Artists); // going down!
                     break;
                 }
             }
         });
        //  if there are features within the given radius of the click event,
        //  fly to the location of the click event
         if (features.length) {
             // Get coordinates from the symbol and center the map on those coordinates
             map.flyTo({
                 center: features[0].geometry.coordinates
             });
         }

         var feature = features[0];

         //set pop up with image of location
         var popup = new mapboxgl.Popup()
           .setLngLat(feature.geometry.coordinates)
           .setHTML(feature.properties.img)
           .addTo(map);
     });
   });
   $scope.$watch('map', function(newValue, oldValue) {
     console.log('oldValue', oldValue);
     console.log('newValue', newValue);
   });

   console.log('shows', vm.shows);
}
