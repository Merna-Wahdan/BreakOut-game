window.addEventListener("load", (event) => {

class Paddle {
    constructor() {
        this.width = 10;
        this.height = 5;
        this.paddleX = 50 - this.width/2;
        this.paddleY = 0;

        this.createNewPaddle()
    }

    createNewPaddle() {
        this.paddleElm = document.createElement('div')
        this.paddleElm.classList.add('paddle')
        this.paddleElm.id = 'player'

        //Set position
        this.paddleElm.style.width = this.width + "vw"
        this.paddleElm.style.height = this.height + "vh"
        this.paddleElm.style.left = this.paddleX + "vw"
        this.paddleElm.style.bottom = this.paddleY+ "vh"

        const appendPaddle = document.getElementById("board")
        appendPaddle.appendChild(this.paddleElm)

    }


    setPositionBoundries() {
        if(this.paddleX <= 0) {
            this.paddleX = 0
        } else if (this.paddleX >= 100 - this.width) {
            this.paddleX = 100 - this.width
        }
    }

    moveLeft() {
            this.paddleX -= 10
            this.setPositionBoundries()
            this.paddleElm.style.left = this.paddleX + "vw"
        }
        
        
    moveRight() {
        this.paddleX += 10
        this.setPositionBoundries()
        this.paddleElm.style.left = this.paddleX + "vw"

    }

}

class Ball {
    constructor() {
        this.paddleX = 50 - ((paddle.width + 2)/8);
        this.paddleY = 10;

        this.createNewPaddle()
    }

    createNewPaddle() {
        this.ballElm = document.createElement('div')
        this.ballElm.id = 'ball'

        //Set position
        this.ballElm.style.width = this.width + "vw"
        this.ballElm.style.height = this.height + "vh"
        this.ballElm.style.left = this.paddleX + "vw"
        this.ballElm.style.bottom = this.paddleY+ "vh"

        const appendPaddle = document.getElementById("board")
        appendPaddle.appendChild(this.ballElm)

    }


    moveBall() {

    }
}

setInterval(() => {
    const ball = new Ball()
}, 1000)

const paddle = new Paddle()


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
