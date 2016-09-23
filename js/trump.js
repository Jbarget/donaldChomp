

var random = function(min, max) {
  return Math.floor(Math.random() * (max-min) + min);
};
//set up canvas defaults
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var continueAnimating = {
  game: false
};
var score = 0;
var keydown = false;

// draw dildos
var dildoNames = ['Beads', 'Black', 'Circ', 'Green', 'Mex', 'Pink', 'Tur', 'Uncir', 'Yellow'];
var dildoImagesArray = [];
for (var i = 0; i < dildoNames.length; i++) {
  dildoImagesArray[i] = new Image();
  dildoImagesArray[i].src = './assets/' + dildoNames[i]+'.png';
}

var trumpImg = new Image();
trumpImg.src = './trump.png';

var background = new Image();
background.src = './assets/Background.png';

var trumpHeight = 60;
var trumpWidth = 60;
var trumpSpeed = 10;

var trump = {
  x:0,
  y: canvas.height - trumpHeight -90,
  width: trumpWidth,
  height: trumpHeight,
  speed: trumpSpeed
};

var dildoHeight = 100;
var dildoWidth = 50;
var totalDildos = 6;
var activeDildos = [];

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

function resetDildo(dildo) {
  dildo.x = Math.random() * (canvas.width - dildoWidth);
  dildo.y = 15 + Math.random() * 30;
  dildo.speed = 0.2 + Math.random() * 0.5;
  console.log(dildo);
}

//left and right keypush event handlers
document.onkeydown = function (event) {
  if (event.keyCode == 39) {
    if (keydown) return;
    keydown = true;
    trump.x += trump.speed;
    if (trump.x + trump.width >= 398) {
      trump.x = 368;
    }
  } else if (event.keyCode == 37) {
    if (keydown) return;
    keydown = true;
    trump.x -= trump.speed;
    if (trump.x <= 0) {
      trump.x = 0;
    }
  }
};

document.onkeyup = function(event) {
  if (event.keyCode == 39) {
    keydown = false;
  } else if (event.keyCode == 37) {
    keydown = false;
  }
};

function animate(){
  if (continueAnimating.game) {
    requestAnimationFrame(animate);
}
// for each dildo
  // (1) check for collisions
  // (2) advance the dildo
  // (3) if the dildo falls below the canvas, reset that dildo

  for (var i = 0; i < activeDildos.length; i++) {
    var dildo = activeDildos[i];
    // test for dildo-trump collision
    if (isColliding(dildo, trump)) {
        score += 10;
        animateTrump();
        resetDildo(dildo);
    }
    // advance the dildo
    dildo.y += dildo.speed;

    // if the dildo hits the canvas,
    if (dildo.y + dildoHeight > canvas.height) {
      continueAnimating.game = false;
      alert("Game Over: " + score);
    }
  }

  function drawAll() {

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.onload = ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // draw the trump
    trumpImg.onload = ctx.drawImage(trumpImg, trump.x, trump.y, trumpWidth, trumpHeight);



    console.log(activeDildos);
    // draw all dildos
    for (var i = 0; i < activeDildos.length; i++) {
        var dildo = activeDildos[i];
        dildo.onload = ctx.drawImage(dildoImagesArray[dildo.style] ,dildo.x,dildo.y, dildoWidth, dildoHeight);
    }

    // draw the score
    ctx.font = "14px Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 15);
}

  // redraw everything
  drawAll();
}
function animateTrump() {
  trumpImg.src = './trump-open.png';
  setTimeout(function() {
    trumpImg.src = './trump.png';
  }, 1000);
}

function isColliding(a, b) {
    return !(
    b.x > a.x + a.width || b.x + b.width < a.x || b.y > a.y + a.height || b.y + b.height < a.y);
}

document.getElementById("start").addEventListener('click',function () {
    trump.x = 0;
    for (var i = 0; i < activeDildos.length; i++) {
        resetDildo(activeDildos[i]);
    }
    if (!continueAnimating.game) {
        continueAnimating.game = true;
        animate();
    }
});
