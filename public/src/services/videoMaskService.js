export default function() {

	this.createVideoMask = () => {
		/*** Canvas Mask adapted from https://codepen.io/chrisdoble/pen/WQLLVp and
		applied to HTML5 video **/
		const video = document.getElementById('v');
		const videoCanvas = document.getElementById('c');
		const videoCanvasContext = videoCanvas.getContext('2d');
		const lineCanvas = document.createElement('canvas');
		const lineCanvasContext = lineCanvas.getContext('2d');
		const pointLifetime = 1000;
        
		let points = [];

		v.addEventListener('play', function() {
			start();
		}, false);

		if (video.complete) {
			start();
		} else {
			video.onload = start;
		}

		/**
		 * Attaches event listeners and starts the effect.
		 */
		function start() {
			document.addEventListener('mousemove', onMouseMove);
			window.addEventListener('resize', resizeCanvases);
			const videoContainer = document.getElementById('homepage-hero-module');
			videoContainer.appendChild(videoCanvas);
			resizeCanvases(videoContainer);
			tick();
		}

		/**
		 * Records the user's cursor position.
		 *
		 * @param {!MouseEvent} event
		 */
		function onMouseMove(event) {
			points.push({
				time: Date.now(),
				x: event.clientX,
				y: event.clientY
			});
		}

		/**
		 * Resizes both canvases to fill the window.
		 */
		function resizeCanvases() {
			const videoContainer = angular.element(document.querySelector('#homepage-hero-module'));
			videoCanvas.width = lineCanvas.width = videoContainer[0].offsetWidth;
			videoCanvas.height = lineCanvas.height = videoContainer[0].offsetHeight;
		}

		/**
		 * The main loop, called at ~60hz.
		 */
		function tick() {
			// Remove old points
			points = points.filter(function(point) {
				var age = Date.now() - point.time;
				return age < pointLifetime;
			});
			drawVideoCanvas();
			drawLineCanvas();
			//drawButtonCanvas();
			//drawButtonClipCanvas();
			requestAnimationFrame(tick);
		}

		/**
		 * Draws a line using the recorded cursor positions.
		 *
		 * This line is used to mask the original image.
		 */
		function drawLineCanvas() {
			var minimumLineWidth = 25;
			var maximumLineWidth = 100;
			var lineWidthRange = maximumLineWidth - minimumLineWidth;
			var maximumSpeed = 50;

			lineCanvasContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
			lineCanvasContext.lineCap = 'round';
			lineCanvasContext.shadowBlur = 30;
			lineCanvasContext.shadowColor = '#000';

			for (var i = 1; i < points.length; i++) {
				var point = points[i];
				var previousPoint = points[i - 1];

				// Change line width based on speed
				var distance = getDistanceBetween(point, previousPoint);
				var speed = Math.max(0, Math.min(maximumSpeed, distance));
				var percentageLineWidth = (maximumSpeed - speed) / maximumSpeed;
				lineCanvasContext.lineWidth = minimumLineWidth + percentageLineWidth * lineWidthRange;

				// Fade points as they age
				var age = Date.now() - point.time;
				var opacity = (pointLifetime - age) / pointLifetime;
				lineCanvasContext.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')';

				lineCanvasContext.beginPath();
				lineCanvasContext.moveTo(previousPoint.x, previousPoint.y);
				lineCanvasContext.lineTo(point.x, point.y);
				lineCanvasContext.stroke();
			}
		}

		/**
		 * @param {{x: number, y: number}} a
		 * @param {{x: number, y: number}} b
		 * @return {number} The distance between points a and b
		 */
		function getDistanceBetween(a, b) {
			return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
		}

		function drawButtonClipCanvas() {
			var minimumLineWidth = 25;
			var maximumLineWidth = 100;

			buttonClipCanvasContext.clearRect(0, 0, buttonClipCanvas.width, buttonClipCanvas.height);
			buttonClipCanvasContext.fillStyle = 'yellow';
			buttonClipCanvasContext.fillRect(50, 50, 200, 100);
		}

		/**
		 * Draws the original image, masked by the line drawn in drawLineToCanvas.
		 */
		function drawVideoCanvas() {
			// Emulate background-size: cover
			const width = Math.floor(v.clientWidth);
			const height = Math.floor(v.clientHeight);

			videoCanvasContext.clearRect(0, 0, videoCanvas.width, videoCanvas.height);
			videoCanvasContext.globalCompositeOperation = 'source-over';
			videoCanvasContext.drawImage(video, 0, 0, width, height);
			videoCanvasContext.globalCompositeOperation = 'destination-in';
			videoCanvasContext.drawImage(lineCanvas, 0, 0);
		}
	}
}
