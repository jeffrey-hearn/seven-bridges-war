
function ConnectionRenderer ( connection ){
	this.connection = connection;
	this.endPoints = [{
		planet: connection.planets[0],
		coords: this.getEdgePoint( connection.planets[0].planetRenderer, connection.planets[1].planetRenderer )
	},
	{
		planet: connection.planets[1],
		coords: this.getEdgePoint( connection.planets[1].planetRenderer, connection.planets[0].planetRenderer )
	}];

}

// Takes two planet renderers and returns the coords on the
// periphery of the reference planet that point to the neighbor
ConnectionRenderer.prototype.getEdgePoint = function( reference, neighbor ){
	// Get the angle from the reference planet to the neighbor
	var adj = reference.x - neighbor.x;
	var opp = reference.y - neighbor.y;
	var theta = Math.atan( opp / adj );

	// Adjust theta for signs not placing theta in the correct quadrent
	if( adj > 0 && opp > 0 )
		theta += Math.PI;
	if( adj > 0 && opp < 0 )
		theta += Math.PI;

	// Triangulate coordinate
	var edgeX = reference.x + Math.cos( theta ) * reference.highOrbit;
	var edgeY = reference.y + Math.sin( theta ) * reference.highOrbit;
	return { x: edgeX, y: edgeY };
}

ConnectionRenderer.prototype.drawEdgePoints = function(){
	for ( var x = 0; x < this.endPoints.length; x++ ) {
		var coords = this.endPoints[x].coords;
		canvas.beginPath();
		canvas.arc( coords.x, coords.y, 4, 0, 2 * Math.PI, false );
		canvas.fillStyle = 'black';
		canvas.fill();
	}
}

ConnectionRenderer.prototype.drawConnection = function(){
	var alpha = this.endPoints[0].coords;
	var beta = this.endPoints[1].coords;

	// Line connecting planets
	canvas.beginPath();
	canvas.moveTo( alpha.x, alpha.y );
	canvas.lineTo( beta.x, beta.y );
	canvas.lineWidth = 0.2;
	canvas.stroke();
}

ConnectionRenderer.prototype.draw = function() {
	this.drawEdgePoints();
	this.drawConnection();
}
