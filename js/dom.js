window.addEventListener("load", (event) => {

    let body = document.getElementById('board')
    const boardWidth = 700;
    const boardHeight = 700;
    const ballDiameter = 30;
    const bricksColCount = 7;
    const bricksRowsCount = 3;
    const totalBricks = bricksColCount * bricksRowsCount
    const brickWidth = 85;
    const brickHeight = 30;
    
    
    class Paddle {
        constructor() {
            this.width = 120;
            this.height = 20;
            this.paddleX = boardWidth / 2 - this.width / 2;
            this.paddleY = boardHeight - this.height - 5;
            this.speed = 50
    
            this.createNewPaddle()
        }
    
        createNewPaddle() {
            this.paddleElm = document.createElement('div')
            this.paddleElm.classList.add('paddle')
            // this.paddleElm.id = 'player'
    
            //Set position
            this.paddleElm.style.width = this.width + "px"
            this.paddleElm.style.height = this.height + "px"
            this.paddleElm.style.left = this.paddleX + "px"
            this.paddleElm.style.top = this.paddleY + "px"
    
            const appendPaddle = document.getElementById("board")
            appendPaddle.appendChild(this.paddleElm)
    
        }
    
    
        setPositionBoundries() {
            if(this.paddleX <= 0) {
                this.paddleX = 0
            } else if (this.paddleX + this.width >= boardWidth) {
                this.paddleX = boardWidth - this.width
            }
        }
    
        moveLeft() {
                this.paddleX -= this.speed
                this.setPositionBoundries()
                this.paddleElm.style.left = this.paddleX + "px"
            }
            
            
        moveRight() {
            this.paddleX += this.speed
            this.setPositionBoundries()
            this.paddleElm.style.left = this.paddleX + "px"
    
        }
    
    }
    
    class Ball {
        constructor() {
            this.ballX = boardWidth / 2 - paddle.width / 8 ;
            this.ballY = paddle.height + 15;
    
            this.createNewBall()
        }
    
        createNewBall() {
            this.ballElm = document.createElement('div')
            this.ballElm.id = 'ball'
    
            //Set position
    
            this.ballElm.style.left = this.ballX + "px"
            this.ballElm.style.bottom = this.ballY + "px"
    
            const board = document.getElementById("board")
            board.appendChild(this.ballElm)
    
        }
    
    
        moveBall(x, y) {
            this.ballElm.style.left = x + "px"
            this.ballElm.style.bottom = y + "px"
        }
    }
    
    class Brick {
        constructor(x, y) {
            this.width = brickWidth;
            this.height = brickHeight;
            this.brickX = x;
            this.brickY = y;
    
            this.createNewBrick()
        }
    
        createNewBrick() {
            this.brickElm = document.createElement('div')
            this.brickElm.classList.add('brick')
            //Set position
            this.brickElm.style.width = this.width + "px"
            this.brickElm.style.height = this.height + "px"
            this.brickElm.style.left = this.brickX + "px"
            this.brickElm.style.top = this.brickY + "px"
            const board = document.getElementById("board")
            board.appendChild(this.brickElm)
    
        }
    }
    const paddle = new Paddle()
    
    const ball = new Ball()

const bricks = []

for(let i = 0; i < bricksColCount; i++) {
    for(let j = 0; j < bricksRowsCount; j++) {
        const bX = i * (brickWidth+ 10) + 10
        const bY = j * (brickHeight + 5) + 10
        const brick = new Brick(bX, bY)
        bricks.push(brick)

    }
}
    
    let ballDx = 2;
    let ballDy = 2;
    
    
    const interval = setInterval(() => {
    
        ball.moveBall(ball.ballX, ball.ballY)
        ball.ballX += ballDx
        ball.ballY += ballDy
    
        if (ball.ballX + ballDx <= 0 || ball.ballX + ballDx + ballDiameter >= boardWidth) {
            ballDx = -ballDx;
          }
        
          if (ball.ballY + ballDy + ballDiameter >= boardHeight) {
            ballDy = -ballDy;
          } 
    
          if (ball.ballY + ballDy <= 0 ) {
            if (ball.ballX > paddle.paddleX && ball.ballX < paddle.paddleX + paddle.width) {
              ballDy = -ballDy;
            } else {
              alert("You lost");
              document.location.reload();
              clearInterval(interval);
            }
          }

          
    }, 1)
    
    
    
    document.addEventListener("keydown", (e) => {
        if(e.code === "ArrowRight") {
            paddle.moveRight()
        } else if(e.code === "ArrowLeft") {
            paddle.moveLeft()
        }
    })
    
    });
    
    
    
    // class Paddle {
    //     constructor() {
    //         this.width = 90
    //         this.height = 50
    //         this.paddleY = 490
    //     }
    // }
    
    
    
    
    
    
    
    // class Score {
    //     constructor() {
    //       this.score = 0
    //     }
      
    
    // //   }
    // const score = new Score();
    