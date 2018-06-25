function Grid(resolution) {
    this.resolution = resolution;
    this.grid;

    this.initialize = function() {
        this.grid = new Array();
        for (var x = 1; x <= (width / this.resolution); x++) {
            this.grid[x - 1] = new Array();
            for (var y = 1; y <= (height / this.resolution); y++) {
                this.grid[x - 1][y - 1] = {
                  x : x / (width / this.resolution),
                  y : y / (height / this.resolution),
                  prediction : 0.5};
            }
        }
    }

    this.fillGridWithPredicted = function(neuralNet) {
    	for (var x = 1; x <= (width / this.resolution); x++) {
            for (var y = 1; y <= (height / this.resolution); y++) {
              	var position = this.grid[x - 1][y - 1];
                position.prediction = 
                  neuralNet.predictXY(position.x, position.y);
            }
        }
    }
    
    this.show = function() {
        push();
        background(255);
        stroke(0);
        textAlign(CENTER, CENTER);
		textSize(8);
        var xCoord = 0;
        var yCoord = 0;
        var curx = 0;
        for (var s = 0; s < (width / this.resolution) * (height / this.resolution); s++) {
          	var squareValue = this.grid[xCoord][yCoord].prediction;
            fill(255 * squareValue);
            rect(0, 0, this.resolution, this.resolution);
            fill(255 - 255 * squareValue);
            text(parseFloat(Math.round(squareValue * 100) / 100).toFixed(2), resolution / 2, resolution / 2);

            curx += this.resolution;
            xCoord++;

            if (curx % width == 0 && curx!= 0) {
                translate(-(width - this.resolution), this.resolution);
                curx = 0;
                xCoord = 0;
                yCoord++;
            } else {
                translate(this.resolution, 0);
            }
        }
        pop();
    }
}