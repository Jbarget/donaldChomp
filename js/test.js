var canvas = document.getElementById("canvas"),
    animate = false,
    rotations = 0,
    continueAnimating = false,
    score = 0;


var trumpImage = new Image(),
    trumpHeight = 97,
    trumpWidth = 86.5,
    trumpSpeed = 10;

    trumpImage.src = "./assets/TrumpSmall.png";

var totalDildos = 1,
    dildoImagesArray = [],
    activeDildos = [],
    dildoNames = [
      {name: 'Beads', width: 29, height: 150},
      {name:'Black', width: 62, height: 160 },
      {name:'Green', width: 38, height: 300 },
      {name:'Mex', width: 84, height: 150 },
      {name:'Pink', width: 52, height: 145 },
      {name:'Red', width: 70, height: 150 },
      {name:'Tur', width: 72, height: 150 },
      {name:'Yellow', width: 75, height: 150 }
    ];

  // draw dildos
 for (var i = 0; i < dildoNames.length; i++) {
   dildoImagesArray[i] = {
     image: new Image(),
     dims: {
       w: dildoNames[i].width,
       h: dildoNames[i].height
     }
   };
   dildoImagesArray[i].image.src = './assets/' + dildoNames[i].name +'.png';
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
        if (dildo.y + dildo.height > canvas.height - 110) {
          continueAnimating = false;
          //show end screen
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
      (that.width / numberOfFrames),
      that.height);
      for (var i = 0; i < activeDildos.length; i++) {
        var dildo = activeDildos[i];
        dildo.onload = that.context.drawImage(dildoImagesArray[dildo.style].image ,dildo.x,dildo.y, dildoImagesArray[dildo.style].dims.w, dildoImagesArray[dildo.style].dims.h);
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
  width: 346,
  height: 97,
  image: trumpImage,
  numberOfFrames: 4,
  ticksPerFrame: 4,
  x: canvas.width /2 - (0.5 * (trumpWidth)),
  y: canvas.height - trumpHeight -110,
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
  console.log('hello adding dild');
  var number = random(0,8);
  var dildo = {
    style: number,
    width: dildoImagesArray[number].dims.w,
    height: dildoImagesArray[number].dims.h
  };

  resetDildo(dildo);
  activeDildos.push(dildo);
}

function isColliding(a, b) {
  return !(
  b.x > a.x + a.width || b.x + (b.width/4) < a.x || b.y + 15 > a.y + a.height || b.y + b.height < a.y);
}

function resetDildo(dildo) {
  dildo.style = random(0,8);
  dildo.width = dildoImagesArray[dildo.style].dims.w;
  dildo.height = dildoImagesArray[dildo.style].dims.h;
  dildo.x = Math.random() * (canvas.width - dildo.width);
  dildo.y = 0 - dildo.height -20;
  dildo.speed = 0.2 + Math.random() * 0.5;
}

// Load sprite sheet
function start() {
  setInterval(addDildo, 10000);
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
