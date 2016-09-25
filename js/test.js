var canvas = document.getElementById("canvas"),
    animate = false,
    rotations = 0,
    divisor = 5,
    continueAnimating = false,
    score = 0;


var trumpImage = new Image(),
    trumpHeight = 542,
    trumpWidth = 432,
    trumpSpeed = 10;

    trumpImage.src = "https://cloud.githubusercontent.com/assets/11725595/18814805/98ee9a44-8315-11e6-8dc4-10bb1d5c9f2c.png";

var dildoHeight = 100,
    dildoWidth = 50,
    totalDildos = 6,
    dildoImagesArray = [],
    activeDildos = [],
    dildoNames = ['Beads', 'Black', 'Circ', 'Green', 'Mex', 'Pink', 'Tur', 'Uncir', 'Yellow'];

  // draw dildos
 for (var i = 0; i < dildoNames.length; i++) {
   dildoImagesArray[i] = new Image();
   dildoImagesArray[i].src = './assets/' + dildoNames[i]+'.png';
 }

function random(min, max) {
  return Math.floor(Math.random() * (max-min) + min);
}

function gameLoop () {
  if (continueAnimating) {
    window.requestAnimationFrame(gameLoop);
    trump.render();
    trump.update();
  }
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
    // for each dildo
      // (1) check for collisions
      // (2) advance the dildo
      // (3) if the dildo falls below the canvas, end the game

      for (var i = 0; i < activeDildos.length; i++) {
        var dildo = activeDildos[i];
        // test for dildo-trump collision
        if (isColliding(dildo, trump)) {
            score += 10;
            eat();
            resetDildo(dildo);
        }
        // advance the dildo
        dildo.y += dildo.speed;

        // if the dildo hits the canvas,
        if (dildo.y + dildoHeight > canvas.height - 110) {
          continueAnimating = false;
        }
      }

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
      for (var i = 0; i < activeDildos.length; i++) {
          var dildo = activeDildos[i];
          dildo.onload = that.context.drawImage(dildoImagesArray[dildo.style] ,dildo.x,dildo.y, dildoWidth, dildoHeight);
      }
          that.context.font = "14px Times New Roman";
          that.context.fillStyle = "black";
          that.context.fillText("Score: " + score, 10, 15);
  };

  return that;
}

// Create sprite
var trump = sprite({
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

for (var i = 0; i < totalDildos; i++) {
  addDildo();
}

function addDildo() {
  var number = random(0,9);
  var dildo = {
    style: number,
    width: dildoWidth,
    height: dildoHeight
  };

  resetDildo(dildo);
  activeDildos.push(dildo);
}

function isColliding(a, b) {
    return !(
    b.x > a.x + a.width || b.x + (b.width/(4*divisor)) < a.x || b.y > a.y + a.height || b.y + b.height < a.y);
}

function resetDildo(dildo) {
  dildo.x = Math.random() * (canvas.width - dildoWidth);
  dildo.y = 0 - dildoHeight -20;
  dildo.speed = 0.2 + Math.random() * 0.5;
}

// Load sprite sheet
function start() {
  score = 0;
  for (var i = 0; i < activeDildos.length; i++) {
    resetDildo(activeDildos[i]);
  }
  // trump.render();
  if (!continueAnimating) {
    continueAnimating = true;
    gameLoop();
  }
}
