var enemy_img = new Image();
enemy_img.src = 'image/foe.png';

function Enemy(dx, dy, speed) {
	this.w = enemy_img.width;
	this.h = enemy_img.height;
	this.dx = parseInt(Math.random()*460);
	this.dy = dy || 0;

	this.flys = [];

	this.speed = speed || (Math.random()*5 + 8);
	this.lastTime = (new Date).getTime();
}

Enemy.prototype = {
	index: 10,
	update: function(){
		//在没有敌机的情况下立即生成一个
		if(this.flys.length <= 1){
			//由于背景是滑动的所以不需要控制绘制y点
			this.dx = parseInt(Math.random()*460);
			
			this.flys.push(new Enemy(this.dx, this.dy));
		}
		//敌机的生成不依靠定时器，而是时间间隔
		var d = parseInt(Math.random()*480);
		if(d > 600) {
			d = 600
		}

		
		if(d%10 == 0){
			if(((new Date).getTime() - this.lastTime) > 500 && this.flys.length < 7){
				this.lastTime = (new Date).getTime();
				this.dx = d;
				this.flys.push(new Enemy(this.dx, this.dy));
			}
		}

	},
	render: function(cxt) {
		var _self = this,
			w = this.w,
			h = this.h;
		if(this.flys.length > 0) {
			for(var i = 0,r; r = this.flys[i];i ++) {
				//注意this指向
				cxt.drawImage(enemy_img, 0, 0, w, h, r.dx, r.dy += r.speed, w, h);
				if(r.dy > 710) {
					_self.flys.splice(i, 1);
				}
			}
		}
	}
};