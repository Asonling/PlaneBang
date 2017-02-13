//创建画布 可以绘制星空、战机、敌机、子弹、爆炸场景
function Stage(w, h, speed) {
	var canvas = document.createElement('canvas');
	canvas.width = w || 500;
	canvas.height = h || 700;
	console.log(canvas);
	var parent = parent || document.getElementById('main');

	parent.appendChild(canvas);

	this.cxt = canvas.getContext('2d');
	this.updates = [];
	this.renders = [];

	this.speed = speed || 40;
}
Stage.prototype = {
	isFunction: function(obj){
		return typeof(obj) == 'function' || obj instanceof 'Function';
	}, 
	addEl: function(el) {
		if(el.update && this.isFunction(el.update)) {
			this.updates.push(el)
		}
		if(el.render && this.isFunction(el.render)) {
			this.renders.push(el)
		}
	},
	romove :function(el){
		if(i = updates.indexof(el)>-1){
			this.updates.splice(i,1);
		}
		if(i = renders.indexof(el)>-1){
			this.renders.splice(i,1);
		}
	},
	update: function() {
		// for(var i = 0, up; i < this.updates.length;i ++) {
		// 	up = this.updates[i]
		// 	up.update()
		// }
		//逐个执行数组里面添加进去的元素的相关方法
		for(var i = 0, up; up = this.updates[i ++];) {
			up.update();
		}

	},
	render: function() {
		//首先对数组里面的元素排序（根据index）即层体现不同;
		this.renders.sort(function(el1, el2) {
			return el1.index - el2.index
		})
		for(var i = 0, r; r = this.renders[i++];){
			r.render(this.cxt)
		}
	},
	start: function() {
		var _self = this
		this.timer = setInterval(function() {
			_self.update()
			_self.render()
		}, _self.speed)
	},
	stop: function() {
		clearInterval(this.timer)
		delete(this.timer)
	},
};