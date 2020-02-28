$(function () {
    // 点击了注册的链接
    $('#link-reg').on('click', function () {
        $('.login-box').hide() // 隐藏
        $('.reg-box').show() // 展示
    });

    // 点击了登录的链接
    $('#link-login').on('click', function () {
        $('.login-box').show() // 展示
        $('.reg-box').hide() // 隐藏
    });

    var form = layui.form;
    // 自定义校验规则
    form.verify({
        // 键：值
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            // 1. 通过形参，获取到确认密码框中的值
            // 2. 通过 jQuery 获取到密码框中的值
            var pwd = $('.reg-box [name=password]').val()
            // 3. 进行 if 判断
            if (value !== pwd) {
                // return 一个错误消息
                return '两次的密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    var layer = layui.layer;
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录!');
                $('#link-login').click();
            }
        });
    });

    // 监听登录表单的提交事件
    $('#form-login').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败');
                }
                layer.msg('登陆成功!');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        });
    });
});
