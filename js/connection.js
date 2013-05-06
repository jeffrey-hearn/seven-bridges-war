
function Connection ( planet1, planet2 ) {
	this.planets = [ planet1, planet2 ];
	this.connectionRenderer = new ConnectionRenderer( this );
	
	// Introduce the new neighbors
	planet1.neighbors.push( planet2 );
	planet2.neighbors.push( planet1 );
}


