/*
 * @Author: xuel
 * @LastEditors: xuel
 * @Description: 文本内容
 */
class Register{
    constructor(){
        this.name = document.querySelector('#username')
        this.pwd = document.querySelector('#pwd')
        this.pwds = document.querySelector('#pwds')
        this.submit = document.querySelector('input[type=submit]')
        this.span = document.querySelectorAll('.banner-box-con span')
        this.regular()
    }
    regular(){
        this.name.onblur = ()=>{
            let regu = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            let regu1 = /^[1][3-9][0-9]{9}$/
            if(regu.test(this.name.value) || regu1.test(this.name.value)){
                this.span[0].innerHTML = '*'
                this.span[0].style.color = 'green'
            }else{
                this.span[0].innerHTML = '*'
                this.span[0].style.color = 'red'
                this.submit.setAttribute('disabled','disabled')
            }
        }
        this.pwd.onblur = ()=>{
            let regu2 = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Za-z]).*$/
            if(regu2.test(this.pwd.value)){
                this.span[1].innerHTML = '*'
                this.span[1].style.color = 'green'
            }else{
                this.span[1].innerHTML = '*'
                this.span[1].style.color = 'red'
                this.submit.setAttribute('disabled','disabled')
            }
        }
        this.pwds.onblur = ()=>{
            if(this.pwds.value == this.pwd.value){
                this.span[2].innerHTML = '*'
                this.span[2].style.color = 'green'
            }else{
                this.span[2].innerHTML = '*'
                this.span[2].style.color = 'red'
                this.submit.setAttribute('disabled','disabled')
            }
            if(this.pwd.value == ''){
                this.span[2].innerHTML = '*'
                this.span[2].style.color = 'red'
                this.submit.setAttribute('disabled','disabled')
            }
        }
        this.submit.onclick = ()=>{
            if(!this.name.value || !this.pwd.value || !this.pwds.value) return
            let data = `username=${this.name.value}&password=${this.pwds.value}`
            axios.post('http://localhost:3000/users',data).then(data =>{
                console.log(data);
                window.location.href = '/xiaomi/xiaomi-project/login.html'
            }).catch(data =>{
                alert('注册信息错误')
            })
            // window.location.href = '/xiaomi/xiaomi-project/login.html'
        }
    }

}
new Register()