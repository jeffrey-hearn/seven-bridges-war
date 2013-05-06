
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

PlanetRenderer.prototype.getCoords = function(){
	return { x: this.x, y: this.y };
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
	if( this.planet.posture == 'peaceful' ){
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
	if( this.planet.posture == 'peaceful' ){
		for( var x = 0; x < this.orbiterAngles.length; x++ ){
			canvas.beginPath();
			canvas.arc(this.x, this.y, this.lowOrbit, this.orbiterAngles[x], this.orbiterAngles[x] + 0.02 * Math.PI, false);
			canvas.lineWidth = 1;
			canvas.strokeStyle = this.planet.owner.secondaryColor;
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

PlanetRenderer.prototype.draw = function(){
	this.ambience();
	this.drawPlanet();
	this.drawOrbiters();
}
