/*
 * @Author: xuel
 * @LastEditors: xuel
 * @Description: 文本内容
 */
class Login{
    constructor(){
        this.name = document.querySelector('#username')
        this.pwd = document.querySelector('#pwd')
        this.sub = document.querySelector('input[type=submit]')
        this.login()
    }
    login(){
        this.sub.onclick = ()=>{
            if(this.name.value == '' || this.pwd.value == ''){
                alert('请输入正确的用户名和密码！')
            }
            let data = `username=${this.name.value}&password=${this.pwd.value}`
            axios.get('http://localhost:3000/users?'+data+'').then(res =>{
                if(this.name.value === res.data[0].username){
                    console.log(res.data[0].username);
                    this.name.value = ''
                    this.pwd.value = ''
                    Login.addCart('username',res.data[0].username)
                }
            }).catch(res =>{
                alert('请输入正确的用户名和密码')
                // this.name.value = ''
                this.pwd.value = ''
            })
            
        }
    }
    static addCart(username,name){
        // 获取local中的数据
        let cartGoods = localStorage.getItem('name')
        // 判断是否存在数据
        if(cartGoods){   // 有数据
            // 将json转为对象
            cartGoods = JSON.parse(cartGoods)
            // 判断购物车中是否已存在当前添加的商品，如存在商品数量加一
            for(let attr in cartGoods){
                // 数量增加1
                if(attr == username){
                    localStorage.setItem('name',JSON.stringify(cartGoods))
                }
            }
        }else{   // 无数据
            cartGoods = {
                [username] : name
            }
            localStorage.setItem('name',JSON.stringify(cartGoods))
        }
    }
}
new Login()