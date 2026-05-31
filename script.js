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

// ============================================================
// LEVELS DATA – all five levels defined in one place.
//
// Each level object has:
//   number     – which level this is (1–5)
//   name       – a fun dinosaur-themed level name
//   layout     – a 10×10 grid (same legend as the map above)
//   enemySpeed – milliseconds between enemy moves (lower = faster)
//
// Level 1 is used when the game starts.
// Levels 2–5 are defined here for future use.
// ============================================================
const levels = [
  {
    number: 1,
    name: "Tiny Triceratops Trail",
    // Beginner-friendly layout with wide paths.
    layout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 2, 0, 0, 0, 2, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 2, 1, 0, 0, 0, 2, 1],
      [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 4, 1],
      [1, 2, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    enemySpeed: 700  // enemy moves every 700ms (slowest – most forgiving)
  },
  {
    number: 2,
    name: "Raptor Ridge Run",
    // Slightly tighter paths and a few more chokepoints.
    layout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 1, 0, 0, 1, 2, 0, 1],
      [1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 0, 0, 1, 1],
      [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 2, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 0, 1, 0, 0, 0, 1, 4, 1],
      [1, 2, 0, 1, 0, 1, 2, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    enemySpeed: 580  // enemy moves every 580ms (a little faster)
  },
  {
    number: 3,
    name: "Stegosaurus Stomp",
    // Longer routes that require more careful movement.
    layout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 1, 0, 0, 1, 2, 0, 1],
      [1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 2, 0, 0, 0, 1, 0, 1],
      [1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 2, 4, 1],
      [1, 2, 1, 0, 0, 1, 0, 0, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    enemySpeed: 480  // enemy moves every 480ms
  },
  {
    number: 4,
    name: "T-Rex Treasure Maze",
    // Tighter turns and narrower safe routes.
    layout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 1, 0, 1, 0, 2, 0, 1],
      [1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 2, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 2, 0, 0, 0, 0, 0, 1, 4, 1],
      [1, 0, 0, 1, 1, 1, 0, 0, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    enemySpeed: 380  // enemy moves every 380ms
  },
  {
    number: 5,
    name: "Brontosaurus Star Lab",
    // Most complex beginner layout with the tightest pathing.
    layout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 1, 0, 1, 0, 2, 0, 1],
      [1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 2, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 2, 0, 1, 0, 0, 0, 1, 4, 1],
      [1, 0, 0, 1, 1, 1, 2, 0, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    enemySpeed: 300  // enemy moves every 300ms (fastest – most challenging)
  }
];

// ----- Current level index (start at 0 = first level) -----
// This increases when a level is completed.
let currentLevelIndex = 0;

// ----- Current level object and map state -----
let currentLevel = null;
let map = [];
let originalMap = [];

// ============================================================
// LOAD CURRENT LEVEL DATA – copy layout from levels[] by index
// ============================================================
function loadCurrentLevelData() {
  currentLevel = levels[currentLevelIndex];
  if (!currentLevel) { return; }

  // Copy each row so level templates are never edited by gameplay.
  map = currentLevel.layout.map(function (row) { return row.slice(); });
  originalMap = map.map(function (row) { return row.slice(); });
}

// Load level 1 immediately when the page script starts.
loadCurrentLevelData();

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
// ----- Dinos collected in the current level (used for in-level speed ramp) -----
let dinosCollectedThisLevel = 0;
let gameOver = false;
let gamePaused = false;

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
  gamePaused = false;

  // Hide win/lose messages.
  document.getElementById("win-message").classList.add("hidden");
  document.getElementById("lose-message").classList.add("hidden");
  document.getElementById("paused-message").classList.add("hidden");

  // Stop any running enemy timer.
  if (enemyTimer) { clearInterval(enemyTimer); enemyTimer = null; }

  // Count dinos and find player/enemy starting positions.
  prepareCurrentLevel();

  updateScore();
  updateLives();
  updateLevelDisplay();
  drawGrid();
}

// ============================================================
// PREPARE CURRENT LEVEL – count dinos and locate start positions
// ============================================================
function prepareCurrentLevel() {
  totalDinos = 0;
  dinosCollectedThisLevel = 0; // reset in-level speed-ramp counter

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
}

// ============================================================
// LOAD LEVEL – reset board, collectibles, and positions for the
// current level. Does NOT reset the total score.
// ============================================================
function loadLevel() {
  // Load a fresh copy of the current level's layout (resets board and collectibles).
  loadCurrentLevelData();

  // Locate player and enemy start positions and count collectibles.
  prepareCurrentLevel();

  updateLevelDisplay();
  drawGrid();
}

// ============================================================
// APPLY ENEMY SPEED – start/restart enemy timer for this level
// ============================================================
function applyCurrentLevelEnemySpeed() {
  // Reset any previous enemy timer before applying the new speed.
  if (enemyTimer) { clearInterval(enemyTimer); enemyTimer = null; }

  // Only run movement when gameplay is active.
  if (!gameStarted || gameOver || !currentLevel) { return; }

  // Each dino collected this level makes the enemy 25ms faster.
  // The interval never drops below 200ms (a safe minimum).
  var interval = Math.max(currentLevel.enemySpeed - dinosCollectedThisLevel * 25, 200);

  enemyTimer = setInterval(moveEnemy, interval);
}

