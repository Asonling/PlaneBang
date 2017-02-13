(function() {
	window.onload = function() {
		var viewportH = window.innerHeight || document.documentElement.clientHeight;
		var viewportW = window.innerWidth || document.documentElement.clientWidth;

		var stage = new Stage();
		var sparkel = new Bg();
		var aircraft = new Plane();
		var enemy = new Enemy();
		var fry = new Fried();
		var boom = new Boom();

		fry.stage = stage;
		fry.plane = aircraft;
		fry.enemys = enemy.flys;
		fry.bullets = aircraft.bullets;
		boom.bongs = fry.ps;

		stage.addEl(sparkel);
		stage.addEl(aircraft);
		stage.addEl(enemy);
		stage.addEl(fry);
		stage.addEl(boom);

		stage.start();
	} 
})()