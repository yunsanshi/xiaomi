/*
 * @Author: xuel
 * @LastEditors: xuel
 * @Description: 文本内容
 */
class Details {
    constructor() {
        this.ceiling()
        // 登录
        this.login()
    }

    // 吸顶效果
    ceiling() {
        let evea = document.querySelector('#evealuation')
        window.addEventListener('scroll', () => {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            //判断
            if (scrollTop >= 200) {
                //满足条件了，设置固定定位
                evea.style.position = 'fixed'
                evea.style.top = 0
            } else {
                //当条件不满足时让定位清空
                evea.style.position = ''
            }
        })
    }

    //登录
    login() {
        let i = document.querySelector('#pageSign i')
        let sign = document.querySelector('#pageSign')
        i.onclick = () => {
            sign.setAttribute('style', 'display:none')
        }
        let name = localStorage.getItem('name')
        if (name) {
            sign.setAttribute('style', 'display:none')
        }
    }
}
new Details()

// 获取地址栏id
class Content {
    constructor() {
        // console.log(location.href.split('?')[1].split('=')[1]);
        this.contentshow()
    }
    contentshow() {
        let localId = location.href.split('?')[1].split('=')[1] - 0
        axios.get('http://localhost:3000/goods', {}).then(res => {
            let h2 = document.querySelector('.content-pro>h2')
            let price1 = document.querySelector('.content-pro .price-info em')
            let price2 = document.querySelector('.content-pro .total-list .total-pr span')
            let totext = document.querySelectorAll('.content-pro .total-list .total-text span')
            let li = document.querySelectorAll('.buy-option ul .active')
            let evealua = document.querySelector('#evealuation h2')
            res.data.some(item => {
                if (item.id == localId) {
                    h2.innerHTML = item.name
                    totext[0].innerHTML = item.name + ' '
                    totext[1].innerHTML = li[0].innerHTML + ' '
                    totext[2].innerHTML = li[1].innerHTML
                    price1.innerHTML = item.price
                    price2.innerHTML = item.price
                    evealua.innerHTML = item.name
                }
            })
        })
    }
}
new Content()


// 版本，颜色的状态
function active(ele) {
    let li = document.querySelectorAll(ele)
    for (let i = 0; i < li.length; i++) {
        li[i].onclick = () => {
            for (let j = 0; j < li.length; j++) {
                li[j].classList.remove('active')
            }
            li[i].classList.add('active')
            let totext = document.querySelectorAll('.content-pro .total-list .total-text span')
            let active1 = document.querySelector('.buy-edition .active')
            let active2 = document.querySelector('.buy-color .active')
            totext[1].innerHTML = active1.innerHTML
            totext[2].innerHTML = active2.innerHTML
        }
    }
}
active('.buy-edition li')
active('.buy-color li')
active('.buy-suit li')


// 加入购物车
class CartDetails {
    constructor() {
        this.cart()
    }
    cart() {
        let add = document.querySelector('.content-pro .btn-cartlike .btn-cart')
        let localId = location.href.split('?')[1].split('=')[1]
        add.onclick = () => {
            let localgoods = localStorage.getItem('xiaomicart')
            let num = 1
            if (localgoods) {
                localgoods = JSON.parse(localgoods)
                for (let attr in localgoods) {
                    attr == localId && (num += localgoods[attr])
                }
                localgoods[localId] = num
                localStorage.setItem('xiaomicart', JSON.stringify(localgoods))
            } else {
                localgoods = {
                    [localId] : num
                }
                localStorage.setItem('xiaomicart', JSON.stringify(localgoods))
            }
            window.location.href = '/xiaomi/xiaomi-project/shopcart.html'
        }
    }
}
new CartDetails()