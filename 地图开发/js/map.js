(function(){
	var map = new AMap.Map("map");
	var mk = new AMap.Marker({
		map:map,
		//draggable:true
	});

	mk.setPosition(map.getCenter());
	//mk.setContent("苏州市");

	var polyline = new AMap.Polyline();
	polyline.setMap(map);


	map.setCity("苏州市");
	//console.log(map.getCenter());
	map.setZoom(12);
	//console.log(map.getZoom());
	document.getElementById("zoomin").onclick = function(){
		map.zoomIn();
	};
	document.getElementById("zoomout").onclick = function(){
		map.zoomOut();
	};

	//添加事件
	// AMap.event.addListener(map,"dragend",function(){
	// 	alert("拖动");
	// });

	//添加控件
	map.plugin(["AMap.Scale"],function(){
		var scale = new AMap.Scale();
		map.addControl(scale);
	});

	map.plugin(["AMap.MapType"],function(){
		var type = new AMap.MapType();
		map.addControl(type);
	});

	map.plugin(["AMap.OverView"],function(){
		var view = new AMap.OverView();
		view.open();
		map.addControl(view);
	});

	map.plugin(["AMap.ToolBar"],function(){
		var tool = new AMap.ToolBar();
		map.addControl(tool);
	});

	// map.plugin(["AMap.MouseTool"],function(){
	// 	var mousetool = new AMap.MouseTool(map);
	// 	mousetool.measureArea();
	// });

	// map.plugin(["AMap.RangingTool"],function(){
	// 	var rangtool = new AMap.RangingTool(map);
	// 	rangtool.turnOn();
	// });

	AMap.event.addListener(mk,"click",function(){
		info.open(map,map.getCenter());
	});

	var info = new AMap.InfoWindow({
		closeWhenClickMap:true,
		content:"我是信息"
	});

	// map.plugin("AMap.Geolocation",function(){
	// 	var geolocation = new AMap.Geolocation({
	// 		enableHighAccuracy:true,
	// 		convert:true,
	// 		panToLoacation:true,
	// 		showMarker:true,
	// 		timeout:60000
	// 	});

	// 	geolocation.getCurrentPosition();
	// 	// AMap.event.addListener(geolocation,"complete",function(e){
	// 	// 	console.log(e);
	// 	// });
	// });

	map.plugin(["AMap.PlaceSearch"],function(){
		var placesearch = new AMap.PlaceSearch();
		//console.log(placesearch);
		placesearch.searchNearBy("餐厅",map.getCenter(),3000);

		AMap.event.addListener(placesearch,"complete",function(e){
			console.log(e);
		});

	});
	







})();