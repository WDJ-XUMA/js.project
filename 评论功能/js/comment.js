window.onload =function(){
	var list = document.getElementById("list");
	var lis = list.children;

	//删除节点
	function removeNode(node){
		node.parentNode.removeChild(node);
	}
	//赞分享
	function praiseBox(box,el){
		var praiseElement = box.getElementsByClassName("praises-total")[0];
		var oldTotal = parseInt(praiseElement.getAttribute("total"));
		var newTotal;
		var txt = el.innerHTML;

		if(txt == "赞"){
			newTotal = oldTotal +1;
			praiseElement.innerHTML = (newTotal==1)?"我觉得很赞":("我和"+oldTotal+"个人觉得很赞");
			el.innerHTML = "取消赞";
		}else{
			newTotal = oldTotal -1;
			praiseElement.innerHTML = (newTotal==0)?"":newTotal+"个人觉得很赞";
			el.innerHTML = "赞";
		}
		praiseElement.setAttribute("total",newTotal);
		praiseElement.style.display=(newTotal==0)?"none":"block";

	}

	for (var i=0;i<lis.length;i++){
		lis[i].onclick = function(e){
			e = e||window.event;
			var el = e.srcElement;
			switch(el.className){
				case "close":
					removeNode(el.parentNode);
					break;
				//赞分享
				case "praise":
					praiseBox(el.parentNode.parentNode.parentNode,el);
					break;

			}
		};
	}
}