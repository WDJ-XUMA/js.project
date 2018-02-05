window.onload=function(){
	var num = 2,
		$rating = $("#rating"),
		$item = $rating.find(".rating-item");

	//点亮
	var lightOn=function(num){
		$item.each(function(index){
			if(index < num){
				$(this).css("background-position","0 -15px");
			}else{
				$(this).css("background-position","0 0");
			}
		});
	};

	//初始化
	lightOn(num);

	//事件绑定
	$item.on("mouseover",function(){
		lightOn($(this).index()+1);
	}).on("click",function(){
		num = $(this).index()+1;
	});
	$rating.on("mouseout",function(){
		lightOn(num);
	});

};

