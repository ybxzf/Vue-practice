// 该文件是整个项目的入口文件，运行npm run serve时，第一时间就去访问main.js文件


//引入Vue
import Vue from 'vue'
//引入所有组件的父组件（管理者）App.vue
import App from './App.vue'

//引入插件
import plugins from './plugins'

//关闭生产提示
Vue.config.productionTip = false

//应用(使用)插件，可以把vue给你，还可以带参数
Vue.use(plugins,1,2,3)
//创建Vue实例对象---vm
new Vue({
	el: '#app',
	//render函数完成了这个功能：将App组件放入容器中
	render: h => h(App),
	// render:q=> q('h1','你好啊')

	// template:`<h1>你好啊</h1>`,
	// components:{App},
})