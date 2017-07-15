define(['jquery', 'layer'], function($, layer) {
	/**
	 * @description ajax请求方法(异步)
	 * @param {Object} url  请求地址
	 * @param {Object} param 参数 eg: {a:a,b:b}
	 * @param {Object} callBack 回调函数
	 */
	var ajaxRequest = function(url, params, callBack) {
		//屏蔽提交对象的前后空格
		params && Trim(params);
		ajax(Base.qmServer + url, params, callBack);
	}
	var ajax = function(url, params, callBack) {
			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'JSON',
				data: params,
				success: function(data) {
					var response = responseHandler(data);
					response && callBack(response);
				},
				error: function(err) {
					layer.msg('网络中断,请检查网络设置');
				}
			});
		}
		/**
		 * @description ajax请求方法(异步)
		 * @param {Object} url  请求地址
		 * @param {Object} param 参数 eg: {a:a,b:b}
		 * @param {Object} callBack 回调函数
		 */
	var ajaxRequestWifi = function(url, params, callBack) {
			//屏蔽提交对象的前后空格
			params && Trim(params);
			ajax(Base.wifi + url, params, callBack);
		}
		/**
		 * @description 长连接请求
		 * @param {Object} url
		 * @param {Object} params
		 * @param {Object} callBack 回调函数
		 */
	var longRequest = function(url, params, callBack) {
			var array = ['WebSocket', 'MozWebSocket'],
				WebSocket;
			for(var i = 0; i < array.length; i++) {
				if(array[i] in window) {
					WebSocket = new window[array[i]](url);
					break;
				}
			}
			WebSocket.onmessage = function(response) {
				response = JSON.parse(response.data);
				callBack(response);
			}
			WebSocket.onerror = function() {
				console.log("网络连接错误");
			}
			WebSocket.onclose = function() {
				//发生错误冲重新启动函数
				longRequest.call(this, arguments);
			}
		}
		/**
		 * @description ajax相应拦截统一处理错误信息
		 * @param {Object} response ajax相应值
		 */
	var responseHandler = function(response) {
		if(response.code == 0) {
			return response;
		}
		layer.msg(response.result);
		//没有权限去登录
		if(response.code == 100) {
			setTimeout(function() {
				top.location.href = "/" + Base.siteName + '/login.html';
			}, 1500);
		}
		return false;
	}
	return {
		ajax: ajax,
		request: ajaxRequest,
		requestWifi: ajaxRequestWifi,
		longRequest: longRequest,
		responseHandler: responseHandler
	}
})