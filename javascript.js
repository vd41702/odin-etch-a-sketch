/* TODO
* init:
*   - create grid of divs
*   - create event listeners for each div
*   - create event listeners for settings
* updateSettings:
*   - update grid dimension label to display current dim
*   - toggle all toggleable modes off
*   - turn on the mode requested
*   - all modes just update the color the div is set to
*/

/* settings elements */
colorInput = document.querySelector('#pixelColor');
chosenColorBtn = document.querySelector('#chosenColorBtn');
randColorBtn = document.querySelector('#randomColorToggle');
eraserBtn = document.querySelector('#eraserToggle');
gridLinesBtn = document.querySelector('#gridLinesToggle');
darkModeBtn = document.querySelector('#arkModeToggle');
gridDimSelector = document.querySelector('#gridDims');


drawingAreaDiv = document.querySelector('#drawing-area');

/* settings */
mode = 0; //0: chosen color, 1: random color, 2: eraser
gridLines = true;
darkMode = false;
gridDims = gridDimSelector.value();
tileColor = colorInput.value();






function createGrid(drawingArea) {
    for(var y = 0; x < gridDims; x++) {
        tileRow = document.createElement('div')
        tileRow.classList.add('tile-row');

        for(var x = 0; y < gridDims; y++) {
            tile = document.createElement('div');
            tile.classList.add('tile');
            tileRow.appendChild(tile);
        }
        drawingAreaDiv.appendChild(tileRow);
    }
}

function updateSettings(e) {
    document.querySelector('#gridDims > label').innerText = `Grid Dimensions ${gridDims} x ${gridDims}`;
    console.log(e.target)

}

gridDimSelector.addEventListener('')
