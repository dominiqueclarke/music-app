import $ from 'jquery';
import knob from 'jquery-knob';

export default function() {
  this.createTimer = (currentSongAudio, index) => {
    console.log('this fired');
    console.log(currentSongAudio);
    console.log(index);
    function updateValue(knob) {
      currentSongAudio.ontimeupdate = () => {
        knob.val(Math.floor(currentSongAudio.currentTime * 10000)).trigger('change');
        //vm.currentSongTime = vm.currentSongAudio.currentTime
      };
    }
    $.fn.timer = function(userdefinedoptions) {
      var $this = $(this);
      let opt;
      let count = 0;


      opt = $.extend({
        // Config
        'timer': 300000, // 300 second default
        'width': 110,
        'height': 110,
        'position': 'absolute',
        'fgColor': "yellow",
        'bgColor': "#F5F5F5"
      }, userdefinedoptions);


      $this.knob({
        'min': 0,
        'max': opt.timer,
        'readOnly': true,
        'width': opt.width,
        'height': opt.height,
        'fgColor': opt.fgColor,
        'bgColor': opt.bgColor,
        'displayInput': false,
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
  }
}
