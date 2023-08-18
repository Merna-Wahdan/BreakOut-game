window.addEventListener("load", (event) => {
  let body = document.getElementById("board");
  const boardWidth = 920;
  const boardHeight = 700;
  body.style.width = boardWidth + "px";
  body.style.height = boardHeight + "px";
  const boardPadding = 7;
  const boardMargin = 5;
  const ballDiameter = 20;
  //Ball horizontal & vertical velocity
  let ballDx = 3;
  let ballDy = -3;
  let increaseBallSpeed = false;
  const bricksColCount = 13;
  const bricksRowsCount = 8;
  const totalBricks = bricksColCount * bricksRowsCount;
  const brickWidth = 65;
  const brickHeight = 20;


  let mute = document.getElementById("mute");
  let audioElements = document.getElementsByTagName("audio");
  let isMuted = false;
  let paddleAudio = document.getElementById("paddleAudio");
  let hitWallAudio = document.getElementById("hitWallAudio");
  let brickHitAudio = document.getElementById("brickHitAudio");
  let gameOverAudio = document.getElementById("gameOverAudio");
  let youWonAudio = document.getElementById("youWonAudio");

  mute.addEventListener("click", () => {
    isMuted = !isMuted;

    for (const audioElement of audioElements) {
      audioElement.muted = isMuted;
    }

    mute.textContent = isMuted ? "🔊" : "🔇";
  });

  class Paddle {
    constructor() {
      this.width = 150;
      this.height = 15;
      this.paddleX = boardWidth / 2 - this.width / 2;
      this.paddleY = boardHeight - this.height - 5;
      this.speed = 70;

      this.createNewPaddle();
    }

    createNewPaddle() {
      this.paddleElm = document.createElement("div");
      this.paddleElm.classList.add("paddle");

      //Set position
      this.paddleElm.style.width = this.width + "px";
      this.paddleElm.style.height = this.height + "px";
      this.paddleElm.style.left = this.paddleX + "px";
      this.paddleElm.style.top = this.paddleY + "px";
      this.paddleElm.style.paddingTop = this.paddingTop;
      this.paddleElm.style.paddingLeft = this.paddingLeft;
      this.paddleElm.style.paddingRight = this.paddingRight;

      const appendPaddle = document.getElementById("board");
      appendPaddle.appendChild(this.paddleElm);
    }

    setPositionBoundries() {
      if (this.paddleX <= 0) {
        this.paddleX = 0;
      } else if (this.paddleX + this.width >= boardWidth) {
        this.paddleX = boardWidth - this.width;
      }
    }

    moveLeft() {
      this.paddleX -= this.speed;
      this.setPositionBoundries();
      this.paddleElm.style.left = this.paddleX + "px";
    }

    moveRight() {
      this.paddleX += this.speed;
      this.setPositionBoundries();
      this.paddleElm.style.left = this.paddleX + "px";
    }
  }

  class Ball {
    constructor() {
      this.ballX = boardWidth / 2 - ballDiameter / 2;
      this.ballY = boardHeight / 2 - ballDiameter / 2;
      this.createNewBall();
    }

    createNewBall() {
      this.ballElm = document.createElement("div");
      this.ballElm.id = "ball";

      //Set position

      this.ballElm.style.left = this.ballX + "px";
      this.ballElm.style.top = this.ballY + "px";

      const board = document.getElementById("board");
      board.appendChild(this.ballElm);
    }

    moveBall(x, y) {
      this.ballX = x;
      this.ballY = y;
      this.ballElm.style.left = x + "px";
      this.ballElm.style.top = y + "px";
    }

    resetBall() {
      ball.moveBall(
        boardWidth / 2 - ballDiameter / 2,
        boardHeight / 2 - ballDiameter / 2
      );
      ballDx = 3; // Reset horizontal velocity
      ballDy = -3; // Reset vertical velocity
      increaseBallSpeed = false; //reset speed to noraml
    }
  }

  class Brick {
    constructor(x, y, color) {
      this.width = brickWidth;
      this.height = brickHeight;
      this.brickX = x;
      this.brickY = y;
      this.color = color;

      this.createNewBrick();
    }

    createNewBrick() {
      this.brickElm = document.createElement("div");
      this.brickElm.classList.add("brick");
      //Set position
      this.brickElm.style.width = this.width + "px";
      this.brickElm.style.height = this.height + "px";
      this.brickElm.style.left = this.brickX + "px";
      this.brickElm.style.top = this.brickY + "px";
      this.brickElm.style.background = this.color;
      const board = document.getElementById("board");
      board.appendChild(this.brickElm);
    }
  }

  class Score {
    constructor() {
      this.hits = 0;
    }

    increaseScore() {
      this.hits += 1;
      document.getElementById("hits").innerHTML = this.hits;
    }
  }

  class Heart {
    constructor() {
      this.heart = ["♡", "♡", "♡"];
      this.gameOverModal = document.getElementsByClassName("modal")[0];
      this.gameWonModal = document.getElementsByClassName("modal")[1];
      this.updateHeartDisplay();
    }

    decreaseHeart() {
      this.heart.pop();
      this.updateHeartDisplay();
      this.checkGameOver;
    }

    updateHeartDisplay() {
      const heartDisplay = this.heart.join(" ");
      document.getElementById("count").innerHTML = heartDisplay;
    }

    showGameOverModal() {
      this.gameOverModal.style.display = "flex";
      const restartGame = document.getElementById("restart");
      restartGame.addEventListener("click", () => {
        document.location.reload();
        clearInterval(interval);
      });

    }

    showGameWonModal() {
      this.gameWonModal.style.display = "flex";
      const playAgain = document.getElementById("playAgain");
      playAgain.addEventListener("click", () => {
        document.location.reload();
        clearInterval(interval);
      });
    }
  }

  const paddle = new Paddle();

  const ball = new Ball();

  const score = new Score();
  const heart = new Heart();

  let updatesSinceLastBounce = 0;

  const bricks = [];
  const colors = [
    "#F94144",
    "#F3722C",
    "#F8961E",
    "#F9844A",
    "#F9C74F",
    "#90BE6D",
    "#43AA8B",
    "#4D908E",
  ];

  for (let i = 0; i < bricksColCount; i++) {
    for (let j = 0; j < bricksRowsCount; j++) {
      const bX = i * (brickWidth + 5.5) + boardMargin;
      const bY = j * (brickHeight + 5) + boardPadding;
      const brick = new Brick(bX, bY, colors[j]);
      bricks.push(brick);
    }
  }

  const interval = setInterval(() => {
    updatesSinceLastBounce++;
    ball.moveBall(ball.ballX, ball.ballY);
    ball.ballX += ballDx;
    ball.ballY += ballDy;

    if (
      ball.ballX - ballDiameter / 2 < 0 ||
      ball.ballX + ballDiameter + 10 / 2 > boardWidth
    ) {
      ballDx = -ballDx;

      hitWallAudio.play();
    }

    if (ball.ballY < 0) {
      ballDy = -ballDy;
    } else if (ball.ballY + ballDiameter >= boardHeight) {
      ballDy = -ballDy;
      heart.decreaseHeart();
      ball.resetBall();
      if (heart.heart.length === 0) {
        heart.showGameOverModal();
        gameOverAudio.play()
        clearInterval(interval);
      }
        }

    // Collision detection loop where the ball hits the paddle
    if (
      ball.ballX + ballDiameter >= paddle.paddleX &&
      ball.ballX <= paddle.paddleX + paddle.width &&
      ball.ballY + ballDiameter >= paddle.paddleY &&
      ball.ballY <= paddle.paddleY + paddle.height &&
      updatesSinceLastBounce > 15
    ) {
      ballDy = -ballDy;
      updatesSinceLastBounce = 0;

      paddleAudio.play();
    }

    for (let i = 0; i < bricks.length; i++) {
      const brick = bricks[i];

      if (
        ball.ballX + ballDiameter > brick.brickX &&
        ball.ballX < brick.width + brick.brickX &&
        ball.ballY + ballDiameter > brick.brickY &&
        ball.ballY < brick.height + brick.brickY
      ) {
        ballDy = -ballDy;
        brickHitAudio.play();
        brickHitAudio.volume = 0.3;

        score.increaseScore();

        brick.brickElm.remove();
        bricks.splice(i, 1);
        if (score.hits >= 10 && score.hits % 10 === 0) {
          if (ballDx > 0) {
            ballDx += 1;
          } else {
            ballDx -= 1;
          }

          if (ballDy > 0) {
            ballDy += 1;
          } else {
            ballDy -= 1;
          }
          increaseBallSpeed = true;
          console.log("x", ballDx);
          console.log("y", ballDy);
        }
      }
    }

    if (score.hits === totalBricks) {
      heart.showGameWonModal();
      youWonAudio.play()
      clearInterval(interval);
    }

  }, 10);

  document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowRight") {
      paddle.moveRight();
    } else if (e.code === "ArrowLeft") {
      paddle.moveLeft();
    }
  });
});
