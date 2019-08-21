/*-------------useful functions--------------------------------------*/

function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != 'function') {
		window.onload = func;
	}
	else {
		window.onload = function() {
			oldonload;
			func();
		}
	}
}

/*将newElement元素插入到targetElement元素之后*/
function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}
	else {
		insertBefore(newElement,targetElement.nextSibling);
	}
}

function addClass(element,classValue) {
	if(!element.className) {
		element.className = classValue;
	}
	else {
		newClassName = element.className;
		newClassName += " ";
		newClassName += classValue;
		element.className = newClassName;
	}
}


function highLightPage() {
	if(!document.getElementsByTagName) {
		return false;
	}
	var navs = document.getElementsByTagName('nav');
	if(navs.length == 0) {
		return false;
	}
	var links = navs[0].getElementsByTagName('a');
	if(links.length == 0) {
		return false;
	}
	for(var i = 0;i < links.length;i++) {
		var linkURL;
		linkURL = links[i].getAttribute('href');
		if(window.location.href.indexOf(linkURL) != -1) {
			links[i].className = "active";
		}
	}
}

/*showPic函数的改进版*/
function showPic(whichPic) {
	if(!document.getElementById("placeholderImage")) {//检查文档中id为placeholderImage的图片是否存在
		return false;
	}
	var source = whichPic.getAttribute("href");
	var placeholderImage = document.getElementById("placeholderImage");
	if(placeholderImage.nodeName != "IMG") {
		return false;
	}
	placeholderImage.setAttribute("src",source);
	
	if(document.getElementById("description")) {//如果没找到该描述段落，则忽略，只保证上面的图片可以正常替换就行，图片的描述找不到就不执行下面的代码
		var description = document.getElementById("description");
		var text = whichPic.getAttribute("title") ? whichPic.getAttribute("title") : "";//如果没有title属性，则替换文本显示空字符串
		if(description.firstChild.nodeType == 3) {
			description.firstChild.nodeValue = text;
		}
	}
	return true;	//返回true表示showPic函数执行成功
}
/*把文档中的事件处理函数分离出来——分离成以下的事件处理函数*/
function prepareGallary() {
	if(!document.getElementById) {
		return false;
	}
	if(!document.getElementsByTagName) {
		return false;
	}
	if(!document.getElementById("imageGallery")) {
		return false;
	}
	var imageGallery = document.getElementById("imageGallery");
	var links = imageGallery.getElementsByTagName("a");
	for(var i = 0;i < links.length;i++) {
		/*links[i].onclick = function() {
			showPic(this);
			return false;//取消当点击链接时浏览器打开新窗口的默认行为
		}*/
		/*上面注释掉的三行代码可以用下面的代码来改进，以使得可以平稳退化——如果showPic函数未执行成功，
		则不要取消浏览器对点击链接的默认行为，使得图片可以正常显示（只不过打开新窗口显示，用户体验
		稍微差了些，但是也要比点击链接没反应好得多），如果showPic函数返回true即执行成功，则!showPic为
		false，则会取消浏览器的默认行为，使得不会在新窗口打开图片*/
		links[i].onclick = function() {
			return !showPic(this);
			/*传递给showPic函数的参数是关键字this，它代表此时此刻和onclick事件相关联的那个元素，也就是说，
			this在这里代表links[i]，而links[i]又对应着links节点列表里的某个特定的节点。*/
		}
		/*上面的两行代码也可以写成：
		links[i].onclick = function() {
			if(showPic(this)) {
				return false;
			}
			else {
				return true;
			}
		}
		或者：
		links[i].onclick = function() {
			return showPic(this) ? false : true;
		}
		*/
	}
}

function loadEvents() {
	prepareGallary();
}
addLoadEvent(highLightPage);
// addLoadEvent(prepareGallary);
addLoadEvent(loadEvents);