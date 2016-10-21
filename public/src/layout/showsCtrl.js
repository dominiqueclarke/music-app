////import config from "../../../config.js;
import googleMapsLoader from 'google-maps';
export default function($http, userService, musicService, showsService, mapService, $scope) {

   const vm = this;
   const getCurrentUser = userService.getCurrentUser;
   vm.loaded = false;
   vm.showSavedShows = false;
   vm.savedShows = [];
   vm.pressed = "";


   vm.featuredIndex = "Featured";

   vm.pressSavedShowsBtn = () => {
     vm.pressed = pressed;
   }

   vm.getUpdatedSavedShows = () => {
     userService.getCurrentUser().then(user => {
       vm.savedShows = user.savedShows;
       vm.savedShows = sortSavedShows(vm.savedShows);
     });
  }

   $scope.$on('newShowSaved', function(event, show) {
     vm.savedShows.push(show);
     vm.savedShows = sortSavedShows(vm.savedShows);
     console.log(vm.savedShows);
   });

   $scope.$on('showUnsaved', function(event, newSavedShows) {
     vm.savedShows = newSavedShows;
     vm.savedShows = sortSavedShows(vm.savedShows);
     console.log(vm.savedShows);
   });




   //music,byline,and art

   const getShows = showsService.getShowsData;

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

   getCurrentUser().then(currentUser => {
      vm.currentUser = currentUser;
      vm.savedShows = currentUser.savedShows;
      vm.savedShows = sortSavedShows(vm.savedShows);
      console.log(vm.savedShows);
      getShows(vm.currentUser, sessionStorage.zipCode).then().then(function(shows) {
        vm.loaded = true;
        vm.shows = shows.data.Events;
        vm.currentDate = new Date(vm.shows[0].Date).getTime();
        console.log(vm.currentDate);
        vm.shows.forEach(function(show) {
          show.epochTime = new Date(show.Date).getTime();
          for(let i = 0; i < vm.savedShows.length; i++) {
            if(show.Id === vm.savedShows[i].jamBaseId) {
              show.saved = "saved";
            }
          }
        })
        console.log(vm.shows);
        vm.featuredShow = shows.data.Venues[0].nextShow;
        console.log('this is the featured show', vm.featuredShow);
        $scope.$broadcast('featuredShowAssigned', vm.featuredShow);
        const venues = vm.venues = shows.data.Venues;
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
              // var popup = new mapboxgl.Popup()
              //   .setLngLat(feature.geometry.coordinates)
              //   .setHTML(feature.properties.img)
              //   .addTo(map);
          });
        });
      })
   });

   //
  //  const showsData = showsService.getSampleShows();
  //  vm.shows = showsService.getSampleShows().data.Events;
  //  const venues = vm.venues = showsService.getSampleShows().data.Venues;
  //  vm.featuredShow = showsService.getSampleShows().data.Venues[0].nextShow;
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
  //        var popup = new mapboxgl.Popup()
  //          .setLngLat(feature.geometry.coordinates)
  //          .setHTML(feature.properties.img)
  //          .addTo(map);
  //    });
  //  });

   console.log('shows', vm.shows);
}
