<template>
    <div class="todo-footer" v-show="total">
        <label>
            <input type="checkbox" 
                    :checked = "isAll"
                    @change = "checkAll"
                    />
        </label>
        <span>
            <span>已完成{{doneTotal}}</span> / 全部{{total}}
        </span>
        <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
    </div>
</template>

<script>
    export default {
        name:'MyFooter',
        props:['todos','checkAllTodo','clearAllTodo'],
        data() {
            return {
                
            }
        },
        computed:{
            total(){
                return this.todos.length
            },
            doneTotal(){
                /* 最简单直白的方法
                let i = 0;
                this.todos.forEach((todo)=>{
                    if(todo.done){
                        i++;
                    }
                })
                return i;  
                */
               //使用ES6中的条件筛选方法reduce
               return this.todos.reduce((pre,todo)=> pre + (todo.done ? 1:0),0)
            },
            isAll(){
                return this.doneTotal === this.total && this.total > 0
            }
        },
        methods: {
            checkAll(e){
                this.checkAllTodo(e.target.checked)
            },
            clearAll(){
                this.clearAllTodo()
            }
        },

    }
</script>

<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>