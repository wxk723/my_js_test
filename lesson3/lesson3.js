var wxk = {};// 声明一个对象，当做命名空间使用,以方便管理
// 通过id 获取
wxk.$_i = function(id) {
	return document.getElementById(id);
};
// 通过 class 获取 元素 兼容ie
wxk.$_c = function (className, element) { 
	if (document.getElementsByClassName) { 
		return (element || document).getElementsByClassName;
	}
	var children = (element || document).getElementsByTagName("*");
	var elements = [];
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		var classNames = child.className.split(" ");
		for (var j = 0; j < classNames.length; j++) { 
			if (classNames[j] == className) { 
				elements.push(child);
				break;
			}
		}
	}
	return elements;
};
// 监听函数 兼容ie
wxk.addListener = function (target, type, handler) { 
	if (target.addEventListener) {// 符合w3c标准 浏览器
		target.addEventListener(type, handler, false);
	} else if (target.attachEvent) { // 兼容ie8一下 ie
		target.attachEvent("on" + type, handler);
	}
};
// 数据
wxk.data = [
	["photo01.jpg","thumb01.jpg"],
	["photo02.jpg","thumb02.jpg"],
	["photo03.jpg","thumb03.jpg"],
	["photo04.jpg","thumb04.jpg"],
	["photo05.jpg","thumb05.jpg"],
	["photo06.jpg","thumb06.jpg"],
	["photo07.jpg","thumb07.jpg"],
	["photo01.jpg","thumb01.jpg"],
	["photo02.jpg","thumb02.jpg"],
	["photo03.jpg","thumb03.jpg"],
	["photo04.jpg","thumb04.jpg"],
	["photo05.jpg","thumb05.jpg"],
	["photo06.jpg","thumb06.jpg"],
	["photo07.jpg","thumb07.jpg"]
];
wxk.showNumber = 0;//默认显示第几个
wxk.groupNumber = 1;//当前显示的组
wxk.groupSize = 6;//每组的数量
// 生成 缩略图 dom
wxk.showThumb = function (group) { 
	var ul = wxk.$_i("smallPhotosList");
		ul.innerHTML = '';
	var start = (group - 1) * wxk.groupSize;
	var end = group * wxk.groupSize;
	for (var i = start; (i < end && i < wxk.data.length); i++) { 
		var li = document.createElement("li");
		li.innerHTML = '<img src="' + wxk.data[i][1] + '" id="thumb' + i + '" width="80" height="40">';
		(function (i) { 
			wxk.addListener(li, "click", function () { 
				wxk.showNumber = i;
				wxk.showBig();
			});
		})(i);
		ul.appendChild(li);
	}
};
// 显示大图
wxk.showBig = function () { 
	console.log(wxk.showNumber);
	wxk.$_i("bigPhotoSrc").src = wxk.$_i("thumb" + wxk.showNumber).src.replace("thumb", "photo");
};
// 初始化
wxk.init = function () { 
	//加载 缩略图
	wxk.showThumb(1);
	wxk.addListener(wxk.$_i("next"), "click", function () { 
		wxk.nextThumb();
	});
	wxk.addListener(wxk.$_i("prev"), "click", function () { 
		wxk.prevThumb();
	});
	// 监听键盘事件 左箭头，右箭头
	wxk.addListener(document, "keyup", function (e) { 
		console.log(e);
		console.log(event);
		e = e || event;
		// 左箭头
		if (e.keyCode == 37) { 
			wxk.prevPhoto();
		}
		// 右箭头
		if (e.keyCode == 39) { 
			wxk.nextPhoto();
		}
	});
};
wxk.init();
// 下一组
wxk.nextThumb = function () { 
	if ((wxk.groupNumber * wxk.groupSize) + 1 <= wxk.data.length) { 
		wxk.showThumb(wxk.groupNumber + 1);
		wxk.showNumber = wxk.groupNumber * wxk.groupSize;
		wxk.groupNumber++;
		wxk.showBig();
	}
};
// 上一组
wxk.prevThumb = function () { 
	if (wxk.groupNumber - 1 >= 1) { 
		wxk.showThumb(wxk.groupNumber - 1);
		wxk.groupNumber--;
		wxk.showNumber = wxk.groupNumber * wxk.groupSize - wxk.groupSize;
		wxk.showBig();
	}
};
// 下一张大图
wxk.nextPhoto = function () { 
	if (wxk.showNumber % wxk.groupSize == (wxk.groupSize - 1)) {
		wxk.nextThumb();
	} else if (wxk.showNumber < wxk.data.length - 1) {
		wxk.showNumber++;
		wxk.showBig();
	}
};
// 上一张大图
wxk.prevPhoto = function(){
	if(wxk.showNumber == ((wxk.groupNumber-1)*wxk.groupSize)){
		wxk.prevThumb()
	}else if(wxk.showNumber>0){
		wxk.showNumber--;
		wxk.showBig();
	}
};