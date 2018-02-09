var dx = 5;
var dy = 5;
var x = 25;
var y = 25;
var WIDTH = 592;
var HEIGHT = 592;
var img = new Image();
img.crossOrigin = '';
var collision = 0;
var maze = [
  "https://78.media.tumblr.com/da9256fe53c097a2f2591ae6ffc0b6d0/tumblr_p3sy89MwzO1u9sue7o1_1280.gif",
  "https://78.media.tumblr.com/bad696c3db3dcaff9896684db2db4086/tumblr_p3sy89MwzO1u9sue7o2_1280.gif",
  "https://78.media.tumblr.com/b1d7850d60ec273490ea1ce0ea452c87/tumblr_p3sy89MwzO1u9sue7o5_1280.gif",
  "https://78.media.tumblr.com/32c82c84c949baa70e5dcc6319c1267e/tumblr_p3sy89MwzO1u9sue7o7_1280.gif",
  "https://78.media.tumblr.com/a5805598c706bea9ef01aa79689ffaab/tumblr_p3sy89MwzO1u9sue7o3_1280.gif",
  "https://78.media.tumblr.com/2b623b7de8d9fda64453d79d03347b9d/tumblr_p3sy89MwzO1u9sue7o4_1280.gif",
  "https://78.media.tumblr.com/af1e347892663cdd75465783fb76456c/tumblr_p3sy89MwzO1u9sue7o6_1280.gif"
];

var soundTrack = new Audio("music.mp3");
soundTrack.loop = true;
soundTrack.play();

// var modal = getElementsByClassName('modal');



function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();


}  

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.drawImage(img, 0, 0);
}

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  var random = Math.floor(Math.random() * 7);
  console.log("random", random);
  img.src = maze[random];
  // return setInterval(draw, 10);
  return handle;
}

var handle = setInterval(function(){
  draw();
}, 10);


function doKeyDown(evt){
  switch (evt.keyCode) {

    //Up arrow key is pressed
    case 38:
    case 87: 
    if (y - dy > 0){

      y -= dy;
      clear();
      checkCollision();
      endGame();
      console.log("X: " + x + " and Y: " + y);
      if (collision == 1){
        y += dy;
        collision = 0;
      }
    }
    break;

    // Down arrow key is pressed
    case 40:
    case 83: 
    if (y + dy < HEIGHT){
      y += dy;
      clear();
      checkCollision();
      endGame();
      console.log("X: " + x + " and Y: " + y);
      if (collision == 1){
        y -= dy;
        collision = 0;
      }
    }
    break;
    
    //Left arrow key is pressed 
    case 37: 
    case 65:
    if (x - dx > 0){
      x -= dx;
      clear();
      checkCollision();
      endGame();
      console.log("X: " + x + " and Y: " + y);
      if (collision == 1){
        x += dx;
        collision = 0;
      }
    }
    break;

    // Right arrow was pressed
    case 39:
    case 68: 
    if ((x + dx < WIDTH)){
      x += dx;
      clear();
      checkCollision();
      endGame();
      console.log("X: " + x + " and Y: " + y);
      if (collision == 1){
        x -= dx;
        collision = 0;
      }
    }
    break;  
  }
}

// Checking collision

function checkCollision() {
  var imgd = ctx.getImageData(x, y, 15, 15);
  var pix = imgd.data;
  // console.log("Im in collision")
  for (var i = 0; n = pix.length, i < n; i += 4) {
    if (pix[i] == 0) {
      collision = 1;
    }
  } 
}


function endGame() {
  if (( x > 553) && (y >553)) {
    $('#modal-win').modal('show');
    

  }
}

function draw() {
  clear();
  ctx.fillStyle = "green";
  rect(x, y, 15,15);
  ctx.fillStyle = "black";
  rect(553,553,15,15);
}

init();
window.addEventListener('keydown',doKeyDown,true);  

//Timer coding 

document.getElementById('timer').innerHTML =
  02 + ":" + 30;
startTimer();

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s == 59){
    m = m - 1
  } 
  
  if ( m == 0 && s == 0 ){
    
    document.getElementById('timer').innerHTML =
    m + ":00";  
    $('.modal').modal('show');
    return s = 0;
    return m = 0;
    
  }

  //if(m<0){alert('timer completed')}
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  setTimeout(startTimer, 1000);
  // clearInterval(handle);
}

function checkSecond(sec) {
  // add zero in front of numbers < 10
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec
  } else if (sec < 0) {
    sec = "59"
  }
    return sec;
}
// End of Timer Ending