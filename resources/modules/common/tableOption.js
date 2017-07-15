define(["jquery", "Ajax", "bootstrap", "bootstrap-table"], function($, Ajax, Bootstrap, BootstrapTable) {
	return function(option) {
		var btrTable, defaultOption = {
			method: 'post',
			contentType: "application/x-www-form-urlencoded",
			/*toolbar: '#toolbar',*/ //工具按钮用哪个容器
			striped: true, //是否显示行间隔色
			cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination: true, //是否显示分页（*）
			sortable: true, //是否启用排序
			queryParamsType: 'limit',
			queryParams: function() {}, //传递参数（*）
			sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
			pageNumber: 1, //初始化加载第一页，默认第一页
			pageSize: 50, //每页的记录行数（*）
			pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
			strictSearch: true,
			showColumns: true, //是否显示所有的列
			showRefresh: false, //是否显示刷新按钮
			minimumCountColumns: 2, //最少允许的列数
			clickToSelect: true, //是否启用点击选中行
			//uniqueId: "id", //每一行的唯一标识，一般为主键列
			showToggle: false, //是否显示详细视图和列表视图的切换按钮
			cardView: false, //是否显示详细视图
			detailView: false, //是否显示父子表
			showExport: true,
            search: true,
            showRefresh: true,     //是否显示刷新按钮
            //showPaginationSwitch: true,
			responseHandler: function(response) {
                return {
                    rows: response.result,
                    total: response.total
                }
				if(response = Ajax.responseHandler(response)) {
					return {
						rows: response.result,
						total: response.total
					}
				}
				return {
					rows: [],
					total: 0
				}
			},
			columns: []
		};
		/**
		 * @description 创建bootstrap表格对象
		 */
		var createTable = function() {
				btrTable = defaultOption.dom.bootstrapTable(defaultOption);
			}
			/**
			 * @description 设置图标数据
			 * @param {Object} result
			 */
		var setData = function(result) {
			/*	for (var i = 0, len = i; i < result.length; i++) {
			 if (result[i].tag) {
			 result[i].store_name = result[i].tag;
			 result[i].sale_money = result[i].sale_money;
			 }
			 }*/
			btrTable.bootstrapTable('load', result);
		};
		/**
		 * @description 调整图表高度
		 *
		 */
		var resize = function() {
				if(typeof defaultOption.setHeight == 'function') {
					btrTable.bootstrapTable('resetView', {
						height: defaultOption.setHeight()
					});
				}
			}
			/**
			 * @description 获取表格高度
			 */
		var getHeight = function() {
				return $(window).height() - $('.search-panel').outerHeight() - 20;
			}
			/**对后台的相应值进行拦截处理
			 * @description
			 * @param {Object} response
			 */
			/*	var responseHandler = function(response) {

			 }*/
			/*	var getParam = function(params) {
			 return {
			 'pageNum': params.offset / params.limit + 1,
			 'pageSize': params.limit,
			 'field': params.sort,
			 'sort': params.order,
			 'card_no': $.trim($('#card_no').val()),
			 'phone_no': $.trim($('#phone_no').val()),
			 'real_name': $.trim($('#real_name').val()),
			 'startDate': $('#startTime').val().trim(),
			 'endDate': $('#endTime').val()
			 }
			 //return params;
			 }*/
			/**
			 * @description 刷新表格
			 */
		var refresh = function() {
			btrTable.bootstrapTable('destroy');
			createTable();
		}
		var getData = function() {
			return btrTable.bootstrapTable('getData');
		};
		var getDom = function() {
			return btrTable;
		}
		var bindEvent = function() {
				$("#btn_delete").click(function() {
					var selects = btrTable.bootstrapTable('getSelections'),
						idsArray, objArray;
					if(selects.length == 0) {
						alert('请至少选中一条数据');
					}
				});
			}
			/**
			 * @description 初始化表格
			 * @param {Object} option 表格参数
			 */
		var init = function() {
			//自定义效验规则(bootstrap table的编辑组件封装的是x-editable 所以直接使用x-editable的api)
			$.fn.editable.defaults = $.extend($.fn.editable.defaults, option.editable || {});
			defaultOption = $.extend(defaultOption, option);
			bindEvent();
			createTable();
			resize();
		}
		init();
		return {
			setData: setData,
			resize: resize,
			refresh: refresh,
			getDom: getDom,
			getData: getData
		}
	}
});