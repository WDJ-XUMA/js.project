window.onload =function(){
	var list = document.getElementById("list");
	var lis = list.children;
	var timer;

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

	//发表评论
	function replayBox(box){
		var txtarea = box.getElementsByTagName("textarea")[0];
		var list = box.getElementsByClassName("comment-list")[0];
		var li = document.createElement("li");
		li.className = "comment-box clearfix";
		li.setAttribute("user","self");

		var html = '<img class="myhead" src="images/my.jpg" alt="" />'+
					'<div class="comment-content">'+
					'<p class="comment-text"><span class="user">我：</span>'+txtarea.value+'</p>'+
					'<p class="comment-time">'+
					getTime()+
					'<a href="javascript:;" class="comment-praise" total="0" my="0" style="">赞</a>'+
					'<a href="javascript:;" class="comment-operate">删除</a>'+
					'</p>'+
					'</div>'
		li.innerHTML = html;
		list.appendChild(li);
		txtarea.value = "";
		txtarea.onblur();
	}

	//获取时间
	function getTime(){
		var t = new Date();
		var time;
		var y = t.getFullYear();
		var m = t.getMonth()+1;
		var d = t.getDay();
		var h = t.getHours();
		var mi = t.getMinutes();
		m = (m<10)?"0"+m:m;
		d = (d<10)?"0"+d:d;
		h = (h<10)?"0"+h:h;
		mi = (mi<10)?"0"+mi:mi;
		time = y+"-"+m+"-"+d+" "+h+":"+mi;
		return time;

	}

	//赞回复
	function praiseReply(el){
		var oldTotal = parseInt(el.getAttribute("total"));
		var my = parseInt(el.getAttribute("my"));
		var newTotal;

		if(my == 0){
			newTotal = oldTotal+1;
			el.setAttribute("total",newTotal);
			el.setAttribute("my",1);
			el.innerHTML = newTotal+"取消赞";
		}else{
			newTotal = oldTotal-1;
			el.setAttribute("total",newTotal);
			el.setAttribute("my",0);
			el.innerHTML = (newTotal == 0)?"赞":newTotal+"赞";
		}
		el.style.display = (newTotal == 0)?"":"inline-block";

	}

	//操作回复
	function operateReply(el){
		var commentBox = el.parentNode.parentNode.parentNode;
		var box = commentBox.parentNode.parentNode.parentNode;
		var textarea = box.getElementsByClassName("comment")[0];
		var user = commentBox.getElementsByClassName("user")[0];
		var txt = el.innerHTML;

		if(txt == "回复"){
			textarea.focus();
			textarea.value = "回复"+user.innerHTML;
			textarea.onkeyup();
		}else{
			removeNode(commentBox);
		}
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

				//回复按钮灰色
				case "btn btn-off":
					clearTimeout(timer);
					break;

				//回复按钮蓝色
				case "btn":
					replayBox(el.parentNode.parentNode.parentNode);
					break;

				//赞回复
				case "comment-praise":
					praiseReply(el);
					break;

				//操作回复
				case "comment-operate":
					operateReply(el);
					break;
			}
		};

		var txtArea = lis[i].getElementsByTagName("textarea")[0];
		txtArea.onfocus =function(){
			this.parentNode.className = "text-box text-box-on";
			this.value = (this.value=="评论...")?"":this.value;
			this.onkeyup();
		};
		txtArea.onblur = function(){
			var me = this;
			if(this.value == ""){
				timer = setTimeout(function(){
					me.parentNode.className = "text-box";
					me.value = "评论...";
				},100);	
			}
		};

		//字数统计
		txtArea.onkeyup = function(){
			var len = this.value.length;
			var p = this.parentNode;
			var btn = p.children[1];
			var word = p.children[2];
			if (len <= 0 || len>140){
				btn.className = "btn btn-off";
			}else {
				btn.className = "btn";
			}
			word.innerHTML = len + "/140";

		}
	}
}