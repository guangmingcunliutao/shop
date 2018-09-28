function sendAjax(url, options) {
    // 设置默认属性
    var _default = {
        method: 'GET',
        data: null,
        success: null,
        error: null
    }
    // 替换默认值,如果传值,就进行替换,如果不传,使用默认
    for (var attr in options) {
        _default[attr] = options[attr];
    }
    // 如果是get方式请求，对url进行处理
    if (_default.method.toLocaleUpperCase() === 'GET') {
        // 解决get默认使用缓存资源文件问题，加时间戳，保证每次请求的url都不一样
        var sign = url.indexOf('?') > -1 ? "&" : "?";
        url += sign + '_=' + Date.now();
        // 将_default.data里面的数据拼接到url
        for (var attr in _default.data) {
            url += '&' + attr + '=' + _default.data[attr];
        }
        // url拼接完成，get请求中的send不需要参数
        _default.data = null;
    }
    // 创建连接
    var xhr = new XMLHttpRequest();
    // 打开链接
    xhr.open(_default.method,url,true);
    // 发送请求之前，先把数据格式化，转换为jsonzifc
    _default.data = JSON.stringify(_default.data);
    // 发送请求
    xhr.send(_default.data);
    // 判断是否链接成功
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // 接收返回来的数据
                var data = xhr.responseText;
                // 将json字符串数据转换为对象格式
                data = JSON.parse(data);
                // 判断是否接收成功
                if (data.msg == 200){
                    if(typeof _default.success === 'function'){
                        _default.success(data);
                    }
                }
            } else {
                if (typeof _default.error === 'function') {
                    _default.error(data);
                }
            }
        }
    }
}