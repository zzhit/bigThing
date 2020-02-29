$(function () {
    initUserInfo();

    var layer = layui.layer;
    var form = layui.form;

    //获取用户信息
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                }
                form.val('form', res.data);

            }
        })
    };

    //昵称校验
    form.verify({
        nickname: [
            /^[\S]{2,6}$/
            , '昵称必须6到12位，且不能出现空格'
        ]
    });

    //更新用户信息
    $('#form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败!')
                }
                layer.msg('更新用户信息成功!')

                window.parent.getUserInfo();
            }
        })
    });

    //重置信息
    $('#btnReset').on('click', function () {
        initUserInfo();
    });
});