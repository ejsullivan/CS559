
function setup() {
    const BLOCK_SIZE = 80;
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var colorSelect = document.getElementById("colorSelect");
    var gridClear = document.getElementById("gridClear");
    var toggleLines = document.getElementById("toggleLines");
    var random = document.getElementById("random");
    var width = canvas.width;
    var height = canvas.height;
    var drawLines = true;
    var colorGrid;

    // If the grid is toggled on draw the grid lines
    function drawGrid() {
        var i;
        if (drawLines) {
            // Draw vertical lines
            context.beginPath();
            for (i = 0; i <= width; i += BLOCK_SIZE) {
                context.moveTo(i, 0);
                context.lineTo(i, height);
                context.stroke();
            }

            // Draw horizontal lines
            for (i = 0; i <= height; i += BLOCK_SIZE) {
                context.moveTo(0, i);
                context.lineTo(width, i);
                context.stroke();
            }
            context.closePath();
        }
    }

    // Initialize the color grid to be white
    function initializeColorGrid() {
        var i, j;
        colorGrid = new Array(width/BLOCK_SIZE);
        for (i = 0; i < width/BLOCK_SIZE; i++) {
            colorGrid[i] = new Array(height/BLOCK_SIZE);
            for (j = 0; j < height/BLOCK_SIZE; j++) {
                colorGrid[i][j] = 'white';
            }
        }
    }

    // Draw the colored blocks
    function drawBlocks() {
        var i, j;
        var color;
        for (i = 0; i < width/BLOCK_SIZE; i++) {
            for (j = 0; j < height/BLOCK_SIZE; j++) {
                color = colorGrid[i][j];
                context.fillStyle = color;
                context.fillRect(i*BLOCK_SIZE, j*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }

    // Draw everything on the canvas
    function draw() {
        // clear the canvas
        canvas.width = canvas.width;
        drawBlocks();
        drawGrid();
    }

    // Clears all of the colors off of the grid
    function clearGrid() {
        initializeColorGrid();
        draw();
    }

    // Turn the grid lines on/off
    function toggleGridLines() {
        drawLines = !drawLines;
        draw();
    }

    // Return the x, y coordinates of the event
    function getMousePosition(event) {
        return {i: Math.floor(event.clientX/BLOCK_SIZE), j: Math.floor(event.clientY/BLOCK_SIZE)};
    }

    // On a mouse click this function fills in the pixel color at current mouse location
    function updatePixelColor(event) {
        var position = getMousePosition(event);
        colorGrid[position.i][position.j] = colorSelect.options[colorSelect.selectedIndex].value;
        draw();
    }

    // Get a random color string of the form #[0-9,A-F]x6
    function getRandomColor() {
        var i;
        var hex = '0123456789ABCDEF';
        var color = '#'
        for (i = 0; i < 6; i++) {
            color += hex[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Put a random color on each square on the grid
    function randomColorGrid() {
        var i, j;
        for (i = 0; i < width/BLOCK_SIZE; i++) {
            for (j = 0; j < height/BLOCK_SIZE; j++) {
                colorGrid[i][j] = getRandomColor();
            }
        }
        draw();
    }

    canvas.addEventListener("mousedown", updatePixelColor);
    gridClear.addEventListener("click", clearGrid);
    toggleLines.addEventListener("click", toggleGridLines);
    random.addEventListener("click", randomColorGrid);
    initializeColorGrid();
    draw();
}

window.onload = setup;
