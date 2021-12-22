/*
 * @Author: xuel
 * @LastEditors: xuel
 * @Description: 文本内容
 */
class Shopcart {
    constructor() {
        // tbody绑定事件，利用事件冒泡、委托完成设置回调函数
        this.$('#cart .cartTable tbody').addEventListener('click', this.clickBubbleFn.bind(this))
        // 获取数据
        this.getCartGoods()
        this.checkall()
    }

    // tbody绑定事件回调函数
    clickBubbleFn(event) {
        let tar = event.target
        // 单选回调
        tar.classList.contains('check-one') && this.onecheckFn(tar)
        // 减少数量回调
        tar.classList.contains('reduce') && this.resNumFn(tar)
        // 增加数量回调
        tar.classList.contains('add') && this.addNumFn(tar)
        // input输入修改数量回调
        tar.classList.contains('count-input') && this.inputNumFn(tar)
        // 购物车删除
        tar.classList.contains('layui-icon') && this.delFn(tar)
    }

    getCartGoods() {
        let goods = localStorage.getItem('xiaomicart')
        if (!goods) return
        goods = JSON.parse(goods)
        axios.get('http://localhost:3000/goods').then(res => {
            // 遍历数据库json中的数据，找到local中存在的
            let axistcart = res.data.filter(item => {
                return goods[item.id]
            })
            this.cartShow(axistcart, goods)
        })
    }
    // 将local中存在的数据渲染到页面
    cartShow(axistcart, goods) {
        let html = ''
        axistcart.forEach(item => {
            html += `<tr class="table-row" goodsId="${item.id}">
            <td class="cart-check">
                <input type="checkbox" name="check" id="checkone" class="check-one">
            </td>
            <td class="cart-img">
                <img src="${item.src}" alt="">
            </td>
            <td class="cart-name">
                <a href="#none">	
                    ${item.name}
                </a>
            </td>
            <td class="cart-price" style="font-size: 18px;"><em>${item.price}</em>元</td>
            <td class="cart-num">
                <span class="reduce">-</span>
                <input class="count-input" type="text" value="${goods[item.id]}"/>
                <span class="add">+</span>
            </td>
            <td class="cart-total total"><em>${item.price * goods[item.id]}</em>元</td>
            <td class="cart-action action">
                <i class="layui-icon layui-icon-close"></i>
            </td>
        </tr>`
        })
        this.$('#cart .cartTable tbody').innerHTML = html
    }

    // 全选实现
    checkall() {
        let check = this.$('#cart .cartTable .cart-check .check-all')
        check.addEventListener('click', (event) => {
            let status = event.target.checked
            if (status == false) {
                Shopcart.disabled()
            } else {
                Shopcart.primary()
            }
            // 调用单选框的函数，确认全选状态下单选的状态
            this.checkOne(status)
            // 调用计算总价和总数量
            this.subTotal(status)
        })
    }
    // 单选checkOne
    checkOne(status) {
        this.$$('#checkone').forEach(one => {
            one.checked = status
        })
    }
    // 单选状态下影响全选状态的回调
    onecheckFn(tar) {
        this.subTotal()
        if (!tar.checked) {
            this.$('#cart .cartTable .cart-check .check-all').checked = false
            if (this.$$('#checkone')[0].checked == false && this.$$('#checkone')[1].checked == false && this.$$('#checkone')[2].checked == false) {
                Shopcart.disabled()
            }
            return
        }
        let count = 0
        this.$$('#checkone').forEach(item => {
            item.checked && count++
        })
        // 判断
        if (count == this.$$('#checkone').length) {
            this.$('#cart .cartTable .cart-check .check-all').checked = true
        }
        if (count >= 1) {
            Shopcart.primary()
        }

    }

    // 去结算的点击事件以及其状态
    static selectsta() {
        let seetlement = document.querySelector('.cart-settlement .btn')
        if (seetlement.classList.contains('btn-primary')) {
            seetlement.onclick = () => {
                let name = localStorage.getItem('name')
                if (!name) {
                    layer.open({
                        title : '登录',
                        content : '还未登录，无法购买，请登录！',
                        btn : ['取消','确认'],
                        btn2 : function(){
                            window.location.href = '/xiaomi/xiaomi-project/login.html'
                        }
                    })
                }
                window.location.href = '#none'
            }
            return
        } else {
            seetlement.onclick = () => {
                return
            }
        }
    }

    // 计算总价和总数量
    subTotal(tar = true) {
        let totalNum = 0,
            totalPrice = 0
        tar && this.$$('#checkone').forEach(item => {
            if (item.checked) {
                // 获取到单选框的所在tr
                let trObj = item.parentNode.parentNode
                totalNum += (trObj.querySelector('.cart-num .count-input').value - 0)
                totalPrice += (trObj.querySelector('.cart-total em').innerHTML - 0)

            }
        })
        this.$('.cart-settlement .cart-bar-left i').innerHTML = totalNum
        this.$('.cart-settlement .total-price em').innerHTML = totalPrice
    }

