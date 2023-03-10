const canvas = document.querySelector(".bloody__canvas");
const ctx = canvas.getContext("2d");

const bloodyDiv = document.querySelector('.bloody');
const bloodBtn = document.querySelector('.bloody__stop');

const header = document.querySelector('.header');
header.style.height = `${window.innerHeight}px`;
bloodyDiv.style.height = `${window.innerHeight}px`;

let height, width;

function createCanvas() {
    height = window.innerHeight + 400;
    width = window.innerWidth;
    canvas.height = height;
    canvas.width = width;
}
createCanvas();

class Blood {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.x2 = x;
        this.y = y;
        this.y2 = y;
        this.radius = radius;
        this.speed = speed;
    }

    drawBlood() {
        ctx.beginPath();
        ctx.arc(this.x2, this.y2, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = 'rgb(177, 12, 12, 0.5)';
        ctx.fill();
    }
}

let myReq;
const animate = (drips, animationName) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.002)';
    ctx.fillRect(0, 0, width, height);
    drips.forEach(drip => {
        const direction = Math.random() * 2 - 1;
        drip.y2 += drip.speed;
        drip.x2 += direction;
        if (drip.y2 >= height) {
            drip.y2 = drip.y;
            drip.x2 = drip.x;
        }
        drip.drawBlood();
    })
    clearInterval(animationName);
    drips.myReq = requestAnimationFrame(function () { animate(drips) });
}

let allDrips, firstDrips, secondDrips;
function createBlood() {

    const setX = () => Math.random() * width;
    const setY = () => Math.random() * -1000;
    const setRadius = () => Math.random() * 8;
    const setSpeed = () => Math.random() * 3.5;

    allDrips = [];
    firstDrips = [
        new Blood(width / 3, 0, 4, .5),
        new Blood(width / 2, 0, 2, .5)
    ]
    secondDrips = [
        new Blood(width / 4, 0, 4, .5),
        new Blood(width - width / 3, 0, 5, .5)
    ]

    let i = 0;
    while (i < width / 8) {
        allDrips.push(new Blood(setX(), setY(), setRadius(), setSpeed()));
        i++;
    }
};
createBlood();

let firstDripsDelay, secondDripsDelay, allDripsDelay;
function bleed() {
    firstDripsDelay = setInterval(function () { animate(firstDrips, firstDripsDelay) }, 1000);
    secondDripsDelay = setInterval(function () { animate(secondDrips, secondDripsDelay) }, 4000);
    allDripsDelay = setInterval(function () { animate(allDrips, allDripsDelay) }, 9000);
}
bleed();

function startBlood() {
    ctx.clearRect(0, 0, width, height);
    createCanvas();
    canvas.style.display = 'block';
    createBlood();
    bleed();
    bloodBtn.innerText = 'Stop the blood!';
}

function stopBlood() {
    cancelAnimationFrame(firstDrips.myReq);
    cancelAnimationFrame(secondDrips.myReq);
    cancelAnimationFrame(allDrips.myReq);
    canvas.style.display = 'none';
    bloodBtn.innerText = 'Make it bleed';
}

let clicked = false;
bloodBtn.addEventListener('click', () => {
    if (clicked === true) startBlood();
    else stopBlood();
    clicked = clicked === false ? true : false;
})

window.addEventListener('resize', () => {
    if (height !== bloodyDiv.offsetHeight + 400 || width !== bloodyDiv.offsetWidth) {
        setTimeout(() => {
            stopBlood();
            clearInterval(firstDripsDelay);
            clearInterval(secondDripsDelay);
            clearInterval(allDripsDelay);
            createCanvas();
            startBlood();
        }, 2000)
    }
})
