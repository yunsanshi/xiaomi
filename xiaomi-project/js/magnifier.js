/*
 * @Author: xuel
 * @LastEditors: xuel
 * @Description: 文本内容
 */
class Large {
    constructor() {
        this.sBox = document.querySelector(".img-left .s_box");
        this.sImg = document.querySelector(".img-left .s_box img");
        this.sSpan = document.querySelector(".img-left .s_box span");
        this.bBox = document.querySelector(".img-left .b_box");
        this.bImg = document.querySelector(".img-left .b_box img");
        this.li = document.querySelectorAll(".img-left .list li");
    }
    addEvent() {
        let that = this;
        this.sBox.onmouseover = function () {
            that.over();
        }
        this.sBox.onmousemove = function (eve) {
            var e = eve || window.event;
            that.move(e);
        }
        this.sBox.onmouseout = function () {
            that.out();
        }
        for (var i = 0; i < this.li.length; i++) {
            this.li[i].onclick = function () {
                that.sImg.src = this.children[0].src;
                that.bImg.src = this.children[0].src;
            }
        }
    }
    over() {
        this.sSpan.style.display = "block";
        this.bBox.style.display = "block";
    }
    move(e) {
        let h = this.sBox.getBoundingClientRect().top
        let l = e.pageX - this.sBox.offsetLeft - this.sSpan.offsetWidth ;
        let t = e.pageY - this.sBox.offsetTop - this.sSpan.offsetHeight - 170;
        if (l < 0) l = 0;
        if (t < 0) t = 0;
        if (l > this.sBox.offsetWidth - this.sSpan.offsetWidth) {
            l = this.sBox.offsetWidth - this.sSpan.offsetWidth;
        }
        if (t > this.sBox.offsetHeight - this.sSpan.offsetHeight) {
            t = this.sBox.offsetHeight - this.sSpan.offsetHeight;
        }
        this.sSpan.style.left = l + "px";
        this.sSpan.style.top = t + "px";
        let x = l / (this.sBox.offsetWidth - this.sSpan.offsetWidth);
        let y = t / (this.sBox.offsetHeight - this.sSpan.offsetHeight);
        this.bImg.style.left = (this.bBox.offsetWidth - this.bImg.offsetWidth) * x + "px";
        this.bImg.style.top = (this.bBox.offsetHeight - this.bImg.offsetHeight) * y + "px";
    }
    out() {
        this.sSpan.style.display = "none";
        this.bBox.style.display = "none";
    }
}
var l = new Large();
l.addEvent();