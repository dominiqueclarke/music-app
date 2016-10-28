import $ from 'jquery';
import knob from 'jquery-knob';
import moment from "moment";

export default function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: './src/components/show.html',
    controllerAs: 'vm',
    scope: {
      show: "="
      , index: "="
      , type: "@"
      , currentDate: "="
    }
    , controller($scope, mapService, musicPlayerService, musicTimerService, showsService, userService) {

      const vm = this;

      let songCounter = 0;
      let artistCounter = 0;
      let openersCounter = 1;
      let openerTimeout;
      let currentSong;
      let songRef;
      let currentSongAudio;

      vm.apply = $scope.$apply;
      vm.currentDate = $scope.currentDate;
      vm.show = $scope.show;
      vm.index = $scope.index;
      vm.type = $scope.type;
      vm.playSong = playSong;
      vm.stopSong = stopSong;
      vm.showOpeners = showOpeners;
      vm.hideOpeners = hideOpeners;
      vm.saveShow = saveShow;
      vm.isFeaturedShow;

      /******  Featured Show    ******/

      if(vm.index === "Featured") {
        vm.isFeaturedShow = true;

        /* waits for featuredShow to be assigned showsCtrl, then passes the
        show data and plays the songs */
        $scope.$on('featuredShowAssigned', (event, featuredShow) => {
          vm.show = featuredShow;
          //vm.show.dateObj = dateToObj(vm.show.Date);
          const songData = {
              Id: featuredShow.Artists[0].Id,
              Name: featuredShow.Artists[0].Name,
              artistArtworkUrl: featuredShow.Artists[0].artistArtworkUrl,
              songPreviews: featuredShow.Artists[0].songPreviews
            }
          /*featuredShow shows is looking for an array of Artists, so we pass in
          the songData for one Artist as an Array */
          playSong([songData], "Featured");
        });

        //listens for map click event, pauses current song and starts playing new song.
        $scope.$on('mapClick', function(event, artists) {
          musicPlayerService.pause(currentSongAudio);
          //takes the artists for the music, plus the index, which is "Featured";
          createSong(artists, "Featured");
        });

        $scope.$on('newFeaturedShow', (event, featuredShow) => {
          if(vm.isFeaturedShow) {
            vm.show = featuredShow;
          }
        })
      }

      /****** Saved Shows ******/

      if(vm.type === "saved") {
        //assigns a class of saved for all saved shows, so that the star is filled
        vm.show.saved = "saved";
      }

      function saveShow(show) {
        if(vm.show.saved !== "saved") {
          showsService.saveShow(show).then(returnedShow => {
            vm.show._id = returnedShow.data._id;
            vm.show.saved = "saved";
            $scope.$emit('newShowSaved', returnedShow.data);
            //vm.savedShows.push(show);
          });
        } else {
          showsService.pullShow(show).then(() => {
              //$scope.$emit('showUnsaved', user.savedShows);
              vm.show.saved = "unsaved";
          })
        }
      }

      /****** Show/Hide Openers *****/

      function showOpeners(show) {
        //setting counter to one, because we don't want the first act, the headliner
        openerTimeout = setTimeout(() => {
          $scope.$apply(function() {
            if(show.Artists.length > 1) {
              $scope.opener = show.Artists[openersCounter].Name;
              if(openersCounter === show.Artists.length - 1) {
                openersCounter = 1;
              } else {
                openersCounter++;
              }
              showOpeners(show);
            }
          });
        }, 2000);
      };

      function hideOpeners() {
        clearTimeout(openerTimeout)
        $scope.opener = undefined;
      }

      /****** Music Player *****/

      function playSong(artists, index) {
        const artworkContainer = `.showImage${index}`;
        const artwork = angular.element(document.querySelector(artworkContainer));
        artwork.addClass('active');
        if (songRef && songRef === currentSong.previewUrl) {
          if (musicPlayerService.featuredSong) {
            musicPlayerService.featuredSong.pause();
          }
          musicPlayerService.play(currentSongAudio, index);
        } else {
          if (musicPlayerService.featuredSong) {
            musicPlayerService.featuredSong.pause();
          }
          $scope.$apply(createSong(artists, index));
        }
      };


      function createSong(artists, index) {
        const songPreviews = artists[artistCounter].songPreviews;
        checkPreviewUrl(songPreviews);
        currentSong = songPreviews[songCounter];
        songRef = currentSong.previewUrl;

        let songName = currentSong.songName;
        let artistName = currentSong.artistName;
        let audio = new Audio(currentSong.previewUrl);

        if (index === "Featured") {
          currentSongAudio = audio;
          musicPlayerService.featuredSong = audio;
        } else {
          currentSongAudio = audio;
        }

        vm.byline = `${songName} by ${artistName}`;
        vm.albumArt = currentSong.songArtworkUrl;
        //change the artwork to the current song artwork
        $(`img.showImage${index}.artwork`).attr('src', currentSong.songArtworkUrl);
        vm.apply(); //make sure all changes to vm get applied, including byline and albumArt

        //create JQuery knob
        musicTimerService.createTimer(currentSongAudio, index);



        //change the artwork to the current song artwork
        $(`img.showImage${index}.artwork`).attr('src', currentSong.songArtworkUrl);

        //play the audio
        musicPlayerService.play(currentSongAudio, index);

        //set up an event listener for when the audio ends
        $(currentSongAudio).on("ended", function() {
          //if it's the last song, set it to 0. If not, increment.
          incrementSong(songPreviews, artists);
          createSong(artists, index);
        });
      };

      function stopSong(index) {
        const artwork = angular.element(document.querySelector(`.showImage${index}`));
        artwork.removeClass('active');
        musicPlayerService.pause(currentSongAudio, index);
      };

      //if a particular song does not have a previewUrl, go to the next song
      function checkPreviewUrl(songPreviews) {
        if (!songPreviews[songCounter].previewUrl) {
          songCounter++;
          checkPreviewUrl(songPreviews);
        }
      };

      function incrementSong(songPreviews, artists) {
        //if it's the last song, set it to 0. If not, increment.
        if (songCounter === songPreviews.length - 1) {
          songCounter = 0;
        } else if (artistCounter === artists.length - 1) {
          artistCounter = 0;
          songCounter++;
        } else {
          artistCounter++;
        }
      };
    }
  };
}
