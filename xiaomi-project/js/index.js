/*
 * @Author: xuel
 * @LastEditors: xuel
 * @Description: 文本内容
 */
class Indexone {
    constructor() {
        this.init()
    }
    init() {
        // 选项卡调用
        this.wearTab()
    }

    // 选项卡
    wearTab() {
        let tabList = document.querySelectorAll('.main-box-ht .main-more .tab-list>li')
        let wear = document.querySelectorAll('.main-box-bd .weartab>ul')
        for (let i = 0; i < tabList.length; i++) {
            tabList[i].setAttribute('index', i)
            tabList[i].onclick = () => {
                let index = tabList[i].getAttribute('index')
                for (let j = 0; j < tabList.length; j++) {
                    tabList[j].classList.remove('tab-active')
                    wear[j].classList.add('hide')
                }
                tabList[i].classList.add('tab-active')
                wear[index].classList.remove('hide')
            }

        }
    }
}
new Indexone()

// 轮播图
class Banner {
    constructor() {
        // 获取节点
        // 点击小圆圈
        this.banCir = document.querySelector('#banner .banner-circle').children
        // 图片
        this.banImg = document.querySelectorAll('#banner .banner-img>a>img')
        this.prev = document.querySelector('#banner .banner-prev')
        this.next = document.querySelector('#banner .banner-next')
        this.banbox = document.querySelector('#banner .banner-img')
        this.num = 0
        this.timer = null
        this.init()
    }
    init() {
        this.banruncir()
        this.nextone()
        this.prevone()
        this.auto()
        this.clear()
    }
    // 小圆圈点击
    banruncir() {
        for (let i = 0; i < this.banCir.length; i++) {
            this.banCir[i].setAttribute('index', i)
            this.banCir[i].onclick = () => {
                var index = this.banCir[i].getAttribute('index')
                this.num = index
                this.wnum = index
                for (let j = 0; j < this.banCir.length; j++) {
                    this.banCir[j].classList.remove('banner-cr-active')
                    this.banImg[j].style.opacity = '0'
                    this.banImg[4].style.opacity = '0'
                }
                this.banCir[i].classList.add('banner-cr-active')
                this.banImg[i].style.opacity = '1'
            }
        }

    }

    nextone() {
        this.next.onclick = () => {
            this.num++
            for (let i = 0; i < this.banCir.length; i++) {
                this.banCir[i].classList.remove('banner-cr-active')
                // this.banImg[i].style.opacity = '0'
                this.banImg[i].style = `opacity:${0};transition-duration: ${800}ms;`
                this.banImg[4].style.opacity = '0'
            }
            if (this.num > this.banCir.length- 1) {
                this.num = 0
            }
            this.banCir[this.num].classList.add('banner-cr-active')
            // this.banImg[this.num].style.opacity = '1'
            this.banImg[this.num].style = `opacity:${1};transition-duration: ${800}ms;`
        }
    }

    prevone(){
        this.prev.onclick = ()=>{
            this.num--
            for (let i = 0; i < this.banCir.length; i++) {
                this.banCir[i].classList.remove('banner-cr-active')
                // this.banImg[i].style.opacity = '0'
                this.banImg[i].style = `opacity:${0};transition-duration: ${800}ms;`
                this.banImg[4].style.opacity = '0'
            }
            if (this.num < 0) {
                this.num = this.banCir.length- 1
            }
            this.banCir[this.num].classList.add('banner-cr-active')
            // this.banImg[this.num].style.opacity = '1'
            this.banImg[this.num].style = `opacity:${1};transition-duration: ${800}ms;`
        }
    }

    auto(){
        let that = this
        this.timer = setInterval(()=>{
            that.next.onclick()
        },3000)
    }

    clear(){
        let that = this
        this.banbox.onmouseover = ()=>{
            clearInterval(that.timer)
        }
        this.banbox.onmouseout = ()=>{
            this.auto()
        }
    }
}
new Banner()