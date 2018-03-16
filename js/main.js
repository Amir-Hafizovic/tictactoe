console.log('connected');
// Variables used for loop creation of grid array and html tables.
let rows = 3, columns = 3;
// Loop which creates array with nested arrays and adds 0 into elements
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

// Function which generates frontend html table grid
const createGrid = function(rows, columns) {
  const table = $('.table');

  for (let i = 0; i < rows; i++) {
    const row = $('<tr>');
    table.append(row);

    for (let j = 0; j < columns; j++) {
      const cell = $('<td>');
      // Html data attributes correspond to grid arrays by using same loop count from row and column variables
      cell.attr('data-row', i);
      cell.attr('data-column', j);
      row.append(cell);
    }
  }
};

// Returns player names via prompt into an array. Has default optons if no name is chosen.
const getPlayerName = function() {
  const name1 = prompt(`Player X's name?`) || 'Player X';
  const name2 = prompt(`Player O's name?`) || 'Player O';
  // Used later in player object data
  return [name1, name2];
}

//MATCHING LOGIC
const match = function(grid, marker) {
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

// Loops through grid array checking to see if it contains 0's to determine if it's a draw.
const isFinished = function(grid) {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].indexOf(0) !== -1) return false;
  }
  return true;
};

// Initialises game plus dependencies
const startGame = function() {
  //Initialises grid array
  let grid = initGrid();
  // Builds html table
  createGrid(rows, columns);
  // Get player names and assigns to 'names' var
  const names = getPlayerName();
  // Player profile objects stores player data
  const playerX = { name: names[0], marker: 'X', score: 0 };
  const playerO = { name: names[1], marker: 'O', score: 0 };

  // Count for alternating player marker placement
  let count = 0;
  // Draws counter
  let draws = 0;
  // Player's marker variable
  let marker;

  const dataHandler = function() {
    // 'this' is the clicked td element from event handler
    // Creates variable from html data attributes
    const $row = $(this).attr('data-row');
    const $col = $(this).attr('data-column');

    // jQuery conditional which only allows input into empty (td) html element
    if ($(this).is(':empty')) {

      // Thanks milo for odd/even concept
      // if/else alternates players depending on count
      if (count % 2 === 0) {
        // Players marker from player data object
        marker = playerX.marker;
      }
      else marker = playerO.marker;

      // Pushes players marker into click events selected element
      $(this).html(`<p class="input">${marker}</p>`);

      // Pushes marker into corresponding position in the grid array
      grid[$row][$col] = marker;

      console.log(`html-data:${$row},${$col} Marker: ${marker}`);

      // Count for alternating player marker placement (turns)
      count++;
    }
    // WINNER LOGIC
    // Assigns matching marker into winner variable
    const winner = match(grid, marker);

    // Conditional for a positive match
    // If matched marker
    if (winner) {
      // Create variable to store winning player object reference
      let winningPlayer;
      // Reference playerX object
      if (winner === 'X') winningPlayer = playerX;
      // Else reference playerO object
      else winningPlayer = playerO;

      //Display player name from player object
      alert(`${winningPlayer.name} has won!`);
      // Add +1 to score in player object
      winningPlayer.score ++;

      // Clears gameboard html markup
      $('tr').remove();
      // Regenerates game array
      grid = initGrid();
      // Re-creates html gameboard
      createGrid(rows, columns);
      // Displays payers name and score on frontend
      $('.playerX').html(`<p>${playerX.name}: ${playerX.score}</p>`);
      $('.playerO').html(`<p>${playerO.name}: ${playerO.score}</p>`);
    }
    else if (!winner && isFinished(grid)) {
      alert(`It's a draw!`);
      // Draws counter (for Linda)
      draws ++;
      // Clears gameboard html markup
      $('tr').remove();
      // Regenerates game array
      grid = initGrid();
      // Re-creates html gameboard
      createGrid(rows, columns);
      // Displays draw counts on frontend
      $('.draws').html(`<p>Draws: ${draws}</p>`);
    }
  };

  // Click event handler
  $('.table').on('click', 'td', dataHandler);
};

// When dom has been loaded, call startgame function
$( document ).ready(startGame);