// ============================================================
// START GAME – begin gameplay (enemy starts moving, keys work)
// ============================================================
function startGame() {
  if (gameStarted || gameOver) { return; }
  gameStarted = true;
  gamePaused = false;
  document.getElementById("paused-message").classList.add("hidden");
  applyCurrentLevelEnemySpeed();
}

// ============================================================
// TOGGLE PAUSE – pause/resume gameplay with the P key
// ============================================================
function togglePause() {
  if (!gameStarted || gameOver) { return; }

  gamePaused = !gamePaused;
  var pausedMessage = document.getElementById("paused-message");

  if (gamePaused) {
    if (enemyTimer) { clearInterval(enemyTimer); enemyTimer = null; }
    if (pausedMessage) { pausedMessage.classList.remove("hidden"); }
    return;
  }

  if (pausedMessage) { pausedMessage.classList.add("hidden"); }
  applyCurrentLevelEnemySpeed();
}

// ============================================================
// RESTART – fully reset the game and start playing immediately
// ============================================================
function restart() {
  // Go back to level 1 so the game restarts from the beginning.
  currentLevelIndex = 0;
  loadCurrentLevelData();
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
// MOVEMENT STATE CHECK – keep player/enemy still when game stops
// ============================================================
function isMovementAllowed() {
  // Movement is only allowed while actively playing.
  // This blocks movement after game over, final win, before start, or while paused.
  return gameStarted && !gameOver && !gamePaused;
}

// ============================================================
// MOVE – handle arrow key presses
// ============================================================
function move(direction) {
  if (!isMovementAllowed()) { return; }

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
    dinosCollectedThisLevel++;
    map[newRow][newCol] = 0; // remove the dino from the map
    updateScore();
    applyCurrentLevelEnemySpeed(); // enemy gets 25ms faster for each dino collected
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
// UPDATE LEVEL DISPLAY – show current level number and name
// ============================================================
function updateLevelDisplay() {
  if (!currentLevel) { return; }

  var levelNumberEl = document.getElementById("level-number");
  var levelNameEl = document.getElementById("level-name");
  if (!levelNumberEl || !levelNameEl) { return; }

  var levelNumber = currentLevel.number || 1;
  var levelName = currentLevel.name || "Unknown Level";

  levelNumberEl.textContent = levelNumber;
  levelNameEl.textContent = levelName;
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
    gameStarted = false; // stop all movement after game over
    if (enemyTimer) { clearInterval(enemyTimer); enemyTimer = null; }
    document.getElementById("lose-message").classList.remove("hidden");
  }
}

// ============================================================
// CHECK WIN – move to next level when all dinos are collected
// ============================================================
function checkWin() {
  // If any dinos remain on the board, this level is not done yet.
  for (var r = 0; r < map.length; r++) {
    for (var c = 0; c < map[r].length; c++) {
      if (map[r][c] === 2) {
        return;
      }
    }
  }

  // All dinos collected: move to the next level if one exists.
  if (levels[currentLevelIndex + 1]) {
    // Pause the enemy so it doesn't move during the message delay.
    if (enemyTimer) { clearInterval(enemyTimer); enemyTimer = null; }

    // Show a cheerful level-complete message that includes the level name.
    var completedLevelName = currentLevel ? currentLevel.name : "this level";
    var levelMsg = document.getElementById("level-complete-message");
    if (levelMsg) {
      levelMsg.textContent = "🎉 Great job! You finished \"" + completedLevelName + "\"! Get ready… 🦕";
      levelMsg.classList.remove("hidden");
    }

    // After a short delay, hide the message and load the next level.
    setTimeout(function () {
      if (levelMsg) { levelMsg.classList.add("hidden"); }
      currentLevelIndex++;
      // Reset board, collectibles, and positions for the new level.
      // Score is intentionally NOT reset here.
      loadLevel();
      // Apply the new level's enemy speed.
      applyCurrentLevelEnemySpeed();
    }, 1500); // 1.5-second pause – short but readable

    return;
  }

  // No next level means the player finished the final level.
  gameOver = true;
  gameStarted = false;
  if (enemyTimer) {
    clearInterval(enemyTimer);
    enemyTimer = null;
  }

  var winMessage = document.getElementById("win-message");
  if (winMessage) {
    winMessage.textContent = "🎉 Roar-some job! You completed all 5 dinosaur levels! Press Restart to play again! 🦕";
    winMessage.classList.remove("hidden");
  }
}

// ============================================================
// MOVE ENEMY – called automatically by the current level timer
// ============================================================
function moveEnemy() {
  if (!isMovementAllowed()) { return; }

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
  if (event.key === "p" || event.key === "P") {
    togglePause();
    event.preventDefault();
  }
  if (event.key === "ArrowUp")    { move("up");    event.preventDefault(); }
  if (event.key === "ArrowDown")  { move("down");  event.preventDefault(); }
  if (event.key === "ArrowLeft")  { move("left");  event.preventDefault(); }
  if (event.key === "ArrowRight") { move("right"); event.preventDefault(); }
});

// ============================================================
// START THE GAME
// ============================================================
setup();
