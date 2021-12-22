/*
 * @Author: xuel
 * @LastEditors: xuel
 * @Description: 文本内容
 */
class Goodshow{
    constructor(){
        this.show()
        Goodshow.rotate()
    }

    show(){
        let proUl = document.querySelector('.product-box .pro-list')
        axios.get('http://localhost:3000/goods').then(res =>{
            let html = ''
            res.data.forEach(item =>{
                // console.log(item);
                let people = Math.random()*(230 - 10) + 10
                let newPeople = people.toFixed(2)
                html += `<li>
                <a href="/xiaomi/xiaomi-project/productDetails.html?id=${item.id}">
                    <img src="${item.src}" alt="">
                    <span>${item.name}</span>
                    <span>￥：${item.price}</span>
                    <span>${newPeople}万人关注</span>
                    
                </a>
                <span onclick="Goodshow.addCart(${item.id},1)">加入购物车</span>
            </li>`
            })
            proUl.innerHTML = html
        })
    }

    static addCart(id,num){
        // 获取local中的数据
        let cartGoods = localStorage.getItem('xiaomicart')
        // 判断是否存在数据
        if(cartGoods){   // 有数据
            // 将json转为对象
            cartGoods = JSON.parse(cartGoods)
            // 判断购物车中是否已存在当前添加的商品，如存在商品数量加一
            for(let attr in cartGoods){
                // 数量增加1
                attr == id && (num += cartGoods[attr])
            }
            // 将数量添加进，保存local数据
            cartGoods[id] = num
            localStorage.setItem('xiaomicart',JSON.stringify(cartGoods))
        }else{   // 无数据
            cartGoods = {
                [id] : num
            }
            localStorage.setItem('xiaomicart',JSON.stringify(cartGoods))
        }
        layer.msg('你已添加该产品，请前往购物车查看！')
        // window.location.href = '/xiaomi/xiaomi-project/shopcart.html'
    }




    static rotate(){
        let icon = document.querySelectorAll('.product-box .pro-tab .title')
        let proList = document.querySelectorAll('.product-box .pro-list')
        for(let i=0; i<icon.length;i++){
            icon[i].onclick = ()=>{
                if(icon[i].children[0].classList.contains('rotate')){
                    icon[i].children[0].classList.remove('rotate')
                    proList[i].style.display = 'block'
                }else{
                    icon[i].children[0].classList.add('rotate')
                    proList[i].style.display = 'none'
                }
            }
        }
    }
}
new Goodshow()