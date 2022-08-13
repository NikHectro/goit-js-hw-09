
const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const body = document.body;
let timerId = null;

stopBtn.setAttribute("disabled", true);

startBtn.addEventListener('click', () => {
    startBtn.setAttribute("disabled", true);
    stopBtn.removeAttribute("disabled");
    timerId = setInterval(onStart, 1000)
});
stopBtn.addEventListener('click', onStop);

function onStart() {
    body.style.backgroundColor = getRandomHexColor();
}

function onStop() {
    startBtn.removeAttribute("disabled")
    stopBtn.setAttribute("disabled", true);
    clearInterval(timerId)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}