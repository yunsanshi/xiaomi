/*
 * @Author: xuel
 * @LastEditors: xuel
 * @Description: 文本内容
 */
class Bannerbox{
    constructor(){
        this.banBox()
        this.headerBox()
    }
    banBox(){
        let banUl = document.querySelector('#banner .banner-menu-box ul')
        if(banUl == null) return
        axios.get('http://localhost:3000/goods').then(res =>{
            let html = ''
            res.data.forEach(item =>{
                html += `<li><a href="/xiaomi/xiaomi-project/productDetails.html?id=${item.id}"><img src="${item.src}" alt=""><em>${item.name}</em></a></li>`
            })
            banUl.innerHTML = html
        })
    }
    headerBox(){
        let headerUl = document.querySelector('#header #header-nav-meau .nav-children')
        axios.get('http://localhost:3000/goods').then(res =>{
            let html = ''
            for(let i=0;i<6;i++){
                // console.log(res.data[i]);
                html += `<li>
                <a href="/xiaomi/xiaomi-project/productDetails.html?id=${res.data[i].id}">
                    <div class="figurefigure-thumb">
                        <img src="${res.data[i].src}"
                            alt="${res.data[i].name}" width="90" height="110">
                    </div>
                    <div class="title">${res.data[i].name}</div>
                    <p class="price">${res.data[i].price}元起</p>
                </a>
            </li>`
            }
            headerUl.innerHTML = html
        })
    }
}
new Bannerbox()