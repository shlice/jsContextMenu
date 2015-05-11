Web右键菜单。
	支持两层嵌套。
	支持动态位置调整。   
	支持Chrome、Firefox和IE11。

Demo：
	运行helloworld.html
	 
使用方法： 
一、引用js和css文件
<link rel="stylesheet" type="text/css" href="resources/css/contextmenu.css" />
<script type="text/javascript" src="js/contextmenu.js"></script>

二、页面中添加：
	<div id="svgmenu" style="z-index:999"></div>

三、页面onload中初始化：
	ContextMenu.init('svgmenu');//svgmenu是外部的div名称

四、激活右键菜单显示。 
	在鼠标右键事件处理函数中增加：	
	//动态设置菜单，在激活菜单显示之前设置。
	ContextMenu.setContextMenu(string);
	// 激活菜单显示
	ContextMenu.showContextmenu(evt);//evt鼠标右键事件响应函数的参数

五、如果在某些应用场合下存在鼠标左键点击空白处菜单不消失的问题。 在鼠标左键事件中添加：
	//隐藏菜单
	ContextMenu.hideContextMenu();

注：右键菜单的string格式
var menustr = "<ul><li class=\"include\" onclick=\"about()\">关于<ul><li>二级菜单</li></ul></li></ul>";
