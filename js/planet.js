
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
