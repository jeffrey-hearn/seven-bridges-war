
$(document).ready(function() {


	console.log('Starting up...');

	//var elem = document.getElementById('draw-shapes').children[0];
	var params = {
		fullscreen: true,
		autostart: true, 
		type: Two.Types.canvas
	};
	window.two = new Two(params).appendTo( $('body').get(0) );

	// Game loop
	setInterval( function(){
		update();
	}, GAME_SPEED);

	function update() {

	}

	var player1 = new Player("#9B59B6", "#8E44AD");

	var testNodes = [];
	//testNodes.push( new Planet(player1,300,200) );
	//testNodes.push( new Planet(player1,450,100) );
	//testNodes.push( new Planet(player1,600,150) );

	// Poisson Disk Map
	// width, height, min dist between points, sample frequency
	var padding = 75;
	var sampler = new PoissonDiskSampler(
		two.width - 2 * padding, 
		two.height - 2 * padding,
		PLANET_RADIUS * 6,
		30
		);
	var solution = sampler.sampleUntilSolution();
	solution.forEach( function ( point, index, array ) {
		testNodes.push( new Planet( player1, point.x + padding, point.y + padding ));
	});


	var testConns = [];
	testConns.push( new Connection( testNodes[0], testNodes[1] ) );
	testConns.push( new Connection( testNodes[1], testNodes[2] ) );
	testConns.push( new Connection( testNodes[0], testNodes[2] ) );

	console.log(testNodes);
	console.log(testConns)

});
