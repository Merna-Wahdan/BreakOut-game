
const clickToStart = document.getElementById("clickToStart");
const options = document.getElementById("options")
let isVisible = true;

setInterval(() => {
    isVisible = !isVisible;
    clickToStart.style.visibility = isVisible ? "visible" : "hidden";
    // options.style.visibility = isVisible ? "visible" : "hidden";
}, 500);

clickToStart.addEventListener("click", () => {
    location.href = "./game.html";

})