require(['jquery', 'Ajax', './modules/menu', 'Vue'], function($, Ajax, SideMenu, Vue) {
	/**
	 * @description 加载用户信息
	 */
	function loadUserInfo() {
		//加载用户数据
		//
		// Ajax.request('user/getUserInfo', {}, function(response) {
		// 	//显示登录的用户名
		// 	$("#username").text(response.result.realname || response.result.nickname || '');
		// 	$('.avatar img').attr("src", response.result.headimgurl).bind('error', function() {
		// 		this.src = "../resources/images/avath.png";
		// 		this.onerror = null;
		// 	});
		// 	//渲染首页侧边栏
		// 	renderMenu(response.result.roleList);
		// });
        $(".username").text("郭之超");
		var response ={"result":{"id":63,"realname":"郭之超","phone":"18500191179","department":"研发","position":"","email":"","roleType":1,"roleList":":::系统管理:::-1,company/company.html:::集团机构:::101,systemuser/systemuser.html:::系统用户:::101,permission/permission.html:::系统权限:::101,userinfo/userinfo.html:::角色信息:::101,systemrole/systemrole.html:::系统角色:::101,systemauthority/systemauthority.html:::系统权限:::101,consumerrouter/consumerrouter.html:::Consumer路由:::101,consumerbind/consumerbind.html:::consumer绑定:::101,:::主数据:::-1,deviceinfo/deviceinfo.html:::终端信息:::301,device-ic/device-ic.html:::终端与卡对应关系:::301,commprotocol/commprotocol.html:::设备通讯协议:::301,        devicetype/devicetype.html:::终端类型:::301,vehicleinfo/vehicleinfo.html:::车辆信息:::301,vehicletype/commprotocol.html:::车辆类别:::301,vehicle-device/vehicle-device.html:::车与终端对应记录:::301,driverinfo/driverinfo.html:::司机信息:::301,divericcard/divericcard.html:::司机IC卡:::301,other/other.html:::其他:::301,:::服务管理:::-1,ipmanage/ipmanage.html:::IP管理:::1001,serverexplorer/serverexplorer.html:::服务器资源:::1001,servermanage/servermanage.html:::服务管理:::1001,:::webservice:::-1,webservice/webservice.html:::webservice服务:::1001"}}
        renderMenu(response.result.roleList);
	}



	/**
	 * @desc 显示侧边栏菜单
	 */
	function renderMenu(menu) {
		var roleList = menu.split(","),
			roleArray = [];
		for(var i = 0, len = roleList.length; i < len; i++) {
			var role = roleList[i],
				roleInfo = role.split(":::");
			if(roleInfo[2] == -1) {
				roleArray.push({
					text: roleInfo[1],
					list: []
				})
			} else {
				roleArray[roleArray.length - 1].list.push({
					text: roleInfo[1],
					url: roleInfo[0]
				});
			}
		}
		//创建Vue对象，渲染页面
		var sideBarModel = new Vue({
			el: "#accordion",
			data: {
				list: roleArray
			},
			ready: function() {
				//dom创建完成后绑定侧边栏事件
				SideMenu.init($('#accordion'));
				toDefault();
			},
			methods: {
				turnTo: toDefault //页面跳转事件
			}
		});
	}
	/**
	 * @description 打开默认页面
	 */
	function toDefault() {
		//获取缓存的URL
		var prevUrl = window.sessionStorage.getItem('url');
		if(prevUrl) {
			$("a[data-url='" + prevUrl + "']").click().closest(".submenu").show();
		} else {
			$("#accordion > li").eq(0).find('.submenu').show().find('a').eq(0).click();
		}
	}
	/**
	 * @desc 绑定事件
	 */
	function bindEvent() {
		//退出登录
		$('#exitLogin').click(function() {
			layer.confirm('确定要退出吗？', {
				btn: ['确定', '取消'],
			}, function() {
				// 根据id查询会员信息
				Ajax.request('user/logout', {}, function(data) {
					window.location.href = '../login.html';
				});
			}, function() {
				//取消回调
			});
		});
		//页面跳转
		$(".nav").on('click', '.submenu a', function() {
			pageTo($(this).data('url'));
		});
	}
	/**
	 * @desc iframe 页面跳转
	 */
	function pageTo(url) {
		if(!url) {
			return false;
		}
		var iframe = $('iframe[name=containter]'),
			loading = $(".loading");
		loading.show();
		iframe[0].onload = function() {
			window.sessionStorage.setItem("url", url);
			iframe[0].onload = null;
			loading.fadeOut();
		}
		iframe.attr('src', url);
	}
	(function() {
		loadUserInfo();
		bindEvent()
        SideMenu.init($('#accordion'));
        toDefault();
	})();
});