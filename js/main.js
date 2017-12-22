console.log('connected');
//variables used for loop creation of grid array and html tables.
let rows = 3, columns = 3;
//loop which creates array with nested arrays and adds 0 into elements
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

//function which generates frontend html table grid
const createGrid = function(rows, columns) {
  const table = $('.table');

  for (let i = 0; i < rows; i++) {
    const row = $('<tr>');
    table.append(row)
    for (let j = 0; j < columns; j++) {
      const cell = $('<td>')
      cell.attr('data-row', i);//html data attributes correspond to grid arrays by using same loop count from row and column variables.
      cell.attr('data-column', j)
      row.append(cell);
    }
  }
}
//returns player names via prompt into an array. Has default optons if no name is chosen.
const getPlayerName = function() {
  const name1 = prompt(`Player X's name?`) || 'Player X';
  const name2 = prompt(`Player O's name?`) || 'Player O';
  return [name1, name2];
}

//MATCHING LOGIC
const match = function(grid, marker){
  // Loop through rows check
  for (let i = 0; i < rows; i++) {
    if (grid[i][0] === marker && grid[i][1] === marker && grid[i][2] === marker) {
      console.log('matched');
      return marker;
    }
  }
  // Loop through columns check
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
// loops through grid array checking to see if it contains 0's to determine if it's a draw.
const isFinished = function(grid) {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].indexOf(0) !== -1) return false;
  }
  return true;
};

// initialises game plus dependencies
const startGame = function() {
  let grid = initGrid();//initialises grid array
  createGrid(rows, columns);//builds html table
  const names = getPlayerName();//get player names
  //player profile objects stores player data
  const playerX = { name: names[0], marker: 'X', score: 0 };
  const playerO = { name: names[1], marker: 'O', score: 0 };

  let count = 0;//count for alternating player marker placement
  let draws = 0;//draws counter
  let marker;//player's marker variable

  const dataHandler = function() {
    //'this' is clicked td element from event handler
    const $row = $(this).attr('data-row');//creates variable from html data attributes
    const $col = $(this).attr('data-column');
    //jQuery conditional which only allows input into empty (td) html element
    if ($(this).is(':empty')) {

      // Thanks milo for odd/even concept
      //if/else alternates players depending on count
      if (count % 2 === 0) {
        marker = playerX.marker;
      }
      else marker = playerO.marker;
      //pushes players marker into click events selected element
      $(this).html(`<p class="input">${marker}</p>`);
      //pushes marker into corresponding position in the grid array
      grid[$row][$col] = marker;
      console.log(`html-data:${$row},${$col} Marker: ${marker}`)
      count++;//count for alternating player marker placement (turns)
    };
    // WINNER LOGIC
    //assigns matching marker into winner variable
    const winner = match(grid, marker);
    //conditional for a positive match
    if (winner) {//if matched marker
      let winningPlayer;//create variable to store winning player object reference
      if (winner === 'X') winningPlayer = playerX;//reference playerX object
      else winningPlayer = playerO;//else reference playerO object
      alert(`${winningPlayer.name} has won!`);//display player name from player object
      winningPlayer.score ++;//add +1 to score in player object
      $('tr').remove(); // clears gameboard html markup
      grid = initGrid();// regenerates game array
      createGrid(rows, columns);//re-creates html gameboard
      // displays payers name and score on frontend
      $('.playerX').html(`<p>${playerX.name}: ${playerX.score}</p>`);
      $('.playerO').html(`<p>${playerO.name}: ${playerO.score}</p>`);
    }
    else if (!winner && isFinished(grid)) {
      alert(`It's a draw!`);
      draws ++;// draws counter (for Linda)
      $('tr').remove(); // clears gameboard html markup
      grid = initGrid(); // regenerates game array
      createGrid(rows, columns); //re-creates html gameboard
      $('.draws').html(`<p>Draws: ${draws}</p>`);//displays draw counts on frontend
    }
  };
  $('.table').on('click', 'td', dataHandler);//click event handler
};

$( document ).ready(startGame);//when dom has been loaded, call startgame function
