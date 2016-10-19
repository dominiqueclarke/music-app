import $ from 'jquery';
import knob from 'jquery-knob';

export default function(mapService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: './src/components/show.html',
    controllerAs: 'vm',
    scope: {
      show: "=",
      index: "="
    },
    controller($scope, mapService, musicPlayerService, musicTimerService) {


      const vm = this;
      //vm.getPlaceData = mapService.getPlaceData;

      let songCounter = 0;
      let artistCounter = 0;
      let openersCounter = 1;
      let openerTimeout;
      let currentSong;
      let currentSongAudio;


      vm.apply = $scope.$apply;
      vm.eval = $scope.$eval;
      const show = vm.show = $scope.show;
      let songRef;
      vm.watch = $scope.$watch;
      vm.index = $scope.index;
      vm.playSong = playSong;
      vm.stopSong = stopSong;
      vm.showOpeners = showOpeners;
      vm.hideOpeners = hideOpeners;
      vm.isFeaturedShow;

      if (vm.show) {
        vm.date = dateToString(new Date(`${vm.show.Date}`), vm.show.Date);
      }

      $scope.$watch('show', (newValue, oldValue) => {
        if (newValue) {
          vm.date = dateToString(new Date(`${newValue.Date}Z`), vm.show.Date);
        }
      });


      if ($scope.index === "Featured") {
        vm.isFeaturedShow = true;
        $scope.$on('mapClick', function(event, artists) {
          musicPlayerService.pause(currentSongAudio);
          createSong(artists, "Featured");
          //console.log('this is the event data that was broadcasted', artists); // 'Some data'
        });

        //playSong(vm.show, vm.index);
        $scope.$on('featuredShowAssigned', function(event, featuredShow) {
          // console.log('featuredShow arrived from broadcast', featuredShow);
          // console.log(featuredShow.Artists[0]);
          const songData = {
              Id: featuredShow.Artists[0].Id,
              Name: featuredShow.Artists[0].Name,
              artistArtworkUrl: featuredShow.Artists[0].artistArtworkUrl,
              songPreviews: featuredShow.Artists[0].songPreviews
            }
            //console.log(songData);
          playSong([songData], vm.index)
        });
      }

      function showOpeners(show) {
        //setting counter to one, because we don't want the first act, the headliner
        openerTimeout = setTimeout(() => {
          $scope.$apply(function() {
            $scope.opener = show.Artists[openersCounter].Name;
            if(openersCounter === show.Artists.length - 1) {
              openersCounter = 1;
            } else {
              openersCounter++;
            }
            showOpeners(show);
          });
        }, 2000);
      };

      function hideOpeners() {
        clearTimeout(openerTimeout)
        $scope.opener = undefined;
      }

      function playSong(artists, index) {
        const artworkContainer = `.showImage${index}`
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
          createSong(artists, index);
        }
      };

      function stopSong(index) {
        const artwork = angular.element(document.querySelector(`.showImage${index}`));
        artwork.removeClass('active');
        musicPlayerService.pause(currentSongAudio, index);
      };

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

      function createSong(artists, index) {
        //console.log(artistData);
        //console.log(artists);
        let songPreviews = artists[artistCounter].songPreviews;
        checkPreviewUrl(songPreviews);
        currentSong = songPreviews[songCounter];

        let songName = currentSong.songName;
        let artistName = currentSong.artistName;
        let audio = new Audio(currentSong.previewUrl);

        vm.byline = `${songName} by ${artistName}`;
        if (index === "Featured") {
          currentSongAudio = audio;
          musicPlayerService.featuredSong = audio;
        } else {
          currentSongAudio = audio;
        }
        songRef = currentSong.previewUrl;
        vm.albumArt = currentSong.songArtworkUrl;
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

      function dateToString(date, dateString) {
        const offset = date.getTimezoneOffset() / 60;
        console.log(offset);
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

        var month = months[parseInt(dateString.slice(5,7)) - 1];
        var day = dateString.slice(8,10);
        var weekDay = days[date.getDay()];
        var hours = dateString.slice(11,13);
        var minutes = dateString.slice(14,16);
        var time = (hours > 11 ? (hours - 11) : (hours + 1)) + ":" + minutes + (hours > 11 ? "PM" : "AM");
        let hour = (time.length > 6 ? time.slice(0, 5) : time.slice(0, 4));
        var period = time.slice(-2);

        // Returns formatted date as string (e.g. January 28, 2011 - 7:30PM EST)
        // vm.Date = {
        //   month
        //
        // }
        return {
          weekDay,
          month,
          day,
          time,
          hour,
          period,
        }
        //return weekDay + " " + month + " " + day + ", " + year + " - " + time;
      };
    }
  };
}
