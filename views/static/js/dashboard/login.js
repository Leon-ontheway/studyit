define(['jquery', 'cookie'], function ($) {
    $(function () {
        //注册提交事件
        $('form').submit(function (e) {
            var userName = $('#tc_name').val();
            var pass = $('#tc_pass').val();

            //判断是否输入用户信息(注意清除空字符串)
            if (userName.trim() == '') {
                alert('请输入用户名')
                return false;
            }
            if (pass.trim() == '') {
                alert('请输入密码')
                return false;
            }
            //发送数据给后台,让后台验证输入信息
            //数据接口地址:http://studyit.com/api/login
            //请求方式:post
            $.ajax({
                url: '/api/login',
                type: 'post',
                data: {
                    tc_name: userName,
                    tc_pass: pass,
                },
                success: function (data) {
                    //若登录成功,后台返回用户头像和用户名信息
                    //并存到cookie中,为了能够让首页也使用这个信息
                    //应该先将对象转成json格式的字符串,然后再存
                    if (data.code == 200) {
                        $.cookie('userinfo', JSON.stringify(data.result), { expires: 365, path: '/' });
                        // 让用户跳转到首页
                        location.href = '/';
                    }
                }
            })
            //阻止表单的默认提交事件
            return false;
        })
    })
});
