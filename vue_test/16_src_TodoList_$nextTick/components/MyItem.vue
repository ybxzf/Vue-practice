<template>
	<li>
		<label>
			<input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>
			<!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
			<!-- <input type="checkbox" v-model="todo.done"/> -->
			<span v-show = '!todo.isEdit' >{{todo.title}}</span>
			<input 
				type="text" 
				v-show = 'todo.isEdit' 
				:value = "todo.title" 
				@blur="handleBlur(todo,$event)"
				ref="inputTitle" >
		</label>
		<button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
		<button v-show="!todo.isEdit" class="btn btn-edit" @click="handleEdit(todo)">编辑</button>
	</li>
</template>

<script>
	import pubsub from 'pubsub-js'
	export default {
		name:'MyItem',
		//声明接收todo
		props:['todo'],
		methods: {
			//勾选or取消勾选
			handleCheck(id){
				//通知App组件将对应的todo对象的done值取反
				// this.checkTodo(id)
				this.$bus.$emit('checkTodo',id)
			},
			//删除
			handleDelete(id){
				if(confirm('确定删除吗？')){
					//通知App组件将对应的todo对象删除
					// this.deleteTodo(id)
					// this.$bus.$emit('deleteTodo',id)
					pubsub.publish('deleteTodo',id)
				}
			},
			//编辑
			handleEdit(todo){
				if(todo.hasOwnProperty('isEdit')){//判断todo身上有没有该属性
					todo.isEdit = true
				}else{
					//todo.isEdit = true   直接写不行，因为todo里本身没有这个属性，不会触发vue重新解析模板，不是响应式的，加了属性也不会有改变状态
					this.$set(todo,'isEdit',true)//使用$set(要添加属性的对象名，往该对象中添加的属性名，值)可以触发vue重新解析模板
				}
				//因为vue是需要handleEdit全部执行完才重新解析模板，所以执行下面代码时还没有input框，便无法获取焦点
				//this.$refs.inputTitle.focus()
				/*
				setTimeout(()=>{ //延迟执行可解决，但vue提供了官方的
					this.$refs.inputTitle.focus()
				},200)
				*/
				//vue想到了这个问题，所以提供了$nextTick(指定回调函数)，nextTick指定的回调会在DOM节点更新之后再执行
				this.$nextTick(function(){
					this.$refs.inputTitle.focus()
				})
			},
			//失去焦点回调，执行修改逻辑
			handleBlur(todo,event){
				todo.isEdit = false  //此时todo里必然有该属性了，可以直接使用
				if(event.target.value.trim()=='')return alert("输入不能为空")
				this.$bus.$emit('updateTodo',todo.id,event.target.value)
			}
		},
	}
</script>

<style scoped>
	/*item*/
	li {
		list-style: none;
		height: 36px;
		line-height: 36px;
		padding: 0 5px;
		border-bottom: 1px solid #ddd;
	}

	li label {
		float: left;
		cursor: pointer;
	}

	li label li input {
		vertical-align: middle;
		margin-right: 6px;
		position: relative;
		top: -1px;
	}

	li button {
		float: right;
		display: none;
		margin-top: 3px;
	}

	li:before {
		content: initial;
	}

	li:last-child {
		border-bottom: none;
	}

	li:hover{
		background-color: #ddd;
	}
	
	li:hover button{
		display: block;
	}
</style>