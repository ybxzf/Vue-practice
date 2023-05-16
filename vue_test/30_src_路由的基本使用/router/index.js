// 该文件专门用于创建整个应用的路由器
//引入VueRouter
import VueRouter from 'vue-router'
//引入组件
import About from '../pages/About'
import Home from '../pages/Home'
//创建VueRouter对象,即路由器，并暴露
export default new VueRouter({
	routes:[
		{
            //如果你的路径时/about，就展示About组件
			path:'/about',
			component:About
		},
		{
            //如果你的路径时/home，就展示Home组件
			path:'/home',
			component:Home
		}
	]
})
