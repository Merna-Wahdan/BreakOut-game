
const clickToStart = document.getElementById("clickToStart");
const clickStart = document.getElementById("clickStart")


let isVisible = true;
let isRedirecting = false;


setInterval(() => {
    isVisible = !isVisible;
    clickToStart.style.visibility = isVisible ? "visible" : "hidden";
}, 500);

clickToStart.addEventListener("click", () => {
    clickStart.play()

    setTimeout(() => {
        location.href = "./game.html";

    }, 400) 
})













// startSound.play()
// startSound.volume = 0.5;

// const options = document.getElementById("options")
// options.style.visibility = isVisible ? "visible" : "hidden";
