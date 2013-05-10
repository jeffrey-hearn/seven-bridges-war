
var   ORBITAL_SPEED = 0.009
	, PEACEFUL_ORBITERS = 10
	, ORBITER_LENGTH = 0.01 * 2 * Math.PI
	, PLANET_RADIUS = 13;

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

// Creates set of points interpolated along the
// curve of a circle
//		circle is a coord object { x: 1, y: 3 }
//		angles in radians
//		resolution is the number of tween points
function arcPointsGivenAngle ( center, radius, begAngle, endAngle, resolution ) {
	var a = []
	if ( resolution == 0 )
		var step = endAngle - begAngle;
	else
		var step = (endAngle - begAngle) / resolution;
	for ( var i = begAngle; i <= endAngle; i += step ) {
		a.push( coordOnCircle( center, radius, i ) );
	}
	return a;
}

function coordOnCircle ( center, radius, theta ) {
	return new Two.Vector(
		center.x + radius * Math.sin( theta ),
		center.y + radius * Math.cos( theta )
		);
}

PlanetRenderer.prototype.coords = function(){
	return { x: this.x, y: this.y };
}

PlanetRenderer.prototype.initOrbiters = function(){

	this.orbiterGroup = two.makeGroup();

	for ( var i = 0; i < PEACEFUL_ORBITERS; i++ ) {
		// Add an arc to the top of the circle in the group
		var theta = Math.random() * 2 * Math.PI;
		var e = two.makeCurve( arcPointsGivenAngle(
			{ x: 0, y: 0 },
			this.lowOrbit,
			theta,
			theta + ORBITER_LENGTH,
			5
			), true );
		e.noFill();
		e.stroke = this.planet.owner.secondaryColor;
		e.linewidth = 2;
		this.orbiterGroup.add( e );
	}

	this.orbiterGroup.translation.set( this.x, this.y );

	var scope = this;
	two.bind('update', function( frameCount ) {
		scope.orbiterGroup.rotation += ORBITAL_SPEED * 2 * Math.PI;
	});

}

