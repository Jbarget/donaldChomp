var keydown;
//left and right keypush event handlers
document.onkeydown = function (event) {
  if (event.keyCode === 39) {
    if (keydown) return;
    keydown = true;
    trump.x += trump.speed;
    if (trump.x + (trump.width/ 4) >= 360) {
      trump.x = 360 - (trump.width/4);
    }
  } else if (event.keyCode === 37) {
    if (keydown) return;
    keydown = true;
    trump.x -= trump.speed;
    if (trump.x <= 0) {
      trump.x = 0;
    }
  } else if (event.keyCode === 32 && !continueAnimating) {
    document.getElementById('info').style.display = 'none';
    start();

  }
};

document.onkeyup = function(event) {
  if (event.keyCode === 39) {
    keydown = false;
  } else if (event.keyCode === 37) {
    keydown = false;
  }
};
