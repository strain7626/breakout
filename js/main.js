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
let first = 1;

let brickRowCount = 3;
let brickColumnCount = 5;
let brickHeight = 36;
let brickWidth = 87;
let brickPadding = 10;

let bricks = [];

let stage = 0;
let stages = [ {RC:3, CC:5, BH:36, BW:87},{RC:6, CC:10, BH:15, BW:40}]

let x = canvas.width / 2;
let y = canvas.height / 2;

let x_plus = 3;
let y_plus = 3;

const barWidth = 100;
const barHeight = 10;

let bar_x = (canvas.width - barWidth)/2 ;

let rightPressed = false;
let leftPressed = false;

function stage_set(){
    ctx.font = "36px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("stage" + stage, 200, 30);
    brickRowCount = stages[stage].RC;
    brickColumnCount = stages[stage].CC;
    brickHeight = stages[stage].BH;
    brickWidth = stages[stage].BW;
    for(let c = 0; c < brickColumnCount; c++){
        bricks[c] = [];
        for(let r = 0; r < brickRowCount; r++){
            bricks[c][r] = { x:0, y:0, status : 1};
        }   
    }
    first = 0;
    score = 0;
    life = 3 + stage;
    
    x = canvas.width / 2;
    y = canvas.height / 2;
    bar_x = (canvas.width - barWidth)/2 ;
    stage += 1;
}

function game(){
    if(first == 1)
        stage_set();
    draw();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBar();
    collisionDetection();
    drawBricks();
    drawScore();
    drawHeart();
    if (x > canvas.width || x < 0)
        x_plus *= -1;
    if (y < 0)
        y_plus *= -1;
    
    if(y > canvas.height){
        y_plus*=-1;
        life -= 1;
    }
    
    if (y >= canvas.height-barHeight && bar_x <= x && x <= bar_x+barWidth)
        y_plus *= -1;

    if(life == 0)
        alert("You Lose ★");

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

setInterval(game, 10);


function drawBricks(){
    for(let c = 0; c < brickColumnCount; c++){
        for(let r = 0; r < brickRowCount; r++){
            if(bricks[c][r].status == 1){
                let brickX = c*(brickWidth + brickPadding);
                let brickY = r*(brickHeight + brickPadding);
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }   
    }
}

function collisionDetection(){
    for(let c = 0; c < brickColumnCount; c++){
        for(let r = 0; r < brickRowCount; r++){
            let b = bricks[c][r];
            if(b.status == 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    y_plus = -y_plus;
                    b.status = 0;
                    score += 1;
                }
            }
        }
    }
}

let score = 0;
function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Score : " + score + "/" + (brickColumnCount * brickRowCount), 8, 20);
    if(score >= brickColumnCount * brickRowCount)
        var next_go = confirm("다음 스테이지");
        if( next_go == true )
            first = 1;
}

let life = 3;
function drawHeart(){
    ctx.font = "36px Arial";
    ctx.fillStyle = "red";
    for(let i = 0 ; i < life ; i++){
        ctx.fillText("♥", 450 - 30*i, 30);
    }
}

function mouseMoveHandler(event){
    let relativeX = event.clientX;
    if(relativeX > 0 && relativeX < canvas.width){
        barX = relativeX - barWidth/2;
    }
}

document.addEventListener("mousemove", mouseMoveHandler, false);
    