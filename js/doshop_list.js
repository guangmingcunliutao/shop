var doshop_list = (function () {
    return {
        init: function (ele) {
            this.$ele = document.querySelector(ele);
            console.log(this.$ele);
            this.event();
            this.getJsonData();
        },
        event: function () {
            var _this = this;
        },
        // 获取json文件夹里面的数据
        getJsonData: function () {
            var _this = this;
            var params = {
                success: function (data) {
                    // 回调函数获取数据，交给insertJsonData处理
                    _this.insertJsonData(data);
                }
            }
            sendAjax('json/shop_data.json', params);
        },
        insertJsonData: function (data) {
            data = data.data;
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                arr.push(`<div class="shopBox">
                                <p>商品名称：<span>${data[i].name}</span></p>
                                <p>商品价格：<span>23</span></p>
                                购买数量：<input type="number">
                                <button class="btn shop-addCar">加入购物车</button>
                              </div>`);
            }
            this.$ele.innerHTML = arr.join('');
        }
    }
}());