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
      let currentSong;


      vm.apply = $scope.$apply;
      vm.eval = $scope.$eval;
      vm.show = $scope.show;
      vm.watch = $scope.$watch;
      vm.index = $scope.index;
      vm.playSong = playSong;
      vm.stopSong = stopSong;
      vm.isFeaturedShow;


      if($scope.index === "Featured") {
        vm.isFeaturedShow = true;
        //playSong(vm.show, vm.index);
        $scope.$watch('show.Artists[0].songPreviews', function(newValue, oldValue) {
          playSong([{
            Id: vm.show.Artists[0].Id
            , Name: vm.show.Artists[0].Name
            , artistArtworkUrl: vm.show.Artists[0].artistArtworkUrl
            , songPreviews: newValue
          }], vm.index)
        });
      }


      function playSong(artists, index) {
        const artworkContainer = `.showImage${index}`
        const artwork = angular.element(document.querySelector(artworkContainer));
        artwork.addClass('active');
        if (vm.songRef && vm.songRef === currentSong.previewUrl) {
          vm.currentSongAudio.play();
        } else {
          createSong(artists, index);
        }
      };

      function stopSong(index) {
        const artwork = angular.element(document.querySelector(`.showImage${index}`));
        artwork.removeClass('active');
        vm.currentSongAudio.pause();
      };

      function checkPreviewUrl(songPreviews) {
        if(!songPreviews[songCounter].previewUrl) {
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
        let songPreviews = artists[artistCounter].songPreviews;
        checkPreviewUrl(songPreviews);
        currentSong = songPreviews[songCounter];

        let songName = currentSong.songName;
        let artistName = currentSong.artistName;
        let audio = new Audio(currentSong.previewUrl);

        vm.byline = `${songName} by ${artistName}`;
        vm.currentSongAudio = audio;
        vm.songRef = currentSong.previewUrl;
        vm.albumArt = currentSong.songArtworkUrl;
        vm.apply(); //make sure all changes to vm get applied, including byline and albumArt

        //create JQuery knob
        musicTimerService.createTimer(vm.currentSongAudio, index);

        //change the artwork to the current song artwork
        $(`img.showImage${index}.artwork`).attr('src', currentSong.songArtworkUrl);

        //play the audio
        vm.currentSongAudio.play();

        //set up an event listener for when the audio ends
        $(vm.currentSongAudio).on("ended", function() {
          //if it's the last song, set it to 0. If not, increment.
          incrementSong(songPreviews, artists);
          createSong(artists, index);
        });
      };
    }
  };
}
