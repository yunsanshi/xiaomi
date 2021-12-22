/*
 * @Author: xuel
 * @LastEditors: xuel
 * @Description: 文本内容
 */
class Bannerbox{
    constructor(){
        this.banBox()
    }
    banBox(){
        let banUl = document.querySelector('#banner .banner-menu-box ul')
        axios.get('http://localhost:3000/goods').then(res =>{
            let html = ''
            res.data.forEach(item =>{
                html += `<li><a href="/xiaomi/xiaomi-project/productDetails.html?id=${item.id}"><img src="${item.src}" alt=""><em>${item.name}</em></a></li>`
            })
            banUl.innerHTML = html
        })
    }
}
new Bannerbox()