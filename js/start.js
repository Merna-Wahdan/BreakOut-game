const clickToStart = document.getElementById("clickToStart");
const clickStart = document.getElementById("clickStart");
const instructions = document.getElementById("instructions");

let isVisible = true;

clickToStart.addEventListener("click", () => {
  clickStart.play();

  setTimeout(() => {
    location.href = "./game.html";
  }, 400);
});