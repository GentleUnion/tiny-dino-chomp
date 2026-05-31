// ============================================================
// Tiny Dino Chomp – Level 1
// A simple grid maze game for beginners.
//
// Legend for the map array:
//   0 = open path
//   1 = wall
//   2 = dinosaur collectible 🦕
//   3 = player start 😮
//   4 = enemy start 👾
// ============================================================

// ----- Level map (10 columns × 10 rows) -----
// Feel free to change the numbers to redesign the maze!
const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 3, 0, 2, 1, 0, 0, 2, 0, 1],
  [1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 2, 1, 0, 1, 2, 0, 0, 1],
  [1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 4, 2, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// ----- Original map snapshot (used to restore the level on restart) -----
const originalMap = map.map(function(row) { return row.slice(); });

// ----- Player position -----
// We find the starting cell (value 3) when the page loads.
let playerRow = 0;
let playerCol = 0;

// ----- Player starting position (saved so we can reset after enemy collision) -----
let playerStartRow = 0;
let playerStartCol = 0;

// ----- Enemy position -----
// We find the starting cell (value 4) when the page loads.
let enemyRow = 0;
let enemyCol = 0;
let enemyStartRow = 0;
let enemyStartCol = 0;

// ----- Enemy move timer handle -----
let enemyTimer = null;

// ----- Score -----
let score = 0;

// ----- Lives -----
let lives = 3;

// ----- Total dinos on the map (counted at start) -----
let totalDinos = 0;
let gameOver = false;

// ----- Whether the player has pressed Start yet -----
let gameStarted = false;

// ============================================================
// SETUP – reset all game state and draw the initial grid.
// Does NOT start movement; call startGame() for that.
// ============================================================
function setup() {
  // Restore the map to its original layout (brings back all dinos).
  for (var r = 0; r < originalMap.length; r++) {
    map[r] = originalMap[r].slice();
  }

  score = 0;
  lives = 3;
  totalDinos = 0;
  gameOver = false;
  gameStarted = false;

  // Hide win/lose messages.
  document.getElementById("win-message").classList.add("hidden");
  document.getElementById("lose-message").classList.add("hidden");

  // Stop any running enemy timer.
  if (enemyTimer) { clearInterval(enemyTimer); enemyTimer = null; }

  // Count dinos and find player/enemy starting positions.
  for (var r = 0; r < map.length; r++) {
    for (var c = 0; c < map[r].length; c++) {
      if (map[r][c] === 2) {
        totalDinos++;
      }
      if (map[r][c] === 3) {
        playerRow = r;
        playerCol = c;
        playerStartRow = r;
        playerStartCol = c;
        // Treat the start tile as an open path now that we know where we are.
        map[r][c] = 0;
      }
      if (map[r][c] === 4) {
        enemyRow = r;
        enemyCol = c;
        enemyStartRow = r;
        enemyStartCol = c;
        // Treat the enemy start tile as an open path too.
        map[r][c] = 0;
      }
    }
  }

  updateScore();
  updateLives();
  drawGrid();
}

// ============================================================
// START GAME – begin gameplay (enemy starts moving, keys work)
// ============================================================
function startGame() {
  if (gameStarted || gameOver) { return; }
  gameStarted = true;
  // The enemy moves once every 600 milliseconds.
  enemyTimer = setInterval(moveEnemy, 600);
}

// ============================================================
// RESTART – fully reset the game and start playing immediately
// ============================================================
function restart() {
  setup();
  startGame();
}

// ============================================================
// DRAW – rebuild the grid div to match the current map state
// ============================================================
function drawGrid() {
  var gridEl = document.getElementById("grid");
  gridEl.innerHTML = ""; // clear old grid

  for (var r = 0; r < map.length; r++) {
    var rowEl = document.createElement("div");
    rowEl.className = "row";

    for (var c = 0; c < map[r].length; c++) {
      var cellEl = document.createElement("div");
      cellEl.className = "cell";

      if (r === playerRow && c === playerCol) {
        // Draw the player
        cellEl.classList.add("player");
        cellEl.textContent = "😮";
      } else if (r === enemyRow && c === enemyCol) {
        // Draw the enemy
        cellEl.classList.add("enemy");
        cellEl.textContent = "👾";
      } else if (map[r][c] === 1) {
        // Draw a wall
        cellEl.classList.add("wall");
      } else if (map[r][c] === 2) {
        // Draw a dino collectible
        cellEl.classList.add("dino");
        cellEl.textContent = "🦕";
      } else {
        // Draw an empty path
        cellEl.classList.add("path");
      }

      rowEl.appendChild(cellEl);
    }

    gridEl.appendChild(rowEl);
  }
}

// ============================================================
// MOVE – handle arrow key presses
// ============================================================
function move(direction) {
  if (!gameStarted || gameOver) { return; }

  // Calculate where the player wants to go.
  var newRow = playerRow;
  var newCol = playerCol;

  if (direction === "up")    { newRow--; }
  if (direction === "down")  { newRow++; }
  if (direction === "left")  { newCol--; }
  if (direction === "right") { newCol++; }

  // Check grid boundaries.
  if (newRow < 0 || newRow >= map.length)    { loseLife(); return; }
  if (newCol < 0 || newCol >= map[0].length) { loseLife(); return; }

  // Check for walls – can't walk through them.
  if (map[newRow][newCol] === 1) { loseLife(); return; }

  // Check for a dino collectible on the target cell.
  if (map[newRow][newCol] === 2) {
    score++;
    map[newRow][newCol] = 0; // remove the dino from the map
    updateScore();
    checkWin();
  }

  // Move the player.
  playerRow = newRow;
  playerCol = newCol;

  // Redraw the grid with the new positions.
  drawGrid();
}

// ============================================================
// UPDATE SCORE – refresh the score shown on screen
// ============================================================
function updateScore() {
  document.getElementById("score").textContent = score;
}

// ============================================================
// UPDATE LIVES – refresh the lives shown on screen
// ============================================================
function updateLives() {
  document.getElementById("lives").textContent = lives;
}

// ============================================================
// LOSE LIFE – used when the player makes a blocked move
// ============================================================
function loseLife() {
  if (gameOver) { return; }

  lives--;
  updateLives();

  if (lives === 0) {
    gameOver = true;
    document.getElementById("lose-message").classList.remove("hidden");
  }
}

// ============================================================
// CHECK WIN – show a win message when all dinos are collected
// ============================================================
function checkWin() {
  if (score >= totalDinos) {
    gameOver = true;
    document.getElementById("win-message").classList.remove("hidden");
  }
}

// ============================================================
// MOVE ENEMY – called automatically by the timer every 600ms
// ============================================================
function moveEnemy() {
  if (gameOver) { return; }

  // Build a list of the four neighbouring cells.
  var neighbours = [
    { r: enemyRow - 1, c: enemyCol },
    { r: enemyRow + 1, c: enemyCol },
    { r: enemyRow,     c: enemyCol - 1 },
    { r: enemyRow,     c: enemyCol + 1 }
  ];

  // Keep only cells that are inside the grid and not walls.
  var valid = neighbours.filter(function (d) {
    return d.r >= 0 && d.r < map.length &&
           d.c >= 0 && d.c < map[0].length &&
           map[d.r][d.c] !== 1;
  });

  if (valid.length === 0) { return; } // enemy is surrounded – do nothing

  // Pick one of the valid neighbours at random and move there.
  var pick = valid[Math.floor(Math.random() * valid.length)];
  enemyRow = pick.r;
  enemyCol = pick.c;

  // If the enemy lands on the player, remove a life and reset both positions.
  if (enemyRow === playerRow && enemyCol === playerCol) {
    loseLife();
    playerRow = playerStartRow;
    playerCol = playerStartCol;
    enemyRow  = enemyStartRow;
    enemyCol  = enemyStartCol;
  }

  drawGrid();
}

// ============================================================
// KEYBOARD LISTENER – map arrow keys to the move() function
// ============================================================
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp")    { move("up");    event.preventDefault(); }
  if (event.key === "ArrowDown")  { move("down");  event.preventDefault(); }
  if (event.key === "ArrowLeft")  { move("left");  event.preventDefault(); }
  if (event.key === "ArrowRight") { move("right"); event.preventDefault(); }
});

// ============================================================
// START THE GAME
// ============================================================
setup();
