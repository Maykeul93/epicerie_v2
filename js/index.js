let handElement = document.querySelector(".container__hand")
let transitionElement = document.querySelector(".container__transition")
let textElement = document.querySelector(".container__text")
let oldTitleElement = document.querySelector(".title__first")
let newTitleElement = document.querySelector(".title__second")

window.setTimeout(() => {
    handElement.style.display = "none";
    transitionElement.style.display = "block"
}, 2000);

window.setTimeout(() => {
    transitionElement.style.display = "none";
}, 4000);

window.setTimeout(() => {
    newTitleElement.style.visibility = "visible";
}, 6000);

let canvasElement  = document.getElementById('canvas')

window.setTimeout(() => {
    canvasElement.style.display = "block";
}, 6500);