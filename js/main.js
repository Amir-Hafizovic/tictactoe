console.log('connected');

//loop for creating array grid
let gridWidth = 3, gridHeight = 3, columns = 3, rows = 3;
let grid = [];
for(let y = 0; y < gridHeight; y++)
{
    grid.push([]);
    for(let x = 0; x < gridWidth; x++)
    {
        grid[y].push(0);
    }
};


$( document ).ready(function() {


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
  }
  createGrid(columns, rows);

  //thanks milo for odd/even concept /// Front end alternating user inputs + values also being assigned to array coordinates through matching td data attributes
  let count = 0;
  const dataHandler = function(){
    let marker;

    if (count % 2 === 0) {
      marker = 'X';
    }
    else marker = 'O';

    const $row = $(this).attr('data-row');
    const $col = $(this).attr('data-column');
    const $Click = $(this).html(`<p class="input">${marker}</p>`);
    console.log();
    console.log(`html-data:${$row},${$col} Marker: ${marker}`)
    grid[$row][$col] = marker;
    count++;
    match(marker);
  };
  $('.table').on('click', 'td', dataHandler);

      //MATCHING LOGIC

  const match = function(marker){
    for (let i = 0; i < rows; i++) {
      if (grid[i][0] === marker && grid[i][1] === marker && grid[i][2] === marker) {
        console.log('matched');
      }
    }
    for (let j = 0; j < columns; j++) {
      if (grid[0][j] === marker && grid[1][j] === marker && grid[2][j] === marker) {
        console.log('matched');
      }
    }
    // for (let k = 0; k < columns; k++) {
      if (grid[0][0] === marker && grid[1][1] === marker && grid[2][2] === marker) {
        console.log('matched');
      }
      if (grid[0][2] === marker && grid[1][1] === marker && grid[2][0] === marker) {
        console.log('matched');
      }
    // }

  };





});
