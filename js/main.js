console.log('connected');

//loop for creating array grid
let columns = 3, rows = 3;

const initGrid = function() {
  let grid = [];
  for(let y = 0; y < rows; y++) {
      grid.push([]);
      for(let x = 0; x < columns; x++) {
          grid[y].push(0);
      }
  }
  return grid;
};

//function which generates html table grid
const createGrid = function(rows, columns) {
  const table = $('.table');

  for (let i = 0; i < rows; i++) {
    const row = $('<tr>');
    table.append(row)
    for (let j = 0; j < columns; j++) {
      const cell = $('<td>')
      cell.attr('data-row', i);
      cell.attr('data-column', j)
      row.append(cell);
    }
  }
}

const getPlayerName = function() {
  const name1 = prompt(`Player X's name?`) || 'Player X';
  const name2 = prompt(`Player O's name?`) || 'Player O';
  return [name1, name2];
}

const getPlayers = function() {
  const names = getPlayerName();
  const playerX = { name: names[0], marker: 'X', score: 0 };
  const playerO = { name: names[1], marker: 'O', score: 0 };

  return [playerX, playerO];
};

//MATCHING LOGIC
const match = function(grid, marker){
  // Rows check
  for (let i = 0; i < rows; i++) {
    if (grid[i][0] === marker && grid[i][1] === marker && grid[i][2] === marker) {
      console.log('matched');
      return marker;
    }
  }
  // Columns check
  for (let j = 0; j < columns; j++) {
    if (grid[0][j] === marker && grid[1][j] === marker && grid[2][j] === marker) {
      console.log('matched');
      return marker;
    }
  }
  // Diagonals check
  if (grid[0][0] === marker && grid[1][1] === marker && grid[2][2] === marker) {
    console.log('matched');
    return marker;
  }
  if (grid[0][2] === marker && grid[1][1] === marker && grid[2][0] === marker) {
    console.log('matched');
    return marker;
  }
};
// checks to see if array contains 0's
const isFinished = function(grid) {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].indexOf(0) !== -1) return false;
  }
  return true;
};

// initialises game plus dependencies
const startGame = function() {
  let grid = initGrid();
  createGrid(rows, columns);
  const players = getPlayers();
  const playerX = players[0];
  const playerO = players[1];

  // Thanks milo for odd/even concept
  let count = 0;
  let marker;

  const dataHandler = function() {

    const $row = $(this).attr('data-row');
    const $col = $(this).attr('data-column');
    if ($(this).is(':empty')) {

      if (count % 2 === 0) {
        marker = playerX.marker;
      }
      else marker = playerO.marker;

      const $Click = $(this).html(`<p class="input">${marker}</p>`);
      grid[$row][$col] = marker;
      console.log(`html-data:${$row},${$col} Marker: ${marker}`)
      count++;
    };
    // Winner or draw notification logic
    const winner = match(grid, marker);

    if (winner) {
      let winningPlayer;
      if (winner === 'X') winningPlayer = playerX;
      else winningPlayer = playerO;
      alert(`${winningPlayer.name} has won!`);
      winningPlayer.score ++;
      $('tr').remove();
      grid = initGrid();
      createGrid(rows, columns);
      $('.playerX').html(`<p>${playerX.name}: ${playerX.score}</p>`);
      $('.playerO').html(`<p>${playerO.name}: ${playerO.score}</p>`);
    }
    else if (!winner && isFinished(grid)) {
      alert(`It's a draw!`);
      $('tr').remove(); // clears gameboard html markup
      grid = initGrid(); // regenerates game array
      createGrid(rows, columns); //re-creates html gameboard
    }
  };
  $('.table').on('click', 'td', dataHandler);
};

$( document ).ready(startGame);
