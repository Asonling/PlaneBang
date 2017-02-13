var plane_img = new Image();
plane_img.src = 'image/own.png';

function Plane(x, y, speed) {
	this.dx = x || 210;
	this.dy = y || 500;
	this.speed = speed || 10;
	this.w = plane_img.width;
	this.h = plane_img.height;

	this.onkeys = [];
	this.bullets = [];

	this.lastTime = (new Date).getTime();
}	

function addKeys(onkeys){
	// var e = event || window.event;
	window.onkeydown = function(e) {
		var K = parseInt(e.keyCode);
		onkeys[K] = true;
	}
	window.onkeyup = function(event) {
		var K = parseInt(event.keyCode);
		onkeys[K] = false;
	}

}
Plane.prototype= {
	index: 100,
	update: function(){
		//这里主要是更新我机的位置信息(涉及键盘监听)
		addKeys(this.onkeys);
		this.keyEvent();
	},
	render: function(cxt) {
		//控制飞机的位置
		if(this.dx<=0){
			this.dx = 0;
		}else if(this.dx>=420){
			this.dx = 420;
		}
		if(this.dy<=0){
			this.dy = 0;
		}else if(this.dy>=600){
			this.dy = 600;
		}
		var w = this.w,
			h = this.h;
		cxt.drawImage(plane_img, 0, 0, w, h, this.dx, this.dy, w, h);

		//渲染子弹,但是并不画出来
		if(this.bullets.length > 0) {
			for(var i = 0, r;r = this.bullets[i];i++){
				r.render(cxt);
				//从数组移除超过屏幕的子弹
				if(r.y < -10) {
					this.bullets.splice(i, 1);
				}
			}
		}

	},
	isonkey: function(code) {
		if (this.onkeys[code]) {
			return true;
		}else{
			return false;
		}
	},
	onkeyAll: function(codeA, codeB) {
		if(this.isonkey(codeA) && this.isonkey(codeB)){
			return true;
		}else{
			return false;
		}
	},
	
	keyEvent: function() {
		if(this.onkeyAll("65", "87") || this.onkeyAll("37", "38")){
			//左上
			this.dx -= this.speed;
			this.dy -= this.speed;
		}else if(this.onkeyAll("65","83")||this.onkeyAll("37","40")){
			//左下
			this.dx -= this.speed;
			this.dy += this.speed;
		}else if(this.onkeyAll("68","87")||this.onkeyAll("39","38")){
			//右上
			this.dx += this.speed;
			this.dy -= this.speed;
		}else if(this.onkeyAll("68","83")||this.onkeyAll("37","40")){
			//右下
			this.dx += this.speed;
			this.dy += this.speed;
		}
		//--------------------------------------------是否发弹----------
		if(this.onkeyAll("65","32")||this.onkeyAll("37","32")){
			//左
			this.dx -= this.speed;
			this.onBullet();
		}else if(this.onkeyAll("68","32")||this.onkeyAll("39","32")){
			//右
			this.dx -= this.speed;
			this.onBullet();
		}else if(this.onkeyAll("32","87")||this.onkeyAll("32","38")){
			//上
			this.onBullet();
			this.dy -= this.speed;
		}else if(this.onkeyAll("32","83")||this.onkeyAll("32","40")){
			//下
			this.onBullet();
			this.dy += this.speed;
		}
		//--------------------------单向------------------
		if(this.isonkey("65")||this.isonkey("37")){
			//左
			this.dx -= this.speed;
		}else if(this.isonkey("68")||this.isonkey("39")){
			//右
			this.dx += this.speed;
		}else if(this.isonkey("87")||this.isonkey("38")){
			//上
			this.dy -=this.speed;
		}else if(this.isonkey("83")||this.isonkey("40")){
			//下
			this.dy += this.speed;
		}
		//判断是否按下空格键，控制发子弹
		if(this.isonkey("32")){
			this.onBullet();
		}
	},
	onBullet: function() {
		//需要检测按下键的时间，如果用户
		//一直不停按的话并不会一直发射子弹
		if(((new Date).getTime() - this.lastTime) > 300) {
			this.lastTime = (new Date).getTime();
			this.bullets.push(new Bullet(this.dx + 40, this.dy + 10));
		}
	},
};
