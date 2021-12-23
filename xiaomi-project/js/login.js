/*
 * @Author: xuel
 * @LastEditors: xuel
 * @Description: 文本内容
 */
class Login {
    constructor() {
        this.name = document.querySelector('#username')
        this.pwd = document.querySelector('#pwd')
        this.sub = document.querySelector('input[type=submit]')
        this.login()
    }
    login() {
        this.sub.onclick = () => {
            if (this.name.value == '' || this.pwd.value == '') {
                alert('请输入正确的用户名和密码！')
            }
            let data = `username=${this.name.value}&password=${this.pwd.value}`
            axios.get('http://localhost:3000/users?' + data + '').then(res => {
                // console.log(res);
                if (res.data == '') {
                    alert('请输入正确的用户名和密码')
                    // this.name.value = ''
                    this.pwd.value = ''
                    // console.log(1);
                    return
                }
                // console.log(res.data[0].username);
                this.name.value = ''
                this.pwd.value = ''
                Login.addCart('username', res.data[0].username)
            })
            // .catch(res => {
            //     alert('请输入正确的用户名和密码')
            //     // this.name.value = ''
            //     this.pwd.value = ''
            //     console.log(1);
            // })

        }
    }
    static addCart(username, name) {
        // 获取local中的数据
        let cartGoods = localStorage.getItem('name')
        // 判断是否存在数据
        if (cartGoods) { // 有数据
            cartGoods = JSON.parse(cartGoods)
            if (name == cartGoods.username) {
                alert('已登录账号')
            }else{
                alert('已登录其他账号')
            }
        } else { // 无数据
            cartGoods = {
                [username]: name
            }
            localStorage.setItem('name', JSON.stringify(cartGoods))
            layer.open({
                title: '',
                content: '已登录，正在跳转首页···',
                btn: '',
                closeBtn: '',
                time: 2000
            })
            setTimeout=()=>{(window.location.href = '/xiaomi/xiaomi-project/index.html'),2000}
        }
    }
}
new Login()