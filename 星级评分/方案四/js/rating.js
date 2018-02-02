var rating = (function(){
	//策略
	var strategies = {
		entire:function(){
			return 1;
		},
		half:function(){
			return 2;
		},
		quarter:function(){
			return 4;
		}
	}

	//评分
	var Rating = function(el,options){
		this.$el = $(el);
		this.opts = $.extend({},Rating.DEFAULTS,options);

		if(!strategies[this.opts.mode]){
			this.opts.mode = "entire";
		}
		this.ratio = strategies[this.opts.mode]();

		this.opts.total *=this.ratio;
		this.opts.num *=this.ratio;

		this.itemWidth = 15/this.ratio;
		this.displayWidth = this.itemWidth*this.opts.num;

	};

	Rating.DEFAULTS = {
		mode:"entire",
		total:5,
		num:2,
		readOnly:false,
		select:function(){},
		chosen:function(){}
	};

	//初始化
	Rating.prototype.init = function(){
		this.buildHTML();
		this.setCSS();
		if(!this.opts.readOnly){
			this.bindEvent();
		}
		
	};


	//创建HTML
	Rating.prototype.buildHTML = function(){
		var html = "";

		html += '<div class="rating-display"></div><ul class="rating-mask">';
		for (var i = 0;i<this.opts.total;i++){
			html += '<li class="rating-item"></li>';
		}
		html += '</ul>';

		this.$el.html(html);

	};

	//设置CSS
	Rating.prototype.setCSS = function(){
		this.$el.width(this.opts.total*this.itemWidth);
		this.$display = this.$el.find(".rating-display");
		this.$display.width(this.displayWidth);
		this.$el.find(".rating-item").width(this.itemWidth);
	};

	//绑定事件
	Rating.prototype.bindEvent = function(){
		var self = this;

		self.$el.on("mouseover",".rating-item",function(){
			var count = $(this).index()+1;
			self.$display.width(self.itemWidth*count);

			//(typeof self.opts.select === "function")&&self.opts.select.call(this,count,self.opts.total);

			self.$el.trigger("select",[count,self.opts.total]);
		}).on("click",".rating-item",function(){
			var count = $(this).index()+1;
			self.displayWidth = self.itemWidth*count;

			(typeof self.opts.chosen === "function")&&self.opts.chosen(self);
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
	mode:"quarter",
	total:7,
	num:4,
	readOnly:false,
	chosen:function(obj){
		obj.unbindEvent();
	}
})