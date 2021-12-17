/*
 * @Author: xuel
 * @LastEditors: xuel
 * @Description: 文本内容
 */
class Goodshow{
    constructor(){
        this.show()
        Goodshow.rotate()
    }

    show(){
        axios.get('http://localhost:3000/goods').then(res =>{
            res.data.forEach(item =>{
                console.log(item);
            })
        })
    }


    static rotate(){
        let icon = document.querySelectorAll('.product-box .pro-tab .title')
        let proList = document.querySelectorAll('.product-box .pro-list')
        for(let i=0; i<icon.length;i++){
            icon[i].onclick = ()=>{
                if(icon[i].children[0].classList.contains('rotate')){
                    icon[i].children[0].classList.remove('rotate')
                    proList[i].style.display = 'block'
                }else{
                    icon[i].children[0].classList.add('rotate')
                    proList[i].style.display = 'none'
                }
            }
        }
    }
}
new Goodshow()