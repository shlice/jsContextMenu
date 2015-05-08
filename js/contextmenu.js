/*
 * 自定义右键菜单通用类
 * 需加载contextmenu.css和两个资源图片
 * author: shild 2012/10/31
 * 
 * 菜单不显示状态下，不占位不显示，display:none
 * 菜单显示前，占位不显示，display:block,visibility:hidden
 * 菜单显示，占位且显示，display:block,visibility:visible
 */
var ContextMenu = {
	_myMenu: '',
	_myMenuId: '',
	_gap: 5,//二级菜单动态调整至一级的左侧时，需要一个偏移量来和一级产生叠加效果
	_hidden: true,
	init: function(menuId) {
		if(!menuId)
			return;
		this._myMenuId = menuId;

		var myMenu = document.getElementById(menuId);
		if(!myMenu)
			return;
		this._myMenu = myMenu;

		// 外部应添加点击鼠标右键显示菜单的逻辑
		document.oncontextmenu = function(ev) {// 该函数晚于svg中的onClick事件触发，在firefox中有问题，经常不会触发。
			return false; //阻止系统事件，创建系统菜单
		}

		// 外部应添加点击鼠标消除菜单的逻辑，此处防止某些情况的遗漏
		document.onclick = function() {
			myMenu.style.display = "none";
		};
	},
	//激活菜单显示
	showContextmenu: function(ev) {
		var oEvent = ev || event;

		// 防止溢出，首先调整到左上角，再显示
		this._myMenu.style.left = '0px';
		this._myMenu.style.top = '0px';
		this._myMenu.style.visibility = "hidden";
		this._myMenu.style.display = "block";
		
		// 计算位置
		var w = document.documentElement.clientWidth;
		var h = document.documentElement.clientHeight;
		if(w == null || w == 0)
			w = document.body.clientWidth;
		if(h == null || h == 0)
			h = document.body.clientHeight;

		var menuW = this._myMenu.offsetWidth;
		var menuH = this._myMenu.offsetHeight;

		// 调整二级菜单的位置，参考win7的行为。
		// 选择所有二级菜单ul
		var l2menu = $("#" + this._myMenuId + " > ul ul");
		var that = this;
		$.each(l2menu, function(n, item) {
			if(oEvent.clientX + item.offsetLeft + item.offsetWidth > w)
				item.style.right = (item.offsetWidth - that._gap) + "px";
			if(oEvent.clientY + item.offsetTop + item.offsetHeight > h)
				item.style.top = (- item.offsetHeight + 23) + "px";
		});
		
		// 调整一级菜单的位置，参考win7的行为。
		if(oEvent.clientX + menuW > w)
			this._myMenu.style.left = (w - menuW) + 'px';
		else
			this._myMenu.style.left = oEvent.clientX + 'px';

		if(oEvent.clientY + menuH > h)
			this._myMenu.style.top = (oEvent.clientY - menuH) + 'px';
		else
			this._myMenu.style.top = oEvent.clientY + 'px';

		if(!ContextMenu._hidden){
			this._myMenu.style.visibility = "visible";
		}
	},
	setContextMenu: function(menustr) {
		this.clearContextMenu();
		this.addContextMenu(menustr);
	},
	addContextMenu: function(menustr) {
		this.importHtmlDocByStr(this._myMenu, menustr);
	},
	clearContextMenu: function() {
		while (node = this._myMenu.firstChild){
			this._myMenu.removeChild(node);
		}

		this._hidden = true;
		this._myMenu.style.display = "none";
	},
	hideContextMenu: function() {
		this._hidden = true;
		this._myMenu.style.display = "none";
	},
	// 将htmlstr表示的html段落导入到节点node下
	importHtmlDocByStr: function(srcnode, htmlstr) {
		var div = document.createElement('div');
		div.innerHTML = htmlstr;
		var node;
		fragment = document.createDocumentFragment();
		var hasChild = false;
		while (node = div.firstChild){
			fragment.appendChild(node);

			hasChild = true;
		}

		if(hasChild)
			this._hidden = false;
		else
			this._hidden = true;

		srcnode.appendChild(fragment);
	}
}
