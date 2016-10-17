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
    controller($scope, mapService, musicTimerService) {

      const vm = this;
      //vm.getPlaceData = mapService.getPlaceData;
      vm.apply = $scope.$apply;
      vm.eval = $scope.$eval;
      //console.log(vm.show);
      //let audio;
      let songCounter = 0;
      let artistCounter = 0;
      let currentSong;

      //vm.getPlaceData = showsService.getPlaceData();
      vm.playSong = (show, index) => {
        const artworkContainer = `.showImage${index}`
        const artwork = angular.element(document.querySelector(artworkContainer));
        artwork.addClass('active');
        if (vm.songRef && vm.songRef === currentSong.previewUrl) {
          vm.currentSongAudio.play();
        } else {
          createSong(show, index);
        }
      };

      vm.stopSong = (index) => {
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

      function incrementSong(songPreviews, artistData) {
        //if it's the last song, set it to 0. If not, increment.
        if (songCounter === songPreviews.length - 1) {
          songCounter = 0;
        } else if (artistCounter === artistData.length - 1) {
          artistCounter = 0;
          songCounter++;
        } else {
          artistCounter++;
        }
      };

      function createSong(show, index) {
        let artistData = show.Artists;
        let songPreviews = artistData[artistCounter].songPreviews;
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
          incrementSong(songPreviews, artistData);
          createSong(show, index);
        });
      };
    }
  };
}
