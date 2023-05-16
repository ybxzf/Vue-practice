//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

//引入person和count的store
import countOptions from './count'
import personOptions from './person'
//应用Vuex插件	
Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
	modules: {//暴露時切忌要使用模塊化，否則還是找不到
		countAbout:countOptions,
		personAbout:personOptions
	}
})