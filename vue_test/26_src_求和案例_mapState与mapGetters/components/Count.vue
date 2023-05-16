<template>
	<div>
		<h1>当前求和为：{{sum}}</h1>
		<h1>当前求和放大10倍为：{{bigSum}}</h1>
		<h3>我在{{school}}，學習{{subject}}</h3>
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
		<button @click="increment">+</button>
		<button @click="decrement">-</button>
		<button @click="incrementOdd">当前求和为奇数再加</button>
		<button @click="incrementWait">等一等再加</button>
	</div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
	export default {
		name:'Count',
		data() {
			return {
				n:1, //用户选择的数字
			}
		},
		
		computed:{
			/*  重复度高，可以使用mapState生成计算属性，从state中读取数据，将需要的数据统一放进一个对象中，一一对应即可轻松取出
			sum(){ 
				return this.$store.state.sum
			},
			school(){
				return this.$store.state.school
			},
			subject(){
				return this.$store.state.subject
			},   */

			/* 因为mapState()返回的是一个对象，而computed也是对象，对象里面放对象会报错
				解决：...xxx{}：ES6语法，表示将该xxx对象里面的数据展开分别放到外部对象中
				注：一定记得加''，不加的话读取的就是变量，而不是返回的对象数据了
			*/
			//...mapState({sum:'sum',school:'school',subject:'subject'}), （对象写法）
			//当计算属性名和state中要获取数据的属性名相同时，可以使用：数组写法
			...mapState(['sum','school','subject']),
			/* ************************************************************* */
			/*
			bigSum(){
				return this.$store.getters.bigSum
			},
			*/
			//同上，有对象写法和数组写法
			...mapGetters({bigSum:'bigSum'})
		},
		methods: {
			increment(){
				//沒有多的業務邏輯，不用調dispatch傳值給actions，可以直接調commit，跳過dispatch和actions這一步
				this.$store.commit('JIA',this.n)
			},
			decrement(){
				this.$store.commit('JIAN',this.n)
			},
			incrementOdd(){
				this.$store.dispatch('jiaOdd',this.n)
			},
			incrementWait(){
				this.$store.dispatch('jiaWait',this.n)
			},
		},
		mounted() {
			console.log('Count',this)
		},
	}
</script>

<style lang="css">
	button{
		margin-left: 5px;
	}
</style>
