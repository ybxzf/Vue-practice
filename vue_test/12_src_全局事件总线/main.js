// 该文件是整个项目的入口文件，运行npm run serve时，第一时间就去访问main.js文件

//引入Vue
import Vue from 'vue'
//引入所有组件的父组件（管理者）App.vue
import App from './App.vue'

//关闭生产提示
Vue.config.productionTip = false

//创建Vue实例对象---vm
new Vue({
	el: '#app',
	//render函数完成了这个功能：将App组件放入容器中
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线
	},
})