import $ from 'jquery';
import knobw from 'jquery-knob';

export default function() {
  return {
    restrict: 'E'
    , replace: true
    , templateUrl: './src/components/show.html'
    , controllerAs: 'vm'
    , scope: {
      show: "="
      , index: "="
    }
    , controller ($scope) {


      const vm = this;
      vm.apply = $scope.$apply;
      vm.eval = $scope.$eval;
      //console.log(vm.show);
      let counter = 0;

      //let audio;
      let songCounter = 0;
      let artistCounter = 0;


      vm.playSong = (show, index) => {
        const container = `.event${index}`
        // console.log('show', show);
        // console.log('artist data', show.artistData[0])
        // console.log('song previews', show.artistData[0].songPrevivews[0]);
        // console.log('preview url', show.artistData[0].songPrevivews[0].previewUrl);
        const artwork = angular.element( document.querySelector( container ) );
        artwork.addClass('active');
        if(vm.songRef === show.artistData[0].songPreviews[songCounter].previewUrl) {
          console.log(vm.currentSongAudio.currentTime);
          vm.currentSongAudio.play();
        } else {
          function createSong() {


            let artistData = show.artistData;
            let songPreviews = show.artistData[artistCounter].songPreviews;
            let currentSong = show.artistData[artistCounter].songPreviews[songCounter];
            let songName = currentSong.songName;
            let artistName = currentSong.artistName;
            vm.byline = `${songName} by ${artistName}`
            let audio = new Audio(currentSong.previewUrl);
            console.log(currentSong);
            vm.currentSongAudio = audio;
            vm.songRef = currentSong.previewUrl;
            vm.albumArt = currentSong.songArtworkUrl;
            vm.albumArt = currentSong.songArtworkUrl;
            console.log(vm.albumArt);
            function updateValue(knob) {
              console.log('this fired');
              vm.currentSongAudio.ontimeupdate = () => {
                knob.val(Math.floor(vm.currentSongAudio.currentTime * 10000)).trigger('change');
                //vm.currentSongTime = vm.currentSongAudio.currentTime
              };
            }
            $.fn.timer = function( userdefinedoptions ){
            var $this = $(this);
            let opt;
            let count = 0;


            opt = $.extend( {
                // Config
                'timer' : 300000, // 300 second default
                'width' : 110 ,
                'height' : 110 ,
                'position': 'absolute',
                'fgColor' : "yellow" ,
                'bgColor' : "#F5F5F5"
                }, userdefinedoptions
            );


            $this.knob({
                'min':0,
                'max': opt.timer,
                'readOnly': true,
                'width': opt.width,
                'height': opt.height,
                'fgColor': opt.fgColor,
                'bgColor': opt.bgColor,
                'displayInput' : false,
                'dynamicDraw': true,
                'ticks': 0,
                'thickness': 0.1
            });


            //setInterval(function(){
                //++count;
                updateValue($this)
            //}, 100);
        };
        $(`.musicPlayer${index}`).timer(updateValue);

            console.log(vm.currentSongTime);
            vm.apply();
            $(`img.event${index}.artwork`).attr('src', currentSong.songArtworkUrl);
            vm.currentSongAudio.play();
            $(vm.currentSongAudio).on("ended", function() {
              console.log("All Done!");
              //if it's the last song, set it to 0. If not, increment.
              if(songCounter === show.artistData[artistCounter].songPreviews.length - 1) {
                songCounter = 0;
              } else if (artistCounter === artistData.length - 1) {
                  artistCounter = 0;
                  songCounter++;
              } else {
                artistCounter++;
              }
              createSong();
            });
          }
          createSong();
        }
      }

      vm.stopSong = (index) => {
        console.log(vm.currentSong);
        vm.currentSongAudio.pause();
        const artwork = angular.element( document.querySelector( `.event${index}` ) );
        artwork.removeClass('active');
      }
    }
  }
}
