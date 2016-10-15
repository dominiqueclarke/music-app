export default function(userService) {
  const vm = this;
  console.log('this is the login controller')
  vm.saveZipCode = zip => {
    sessionStorage.setItem('zipCode', zip.toString());
  };

      // var v = document.getElementById('v');
      // var canvas = document.getElementById('c');
      // console.log(canvas);
      // var context = canvas.getContext('2d');

      // var cw = Math.floor(v.clientWidth);
      // var ch = Math.floor(v.clientHeight);
      // canvas.width = cw;
      // canvas.height = ch;


  function draw(v,c,w,h) {
      if(v.paused || v.ended) return false;
      c.drawImage(v,0,0,w,h);
      setTimeout(draw,20,v,c,w,h);
  }

  const image = document.getElementById('v');
  const imageCanvas = document.getElementById('c');
  const imageCanvasContext = imageCanvas.getContext('2d');
  // const buttonCanvas = document.getElementById('hero-button');
  // const buttonCanvasContext = buttonCanvas.getContext('2d');
  // const buttonClipCanvas = document.createElement('canvas');
  // const buttonClipCanvasContext = buttonCanvas.getContext('2d');
  const lineCanvas = document.createElement('canvas');
  const lineCanvasContext = lineCanvas.getContext('2d');
  const pointLifetime = 1000;
  let points = [];

  v.addEventListener('play', function(){
    start();
  },false);

  console.log('video', image);
  console.log('imageCanvas', imageCanvas);

  if (image.complete) {
    start();
  } else {
    image.onload = start;
  }

  /**
   * Attaches event listeners and starts the effect.
   */
  function start() {
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resizeCanvases);
    console.log(imageCanvas);
    const imageContainer = document.getElementById('homepage-hero-module');
    const buttonContainer = document.getElementById('button-container');
    imageContainer.appendChild(imageCanvas);
    //buttonContainer.appendChild(buttonCanvas);
    //drawButtonCanvas();
    //drawButtonClipCanvas();
    resizeCanvases();
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
    imageCanvas.width = lineCanvas.width = window.innerWidth;
    imageCanvas.height = lineCanvas.height = window.innerHeight;
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
    drawImageCanvas();
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
  function drawImageCanvas() {
    // Emulate background-size: cover
    const width = Math.floor(v.clientWidth);
    const height = Math.floor(v.clientHeight);

    imageCanvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    imageCanvasContext.globalCompositeOperation = 'source-over';
    imageCanvasContext.drawImage(image, 0, 0, width, height);
    imageCanvasContext.globalCompositeOperation = 'destination-in';
    imageCanvasContext.drawImage(lineCanvas, 0, 0);
  }

  function drawButtonCanvas() {
    const width = Math.floor(v.clientWidth);
    const height = Math.floor(v.clientHeight);

    buttonCanvasContext.clearRect(0, 0, 50, 50);
    buttonCanvasContext.globalCompositeOperation = 'source-over';
    buttonCanvasContext.drawImage(image, 0, 0, width, height);
    buttonCanvasContext.globalCompositeOperation = 'destination-in';
    buttonCanvasContext.drawImage(buttonCanvas, 0, 0);
  }

}
