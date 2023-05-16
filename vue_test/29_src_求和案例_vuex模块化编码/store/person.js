import axios from "axios"
import { nanoid } from "nanoid"
//人員相關配置
export default {
	namespaced: true,//命名空间必改为true，组件才可通过你暴露的名字捕获到相应的$store
	actions:{//寫業務邏輯
		//必須姓王才能添加成功
		addPersonWang(context,value){//參數：上下文，值
			if(value.name.indexOf('王') === 0){
				context.commit('ADD_PERSON',value)
			}else{
				alert('添加的人必須姓王')
			}
		},
		addPersonServer(context){//連接後端api，找服務器要名字
			axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
				response => {
					context.commit('ADD_PERSON',{id:nanoid(),name:response.data})
				},
				error => {
					alert(error.message)
				}
			)
		}
	},
	mutations:{
		ADD_PERSON(state,personObj){
			console.log('mutations中的ADD_PERSON被调用了')
			state.personList.unshift(personObj)
		},
	},
	state:{
		personList:[
			{id:'001',name:'張三'},
		],
	},
	getters:{
		firstPersonName(state){
			return state.personList[0].name
		}
	}
}