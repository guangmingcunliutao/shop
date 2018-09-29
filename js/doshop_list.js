var doshop_list = (function () {
    return {
        init: function (ele) {
            this.$ele = document.querySelector(ele);
            this.event();
            // 获取json文件夹里面的商品数据
            this.getJsonData();
        },
        event: function () {
            var _this = this;
            // 事件委托，给整体大商品展示盒子添加事件
            this.$ele.addEventListener('click',this.eleClick,false);
        },
        // 获取json文件夹里面的数据
        getJsonData: function () {
            var _this = this;
            var params = {
                success: function (data) {
                    // 将获取到的商品数据交给insertJsonData处理
                    _this.insertJsonData(data);
                }
            }
            sendAjax('json/shop_data.json', params);
        },
        // 将获取到的数据插入到页面中
        insertJsonData: function (data) {
            data = data.data;
            var arr = [];
            // 循环数据，生成一个商品div
            for (var i = 0; i < data.length; i++) {
                arr.push(`<div class="shopBox">
                                <img src="${data[i].img}">
                                <p>商品名称：<span class="shop-name">${data[i].name}</span></p>
                                <p>商品价格：<span class="shop-price">${data[i].price}</span></p>
                                购买数量：<input type="number" class="shop-count" value="1">
                                <button class="btn shop-addCar" attr-id=${data[i].id}>加入购物车</button>
                              </div>`);
            }
            // 将数据循环完之后的div数组，插入到页面当中
            this.$ele.innerHTML = arr.join('');
        },
        // 事件处理程序
        eleClick:function(){
            this.e = window.event;
            var target = this.e.target || this.e.srcElement;
            // 只有点击加入购物车按钮的时候才将信息加入到localstorage里面
            if(target.nodeName == 'BUTTON' && target.className == 'btn shop-addCar'){
                // 获取点击的商品的id和数量
                var id = target.getAttribute('attr-id');
                var count = target.previousElementSibling.value;
                // 将商品id和数量传入到addCar函数里面
                doshop_list.addCar(id,count);
            }
        },
        // 将加入购物的商品的id和数量保存到localstorage里面
        addCar:function(id,count){
            // 将一个商品的信息当做一个对象保存
            // 本地存储都是字符串形式
            // 第一次添加时，localstorage可能没有shopList这个属性，所以设置默认值
            var shopList = localStorage.shopList || '[]';
            // shopList = [{},{},{}];
            // 将数据转换为对象进行操作
            shopList = JSON.parse(shopList);
            // 遍历数组
            for(var i=0; i<shopList.length; i++){
                // 判断初始数据里面有没有这个商品，如果有，直接累加
                if(shopList[i].id === id){
                    shopList[i].count = Number(shopList[i].count) + Number(count);
                    break;
                }
            }
            // 可以全部循环完，正确证明初始数据里面没有这个商品，那么把这个商品添加进去
            if(i == shopList.length){
                shopList.push({id:id,count:count});
            }
            // 转换为json字符串，保存到本地存储
            localStorage.shopList = JSON.stringify(shopList);
        }
    }
}());