import config from "../../../config.js";
import googleMapsLoader from 'google-maps';
export default function($http, userService, musicService, showsService, mapService, $scope) {

   const vm = this;
   const getCurrentUser = userService.getCurrentUser;
   const getShows = showsService.getShowsData;

   vm.loaded = false;
   vm.showSavedShows = false;
   vm.savedShowsBtnPressed = false;

   vm.savedShows = [];
   vm.featuredIndex = "Featured";
   vm.currentUser;
   vm.shows;
   vm.currentDate;

   vm.getUpdatedSavedShows = () => {
     userService.getCurrentUser().then(user => {
       vm.savedShows = user.savedShows;
       vm.savedShows = sortSavedShows(vm.savedShows);
     });
   }

   vm.pressSavedShowsBtn = () => {
     vm.savedShowsBtnPressed = true;
   }

   $scope.$on('newShowSaved', function(event, show) {
     vm.savedShows.push(show);
     vm.savedShows = sortSavedShows(vm.savedShows);
   });

   $scope.$on('showUnsaved', function(event, newSavedShows) {
     vm.savedShows = newSavedShows;
     vm.savedShows = sortSavedShows(vm.savedShows);
   });

   getCurrentUser().then(currentUser => {
      vm.currentUser = currentUser;
      vm.savedShows = currentUser.savedShows;
      vm.savedShows = sortSavedShows(vm.savedShows);

      getShows(vm.currentUser, sessionStorage.zipCode).then(function(shows) {
        vm.loaded = true;
        vm.shows = shows.data.Events;
        vm.currentDate = new Date(vm.shows[0].Date).getTime();
        vm.featuredShow = shows.data.Venues[0].nextShow;
        const venues = vm.venues = shows.data.Venues;
        vm.shows.forEach(function(show) {
          show.epochTime = new Date(show.Date).getTime();
          for(let i = 0; i < vm.savedShows.length; i++) {
            if(show.Id === vm.savedShows[i].jamBaseId) {
              show._id = vm.savedShows[i]._id;
              show.saved = "saved";
            }
          }
        })
        $scope.$broadcast('featuredShowAssigned', vm.featuredShow);
        mapService.getMap(vm.venues).then(map => {
      // function checkIfMapIsLoaded() {
      //   setTimeout( () => {
      //     if(map.loaded() === true) {
      //       vm.loaded = true;
      //     } else {
      //       checkIfMapIsLoaded();
      //     }
      //   }, 3000);
      // }
      //checkIfMapIsLoaded();
          map.on('click', (e) => {
              const features = map.queryRenderedFeatures(e.point, {
                  layers: ['points']
              });
              const venueName = features[0].properties.title;
              $scope.$apply(function() {
                  for (let venue in venues) {
                      if (venueName === venues[venue].name) {
                          console.log(venues[venue]);
                          vm.featuredShow = venues[venue].nextShow;
                          console.log(vm.featuredShow.saved);
                          $scope.$broadcast('newFeaturedShow', vm.featuredShow);
                          $scope.$broadcast('mapClick', vm.featuredShow.Artists);
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
          });
        });
      })
   });

   function sortSavedShows(savedShows) {
     let sortedShows = savedShows;
     sortedShows.sort(function (a, b) {
       if (new Date(a.Date).getTime() > new Date(b.Date).getTime()) {
         return 1;
       }
       if (new Date(a.Date).getTime() < new Date(b.Date).getTime()) {
         return -1;
       }
       // a must be equal to b
       return 0;
     });
     return sortedShows;
   }

  //  const showsData = showsService.getSampleShows();
  //  vm.shows = showsService.getSampleShows().data.Events;
  //  const venues = vm.venues = showsService.getSampleShows().data.Venues;
  //  vm.featuredShow = showsService.getSampleShows().data.Venues[0].nextShow;
  //  //$scope.$broadcast('featuredShowAssigned', vm.featuredShow);
  //  $scope.$broadcast('featuredShowAssigned', showsService.getSampleShows().data.Venues[0].nextShow);
   //
   //
  //  mapService.getMap(vm.venues).then(map => {
  //    function checkIfMapIsLoaded() {
  //      setTimeout( () => {
  //        if(map.loaded() === true) {
  //          vm.loaded = true;
  //        } else {
  //          checkIfMapIsLoaded();
  //        }
  //      }, 3000);
  //    }
  //    checkIfMapIsLoaded();
  //    map.on('click', (e) => {
  //        //reset selectedActivity so that all activities show when a new place is selected
  //        //delete $scope.selectedActivity;
  //        // Use queryRenderedFeatures to get features at a click event's point
  //        // Use layer option to avoid getting results from other layers
  //        const features = map.queryRenderedFeatures(e.point, {
  //            layers: ['points']
  //        });
  //        const venueName = features[0].properties.title;
  //        $scope.$apply(function() {
  //            for (let venue in venues) {
  //                if (venueName === venues[venue].name) {
  //                    console.log(venues[venue]);
  //                    vm.featuredShow = venues[venue].nextShow;
  //                    //vm.byline = 'turd';
  //                    //console.log(vm.byline);
  //                    $scope.$broadcast('mapClick', vm.featuredShow.Artists); // going down!
  //                    break;
  //                }
  //            }
  //        });
  //       //  if there are features within the given radius of the click event,
  //       //  fly to the location of the click event
  //        if (features.length) {
  //            // Get coordinates from the symbol and center the map on those coordinates
  //            map.flyTo({
  //                center: features[0].geometry.coordinates
  //            });
  //        }
   //
  //        var feature = features[0];
   //
  //        //set pop up with image of location
  //    });
  //  });

   console.log('shows', vm.shows);
}
