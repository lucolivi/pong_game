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

let playerScore = 0; // P14da
let computerScore = 0; // P14da

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
        playerScore++; // Pf3ce
    }

    if (ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
        computerScore++; // Pf3ce
    }
}

function moveComputerPaddle() {
    if (computerPaddleY + paddleHeight / 2 < ballY) {
        computerPaddleY += 5;
    } else {
        computerPaddleY -= 5;
    }

    // Boundary check for computerPaddleY
    if (computerPaddleY < 0) {
        computerPaddleY = 0;
    } else if (computerPaddleY + paddleHeight > canvas.height) {
        computerPaddleY = canvas.height - paddleHeight;
    }
}

function drawScore() { // Pf102
    context.font = '24px "Press Start 2P"'; // Pf102
    context.fillStyle = '#FFF'; // Pf102
    context.fillText(`Player: ${playerScore} | Computer: ${computerScore}`, canvas.width / 2 - 100, 50); // Pf102
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
    drawScore(); // P7c73
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

    // Boundary check for playerPaddleY
    if (playerPaddleY < 0) {
        playerPaddleY = 0;
    } else if (playerPaddleY + paddleHeight > canvas.height) {
        playerPaddleY = canvas.height - paddleHeight;
    }
});
