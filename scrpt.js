const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Make the canvas responsive for mobile screens
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let michael = {
  x: 100,
  y: 100,
  width: 40,
  height: 40,
  color: 'red', // Represent Michael
  speed: 5,
  dx: 0,
  dy: 0,
  hasGun: true,
  name: "Michael"
};

let trevor = {
  x: 300,
  y: 300,
  width: 40,
  height: 40,
  color: 'green', // Represent Trevor
  speed: 5,
  dx: 0,
  dy: 0,
  hasGun: true,
  name: "Trevor"
};

let activePlayer = michael;  // Start with Michael as active player

// Event listeners for touch controls
document.addEventListener('touchstart', (e) => {
  e.preventDefault(); // Prevent default touch behavior
  let touch = e.touches[0];
  handleTouch(touch);
});

document.addEventListener('touchmove', (e) => {
  e.preventDefault();
  let touch = e.touches[0];
  handleTouch(touch);
});

document.addEventListener('touchend', () => {
  activePlayer.dx = 0;
  activePlayer.dy = 0;
});

// Handle touch controls
function handleTouch(touch) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Define touch areas for movement
  const leftArea = screenWidth / 4;
  const rightArea = screenWidth * 3 / 4;
  const upArea = screenHeight / 4;
  const downArea = screenHeight * 3 / 4;

  if (touch.clientX < leftArea) {
    activePlayer.dx = -activePlayer.speed; // Move left
  } else if (touch.clientX > rightArea) {
    activePlayer.dx = activePlayer.speed; // Move right
  } else if (touch.clientY < upArea) {
    activePlayer.dy = -activePlayer.speed; // Move up
  } else if (touch.clientY > downArea) {
    activePlayer.dy = activePlayer.speed; // Move down
  }

  if (touch.clientX > leftArea && touch.clientX < rightArea && touch.clientY > upArea && touch.clientY < downArea) {
    // Default if the touch is inside the movement area
    activePlayer.dx = 0;
    activePlayer.dy = 0;
  }
}

// Function to move the character
function movePlayer(player) {
  player.x += player.dx;
  player.y += player.dy;

  // Boundaries check to keep the player within the canvas
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  if (player.y < 0) player.y = 0;
  if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

// Function to draw roads
function drawRoads() {
  ctx.fillStyle = '#2c3e50';
  // Simulate roads for the open-world
  ctx.fillRect(50, 100, canvas.width - 100, 10);
  ctx.fillRect(50, 200, canvas.width - 100, 10);
  ctx.fillRect(50, 300, canvas.width - 100, 10);
  ctx.fillRect(50, 400, canvas.width - 100, 10);
}

// Function to draw the player character
function drawPlayer(player) {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  if (player.hasGun) {
    ctx.fillStyle = 'black';
    ctx.fillRect(player.x + player.width / 2, player.y, 10, 5); // Gun
  }
  // Display the player's name
  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.fillText(player.name, player.x, player.y - 10);
}

// Game loop to update and draw everything
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawRoads();
  movePlayer(activePlayer);
  drawPlayer(activePlayer);

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();