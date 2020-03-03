$(function () {

    var layer = layui.layer;
    var form = layui.form;

    initTable();
    //初始化表格
    function initTable() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败');
                }
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        })
    }

    //监听添加类别按钮
    $('#addType').on('click', function () {
        var addType = layer.open({
            type: 1,
            title: '添加文章类别',
            content: $('#tpl-add').html(),
            area: ['500px', '250px']
        });

        //添加类别
        $('body').on('submit', '#form-add', function (e) {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('添加新类别失败')
                    }
                    layer.msg('添加新类别成功');
                    layer.close(addType);
                    initTable();
                }
            })
        })
    })

    //监听编辑按钮事件
    $('tbody').on('click', '.btnEdit', function () {
        var edit = layer.open({
            type: 1,
            title: '修改文章类别',
            content: $('#tpl-edit').html(),
            area: ['500px', '250px']
        });

        var id = $(this).attr
            ('data-id');
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('文章类别获取失败')
                }
                form.val('form-edit', res.data)
            }
        })

        //监听修改表单提交
        $('body').on('submit', '#form-edit', function (e) {
            e.preventDefault();

            $.ajax({
                type: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('修改文章类别失败')
                    }
                    layer.msg('文章类别修改成功');
                    layer.close(edit);
                    initTable();
                }
            })
        })
    })

    //监听删除按钮事件
    $('tbody').on('click', '.btnDel', function () {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('删除类别失败')
                }
                layer.msg('删除类别成功');
                initTable();
            }
        })
    })
});