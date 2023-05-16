//求和相關配置
 export default{
	namespaced: true,//命名空间必改为true，组件才可通过你暴露的名字捕获到相应的$store名
	actions:{
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
	},
	mutations:{
		JIA(state,value){//（監測sum的state，條件值）
			console.log('mutations中的JIA被调用了')
			state.sum += value
		},
		JIAN(state,value){
			console.log('mutations中的JIAN被调用了')
			state.sum -= value
		},
	},
	state:{
		sum:0, //当前的和
		school:'開放大學',
		subject:'前端',
	},
	getters:{
		bigSum(state){
			return state.sum*10//假设此处逻辑非常复杂，使用getters可以让多个组件进行复用，提高效率
		}
	}
}