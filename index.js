// Initialize the grid with a given size
const createGrid = (rows, cols) => {
  const grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols).fill(0);
  }
  return grid;
};

// Randomly populate the grid
const populateGrid = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = Math.random() > 0.7 ? 1 : 0; // 30% chance of being alive
    }
  }
};

// Print the grid to the console
const printGrid = (grid) => {
  console.clear();
  grid.forEach(row => {
    console.log(row.map(cell => (cell ? '■' : '□')).join(' '));
  });
};

// Get the number of live neighbors for a cell
const getLiveNeighbors = (grid, x, y) => {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],         [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];
  return directions.reduce((acc, [dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;
    if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
      acc += grid[newX][newY];
    }
    return acc;
  }, 0);
};

// Update the grid to the next generation
const updateGrid = (grid) => {
  const newGrid = createGrid(grid.length, grid[0].length);
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      const liveNeighbors = getLiveNeighbors(grid, x, y);
      if (grid[x][y] === 1) {
        newGrid[x][y] = liveNeighbors === 2 || liveNeighbors === 3 ? 1 : 0;
      } else {
        newGrid[x][y] = liveNeighbors === 3 ? 1 : 0;
      }
    }
  }
  return newGrid;
};

// Main function to run the Game of Life
const runGameOfLife = (rows, cols, iterations, delay) => {
  let grid = createGrid(rows, cols);
  populateGrid(grid);

  const interval = setInterval(() => {
    printGrid(grid);
    grid = updateGrid(grid);
    if (--iterations <= 0) {
      clearInterval(interval);
    }
  }, delay);
};

// Run the Game of Life with a 20x20 grid for 100 iterations with a 500ms delay
runGameOfLife(20, 20, 100, 500);
// Fixed bug.jpeg ( en gros j'ai fix un bug sur cette ligne)
