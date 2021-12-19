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