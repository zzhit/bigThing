$.ajaxPrefilter(function (option) {
    option.url = 'http://www.liulongbin.top:3007' + option.url;

    if (option.url.indexOf('/my/') !== -1) {
        // 统一为有权限的接口，设置 Authorization 请求头
        option.headers = {
            Authorization: localStorage.getItem('token')
        }
    }

    option.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
});