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

body = document.querySelector('body');
document.querySelector('#drawing-area').onmousedown = e => {
    e.preventDefault();
}

/* settings elements */
colorInput = document.querySelector('#pixelColor');
chosenColorBtn = document.querySelector('#chosenColorBtn');
randColorBtn = document.querySelector('#randomColorToggle');
eraserBtn = document.querySelector('#eraserToggle');
gridLinesBtn = document.querySelector('#gridLinesToggle');
darkModeBtn = document.querySelector('#darkModeToggle');
gridDimSelector = document.querySelector('#gridDims');


drawingAreaDiv = document.querySelector('#drawing-area');

/* settings */
mode = 0; //0: chosen color, 1: random color, 2: eraser
darkMode = false;
gridDims = gridDimSelector.value;
chosenColor = colorInput.value;
inkColor = chosenColor;

/* event listeners for settings*/
colorInput.addEventListener('change', updateChosenColor);
chosenColorBtn.addEventListener('click', changeColorMode);
randColorBtn.addEventListener('click', changeColorMode);
eraserBtn.addEventListener('click', changeColorMode);
gridLinesBtn.addEventListener('click', toggleGridLines);
darkModeBtn.addEventListener('click', toggleDarkMode);
gridDimSelector.addEventListener('change', updateGridDims);

init();



function createGrid(drawingArea) {
    for(var y = 0; y < gridDims; y++) {
        tileRow = document.createElement('div')
        tileRow.classList.add('tile-row');

        for(var x = 0; x < gridDims; x++) {
            tile = document.createElement('div');
            tile.classList.add('tile');
            tile.setAttribute('draggable', 'false');
            tileRow.appendChild(tile);
        }
        drawingAreaDiv.appendChild(tileRow);
    }

    var gridTiles = document.querySelectorAll(".tile");
    gridTiles.forEach(tile => {
        tile.addEventListener('mouseenter', colorTile);
        tile.addEventListener('mousedown', colorTile);
    });
}


function updateGridDims(e) {
    gridDims = gridDimSelector.value;
    inkColor = colorInput.value;
    document.querySelector('#gridDimSection > label').innerText = `grid dimensions: ${gridDims} x ${gridDims}`;
    document.querySelector('#drawing-area').innerText = "";
    createGrid(drawingAreaDiv);
}

function init() {
    document.querySelector('#gridDimSection > label').innerText = `grid dimensions: ${gridDims} x ${gridDims}`;
    createGrid(drawingAreaDiv);
}

function updateChosenColor(e) {
    chosenColor = colorInput.value;
    if(mode == 0) {
        inkColor = chosenColor;
    }
}

function changeColorMode(e) {
    chosenColorBtn.classList.remove('activeColorMode');
    randColorBtn.classList.remove('activeColorMode');
    eraserBtn.classList.remove('activeColorMode');

    switch (e.target.innerText) {
        case "chosen color":
            inkColor = chosenColor;
            mode = 0;
            chosenColorBtn.classList.add('activeColorMode');
            break;

        case "random color":
            mode = 1;
            randColorBtn.classList.add('activeColorMode');
            break;

        case "eraser":
            inkColor = "transparent";
            mode = 2;
            eraserBtn.classList.add('activeColorMode');
            break;

        default:
            break;
    }
    
}

function toggleGridLines(e) {
    drawingAreaDiv.classList.toggle('gridlines');
    drawingAreaDiv.classList.toggle('nogridlines');
}

function toggleDarkMode(e) {
    body.classList.toggle('lightmode');
    body.classList.toggle('darkmode');
    darkMode = !darkMode;
    if(darkMode) {
        darkModeBtn.innerText = "light mode";
    } else {
        darkModeBtn.innerText = "dark mode";
    }
}

function colorTile(e) {
    if(e.target == null) {
        return;
    }
    if(e.buttons == 0) {
        return;
    }
    if(mode == 1) {
        /* method to generate random colors found here: https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/ */
        goldenRatioConjugate = .618033988749895;
        h = Math.random() + goldenRatioConjugate;
        h %= 1;
        inkColor = hsv_to_rgb(h * 360, .5, .95);
    }
    e.target.setAttribute('style', `background-color: ${inkColor}`);
}

function hsv_to_rgb(h, s, v) {
    var chroma = s * v;
    var hPrime = h/60;
    var x = chroma * (1 - Math.abs(hPrime % 2 - 1));
    var m = v - chroma;
    var r, g, b;
    if(hPrime < 1) {
        r = chroma + m;
        g = x + m;
        b = m;
    } else if(hPrime < 2) {
        r = x + m;
        g = chroma + m;
        b = m;
    } else if(hPrime < 3) {
        r = m;
        g = chroma + m;
        b = x + m;
    } else if(hPrime < 4) {
        r = m;
        g = x + m;
        b = chroma + m;
    } else if(hPrime < 5) {
        r = x + m;
        g = m;
        b = chroma + m;
    } else {
        r = chroma + m;
        g = m;
        b = x + m;
    }
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}