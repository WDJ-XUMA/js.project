var rating = (function(){

	//评分
	var Rating = function(el,options){
		this.$el = $(el);
		this.opts = $.extend({},Rating.DEFAULTS,options);

		this.itemWidth = 15;
		this.displayWidth = this.itemWidth*this.opts.num;

	};

	Rating.DEFAULTS = {
		total:5,
		num:2,
		readOnly:false,
		select:function(){},
		chosen:function(){}
	};

	//初始化
	Rating.prototype.init = function(){
		this.setCSS();
		if(!this.opts.readOnly){
			this.bindEvent();
		}
		
	};



	//设置CSS
	Rating.prototype.setCSS = function(){
		this.$el.width(this.opts.total*this.itemWidth);
		this.$display = this.$el.find(".rating-display");
		this.$display.width(this.displayWidth);
	};

	//绑定事件
	Rating.prototype.bindEvent = function(){
		var self = this;

		self.$el.on("mousemove",".rating-item",function(e){
			var count = e.pageX - $(this).offset().left;
			self.$display.width(count);

			//(typeof self.opts.select === "function")&&self.opts.select.call(this,count,self.opts.total);

			//self.$el.trigger("select",[count,self.opts.total]);
		}).on("click",".rating-item",function(e){
			var count = e.pageX - $(this).offset().left;
			self.displayWidth = count;

			//(typeof self.opts.chosen === "function")&&self.opts.chosen(self);
			//self.$el.trigger("chosen",[count,self.opts.total]);
		}).on("mouseout",function(){
			self.$display.width(self.displayWidth);
		});
	};

	//解绑事件
	Rating.prototype.unbindEvent = function(){
		this.$el.off();
	};



	var init = function(el,option){
		// var $el = $(el),
		// 	rating = $el.data("rating");

		// if(!rating){
		// 	$el.data("rating",(rating = new Rating(el,typeof option === "object"&&option)));
		// 	rating.init();
		// }

		// if(typeof option === "string"){
		// 	rating[option]();
		// }
		new Rating(el,option).init();
	};

	//jQuery插件
	$.fn.extend({
		rating:function(option){
			return this.each(function(){
				init(this,option);
			});
		}
	});
		
		


	return {
		init:init
	};
})();


// rating.init("#rating",{
// 	total:6,
// 	num:3,
// 	readOnly:false,
// 	// select:function(count,total){
// 	// 	console.log(this);
// 	// 	console.log(count+"/"+total);
// 	// },
// 	chosen:function(count,total){
// 		rating.init("#rating","unbindEvent");
// 	}
// });

$("#rating").rating({
	total:7,
	num:4,
	readOnly:false,
	chosen:function(obj){
		obj.unbindEvent();
	}
})