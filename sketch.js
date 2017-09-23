function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

var grid;
var cols;
var rows;
var w = 20;

var totalBees = 20;

function setup() {
    createCanvas(201, 201);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }

    // pick totalBees spots
    for (var n = 0; n < totalBees; n++) {
        var i = floor(random(cols));
        var j = floor(random(rows));
        if (!grid[i][j].bee) {
            grid[i][j].bee = true;
        } else {
            n--;
        }
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].countBees();
        }
    }
}

function gameOver() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].revealed = true;
        }
    }
}

function mousePressed() {
    //background(0);
    if (mouseButton == LEFT) {
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                if (grid[i][j].contains(mouseX, mouseY)) {
                    grid[i][j].reveal();

                    if (grid[i][j].bee) {
                        gameOver();
                    }
                }
            }
        }
    }
    if (mouseButton == CENTER) {
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                if (grid[i][j].contains(mouseX, mouseY)) {
                    grid[i][j].mark();
                }
            }
        }
    }
}

function draw() {
    background(255);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}