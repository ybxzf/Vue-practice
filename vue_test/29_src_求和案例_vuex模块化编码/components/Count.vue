<template>
	<div>
		<h1>当前求和为：{{sum}}</h1>
		<h1>当前求和放大10倍为：{{bigSum}}</h1>
		<h3>我在{{school}}，學習{{subject}}</h3>
		<h3 style="color:red">(數據共享)Person組件列表的總人數是：{{personList.length}}</h3>
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
		<button @click="increment(n)">+</button>
		<button @click="decrement(n)">-</button>
		<button @click="incrementOdd(n)">当前求和为奇数再加</button>
		<button @click="incrementWait(n)">等一等再加</button>
	</div>
</template>

<script>
import { mapState,mapGetters, mapActions, mapMutations } from 'vuex'
	export default {
		name:'Count',
		data() {
			return {
				n:1, //用户选择的数字
			}
		},
		
		computed:{
			
			//表示从名为countAbout的store分类里面获取后面的数据，前提是namespaced: true,
			...mapState('countAbout',['sum','school','subject']),
			...mapState('personAbout',['personList']),
			/* ************************************************************* */
			//同上，有对象写法和数组写法
			// ...mapGetters({bigSum:'bigSum'})
			...mapGetters('countAbout',['bigSum'])//表示从名为countAbout的store分类里面获取后面的数据，前提是namespaced: true,
		},
		methods: {
			//借助mapMutations生成相应的方法，方法中会调用commit去联系mutations
			//但是由于要传n值，需要把n值写在调用处 @click="increment(n)"，否则点击时传过去就就是点击事件而非n值
			...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),// 表示从名为countAbout的store分类里面获取后面的数据，前提是namespaced: true,
			// ...mapMutations(['JIA','JIAN']),  方法名和提交名相同时，可以使用：数组写法
			/* *********************************************************** */
			
			//借助mapActions生成相应的方法，方法中会调用despatch去联系mapActions
			//类似于mapMutations，由于要传n值，需要把n值写在调用处 @click="incrementOdd(n)，否则点击时传过去就就是点击事件而非n值
			...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'}),//表示从名为countAbout的store分类里面获取后面的数据，前提是namespaced: true,
			//...mapActions(['jiaOdd','jiaWait']),  方法名和提交名相同时，可以使用：数组写法
		},
		mounted() {
			// console.log('Count',this)
		},
	}
</script>

<style lang="css">
	button{
		margin-left: 5px;
	}
</style>
