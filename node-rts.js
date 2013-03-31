
// Constants
var	  CANVAS_WIDTH = 700
	, CANVAS_HEIGHT = 500
	, FPS = 30
	, ORBITAL_SPEED = 0.005
	, PLANET_RADIUS = 40;

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

function update() {
	testNode.orbitOrbiter();
}

function draw() {
	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	testNode.draw();
}

var player1 = {
	primaryColor: "#9B59B6",
	secondaryColor: "#8E44AD"
};

var testNode = {
	owner: player1,
	planetRadius: PLANET_RADIUS,
	x: 200,
	y: 200,
	lowOrbit: PLANET_RADIUS + 20,
	highOrbit: PLANET_RADIUS + 100,
	midOrbit: PLANET_RADIUS + 60,
	posture: 'peaceful',
	orbiterAngles: new Array(16),
	initOrbiters: function(){
		for( x = 0; x < this.orbiterAngles.length; x++ ){
			this.orbiterAngles[x] = Math.random() * 2 * Math.PI;
		}
	},
	orbitOrbiter: function(){
		for( x = 0; x < this.orbiterAngles.length; x++ ){
			this.orbiterAngles[x] += ORBITAL_SPEED;
			if ( this.orbiterAngles[x] > (2 * Math.PI) )
				this.orbiterAngles[x] = this.orbiterAngles[x] - (2 * Math.PI);
		}
	},
	draw: function(){
		// Base planet
		canvas.beginPath();
		canvas.arc(this.x, this.y, this.planetRadius, 0, 2 * Math.PI, false);
		canvas.fillStyle = this.owner.primaryColor;
		canvas.fill();
		canvas.lineWidth = 3;
		canvas.strokeStyle = this.owner.secondaryColor;
		canvas.stroke();


		// Orbiters
		for( x = 0; x < this.orbiterAngles.length; x++ ){
			canvas.beginPath();
			canvas.arc(this.x, this.y, this.lowOrbit, this.orbiterAngles[x], this.orbiterAngles[x] + 0.02 * Math.PI, false);
			canvas.lineWidth = 3;
			canvas.strokeStyle = this.owner.secondaryColor;
			canvas.stroke();
		}
	}
};
testNode.initOrbiters();




