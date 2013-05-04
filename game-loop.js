requirejs([ 'jquery', 'constants', 'player', 'planet', 'planet-renderer' ],
function ( $, constants, player, planet, planetRenderer ) {

	console.log('Starting up...');

/*
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


	function draw() {
		canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		for( var x = 0; x < testNodes.length; x++ ){
			testNodes[x].planetRenderer.draw();
		}
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

*/


});
