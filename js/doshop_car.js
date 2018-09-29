var shopCar = (function () {
    return {
        init: function (ele) {
            this.$ele = document.querySelector(ele);
            this.event();
            // 获取json文件里面的商品数据
            this.getShopData();
        },
        event: function () {
            var _this = this;
            this.$ele.addEventListener('input',this.eleInpFn,false);
            this.$ele.addEventListener('click',this.eleCliFn,false);
        },
        // 获取json文件里面的数据处理函数
        getShopData: function () {
            var _this = this;
            var params = {
                success: function (data) {
                    // 因为后面要使用json文件里面的数据，所以添加到全局里面，方便调用
                    _this.shopListData = data.data;
                    // 获取到json文件里面的数据之后再获取本地存储的商品数据
                    _this.getCarData();
                }
            }
            sendAjax('json/shop_data.json', params);
        },
        // 获取本地存储的数据
        getCarData: function () {
            // 将获取到的本地存储的数据转换为对象
            this.carListData = JSON.parse(localStorage.shopList || '[]');
            // 将数据渲染到页面中
            this.insertData(this.carListData);
        },
        // 渲染处理函数
        insertData: function (data) {
            var arr = [];
            // 循环本地数据
            for (var i = 0; i < data.length; i++) {
                // 代表一个商品
                var shop;
                for (var j = 0; j < this.shopListData.length; j++) {
                    if (this.shopListData[j].id == data[i].id) {
                        // 如果id相同，将完整的商品信息拿出来
                        shop = this.shopListData[j];
                    }
                }
                // 将商品添加到数组里面，最后渲染
                arr.push(`<div class="shopBox">
                             <img src="${shop.img}">
                            <p>商品名称：<span class="shop-name">${shop.name}</span></p>
                            <p>商品价格：<span class="shop-price">${shop.price}</span></p>
                            数量：<input type="number" value="${data[i].count}" class="shop-count">
                            <p>商品总价：<span class="shop-total">${data[i].count*shop.price}</span></p>
                            <p>商品提示：<span class="shop-tips">${shop.ps}</span></p>
                            <button class="btn shop-del">删除</button>
                        </div>`);
            }
            this.$ele.innerHTML = arr.join('');
        },
        eleInpFn:function(){
            this.e = window.event;
            var target = this.e.target || this.e.srcElement;
            if(target.className == 'shop-count'){
                // 改变数量，总价同时改变
                var totalEle = target.parentNode.querySelector('.shop-total');
                var total = target.value * target.parentNode.querySelector('.shop-price').innerHTML;
                totalEle.innerHTML = total;
            }
        },
        eleCliFn:function(){
            this.e = window.event;
            var target = this.e.target || this.e.srcElement;
            if(target.className == 'btn shop-del'){
                target.parentNode.remove();
            }
        }
    }
}());
