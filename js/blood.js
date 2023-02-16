const canvas = document.querySelector(".bloody__canvas");
const ctx = canvas.getContext("2d");

const bloodyDiv = document.querySelector('.bloody');
const stopBlood = document.querySelector('.bloody__stop');
const height = bloodyDiv.offsetHeight;
const width = bloodyDiv.offsetWidth;
console.log(height, width)
canvas.height = height;
canvas.width = width;

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
        ctx.fillStyle = 'rgb(177, 12, 12)';
        ctx.fill();
    }
}

const setX = () => Math.random() * width;
const setY = () => Math.random() * -1000;
const setRadius = () => Math.random() * 10;
const setSpeed = () => Math.random() * 3.5;

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
    while (i < width / 10) {
        allDrips.push(new Blood(setX(), setY(), setRadius(), setSpeed()));
        i++;
    }
};
createBlood();

function bleed() {
    const firstDripsDelay = setInterval(function () { animate(firstDrips, firstDripsDelay) }, 1000);
    const secondDripsDelay = setInterval(function () { animate(secondDrips, secondDripsDelay) }, 4000);
    const allDripsDelay = setInterval(function () { animate(allDrips, allDripsDelay) }, 9000);
}
bleed();

let clicked = false;
stopBlood.addEventListener('click', () => {
    if (clicked === true) {
        ctx.clearRect(0, 0, width, height);
        canvas.style.display = 'block';
        createBlood();
        bleed();
        stopBlood.innerText = 'Stop the blood!';

    } else {
        cancelAnimationFrame(firstDrips.myReq);
        cancelAnimationFrame(secondDrips.myReq);
        cancelAnimationFrame(allDrips.myReq);
        canvas.style.display = 'none';
        stopBlood.innerText = 'Make it bleed';
    }
    clicked = clicked === false ? true : false;
    console.log('clicked: ', clicked);

})
