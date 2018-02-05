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


	map.setCity("北京市");
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

	// map.plugin(["AMap.PlaceSearch"],function(){
	// 	var placesearch = new AMap.PlaceSearch({
	// 		extensions:"all"
	// 	});
	// 	//console.log(placesearch);
	// 	//placesearch.searchNearBy("餐厅",map.getCenter(),3000);
	// 	placesearch.search("香山");

	// 	AMap.event.addListener(placesearch,"complete",function(e){
	// 		console.log(e);
	// 	});
	// });
	
	//路线规划
	//驾车
	map.plugin(["AMap.Driving"],function(){
		var driving = new AMap.Driving();
		driving.search(new AMap.LngLat(116.379018,39.805626),new AMap.LngLat(116.42732,39.903752));

		AMap.event.addListener(driving,"complete",function(e){
			console.log(e);
			var steps = e.routes[0].steps;
			for(var i=0;i<steps.length;i++){
				console.log(steps[i]);
			}
		});
	});

	//公交
	map.plugin(["AMap.Transfer"],function(){
		var transfer = new AMap.Transfer();
		transfer.search(new AMap.LngLat(116.379018,39.805626),new AMap.LngLat(116.42732,39.903752));
		transfer.setCity("苏州");

		AMap.event.addListener(transfer,"complete",function(e){
			console.log(e);
			var steps = e.plans;
			for(var i=0;i<steps.length;i++){
				console.log(steps[i]);
			}
		});
	});

	//步行
	map.plugin(["AMap.Walking"],function(){
		var walk = new AMap.Walking({
			map:map
		});
		walk.search(new AMap.LngLat(116.379018,39.805626),new AMap.LngLat(116.42732,39.903752));

		AMap.event.addListener(walk,"complete",function(e){
			if(e.info === "OK"){
				var steps = e.routes[0].steps;
				addMarker(steps[0].path[0]);
				for(i=0;i<steps.length;i++){
					drawLine(steps[i].path,map);
				}
			}
			
		});
	});


	//画线
	function drawLine(data,map){
		var polyline = new AMap.Polyline({
			map:map,
			path:data,
			strokeColor:red,
			strokeOpacity:0.9,
			strokeWeight:4,
			strokeDasharray:[10,5]
		});
	}

	//添加起终点坐标
	function addMarker(position){
		var mk = new AMap.Marker({
			map:map,
			position:position
		});
	}



})();