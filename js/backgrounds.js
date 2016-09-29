var startCanvas = document.getElementById("start-canvas"),
startContext = startCanvas.getContext("2d");

var backCanvas = document.getElementById("back-canvas"),
    backContext = backCanvas.getContext("2d");

var endCanvas = document.getElementById("end-canvas"),
    endContext = endCanvas.getContext("2d");

var startImg = new Image();
startImg.src = './assets/StartGame.png';
var gameOverImg = new Image();
gameOverImg.src = './assets/GameOver.png';
var backgroundImg = new Image();
backgroundImg.src = './assets/Background.png';


  startImg.onload = function(){
    startContext.drawImage(
      startImg,
      0,
      0
    );
  };

  gameOverImg.onload = function(){
    endContext.drawImage(
      gameOverImg,
      0,
      0
    );
  };

  backgroundImg.onload = function(){
    backContext.drawImage(
      backgroundImg,
      0,
      0
    );
  };
