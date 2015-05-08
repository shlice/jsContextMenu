一、页面中引用本目录js和resources中的js、css文件。
<link rel="stylesheet" type="text/css" href="resources/css/contextmenu.css" />
<script type="text/javascript" src="js/contextmenu.js"></script>

二、页面中添加：
	<div id="svgmenu" style="z-index:20"></div>

三、页面onload中初始化：
	ContextMenu.init('svgmenu');//svgmenu是外部的div名称

四、鼠标右键事件中添加：
	//动态设置菜单，在激活菜单显示之前设置。
	ContextMenu.setContextMenu(string);
	// 激活菜单显示
	ContextMenu.showContextmenu(evt);//evt鼠标右键事件响应函数的参数

五、鼠标左键事件中添加：
	//隐藏菜单
	ContextMenu.hideContextMenu();

注：右键菜单的string格式
var menustr = "<ul><li class=\"include\" onclick=\"about()\">关于<ul><li>二级菜单</li><ul></li></ul>";
