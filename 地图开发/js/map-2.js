(function(){
	var map = new AMap.Map("map");
	map.setCity("北京市");
	map.setZoom(10);

	//鼠标工具
	// map.plugin(["AMap.MouseTool"],function(){
	// 	var tool = new AMap.MouseTool(map);

	// 	tool.circle();
	// });


	//点聚合
	map.plugin(["AMap.MarkerClusterer"],function(){
		var cl = new AMap.MarkerClusterer(map,initMarker());
	});

	function initMarker(){
		var mapBounds = map.getBounds(),
		sw = mapBounds.getSouthWest(),
		ne = mapBounds.getNorthEast(),
		lngSpan = Math.abs(sw.lng-ne.lng),
		latSpan = Math.abs(sw.lat-ne.lat),
		markers = [];

		for(var i= 0;i<500;i++){
			var markerPosition = new AMap.LngLat(sw.lng+lngSpan*(Math.random()*1),ne.lat+latSpan*(Math.random()*1));
			var marker = new AMap.Marker({
				position:markerPosition
			});
			markers.push(marker);
		}
		return markers;
	}

	//热力图
	map.plugin(["AMap.Heatmap"],function(){
		var heatmap = new AMap.Heatmap(map);
		var points = [
			{"lng":116.191031,"lat":39.988585,"count":10},
		    {"lng":116.389275,"lat":39.925818,"count":11},
		    {"lng":116.287444,"lat":39.810742,"count":12},
		    {"lng":116.481707,"lat":39.940089,"count":13},
		    {"lng":116.410588,"lat":39.880172,"count":14},
		    {"lng":116.394816,"lat":39.91181,"count":15},
		    {"lng":116.416002,"lat":39.952917,"count":16}
		];
		heatmap.setDataSet({
			data:points
		});
	});

})();