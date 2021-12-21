/*
 * @Author: xuel
 * @LastEditors: xuel
 * @Description: 文本内容
 */
class Register {
    constructor() {
        this.name = document.querySelector('#username')
        this.pwd = document.querySelector('#pwd')
        this.pwds = document.querySelector('#pwds')
        this.submit = document.querySelector('input[type=submit]')
        this.span = document.querySelectorAll('.banner-box-con span')
        this.regular()
    }
    regular() {
        this.name.onblur = () => {
            let regu = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            let regu1 = /^[1][3-9][0-9]{9}$/
            if (regu.test(this.name.value) || regu1.test(this.name.value)) {
                this.span[0].innerHTML = '*'
                this.span[0].style.color = 'green'
            } else {
                this.span[0].innerHTML = '*'
                this.span[0].style.color = 'red'
                this.submit.setAttribute('disabled', 'disabled')
            }
        }
        this.pwd.onblur = () => {
            let regu2 = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Za-z]).*$/
            if (regu2.test(this.pwd.value)) {
                this.span[1].innerHTML = '*'
                this.span[1].style.color = 'green'
            } else {
                this.span[1].innerHTML = '*'
                this.span[1].style.color = 'red'
                this.submit.setAttribute('disabled', 'disabled')
            }
        }
        this.pwds.onblur = () => {
            if (this.pwds.value == this.pwd.value) {
                this.span[2].innerHTML = '*'
                this.span[2].style.color = 'green'
            } else {
                this.span[2].innerHTML = '*'
                this.span[2].style.color = 'red'
                this.submit.setAttribute('disabled', 'disabled')
            }
            if (this.pwd.value == '') {
                this.span[2].innerHTML = '*'
                this.span[2].style.color = 'red'
                this.submit.setAttribute('disabled', 'disabled')
            }
        }
        this.submit.onclick = () => {
            let that = this
            axios.get('http://localhost:3000/users', {}).then(res => {
                res.data.some(i => {
                    if (that.name.value == i.username) {
                        layer.open({
                            title: '',
                            content: '此号已注册，请重新输入',
                            btn: [],
                            closeBtn: '',
                            time: 1000
                        })
                        that.name.value = ''
                        that.pwd.value = ''
                        that.pwds.value = ''
                        that.span[0].innerHTML = ''
                        that.span[1].innerHTML = ''
                        that.span[2].innerHTML = ''
                        return
                    }             
                })
                for(let k=0;k<res.data.length;k++){
                    if(that.name.value != res.data[k].username){
                        let data = `username=${that.name.value}&password=${that.pwds.value}`
                        if (!that.name.value || !that.pwd.value || !that.pwds.value) return
                        axios.post('http://localhost:3000/users',data).then(v=>{
                            window.location.href = '/xiaomi/xiaomi-project/login.html'
                            return
                        })
                        return
                    }
                }
            })
        }
    }
}
new Register()

// axios.post('http://localhost:3000/users', data).then(v => {
//     layer.open({
//         title: '',
//         content: '注册成功',
//         btn: [],
//         closeBtn: '',
//         time: 2000
//     })
//     window.location.href = '/xiaomi/xiaomi-project/login.html'
// })
// let data = `username=${name.value}&password=${pwds.value}`
// if (!name.value || !pwd.value || !pwds.value) return
// layer.open({
//     title: '',
//     content: '注册成功，是否跳转登录',
//     btn: ['取消','确认'],
//     btn2 : function(){
//         window.location.href = '/xiaomi/xiaomi-project/login.html'
//     }
// })