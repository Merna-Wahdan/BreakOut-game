const canvas = document.getElementById("breakOut");
const cTxt = canvas.getContext("2d");

/*
TODO 3:
Fix: I can't increase the height

*/
class Paddle {
  constructor() {
    this.width = 200;
    this.height = 20;
    this.y = 580;
  }

  draw(x) {
    // this.x = x
    cTxt.beginPath();
    cTxt.fillStyle = "red";
    cTxt.fillRect(x, this.y, this.width, this.height);
    cTxt.stroke();
    cTxt.closePath();
  }
}

class Ball {
  constructor() {
    this.r = 15;
    //this.x = canvas.width/2
    //this.y = paddle.y - this.r
  }

  draw(x, y) {
    cTxt.beginPath();
    cTxt.arc(x, y, this.r, 0, Math.PI * 2);
    cTxt.fillStyle = "red";
    cTxt.fill();
    cTxt.stroke();
    cTxt.closePath();
  }
}

const breakWidth = 100;
const breakHeight = 30;
const bricksColCount = 9;
const bricksRowsCount = 3;
const totalBricks = bricksColCount * bricksRowsCount

class Break {
  constructor() {
    this.width = breakWidth;
    this.height = breakHeight;
    this.hit = false
  }

  draw(x, y) {
    this.x = x
    this.y = y
    cTxt.beginPath();
    cTxt.fillStyle = "black";
    cTxt.fillRect(x, y, this.width, this.height);
    cTxt.stroke();
    cTxt.closePath();
  }
}

class Score {
  constructor() {
    this.score = 0
  }

}


const paddle = new Paddle();
const ball = new Ball();
const score = new Score();

let breaks = [];

for (let i = 0; i < bricksColCount; i++) {
  breaks[i] = []
  for(let j = 0; j < bricksRowsCount; j++) {
    const singleBreak = new Break();
    breaks[i][j] = singleBreak
  }
  
}

let paddleX = canvas.width / 2 - paddle.width / 2;
let paddleDx = 50;

let ballX = canvas.width / 2;
let ballY = paddle.y - ball.r;
let ballDx = 3;
let ballDy = -3;

//let score = 0

console.log(breaks)

//let breaksX = canvas.width / 90;

const interval = setInterval(() => {
  cTxt.clearRect(0, 0, canvas.width, canvas.height);

  paddle.draw(paddleX);
  ball.draw(ballX, ballY);


  for (let i = 0; i < bricksColCount; i++) {
    for (let j = 0; j < bricksRowsCount; j++){
      let b = breaks[i][j]
      let bX = i * (b.width + 10) + 10
      let bY = j * (b.height + 10) + 10
      if(b.hit === false) {
        b.draw(bX, bY);        
      }
  }
  }
  

  ballX += ballDx;
  ballY += ballDy;

  if (ballX + ballDx - ball.r <= 0 || ballX + ballDx + ball.r >= canvas.width) {
    ballDx = -ballDx;
  }

  if (paddleX <= 0) {
    paddleX = 0;
  } else if (paddleX + paddle.width > canvas.width) {
    paddleX = canvas.width - paddle.width;
  }

  if (ballY + ballDy - ball.r <= 0) {
    ballDy = -ballDy;
  } 



  /*
  TODO 2:
  fix game over when the ball touch the bottom.
  now: the ball collision starts when reach the paddle top height
  */
  if (ballY + ballDy + ball.r >= canvas.height ) { //- paddle.height > the 
    if (ballX > paddleX && ballX < paddleX + paddle.width) {
      ballDy = -ballDy;
    } else {
      alert("You lost");
      document.location.reload();
      clearInterval(interval);
    }
  }

for(let i = 0; i < bricksColCount; i++) {
  for(let j = 0; j < bricksRowsCount; j++) {
    let b = breaks[i][j] 
    if(ballX > b.x && ballX < b.width + b.x && ballY  > b.y && ballY  < b.y + breakHeight && !b.hit ) {
      b.hit = true 
      //score.score++
      console.log(score.score)
      ballDy = -ballDy;
      score.score++

      if(score.score === totalBricks) {
        alert("You won");
        document.location.reload();
        clearInterval(interval);
    }
    } 
    }
  }

  /*
  TODO 4:
  bug: you won appears when hits the last brick 
  fix: you won appears after hitting the last brick 
  */

//   if(score.score === totalBricks) {
//     alert("You won");
//     document.location.reload();
//     clearInterval(interval);
// }
 
}, 10);

/* 
TODO 1:
Flicker is happening: will fix it later.
*/
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    paddleX -= paddleDx;
  } else if (e.key === "ArrowRight") {
    paddleX += paddleDx;
  }

});
