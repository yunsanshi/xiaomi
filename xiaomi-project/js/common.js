/*
 * @Author: xuel
 * @LastEditors: xuel
 * @Description: 文本内容
 */
let navItem = document.querySelectorAll('.header-nav .nav-item')
let headerNavMeau = document.querySelector('#header-nav-meau')
for(let i=0;i<navItem.length-2;i++){
    navItem[i].onmouseover = ()=>{
        headerNavMeau.style.display = 'block'
        headerNavMeau.style.height = '230px'
    }
    headerNavMeau.onmouseover = ()=>{
        headerNavMeau.style.display = 'block'
    }
    navItem[i].onmouseout = ()=>{
        headerNavMeau.style.display = 'none'
    }
    headerNavMeau.onmouseout = ()=>{
        headerNavMeau.style.display = 'none'
    }
}

// 回到顶部调用
class retrunTop{
    constructor(){
        this.reTop()
    }
    reTop(){
        let reTop = document.querySelector('#right-fixed-bar .fixed-last')
        window.addEventListener('scroll',() => {
            if (window.scrollY > window.innerHeight) {
                reTop.classList.add('block')
            } else {
                reTop.classList.remove('block')
            }
        })
    }
}
new retrunTop()
// 回到顶部

class Loginstatus{
    constructor(){
        this.loginsta()
        this.cancellation()
    }
    loginsta(){
        let loginInfo = document.querySelectorAll('#top-nav .info-bar a')
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
        let cance = document.querySelectorAll('#top-nav .info-bar a')[3]
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


// 侧边栏和头部的购物车
class Sidecart{
    constructor(){
        this.sideNum()
        this.topli()
    }
    // 渲染头部购物车的内容
    topli(){
        let span = document.querySelector('#top-nav .cart-info>span')
        let ul = document.querySelector('#top-nav .cart-info>ul')
        let div = document.querySelector('#top-nav .cart-info>div')
        let cartgoods = localStorage.getItem('xiaomicart')
        if(!cartgoods){
            span.classList.remove('hide')
            ul.classList.add('hide')
            div.classList.add('hide')
            return
        }else{
            span.classList.add('hide')
            ul.classList.remove('hide')
            div.classList.remove('hide')
        }
        cartgoods = JSON.parse(cartgoods)
        axios.get('http://localhost:3000/goods').then(res =>{
            let axistcart = res.data.filter(item =>{
                return cartgoods[item.id]
            })
            this.topliShow(axistcart,cartgoods)
        })
    }
    topliShow(axistcart,cartgoods){
        let ul = document.querySelector('#top-nav .cart-info ul')
        let totalpr = document.querySelector('#top-nav .cart-info .total .price em')
        let html = ''
        let topr = 0
        axistcart.forEach(it => {
            html += `<li li-id="${it.id}">
            <div class="clearfix">
                <a href="#none">
                    <img alt="" src="${it.src}">
                </a>
                <a href="#none" class="name">${it.name}</a>
                <span class="price">${it.price}元 X ${cartgoods[it.id]}</span>
                <i class="layui-icon layui-icon-close"></i>
            </div>
        </li>`
            let topr1 = (it.price-0) * cartgoods[it.id]
            topr += topr1
        });
        ul.innerHTML = html
        totalpr.innerHTML = topr
        let del = document.querySelectorAll('#top-nav .cart-info ul li i')
        del.forEach(item =>{
            let liDel = item.parentNode.parentNode
            let liId = liDel.getAttribute('li-id')
            item.onclick = ()=>{
                liDel.remove()
                this.modifylocal(liId)
                this.sideNum()
                axios.get('http://localhost:3000/goods').then(res =>{
                    res.data.forEach(item =>{
                        if(item.id == liId){
                            totalpr.innerHTML = (totalpr.innerHTML-0)-(item.price-0)*(cartgoods[item.id])
                        }
                    })
                })
            }
        })
        
    }

    sideNum(){
        let side = document.querySelector('#right-fixed-bar .right-fixed-item .fixed-text span')
        let topcart = document.querySelector('#top-nav .cart-bar a em')
        let topcart1 = document.querySelector('#top-nav .cart-info .total>em')
        let goods = localStorage.getItem('xiaomicart')
        goods = JSON.parse(goods)
        let sidenum = 0
        for(let attr in goods){
            sidenum += goods[attr]
        }
        side.innerHTML = sidenum
        topcart.innerHTML = sidenum
        topcart1.innerHTML = sidenum
        side.style.color = '#FF5B00'
        topcart.style.color = '#FF5B00'
    }

    modifylocal(id,num=0){
        let goods = localStorage.getItem('xiaomicart')
        if(!goods) return
        goods = JSON.parse(goods)
        num == 0 && delete goods[id]
        num !=0 && (goods[id] = Number(num))
        localStorage.setItem('xiaomicart', JSON.stringify(goods))
    }
}
new Sidecart()