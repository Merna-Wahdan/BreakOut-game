const canvas = document.getElementById("breakOut");
const cTxt = canvas.getContext("2d");

class Paddle {
  constructor() {
    this.width = 90;
    this.height = 50;
    this.y = 490;
  }

  draw(x) {
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
    // this.y = canvas.height - this.r - paddle.height
    //this.y = paddle.y - this.r
  }

  draw(x, y) {
    cTxt.beginPath();
    cTxt.arc(x, y, this.r, 0, Math.PI * 2);
    cTxt.fillStyle = "green";
    cTxt.fill();
    cTxt.stroke();
    cTxt.closePath();
  }
}

const paddle = new Paddle();

const ball = new Ball();
let ballX = canvas.width / 2;
let ballY = paddle.y - ball.r;

setInterval(() => {
  cTxt.clearRect(0, 0, canvas.width, canvas.height);

  paddle.draw(canvas.width / 2 - paddle.width / 2);
  ball.draw(ballX, ballY);
  ballX += 3;
  ballY -= 3;
}, 10);




// document.addEventListener("keydown", (e) => {
//     if(e.code === 'Space') {
//         setInterval(() => {
//             ball.draw(canvas.width/2, paddle.y - ball.r)
//         }, 10)
//     }
// })
