/*
 * �Զ����Ҽ��˵�ͨ����
 * �����contextmenu.css��������ԴͼƬ
 * author: shild 2012/10/31
 * 
 * �˵�����ʾ״̬�£���ռλ����ʾ��display:none
 * �˵���ʾǰ��ռλ����ʾ��display:block,visibility:hidden
 * �˵���ʾ��ռλ����ʾ��display:block,visibility:visible
 */
var ContextMenu = {
	_myMenu: '',
	_myMenuId: '',
	_gap: 5,//�����˵���̬������һ�������ʱ����Ҫһ��ƫ��������һ����������Ч��
	_hidden: true,
	init: function(menuId) {
		if(!menuId)
			return;
		this._myMenuId = menuId;

		var myMenu = document.getElementById(menuId);
		if(!myMenu)
			return;
		this._myMenu = myMenu;

		// �ⲿӦ��ӵ������Ҽ���ʾ�˵����߼�
		document.oncontextmenu = function(ev) {// �ú�������svg�е�onClick�¼���������firefox�������⣬�������ᴥ����
			return false; //��ֹϵͳ�¼�������ϵͳ�˵�
		}

		// �ⲿӦ��ӵ����������˵����߼����˴���ֹĳЩ�������©
		document.onclick = function() {
			myMenu.style.display = "none";
		};
	},
	//����˵���ʾ
	showContextmenu: function(ev) {
		var oEvent = ev || event;

		// ��ֹ��������ȵ��������Ͻǣ�����ʾ
		this._myMenu.style.left = '0px';
		this._myMenu.style.top = '0px';
		this._myMenu.style.visibility = "hidden";
		this._myMenu.style.display = "block";
		
		// ����λ��
		var w = document.documentElement.clientWidth;
		var h = document.documentElement.clientHeight;
		if(w == null || w == 0)
			w = document.body.clientWidth;
		if(h == null || h == 0)
			h = document.body.clientHeight;

		var menuW = this._myMenu.offsetWidth;
		var menuH = this._myMenu.offsetHeight;

		// ���������˵���λ�ã��ο�win7����Ϊ��
		// ѡ�����ж����˵�ul
		var l2menu = $("#" + this._myMenuId + " > ul ul");
		var that = this;
		$.each(l2menu, function(n, item) {
			if(oEvent.clientX + item.offsetLeft + item.offsetWidth > w)
				item.style.right = (item.offsetWidth - that._gap) + "px";
			if(oEvent.clientY + item.offsetTop + item.offsetHeight > h)
				item.style.top = (- item.offsetHeight + 23) + "px";
		});
		
		// ����һ���˵���λ�ã��ο�win7����Ϊ��
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
	// ��htmlstr��ʾ��html���䵼�뵽�ڵ�node��
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
