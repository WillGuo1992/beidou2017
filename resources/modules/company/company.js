require(['jquery', './modules/common/tableOption', 'WdatePicker'], function ($, BtrTable) {
    //初始化表格

    var btrTable = new BtrTable({
        dom: $("#btrTable"),
        url: "../../resources/doc/company.json",
        setHeight: function () {
            return $(window).height() - $('.search-panel').outerHeight() - 20;
        },

        columns: [
            {
                field: 'id',
                title: '机构ID',
                sortable: true,
                width: '120px'
            }, {
                field: 'name',
                title: '机构名称',

                width: '130px'
            }, {
                field: 'parent_company',
                title: '父机构',
                width: '130px'
            }, {
                field: 'provide',
                title: '所在省',
                width: '130px'
            },{
                field: 'city_name',
                title: '所在市',
                width: '130px'
            },{
                field: 'parent_company_id',
                title: '公司类别',
                width: '130px'
            },{
                field: 'parent_company_id',
                title: '机构编码',
                width: '130px'
            },{
                field: 'parent_company_id',
                title: '平台唯一编码',
                width: '130px'
            },{
                title: '操作',
                align: 'center',
                formatter: function (value, index, row) {
                    var obj = JSON.stringify(index);
                    return '<div data-row=\'' + obj + '\' class="table-btn-list"><a class="abtn detail" href="#">详细信息</a>&nbsp;&nbsp;<a class="abtn edit" href="#">编辑</a>&nbsp;&nbsp;<a class="abtn delete" href="#">删除</a>&nbsp;&nbsp;</div>'
                }
            }],
        data:
            [
                {id: 1,parent_company: '港外机构' ,name : '正宝物流', provide: '山东', city_name:'青岛'},
                {id: 131,parent_company: '港外机构' ,name : '中商建开', provide: '山东', city_name:'青岛'},
                {id: 801,parent_company: '青岛港集团' ,name : '前港公司', provide: '山东', city_name:'青岛'},
                {id: 805,parent_company: '青岛港集团' ,name : 'QQCTN', provide: '山东', city_name:'青岛'},
                {id: 1,parent_company: '港外机构' ,name : '正宝物流', provide: '山东', city_name:'青岛'},
                {id: 131,parent_company: '港外机构' ,name : '中商建开', provide: '山东', city_name:'青岛'},
                {id: 801,parent_company: '青岛港集团' ,name : '前港公司', provide: '山东', city_name:'青岛'},
                {id: 805,parent_company: '青岛港集团' ,name : 'QQCTN', provide: '山东', city_name:'青岛'},
                {id: 1,parent_company: '港外机构' ,name : '正宝物流', provide: '山东', city_name:'青岛'},
                {id: 131,parent_company: '港外机构' ,name : '中商建开', provide: '山东', city_name:'青岛'},
                {id: 801,parent_company: '青岛港集团' ,name : '前港公司', provide: '山东', city_name:'青岛'},
                {id: 805,parent_company: '青岛港集团' ,name : 'QQCTN', provide: '山东', city_name:'青岛'},
                {id: 1,parent_company: '港外机构' ,name : '正宝物流', provide: '山东', city_name:'青岛'},
                {id: 131,parent_company: '港外机构' ,name : '中商建开', provide: '山东', city_name:'青岛'},
                {id: 801,parent_company: '青岛港集团' ,name : '前港公司', provide: '山东', city_name:'青岛'},
                {id: 805,parent_company: '青岛港集团' ,name : 'QQCTN', provide: '山东', city_name:'青岛'},
                {id: 1,parent_company: '港外机构' ,name : '正宝物流', provide: '山东', city_name:'青岛'},
                {id: 131,parent_company: '港外机构' ,name : '中商建开', provide: '山东', city_name:'青岛'},
                {id: 801,parent_company: '青岛港集团' ,name : '前港公司', provide: '山东', city_name:'青岛'},
                {id: 805,parent_company: '青岛港集团' ,name : 'QQCTN', provide: '山东', city_name:'青岛'},
                {id: 1,parent_company: '港外机构' ,name : '正宝物流', provide: '山东', city_name:'青岛'},
                {id: 131,parent_company: '港外机构' ,name : '中商建开', provide: '山东', city_name:'青岛'},
                {id: 801,parent_company: '青岛港集团' ,name : '前港公司', provide: '山东', city_name:'青岛'},
                {id: 805,parent_company: '青岛港集团' ,name : 'QQCTN', provide: '山东', city_name:'青岛'}
            ]
    });
    //绑定日期控件
    $("#startTime").click(function () {
        WdatePicker.apply(this, [{
            maxDate: '#F{$dp.$D(\'endTime\');}'
        }]);
        return false;
    });
    $("#endTime").click(function () {
        WdatePicker.apply(this, [{
            minDate: '#F{$dp.$D(\'startTime\');}'
        }]);
        return false;
    });
    //搜索
    $('.js-search').click(function () {
        btrTable.refresh();
    });
    //重置
    $('.js-reset').click(function () {
        $('.search-panel input[type=text]').val('');
        btrTable.refresh();
    });
    //添加
    $('.js-add').click(function () {
        $('.search-panel input[type=text]').val('');
        btrTable.refresh();
    });
    // 详细信息
    $('#btrTable').on('click', '.detail', function () {
        var row = $(this).closest('.table-btn-list').data('row');
        console.log(row);
        if (row.id) {
            var id = row.id;
            layer.open({
                type: 2,
                title: '详细信息',
                shadeClose: true,
                shade: 0.8,
                area: ['600px', '550px'],
                content: 'edit.html?id=' + id + '&type=2' //iframe的url
            });
        } else {
            layer.confirm('<p>详细信息出现错误,</p><p>请重新登录。</p>', {
                btn: ['确定'],
            }, function () {
                layer.closeAll();
            }, function () {
                //取消回调
            });
        }
    });
   //编辑
    $('#btrTable').on('click', '.edit', function () {
        var row = $(this).closest('.table-btn-list').data('row');
        if (row.id) {
            var id = row.id;
            layer.open({
                type: 2,
                title: '编辑',
                shadeClose: true,
                shade: 0.8,
                area: ['600px', '550px'],
                content: 'edit.html?id=' + id + '&type=1' //iframe的url
            });
        } else {
            layer.confirm('<p>编辑出现错误,</p><p>请重新登录。</p>', {
                btn: ['确定'],
            }, function () {
                layer.closeAll();
            }, function () {
                //取消回调
            });
        }
    });
    //删除
    $('#btrTable').on('click', '.delete', function () {
        var row = $(this).closest('.table-btn-list').data('row');
        if (row.id) {
            var id = row.id;
            layer.confirm('<p><input type="password" placeholder="请输入密码，并点击确认"></p>', {
                btn: ['确定','取消'],
            }, function () {
                layer.closeAll();
            }, function () {
                //取消回调
            });
        } else {
            layer.confirm('<p>删除出现错误,</p><p>请重新登录。</p>', {
                btn: ['确定'],
            }, function () {
                layer.closeAll();
            }, function () {
                //取消回调
            });
        }
    });

});