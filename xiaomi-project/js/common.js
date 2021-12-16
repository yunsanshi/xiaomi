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
