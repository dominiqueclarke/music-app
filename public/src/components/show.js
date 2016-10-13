import WaveSurfer from 'wavesurfer.js';

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
    , controller () {
      const vm = this;
      vm.hi = 'hi';
      let counter = 0;

      vm.getUniqueClass = () => {
        counter++;
        return `event${counter}`
      }

      //wavesurfer.load(currentSong);
      vm.playSong = (currentSong, index) => {
        console.log(index);
        const container = `.event${index}`
        console.log(container);
        console.log(vm.currentSong);
        const currentWave = `event${index}Wave`;
        let audio;
        var artwork = angular.element( document.querySelector( container ) );
        console.log(artwork);
        artwork.addClass('active');
        if(vm.songRef === currentSong) {
          vm.currentSong.play();
        } else {
          audio = new Audio(currentSong);
          // vm.currentWave = WaveSurfer.create({
          //   container,
          //   waveColor: 'violet',
          //   progressColor: 'purple',
          //   backend: 'MediaElement'
          // });
          // vm.currentWave.on('ready', function () {
          //   vm.currentWave.play();
          // });
          //vm.currentWave.load(audio);
          vm.currentSong = audio;
          vm.currentSong.play();
          vm.songRef = currentSong;
        }
      }

      vm.stopSong = (index) => {
        //vm.currentWave.pause();
        vm.currentSong.pause();
        var artwork = angular.element( document.querySelector( `.event${index}` ) );
        console.log(artwork);
        artwork.removeClass('active');

      }
    }
  }
}
