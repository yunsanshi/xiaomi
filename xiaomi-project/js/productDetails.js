/*
 * @Author: xuel
 * @LastEditors: xuel
 * @Description: 文本内容
 */
class Details{
    constructor(){
        this.ceiling()
        // 登录
        this.login()
    }

    // 吸顶效果
    ceiling(){
        let evea = document.querySelector('#evealuation')
        window.addEventListener('scroll',()=>{
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            //判断
            if(scrollTop>=200){
                //满足条件了，设置固定定位
                evea.style.position = 'fixed'
                evea.style.top = 0
            }else{
                 //当条件不满足时让定位清空
                 evea.style.position = ''
            }
        })
    }

    //登录
    login(){
        let i = document.querySelector('#pageSign i')
        let sign = document.querySelector('#pageSign')
        i.onclick = ()=>{
            sign.setAttribute('style','display:none')
        }
        let name = localStorage.getItem('name')
        if(name){
            sign.setAttribute('style','display:none')
        }
    }
}
new Details()

// 版本，颜色的状态
function active(ele){
    let li = document.querySelectorAll(ele)
    for(let i=0;i<li.length;i++){
        li[i].onclick = ()=>{
            for(let j=0;j<li.length;j++){
                li[j].classList.remove('active')
            }
            li[i].classList.add('active')
        }
    }
}
active('.buy-edition li')
active('.buy-color li')
active('.buy-suit li')

class Content{
    constructor(){
        // console.log(location.href.split('?')[1].split('=')[1]);
        this.contentshow()
    }
    contentshow(){
        
    }
}
new Content()