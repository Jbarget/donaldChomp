var trump,
  trumpImage,
  canvas,
  animate = false,
  rotations = 0,
  divisor = 5;

  var trumpHeight = 542;
      trumpWidth = 432;
      trumpSpeed = 10;

function gameLoop () {
  window.requestAnimationFrame(gameLoop);
  trump.render();
  trump.update();
}

function sprite (options) {

  var that = {},
    frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = options.ticksPerFrame || 0,
    numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.speed = options.speed;
    that.x = options.x;
    that.y = options.y;
    that.image = options.image;

  that.update = function () {
    if (animate && rotations < 2){
      tickCount += 1;
      if (tickCount > ticksPerFrame) {
        tickCount = 0;
        // If the current frame index is in range
        if (frameIndex < numberOfFrames - 1) {
          // Go to the next frame
          frameIndex += 1;
        } else {
          rotations += 1;
          frameIndex = 0;
        }
      }
    } else {
      animate = false;
      rotations = 0;
    }
  };

  that.render = function () {
    // Clear the canvas
    that.context.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the animation
    that.context.drawImage(
      that.image,
      frameIndex * that.width / numberOfFrames,
      0,
      that.width / numberOfFrames,
      that.height,
      that.x,
      that.y,
      (that.width / numberOfFrames) / divisor,
      that.height/ divisor);
  };

  return that;
}

// Get canvas
canvas = document.getElementById("canvas");

// Create sprite sheet
trumpImage = new Image();

// Create sprite
trump = sprite({
  context: canvas.getContext("2d"),
  width: 1728,
  height: 542,
  image: trumpImage,
  numberOfFrames: 4,
  ticksPerFrame: 4,
  x: canvas.width /2 - (0.5 * (trumpWidth/divisor)),
  y: canvas.height - (trumpHeight/divisor) -111,
  speed: trumpSpeed
});

function eat(){
  animate = true;
  rotations = 0;
}

// Load sprite sheet
trumpImage.addEventListener("load", gameLoop);
document.getElementById("start").addEventListener("click", eat);
trumpImage.src = "https://cloud.githubusercontent.com/assets/11725595/18814805/98ee9a44-8315-11e6-8dc4-10bb1d5c9f2c.png";
