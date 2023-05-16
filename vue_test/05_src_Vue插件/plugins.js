import { bind } from "core-js/core/function"

export default {//默认并直接暴露
    install(Vue,x,y,z){//定义install方法，可以收到参数：Vue的调用者的构造函数
        console.log(x,y,z)//可以接收Vue.use方法中传过来的参数
        //全局过滤器
        Vue.filter('mySlice',function(value){
            return value.slice(0,4)//只返回0-4索引的值
        })

        //全局自定义指令
        Vue.directive('fbind',{//该方法为自动获取焦点
            //指令与元素成功绑定时（一上来）
            bind(element,binding){
                element.value = binding.value
            },
            //指令所在元素插入页面时
            inserted(element,binding){
                element.focus()
            },
            //指令所在模板被重新解析时
            update(element,binding){
                element.value = binding.value
            },
        })

        //定义混入mixin
        Vue.mixin({
            data(){
                return {
                    x:100,
                    y:200
                }
            },
        })

        //该原型上添加一个方法，vm和vc都能用，一调用就弹窗
        Vue.prototype.hello = ()=>{alert('你好')}
    }
}

//export default obj //默认暴露