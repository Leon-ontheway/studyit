define(["jquery", "template", "cookie"], function($, template){
	$(function(){
		//判断用户是否登录了，如果没有登录，就给他跳回到登录页
		
		//注意,这里如果是本来就在login页面,
		//会发生不断跳转的情况
		//所以要进行一次判断
		//不在登录页才执行下面的内容
		if(location.pathname != "/dashboard/login"){
			if(!$.cookie("PHPSESSID")){
				location.href = "/dashboard/login";
			}
			//1. 从cookie中获取用户存储好的用户信息
			var userinfo = JSON.parse($.cookie("userinfo"));
			// console.log(userinfo);
			//2. 使用模板引擎将对象渲染到用户信息的模板中去
			var html = template("profile_tpl", userinfo);
			$("#profile").html(html);
		}
	})  
})