// ============================================================
// Tiny Dino Chomp – Level 1
// A simple grid maze game for beginners.
//
// Legend for the map array:
//   0 = open path
//   1 = wall
//   2 = dinosaur collectible 🦕
//   3 = player start 😮
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
  [1, 0, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// ----- Player position -----
// We find the starting cell (value 3) when the page loads.
let playerRow = 0;
let playerCol = 0;

// ----- Score -----
let score = 0;

// ----- Total dinos on the map (counted at start) -----
let totalDinos = 0;

// ============================================================
// SETUP – run once when the page loads
// ============================================================
function setup() {
  // Count how many dinos are on the map and find the player start.
  for (var r = 0; r < map.length; r++) {
    for (var c = 0; c < map[r].length; c++) {
      if (map[r][c] === 2) {
        totalDinos++;
      }
      if (map[r][c] === 3) {
        playerRow = r;
        playerCol = c;
        // Treat the start tile as an open path now that we know where we are.
        map[r][c] = 0;
      }
    }
  }

  drawGrid();
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
  // Calculate where the player wants to go.
  var newRow = playerRow;
  var newCol = playerCol;

  if (direction === "up")    { newRow--; }
  if (direction === "down")  { newRow++; }
  if (direction === "left")  { newCol--; }
  if (direction === "right") { newCol++; }

  // Check grid boundaries.
  if (newRow < 0 || newRow >= map.length)    { return; }
  if (newCol < 0 || newCol >= map[0].length) { return; }

  // Check for walls – can't walk through them.
  if (map[newRow][newCol] === 1) { return; }

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
// CHECK WIN – show a win message when all dinos are collected
// ============================================================
function checkWin() {
  if (score >= totalDinos) {
    document.getElementById("win-message").classList.remove("hidden");
  }
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
