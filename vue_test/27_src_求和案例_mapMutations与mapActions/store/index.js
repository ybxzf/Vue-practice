//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)
 
//准备actions——用于响应组件中的动作
const actions = {
	/* jia(context,value){
		console.log('actions中的jia被调用了')
		context.commit('JIA',value)
	},
	jian(context,value){
		console.log('actions中的jian被调用了')
		context.commit('JIAN',value)
	}, */
	jiaOdd(context,value){//（你可能需要的東西的上下文集合vue整理起來給你類似於mini版store，條件值）
		console.log('actions中的jiaOdd被调用了')
		if(context.state.sum % 2){
			context.commit('JIA',value)//使用commit方法調用mutations裡的同名方法JIA
		}
	},
	jiaWait(context,value){
		console.log('actions中的jiaWait被调用了')
		setTimeout(()=>{
			context.commit('JIA',value)
		},500)
	}
}
//准备mutations——用于操作数据（state）
const mutations = {
	JIA(state,value){//（監測sum的state，條件值）
		console.log('mutations中的JIA被调用了')
		state.sum += value
	},
	JIAN(state,value){
		console.log('mutations中的JIAN被调用了')
		state.sum -= value
	}
}
//准备state——用于存储数据
const state = {
	sum:0, //当前的和
	school:'開放大學',
	subject:'前端'

}
//准备getters——用于将state中的数据加工，记得要配置进store里面
const getters={
	bigSum(state){
		return state.sum*10//假设此处逻辑非常复杂，使用getters可以让多个组件进行复用，提高效率
	}

}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters,//配置getters
})