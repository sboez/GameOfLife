function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;
let r, g, b;
var running = 1;
let size = 700;

function setup() {

  //Resize with window
  if (windowWidth < size)
  {
    size = Math.round(windowWidth / 10) * 10 - 100
    scale = 10
  }

  //displayWidth, displayHeight
  createCanvas(size, size);
  r = random(255);
  g = random(255);
  b = random(255);
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
  stopBtn.addEventListener('click', stop);
  stepBtn.addEventListener('click', () => {
    draw_gol(), draw_gol_2()});
  resetBtn.addEventListener('click', reset);
}

function reset() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
  draw_gol();
}

function stop() {
  if(running == 0)
  {
    running = 1;
    stopBtn.innerText = 'Start';
  } else {
    running = 0;
    stopBtn.innerText = 'Stop';
  }
}

function draw() {
  draw_gol();
  if (!running) {
    draw_gol_2();
  }
}

//Algo by Daniel Shiffman (CodingTrain)
function draw_gol() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(r, g, b, 127);
        stroke(r, g, b);
        strokeWeight(1.5);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
}

function draw_gol_2() {
  let next = make2DArray(cols, rows);

  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors!
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);
      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
