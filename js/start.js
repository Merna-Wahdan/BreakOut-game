
const clickToStart = document.getElementById("clickToStart");
const options = document.getElementById("options")
const startSound = document.getElementById("startSound")
let isVisible = true;

startSound.play()
startSound.volume = 0.5;

setInterval(() => {
    isVisible = !isVisible;
    clickToStart.style.visibility = isVisible ? "visible" : "hidden";
    // options.style.visibility = isVisible ? "visible" : "hidden";
}, 500);

clickToStart.addEventListener("click", () => {
    location.href = "./game.html";
})

