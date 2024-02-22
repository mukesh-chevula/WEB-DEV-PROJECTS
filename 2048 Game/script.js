const gridContainer = document.getElementById('grid-container');
let grid = [];
let score = 0;

function initializeGrid() {
  grid = [];
  score = 0;
  for (let i = 0; i < 4; i++) {
    grid[i] = [];
    for (let j = 0; j < 4; j++) {
      grid[i][j] = 0;
    }
  }
}

function addNewNumber() {
  let options = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        options.push({ x: i, y: j });
      }
    }
  }
  if (options.length > 0) {
    let spot = options[Math.floor(Math.random() * options.length)];
    grid[spot.x][spot.y] = Math.random() < 0.9 ? 2 : 4;
    drawGrid();
  }
}

function drawGrid() {
  gridContainer.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      if (grid[i][j] !== 0) {
        cell.textContent = grid[i][j];
      }
      gridContainer.appendChild(cell);
    }
  }
}

function resetGame() {
  initializeGrid();
  addNewNumber();
  addNewNumber();
  drawGrid();
}

function moveLeft() {
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (grid[i][j] !== 0) {
        let k = j - 1;
        while (k >= 0 && grid[i][k] === 0) {
          k--;
        }
        if (k >= 0 && grid[i][k] === grid[i][j]) {
          grid[i][k] *= 2;
          score += grid[i][k];
          grid[i][j] = 0;
        } else {
          if (k + 1 !== j) {
            grid[i][k + 1] = grid[i][j];
            grid[i][j] = 0;
          }
        }
      }
    }
  }
}

function moveRight() {
  for (let i = 0; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      if (grid[i][j] !== 0) {
        let k = j + 1;
        while (k < 4 && grid[i][k] === 0) {
          k++;
        }
        if (k < 4 && grid[i][k] === grid[i][j]) {
          grid[i][k] *= 2;
          score += grid[i][k];
          grid[i][j] = 0;
        } else {
          if (k - 1 !== j) {
            grid[i][k - 1] = grid[i][j];
            grid[i][j] = 0;
          }
        }
      }
    }
  }
}

function moveUp() {
  for (let j = 0; j < 4; j++) {
    for (let i = 1; i < 4; i++) {
      if (grid[i][j] !== 0) {
        let k = i - 1;
        while (k >= 0 && grid[k][j] === 0) {
          k--;
        }
        if (k >= 0 && grid[k][j] === grid[i][j]) {
          grid[k][j] *= 2;
          score += grid[k][j];
          grid[i][j] = 0;
        } else {
          if (k + 1 !== i) {
            grid[k + 1][j] = grid[i][j];
            grid[i][j] = 0;
          }
        }
      }
    }
  }
}

function moveDown() {
  for (let j = 0; j < 4; j++) {
    for (let i = 2; i >= 0; i--) {
      if (grid[i][j] !== 0) {
        let k = i + 1;
        while (k < 4 && grid[k][j] === 0) {
          k++;
        }
        if (k < 4 && grid[k][j] === grid[i][j]) {
          grid[k][j] *= 2;
          score += grid[k][j];
          grid[i][j] = 0;
        } else {
          if (k - 1 !== i) {
            grid[k - 1][j] = grid[i][j];
            grid[i][j] = 0;
          }
        }
      }
    }
  }
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft') {
    moveLeft();
  } else if (event.key === 'ArrowRight') {
    moveRight();
  } else if (event.key === 'ArrowUp') {
    moveUp();
  } else if (event.key === 'ArrowDown') {
    moveDown();
  }
  addNewNumber();
  drawGrid();
});

resetGame();
