
let canvas;
let ctx;

let butterflyImage = new Image();
butterflyImage.src = "img/butterfly.png";

let raindropsImage = new Image();
raindropsImage.src = "img/raindrop.png";

let dustImage = new Image();
dustImage.src = "img/fairydust.png";

let backgroundImage = new Image();
backgroundImage.src = "img/forestfantasy.jpg";

let backgroundX, backgroundY;
backgroundX = backgroundY = 0;

let x, y, width, height;
x = 10;
y = 10;
width = 50;
height = 60;
let speed = 3;

let badX, badY, badWidth, badHeight;
badX = 100;
badY = 100;
badWidth = 30;
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
    document.getElementById("gc").style.display = "";
    document.getElementById("overlay1").style.display = "none";
    

    canvas = document.getElementById("gc");
    ctx = canvas.getContext("2d");

    let fps = 1000 / 100;
    window.setInterval(update, fps);
}

const reset = () => {
    window.location.reload();
}

const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    moveGoodGuy();
    moveBadGuy();
    moveDust();

    if(checkCollisions(width, height, x, y, badWidth, badHeight, badX, badY)) {
        document.getElementById("gc").style.display = "none";
        document.getElementById("overlay3").style.display = "";
    }
    if(checkCollisions(width, height, x, y, dustWidth, dustHeight, dustX, dustY)) {
        repositionDust();
        score ++;
    }
    if(score == 25) {
        document.getElementById("gc").style.display = "none";
        document.getElementById("overlay2").style.display = "";
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

    if(x >= 250) {
        x = 250;
    }
    if (x <= 0) {
        x = 0
    }
    if(y >= 240) {
        y = 240;
    }
    if(y <= 0) {
        y = 0;
    }

    // ctx.fillStyle = "blue";
    // ctx.fillRect(x, y, width, height);
    ctx.drawImage(butterflyImage, x, y, width, height);
}

const moveBadGuy = () => {
    badY++;

    if (badY > 280) {
        repositionBadGuy();
    }

    // ctx.fillStyle = "red";
    // ctx.fillRect(badX, badY, badWidth, badHeight);
    ctx.drawImage(raindropsImage, badX, badY, badWidth, badHeight);
}

const moveDust = () => {

    // dustY++;

    if(dustY > 300) {
        repositionDust();
    }

    
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