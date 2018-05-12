let canvas;
let ctx;

let butterflyImage = new Image();
butterflyImage.src = "butterfly.png";

let raindropsImage = new Image();
raindropsImage.src = "raindrop.png";

let dustImage = new Image();
dustImage.src = "fairydust.png";

let backgroundImage = new Image();
backgroundImage.src = "forestfantasy.jpg";

let backgroundX, backgroundY;
backgroundX = backgroundY = 0;

let x, y, width, height;
x = 10;
y = 10;
width = 60;
height = 60;
let speed = 3;

let badX, badY, badWidth, badHeight;
badX = 0;
badY = 0;
badWidth = 40;
badHeight = 40;
let badSpeed = 3;

let dustX, dustY, dustWidth, dustHeight;
dustX = 0;
dustY = 0;
dustWidth = 40;
dustHeight = 40;

let score = 0;

let keys = [];

window.onkeydown = (event) => {
    keys[event.key] = true;
}

window.onkeyup = (event) => {
    keys[event.key] = false;
}

const startGame = () => {
    canvas = document.getElementById("gc");
    ctx = canvas.getContext("2d");

    let fps = 1000 / 100;
    window.setInterval(update, fps);
}

const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    moveGoodGuy();
    moveBadGuy();
    moveDust();


    // if(checkCollisions(width, height, x, y, badWidth, badHeight, badX, badY)) {
    //     // Game over
    // }
    if(checkCollisions(width, height, x, y, dustWidth, dustHeight, dustX, dustY)) {
        repositionDust();
        score += 5;
    }

    drawScore();
}

function drawBackground() {

    ctx.drawImage(backgroundImage, backgroundX, backgroundY, canvas.width, canvas.height);

}

const moveGoodGuy = () => {

    if(keys["ArrowRight"] == true)
        x++;
    
    if(keys["ArrowLeft"] == true)
        x--;

    if(keys["ArrowUp"] == true)
        y--;

    if(keys["ArrowDown"] == true)
        y++;

    ctx.drawImage(butterflyImage, x, y, width, height);
}

const moveBadGuy = () => {
    badY+=2;

    if (badY > 280) {
        repositionBadGuy();
    }

    ctx.drawImage(raindropsImage, badX, badY, badWidth, badHeight);
}

const moveDust = () => {

    // dustY++;

    if(dustY > 300) {
        repositionDust();
    }

    // ctx.fillStyle = "red";
    // ctx.fillRect(badX, badY, badWidth, badHeight);
    ctx.drawImage(dustImage, dustX, dustY, dustWidth, dustHeight);
}

function drawScore() {
    ctx.fillStyle = "purple";
    ctx.font = "14px Tahoma";
    ctx.fillText("Score: " + score, 10, 20);
}

function repositionBadGuy() {
    badY = 0;
    badX = Math.random() * 280;
}

function repositionDust() {
    dustY = Math.random() * 280;
    dustX = Math.random() * 280;
}

function checkCollisions(rect1Width, rect1Height, rect1XPos, rect1YPos, rect2Width, rect2Height, rect2XPos, rect2YPos) {
     if (rect1XPos < rect2XPos + rect2Width && rect1XPos + rect1Width > rect2XPos && rect1YPos < rect2YPos + rect2Height &&
        rect1Height + rect1YPos > rect2YPos) {
        return true; 
     }
     else{
      return false
     }        
    }