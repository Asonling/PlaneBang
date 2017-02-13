var Bg_img = new Image();
Bg_img.src = 'image/bg.jpg';
// var Bg_img2 = new Image();
// Bg_img2.src = 'image/sky.jpg';

function Bg(x, y, speed){
	this.x = x || 500;
	this.y = y || 700;
	this.speed = speed || 10;
}
Bg.prototype = {
	index: -100,
	//控制背景滑动距离
	v: 0,
	m: -Bg_img.height,
	update: function(){
		this.speed += 0.002;
	},
	render: function(cxt){
		//绘制工作
		var width = Bg_img.width,
			height = Bg_img.height;
		cxt.drawImage(Bg_img, 0, 0, width, height, 0, this.v += this.speed, 500, height);
		cxt.drawImage(Bg_img, 0, 0, width, height, 0, this.m += this.speed, 500, height);
		//背景逻辑工作
		if(this.v >= height){
			this.v = 0;
		}
		if(this.m >= 0){
			this.m = -height;
		}
	}
}