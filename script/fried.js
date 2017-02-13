var boom_img = new Image();
boom_img.src = 'image/bang.png';

function Fried() {
	this.life = 5;
	this.count = 0;
	this.ps = [];
}

Fried.prototype = {
	index: 120,
	update:function (){
		//生命检测
		if(this.life <= 0) {
			var dom = document.getElementById("tip-area");
		        dom.style.display = "block";
		        document.getElementById("main").appendChild(dom);

			this.stage.stop();
		}
	 //碰撞检测
		var p = this.plane;
		//战机碰撞检测
		for(var i = 0, f; f = this.enemys[i]; i ++) {
			//需要我机和敌机的位置信息
			if(p.dy<=f.dy+f.h&&p.dx<=f.dx+f.w&&f.dx<=p.dx+p.w&&f.dy<=p.dy+p.h) {
				this.enemys.splice(i, 1);
				this.ps.push(new Boom(f.dx, f.dy, 0));
				this.count ++;
				this.life --;
				//保存碰撞的位置信息
			}

			//子弹碰撞检测
			if(this.bullets.length > 0) {
				for(var j = 0, b;b = this.bullets[j]; j++) {
					if(b.dy<=f.dy+f.h&&f.dx<=b.dx+b.w&&b.dx<=f.dx+f.w&&f.dy<=b.dy+b.h) {
						this.enemys.splice(i, 1);
						this.bullets.splice(j, 1);
						this.ps.push(new Boom(f.dx, f.dy, 0));
						this.count ++;
					}
				}
			}
		}

	},
	render: function(cxt) {
		cxt.font = "17px 黑体";
	    cxt.fillStyle="#fff";
	    cxt.fillText("消灭敌机总数："+this.count,20,30);
	    cxt.fillText("当前生命力："+this.life,380,30);

	    for(var j = 0, r; r = this.ps[j]; j++){
	      if(r.i < 21){
	        cxt.drawImage(boom_img, (r.i ++) * 120, 0, 120, 90, r.dx - 20, r.dy, 120, 90);
	      }else{
	        this.ps.splice(j,1);
	        r.i = 0;
	      }
	    }		
	}
}
