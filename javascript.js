/* TODO
* init:
*   - update grid dimension label to display current dim
*   - create grid of divs
*   - create event listeners for each div
*   - create event listeners for settings
* updateSettings:
*   - toggle all toggleable modes off
*   - turn on the mode requested
*   - all modes just update the color the div is set to
*/

/* settings elements */
colorInput = document.querySelector('#pixelColor');
chosenColorBtn = document.querySelector('#chosenColorBtn');
randColorBtn = document.querySelector('randomColorToggle');
eraserBtn = document.querySelector('eraserToggle');
gridLinesBtn = document.querySelector('gridLinesToggle');
darkModeBtn = document.querySelector('darkModeToggle');
gridDimSelector = document.querySelector('gridDims');


drawingAreaDiv = document.querySelector('#drawing-area');

/* settings */
mode = 0; //0: chosen color, 1: random color, 2: eraser
gridLines = true;
darkMode = false;
gridDims = gridDimSelector.value();






function createGrid(drawingArea) {

}

function updateSettings(e) {

}