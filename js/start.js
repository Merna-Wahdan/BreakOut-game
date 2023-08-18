const clickToStart = document.getElementById("clickToStart");
const clickStart = document.getElementById("clickStart")
const instructions = document.getElementById("instructions")

let isVisible = true;


// setInterval(() => {
//     isVisible = !isVisible;
//     clickToStart.style.visibility = isVisible ? "visible" : "hidden";
// }, 500);

clickToStart.addEventListener("click", () => {
    clickStart.play()

    setTimeout(() => {
        location.href = "./game.html";

    }, 400) 
})