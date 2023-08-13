
const canvas = document.getElementById('breakOut')
const cTxt = canvas.getContext("2d")



class Paddle {
    constructor() {
        this.width = 90
        this.height = 50
        this.y = 490
    }

    draw(x) {
        cTxt.beginPath();
        cTxt.fillStyle = "red";
        cTxt.fillRect(x, this.y, this.width, this.height)
        cTxt.stroke();
        cTxt.closePath();
    }
}

class Ball {
    constructor() {
        this.r = 15
        this.x = canvas.width/2 
        // this.y = canvas.height - this.r - paddle.height
        this.y = paddle.y - this.r
    }

    draw() {
        cTxt.beginPath();
        cTxt.arc(this.x, this.y, this.r, 0, Math.PI*2);
        cTxt.fillStyle = "green"
        cTxt.fill()
        cTxt.stroke()
        cTxt.closePath()
    }
}

const paddle = new Paddle()
paddle.draw(canvas.width/2 - paddle.width/2)

const ball = new Ball()
ball.draw()
