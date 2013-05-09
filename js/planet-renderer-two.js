
var   ORBITAL_SPEED = 0.008
	, PEACEFUL_ORBITERS = 16
	, ORBITER_LENGTH = 0.2 * 2 * Math.PI
	, PLANET_RADIUS = 20;

function PlanetRenderer( planet, x, y ){
	this.planet = planet;

	this.x = x;
	this.y = y;

	this.lowOrbit = PLANET_RADIUS + PLANET_RADIUS * 0.3;
	this.highOrbit = PLANET_RADIUS + PLANET_RADIUS * 1;
	this.midOrbit = (this.lowOrbit + this.highOrbit) / 2;

	this.planetPolygon = two.makeCircle(x, y, PLANET_RADIUS);
	this.planetPolygon.fill = this.planet.owner.primaryColor;
	this.planetPolygon.noStroke();

	this.initOrbiters();
}

// Creates beginning, middle, and endpoints for an arc
// as Two.Vector's that can be fed into two.makeCurve
// (sort of the way canvas does arcs, with an arc
// measured in radians instead of as interpolated points)
function arcPointsGivenAngle ( centerCoords, radius, theta ) {
	mid = new Two.Vector(
		centerCoords.x,
		centerCoords.y + radius
		);
	beg = new Two.Vector(
		centerCoords.x + radius * Math.sin( theta ),
		centerCoords.y + radius * Math.cos( theta )
		);
	end = new Two.Vector(
		centerCoords.x + radius * Math.sin( theta ) * -1,
		beg.y
		);
	return [ beg, mid, end ];
}

PlanetRenderer.prototype.coords = function(){
	return { x: this.x, y: this.y };
}

PlanetRenderer.prototype.initOrbiters = function(){

	var boundingCircle = two.makeCircle( this.x, this.y, this.midOrbit * 1.25 );
	boundingCircle.noFill();
	this.orbiterGroup = two.makeGroup( boundingCircle );

	// for ( var i = 0; i < PEACEFUL_ORBITERS; i++ ) {
	for ( var i = 0; i < 1; i++ ) {
		// Add an arc to the top of the circle in the group
		var e = two.makeCurve( arcPointsGivenAngle(
			this.coords(),
			this.midOrbit,
			ORBITER_LENGTH
			), true );
		e.noFill();
		e.stroke = this.planet.owner.secondaryColor;
		e.linewidth = 3;
		this.orbiterGroup.add( e );
		// rotate the group to a random point
		this.orbiterGroup.center();

		this.orbiterGroup.rotation = Math.random() * 2 * Math.PI;
		this.orbiterGroup.translation.set( this.x, this.y );
	}


}

