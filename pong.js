const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let playerPaddleY = (canvas.height - paddleHeight) / 2;
let computerPaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 15) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, '#FFF');
    }
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX + ballRadius > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }
}

function moveComputerPaddle() {
    if (computerPaddleY + paddleHeight / 2 < ballY) {
        computerPaddleY += 5;
    } else {
        computerPaddleY -= 5;
    }
}

function update() {
    moveBall();
    moveComputerPaddle();
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, '#000');
    drawNet();
    drawRect(0, playerPaddleY, paddleWidth, paddleHeight, '#FFF');
    drawRect(canvas.width - paddleWidth, computerPaddleY, paddleWidth, paddleHeight, '#FFF');
    drawCircle(ballX, ballY, ballRadius, '#FFF');
}

function gameLoop() {
    update();
    render();
}

setInterval(gameLoop, 1000 / 60);

document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 38: // Up arrow
            playerPaddleY -= 20;
            break;
        case 40: // Down arrow
            playerPaddleY += 20;
            break;
    }
});
