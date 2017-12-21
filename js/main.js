console.log('connected');

//loop for creating array grid
let columns = 3, rows = 3;
let grid = [];
for(let y = 0; y < rows; y++)
{
    grid.push([]);
    for(let x = 0; x < columns; x++)
    {
        grid[y].push(0);
    }
};
//let columns = 3, rows = 3
//function which generates html table grid
function createGrid(columns, rows) {
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
};
//MATCHING LOGIC
const match = function(marker){
  // Rows check
  for (let i = 0; i < rows; i++) {
    if (grid[i][0] === marker && grid[i][1] === marker && grid[i][2] === marker) {
      console.log('matched');
      return alert(`Player '${marker}' wins!`);
    }
  }
  // Columns check
  for (let j = 0; j < columns; j++) {
    if (grid[0][j] === marker && grid[1][j] === marker && grid[2][j] === marker) {
      console.log('matched');
      return alert(`Player '${marker}' wins!`);
    }
  }
  // Diagonals check
  if (grid[0][0] === marker && grid[1][1] === marker && grid[2][2] === marker) {
    console.log('matched');
    return alert(`Player '${marker}' wins!`);
  }
  if (grid[0][2] === marker && grid[1][1] === marker && grid[2][0] === marker) {
    console.log('matched');
    return alert(`Player '${marker}' wins!`);
  }
};
// checks to see if array contains 0's
const isFinished = function(grid) {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].indexOf(0) !== -1) return false;
  }
  return true;
};


$( document ).ready(function() {
  createGrid(columns, rows);

  //thanks milo for odd/even concept /// Front end alternating markers + markers being assigned to array coordinates through matching td data attributes
  let count = 0;
  let marker;
  const dataHandler = function() {


    const $row = $(this).attr('data-row');
    const $col = $(this).attr('data-column');
    if ($(this).is(':empty')) {

      if (count % 2 === 0) {
        marker = 'X';
      }
      else marker = 'O';
      const $Click = $(this).html(`<p class="input">${marker}</p>`);
      grid[$row][$col] = marker;
      console.log(`html-data:${$row},${$col} Marker: ${marker}`)
      count++;
    };
    // Winner or draw notification logic
    const winner = match(marker);

    if (winner) {
      alert(`player ${winner} has won`);
      return;
      // restart the game
    }
    else if (!winner && isFinished(grid)) {
      alert(`It's a draw!`);
      return;
      // restart the game
    }

  };
  $('.table').on('click', 'td', dataHandler);

});
