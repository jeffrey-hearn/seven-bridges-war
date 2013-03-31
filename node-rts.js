
// Constants
var CANVAS_WIDTH = 700;
var CANVAS_HEIGHT = 500;
var FPS = 60;

// Add canvas to page
var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
console.log( canvasElement );
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('body');

// Game loop
setInterval(function() {
	update();
	draw();
}, 1000/FPS);


var r = 10;

function update() {
	r += 2;
}

function draw() {

	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	canvas.beginPath();
	canvas.arc(200, 200, r, 0, 2 * Math.PI, false);
	canvas.fillStyle = '#eee';
	canvas.fill();
	canvas.lineWidth = 1;
	canvas.strokeStyle = '#ccc';
	canvas.stroke();

}

