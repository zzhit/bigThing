$(function () {

    //校验密码
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        samePwd: function (value) {
            var pwd = $('[name=newPwd]').val();
            if (value !== pwd) {
                return '两次密码不一致';
            }
        },

        newPwd: function (value) {
            var pwd = $('[name=oldPwd]').val();
            if (value === pwd) {
                return '新旧密码不能重复'
            }
        }
    });

    $('#form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('重置密码失败');
                }
                layer.msg('重置密码成功');
                $('#form')[0].reset();
            }
        });
    });


});