var playing = true;

document.addEventListener( 'visibilitychange' , function() {
    if (document.hidden) {
      playing = false;
    } else {
      playing = true;
    }
}, false );
