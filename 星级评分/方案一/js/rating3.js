var rating = (function(){

	//继承方法
	var extend = function(subClass,superClass){
		var F = function(){};
		F.prototype = superClass.prototype;
		subClass.prototype = new F();
		subClass.prototype.constructor = subClass;
	};

	//点亮
	var Light = function(el,options){
		this.$el = $(el);
		this.$item = this.$el.find(".rating-item");
		this.opts = options;
		this.add = 1;
		this.selectEvent = "mouseover";

	};

	Light.prototype.init = function(){
		this.lightOn(this.opts.num);
		if(!this.opts.readOnly){
			this.bindEvent();
		}
		
	};

	Light.prototype.lightOn = function(num){
		var num = parseInt(num);

		this.$item.each(function(index){
			if(index < num){
				$(this).css("background-position","0 -15px");
			}else{
				$(this).css("background-position","0 0");
			}
		});

	};


	Light.prototype.bindEvent = function(){
		var self = this,
			itemLength = self.$item.length;

		self.$el.on(self.selectEvent,".rating-item",function(e){
			var $this = $(this),
				num = 0;

			self.select(e,$this);
			num = $this.index()+self.add;
			self.lightOn(num);

			(typeof self.opts.select === "function")&&self.opts.select.call(this,num,itemLength);
			self.$el.trigger("select",[num,itemLength]);

		}).on("click",".rating-item",function(){
			self.opts.num = $(this).index()+self.add;
			(typeof self.opts.chosen === "function")&&self.opts.chosen.call(this,self.opts.num,itemLength);
			self.$el.trigger("chosen",[self.opts.num,itemLength]);

		}).on("mouseout",function(){
			self.lightOn(self.opts.num);
		});
	};

	Light.prototype.select = function(){
		throw new Error("子类必须重写此方法");
	};
	


	//点亮整颗
	var LightEntire = function(el,options){
		Light.call(this,el,options);
		this.selectEvent = "mouseover";

	};

	extend(LightEntire,Light);
	LightEntire.prototype.lightOn = function(num){
		Light.prototype.lightOn.call(this,num);
	};

	LightEntire.prototype.select = function(){
		this.add = 1;
	};


	//点亮半颗
	var LightHalf = function(el,options){
		Light.call(this,el,options);
		this.selectEvent = "mousemove";

	};

	extend(LightHalf,Light);
	LightHalf.prototype.lightOn = function(num){
		var count = parseInt(num),
		    isHalf = count!==num;

		Light.prototype.lightOn.call(this,count);

		if(isHalf){
			this.$item.eq(count).css("background-position","0 -29px");
		}
	};

	LightHalf.prototype.select = function(e,$this){
		if((e.pageX - $this.offset().left)< ($this.width()/2)) {//半颗
			this.add = 0.5;
		}else{
			this.add = 1;
		}
	};




	//默认参数
	var defaults = {
		mode:"LightEntire",
		num:0,
		readOnly:false,
		select:function(){},
		chosen:function(){}
	};

	var mode = {
		"LightEntire":LightEntire,
		"LightHalf":LightHalf
	};


	//初始化
	var init = function(el,options){
		    options = $.extend({},defaults,options);
		//new LightEntire(el,options).init();
		//new LightHalf(el,options).init();
		if(!mode[options.mode]){
			options.mode = "LightEntire";
		}

		new mode[options.mode](el,options).init();
		
	};
		

	return {
		init:init
	};

})();

rating.init("#rating",{
	mode:"LightHalf",
	num:2.5,
	/*select:function(num,total){
		console.log(this);
		console.log(num+"/"+total);
	}*/
});

$("#rating").on("select",function(e,num,total){
	console.log(num+"/"+total);
}).on("chosen",function(e,num,total){
	console.log(num+"/"+total);
});