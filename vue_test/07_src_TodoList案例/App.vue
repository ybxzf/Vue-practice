<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <my-header :addTodo = "addTodo"/>
        <my-list 
          :todos = "todos" 
          :checkTodo = "checkTodo" 
          :deleteTodo = "deleteTodo"  
        />
        <my-footer 
          :todos = "todos" 
          :checkAllTodo = "checkAllTodo" 
          :clearAllTodo = "clearAllTodo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyList from './components/MyList.vue'
import MyFooter from './components/MyFooter.vue'

export default {
  name:'App',
  components:{MyHeader,MyList,MyFooter},
  data() {
    return {
      todos:JSON.parse(localStorage.getItem('todos')) || []
    }
  },
  methods: {

    //子组件传值给父组件：父组件先给子组件传一个函数，子组件调用该函数，由于该函数是父组件定义的，所以父组件可以收到函数调用结果
    addTodo(todoObj){//添加一个todo
      this.todos.unshift(todoObj)//将收到的值添加到todos的首行
    },
    checkTodo(id){//勾选or取消勾选一个todo
      //foreach箭头函数
      this.todos.forEach((todo)=>{ if(todo.id === id){ todo.done = !todo.done } })

      /* 直接遍历
      for(var i=0;i<this.todos.length;i++){
        if(this.todos[i].id===id){
          this.todos[i].done = !this.todos[i].done;
        }
      }
      */
    },
    deleteTodo(id){//删除一个todo
      this.todos = this.todos.filter((todo)=>{
        return todo.id !== id
      })
    },
    checkAllTodo(done){//全选or取消全选
      this.todos.forEach((todo)=>{
        todo.done = done
      })
    },
    clearAllTodo(){//清除所有已完成的todo
      this.todos = this.todos.filter((todo)=>{
        return !todo.done
      })
    }
  },
  watch:{
    todos:{//监视todos，其发生变化时将新的todos添加到localStorage里
      deep:true,//深度监视
      handler(value){
        localStorage.setItem('todos',JSON.stringify(value))
      }
    }
  }
}
</script>

<style>
  /* base */
  
  .btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  .btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
  }

  .btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
  }

  .btn:focus {
    outline: none;
  }

  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
 