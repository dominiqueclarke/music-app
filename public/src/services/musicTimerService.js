import $ from 'jquery';
import knob from 'jquery-knob';

export default function() {

	let currentTime;
	let knob;

	this.createTimer = (currentSongAudio, index) => {
		if (knob && index === "Featured") {
			knob.val(0).trigger('change');
			updateValue(knob, currentSongAudio);
		} else {
			$.fn.timer = function(userdefinedoptions) {
				knob = $(this);
				let opt;


				opt = $.extend({
					// Config
					'timer': 300000, // 30 seconds
					'width': 110,
					'height': 110,
					'position': 'absolute',
					'fgColor': "#FBD13D",
					'bgColor': "#F5F5F5"
				}, userdefinedoptions);


				knob.knob({
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

				updateValue(knob, currentSongAudio);
				//}, 100);
			};
			$(`.musicPlayer${index}`).timer(updateValue);
		}
	}

	function updateValue(knob, currentSongAudio) {
		currentSongAudio.ontimeupdate = () => {
			knob.val(Math.floor(currentSongAudio.currentTime * 10000)).trigger('change');
		};
	};
}
