var keydown;
//left and right keypush event handlers
document.onkeydown = function (event) {
  if (event.keyCode === 39) {
    if (keydown) return;
    moveDonaldRight();
  } else if (event.keyCode === 37) {
    if (keydown) return;
    moveDonaldLeft();
  } else if (event.keyCode === 32 && !continueAnimating) {
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
