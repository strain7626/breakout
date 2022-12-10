const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");
/* 
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();
ctx.strokeStyle= "black";
ctx.stroke();
ctx.closePath(); */

let x = canvas.width / 2;
let y = canvas.height / 2;

let x_plus = 2;
let y_plus = 2;

const barWidth = 100;
const barHeight = 10;

let bar_x = (canvas.width - barWidth)/2 ;

let rightPressed = false;
let leftPressed = false;

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBar();
    if (x > canvas.width || x < 0)
        x_plus *= -1;
    if (y < 0)
        y_plus *= -1;
    
    if(y > canvas.height){
        alert("gameover you lose");
    }
    
    if (y >= canvas.height-barHeight && bar_x <= x && x <= bar_x+barWidth)
        y_plus *= -1;
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();

    x += x_plus;
    y += y_plus;
}

function drawBar(){
    if(rightPressed && bar_x < canvas.width - barWidth)
        bar_x += 5;
    if(leftPressed && bar_x > 0)
        bar_x -= 5;

    ctx.beginPath();
    ctx.rect(bar_x, canvas.height - barHeight, barWidth, barHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function keyDown(event){
    if(event.keyCode == 39)
        rightPressed = true;
    else if(event.keyCode == 37)
        leftPressed = true;
        
}

function keyUp(event){
    if(event.keyCode == 39)
        rightPressed = false;
    else if(event.keyCode == 37)
        leftPressed = false;

}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

setInterval(draw, 10);