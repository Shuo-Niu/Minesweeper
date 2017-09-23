function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighborCount = 0;

    this.bee = false;
    this.revealed = false;
    this.marked = false;
}

Cell.prototype.show = function () {
    stroke(0);  // no border
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed) {
        if (this.bee && this.marked) {
            fill(0,255,0);
            ellipse(this.x + 0.5 * this.w, this.y + 0.5 * this.w, this.w * 0.5);
        } else if (this.bee) {
            fill(127);
            ellipse(this.x + 0.5 * this.w, this.y + 0.5 * this.w, this.w * 0.5);
        } else {
            fill(200);
            rect(this.x, this.y, this.w, this.w);
            if (this.neighborCount > 0) {
                textAlign(CENTER);
                fill(0);
                text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 5);
            }
        }
    } else if (this.marked) {
        fill(255,0,0);
        ellipse(this.x + 0.5 * this.w, this.y + 0.5 * this.w, this.w * 0.5);
    }
}

Cell.prototype.countBees = function () {
    if (this.bee) {
        this.neighborCount = -1;
        return;
    }
    var total = 0;
    for (var xoff = -1; xoff < 2; xoff++) {
        for (var yoff = -1; yoff < 2; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                var neighbor = grid[i][j];
                if (neighbor.bee) {
                    total++;
                }
            }
        }
    }
    this.neighborCount = total;
}

Cell.prototype.contains = function (x, y) {
    return (x > this.x && x < this.x + this.w &&
            y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function () {
    this.revealed = true;
    if (this.neighborCount == 0) {
        // flood fill
        this.floodFill();
    }
}

Cell.prototype.floodFill = function () {
    for (var xoff = -1; xoff < 2; xoff++) {
        for (var yoff = -1; yoff < 2; yoff++) {
            var i = this.i + xoff;
            var j = this.j + yoff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                var neighbor = grid[i][j];
                if (!neighbor.bee && !neighbor.revealed) {
                    neighbor.reveal();
                }
            }
        }
    }
}

Cell.prototype.mark = function () {
    this.marked = !this.marked;
}