    // 减少数量回调
    resNumFn(tar) {
        // 获取数量价格的节点
        let tr = tar.parentNode.parentNode
        let num = tar.nextElementSibling
        let price = tar.parentNode.previousElementSibling.querySelector('em').innerHTML
        let sub = tar.parentNode.nextElementSibling.querySelector('em')
        if(num.value <= 1){
            layer.msg('数量最小不能低于1')
            return
        }
        // 计算点击-时的数值变化
        num.value > 1 && (num.value = num.value - 1)
        sub.innerHTML = parseInt((price * num.value) * 100) / 100
        tr.querySelector('#checkone').checked && this.subTotal()
        this.modifylocal(tr.getAttribute('goodsId'),num.value)
    }

    addNumFn(tar) {
        // 获取数量价格节点
        let tr = tar.parentNode.parentNode
        let num = tar.previousElementSibling
        let price = tar.parentNode.previousElementSibling.querySelector('em').innerHTML
        let sub = tar.parentNode.nextElementSibling.querySelector('em')
        if(num.value >= 99){
            layer.msg('数量最多不能多于99')
            return
        }
        // 点击add时进行计算
        num.value = num.value - 0 + 1
        sub.innerHTML = parseInt((num.value * price) * 100) / 100
        tr.querySelector('#checkone').checked && this.subTotal()
        this.modifylocal(tr.getAttribute('goodsId'),num.value)
    }

    inputNumFn(tar) {
        let that = this
        // 获取节点
        let tr = tar.parentNode.parentNode
        let price = tar.parentNode.previousElementSibling.querySelector('em').innerHTML
        let sub = tar.parentNode.nextElementSibling.querySelector('em')
        // 给输入框绑定输入事件
        tar.addEventListener('input', function () {
            this.value = this.value.replace(/(^0?|\D)/g, '')
            if (this.value <= 1) {
                layer.msg('数量最小不能低于1')
                this.value = 1
            }else if(this.value > 99){
                layer.msg('数量最多不能多于99')
                this.value = 99
            }
            sub.innerHTML = parseInt((price * this.value) * 100) / 100
            tr.querySelector('#checkone').checked && that.subTotal()
            that.modifylocal(tr.getAttribute('goodsId'),this.value)
        })
    }

    delFn(tar){
        let that = this
        let tr = tar.parentNode.parentNode
        layer.open({
            title : '确认删除',
            content : '确认删除本宝？',
            btn : ['取消','确认'],
            btn2 : function(){
                tr.remove()
                tr.querySelector('#checkone').checked && that.subTotal()
                that.modifylocal(tr.getAttribute('goodsId'))
            }
        })
    }

    // 修改数据库的内容
    modifylocal(id,num=0){
        let goods = localStorage.getItem('xiaomicart')
        if(!goods) return
        goods = JSON.parse(goods)
        num == 0 && delete goods[id]
        num !=0 && (goods[id] = Number(num))
        localStorage.setItem('xiaomicart', JSON.stringify(goods))
    }



    // 结算按钮的状态
    static disabled() {
        let pri1 = document.querySelector('.cart-settlement .total-price a')
        let pri2 = document.querySelector('.cart-settlement .total-price a')
        let pri3 = document.querySelector('.cart-settlement .no-select-tip')
        pri1.classList.remove('btn-primary')
        pri2.classList.add('btn-disabled')
        pri3.classList.remove('hide')
        Shopcart.selectsta()
    }
    static primary() {
        let pri1 = document.querySelector('.cart-settlement .total-price a')
        let pri2 = document.querySelector('.cart-settlement .total-price a')
        let pri3 = document.querySelector('.cart-settlement .no-select-tip')
        pri1.classList.add('btn-primary')
        pri2.classList.remove('btn-disabled')
        pri3.classList.add('hide')
        Shopcart.selectsta()
    }

    //获取节点方法
    $(ele) {
        return document.querySelector(ele)
    }
    $$(ele) {
        return document.querySelectorAll(ele)
    }
}
new Shopcart()


// 登录状态
class Loginstatus{
    constructor(){
        this.loginsta()
        this.cancellation()
    }
    loginsta(){
        let loginInfo = document.querySelectorAll('#header .header-info a')
        let name = localStorage.getItem('name')
        if(name){
            name = JSON.parse(name)
            loginInfo[0].setAttribute('class','hide')
            loginInfo[2].setAttribute('class','hide')
            loginInfo[1].innerHTML = `欢迎${name.username}`
            loginInfo[1].classList.remove('hide')
            loginInfo[3].classList.remove('hide')
        }else{
            loginInfo[0].classList.remove('hide')
            loginInfo[2].classList.remove('hide')
            loginInfo[1].classList.add('hide')
            loginInfo[3].classList.add('hide')
        }
    }
    cancellation(){
        let cance = document.querySelectorAll('#header .header-info a')[3]
        cance.onclick = ()=>{
            let that = this
            let name = localStorage.getItem('name')
            if(!name) return
            layer.open({
                title: '注销',
                content: '是否退出当前登录',
                btn:['取消','确认'],
                btn2:function(){
                    name = JSON.parse(name)
                    localStorage.removeItem('name')
                    that.loginsta()
                }
              });
        }
    }
}
new Loginstatus()