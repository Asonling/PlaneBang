
function Bullet(x,y,speed){
	this.dx = x;
	this.dy = y;
	this.w = 10;
	this.h = 10;
	this.speed = speed || 10;
};
Bullet.prototype = {
	index :120,
	render:function(cxt){
		var w = this.w;
		var h = this.h;
		cxt.beginPath();
		cxt.fillStyle="red";
		cxt.arc(this.dx, this.dy -= this.speed, 5, null, 300, null);
		cxt.fill();
	}
};
