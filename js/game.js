
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
    }
}


const paddle = new Paddle()
paddle.draw(150)