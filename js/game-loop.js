
// Add canvas to page
var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('body');

// Render loop
setInterval(function() {
	draw();
}, 1000/FPS);

// Game loop
setInterval( function(){
	update();
}, 1000/GAME_SPEED);

