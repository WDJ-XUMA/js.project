var rating = (function(){

	//点亮
	var lightOn=function($item,num){
		$item.each(function(index){
			if(index < num){
				$(this).css("background-position","0 -15px");
			}else{
				$(this).css("background-position","0 0");
			}
		});
	};


	var init = function(el,num){
		var $rating = $(el),
		$item = $rating.find(".rating-item");


		//初始化
		lightOn($item,num);

		//事件绑定
		$rating.on("mouseover",".rating-item",function(){
			lightOn($item,$(this).index()+1);
		}).on("click",".rating-item",function(){
			num = $(this).index()+1;
		}).on("mouseout",function(){
			lightOn($item,num);
		});
	}

	//JQuery插件
	$.fn.extend({
		rating:function(num){
			return this.each(function(){
				init(this,num);
			});
		}
	});

	return{
		init:init
	}


})();

rating.init("#rating",2);
//rating.init("#rating2",3);
$("#rating2").rating(4);

