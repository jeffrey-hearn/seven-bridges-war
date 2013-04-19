
// Constants
var	  CANVAS_WIDTH = 700
	, CANVAS_HEIGHT = 500
	, FPS = 30
	, GAME_SPEED = 2
	, ORBITAL_SPEED = 0.008
	, PLANET_RADIUS = 20;

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



function update() {

}

function draw() {
	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	for( var x = 0; x < testNodes.length; x++ ){
		testNodes[x].planetRenderer.draw();
	}
}

// Player class
function Player(pri,sec) {
	this.primaryColor = pri;
	this.secondaryColor = sec;
}

// Planet class
function Planet( player, x, y){
	// Planet attributes
	this.owner = player;
	this.posture = 'peaceful';
	this.postureCompletion = 1;
	this.neighbors = new Array();
	this.power = 1;
	this.powerGrowth = 0;

	this.planetRenderer = new PlanetRenderer( this, x, y );
}

function PlanetRenderer( planet, x, y ){
	this.planet = planet;
	// Rendering Suff
	this.planetRadius = PLANET_RADIUS;
	this.x = x;
	this.y = y;
	this.lowOrbit = PLANET_RADIUS + PLANET_RADIUS * 0.3;
	this.highOrbit = PLANET_RADIUS + PLANET_RADIUS * 1;
	this.midOrbit = (this.lowOrbit + this.highOrbit) / 2;
	this.orbiterAngles = new Array(16);
	this.init();
}

PlanetRenderer.prototype.init = function(){
	this.initOrbiters();
}

PlanetRenderer.prototype.initOrbiters = function(){
	for( var x = 0; x < this.orbiterAngles.length; x++ ){
		this.orbiterAngles[x] = Math.random() * 2 * Math.PI;
	}
}

PlanetRenderer.prototype.ambience = function(){
	if( this.posture == 'peaceful' ){
		this.orbitOrbiter();
	}
}

PlanetRenderer.prototype.orbitOrbiter = function(){
	for( var x = 0; x < this.orbiterAngles.length; x++ ){
		this.orbiterAngles[x] += ORBITAL_SPEED;
		if ( this.orbiterAngles[x] > (2 * Math.PI) )
			this.orbiterAngles[x] = this.orbiterAngles[x] - (2 * Math.PI);
	}
}

PlanetRenderer.prototype.drawOrbiters = function(){
	if( this.posture == 'peaceful' ){
		for( var x = 0; x < this.orbiterAngles.length; x++ ){
			canvas.beginPath();
			canvas.arc(this.x, this.y, this.lowOrbit, this.orbiterAngles[x], this.orbiterAngles[x] + 0.02 * Math.PI, false);
			canvas.lineWidth = 1;
			canvas.strokeStyle = this.owner.secondaryColor;
			canvas.stroke();
		}
	}
}

PlanetRenderer.prototype.drawPlanet = function(){
	canvas.beginPath();
	canvas.arc(this.x, this.y, this.planetRadius, 0, 2 * Math.PI, false);
	canvas.fillStyle = this.planet.owner.primaryColor;
	canvas.fill();
	canvas.lineWidth = 3;
	canvas.strokeStyle = this.planet.owner.secondaryColor;
	canvas.stroke();
}

PlanetRenderer.prototype.getEdgePoint = function( neighbor ){
	// Get the angle from this planet to the neighbor
	var adj = this.x - neighbor.x;
	var opp = this.y - neighbor.y;
	var theta = Math.atan( opp / adj );

	// Adjust theta for signs not placing theta in the correct quadrent
	if( adj > 0 && opp > 0 )
		theta += Math.PI;
	if( adj > 0 && opp < 0 )
		theta += Math.PI;

	// Triangulate coordinate
	var edgeX = this.x + Math.cos( theta ) * this.highOrbit;
	var edgeY = this.y + Math.sin( theta ) * this.highOrbit;
	return { x: edgeX, y: edgeY };
}

PlanetRenderer.prototype.drawEdgePoints = function(){
	for ( var x = 0; x < this.planet.neighbors.length; x++ ) {
		var coords = this.getEdgePoint( this.planet.neighbors[x] );
		canvas.beginPath();
		canvas.arc( coords.x, coords.y, 4, 0, 2 * Math.PI, false );
		canvas.fillStyle = this.owner.primaryColor;
		canvas.fill();
	}
}

PlanetRenderer.prototype.drawEdgeConnections = function(){
	for ( var x = 0; x < this.planet.neighbors.length; x++ ) {
		var thisCoords = this.getEdgePoint( this.planet.neighbors[x] );
		var neighborCoords = this.planet.neighbors[x].planetRenderer.getEdgePoint( this );

		// Line connecting planets
		canvas.beginPath();
		canvas.moveTo( thisCoords.x, thisCoords.y );
		canvas.lineTo( neighborCoords.x, neighborCoords.y );
		canvas.lineWidth = 0.2;
		canvas.stroke();
	}
}

PlanetRenderer.prototype.draw = function(){
	this.ambience();
	this.drawPlanet();
	this.drawOrbiters();
	//this.drawEdgePoints();
	this.drawEdgeConnections();
}



var player1 = new Player("#9B59B6", "#8E44AD");
var testNodes = [];
testNodes.push( new Planet(player1,300,200) );
testNodes.push( new Planet(player1,450,100) );
testNodes.push( new Planet(player1,600,150) );
testNodes[0].neighbors.push( testNodes[1] );
testNodes[1].neighbors.push( testNodes[0] );
testNodes[2].neighbors.push( testNodes[1] );
testNodes[1].neighbors.push( testNodes[2] );
testNodes[0].neighbors.push( testNodes[2] );
testNodes[2].neighbors.push( testNodes[0] );
console.log(testNodes);
//testNodes[0].getEdgePoint( testNodes[1] );





