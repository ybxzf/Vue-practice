<template>
    <li>
        <label>
            <!-- 根据todos的done属性觉得是否勾选 -->
            <input type="checkbox" :checked="MyTodo.done" @change="handleCheck(MyTodo.id)"/>
            <!-- 
                v-model="MyTodo.done" ：该代码在此场景也能实现勾选时数组中的done属性变化，但是不推荐使用
                    原因：因为违反了Vue的原则，因为props是只读的，但是props只是浅层的只读，他能判断todo对象是否修改，
                        无法判断todo内部属性的属性值done的属性值是否修改，很多程序员会利用这个漏洞简化代码，但是不是正道，万一修复了。
                <input type="checkbox" v-model="MyTodo.done"/> 
            -->
            <!-- 配合props动态展示todo里的内容 -->
            <span>{{MyTodo.title}}</span>
        </label>
        <button class="btn btn-danger" @click="handleDelete(MyTodo.id)">删除</button>
    </li>
</template>

<script>
    export default {
        name:'MyItem',
        //声明props，接收父组件传过来的todo对象
        props:['todo','checkTodo','deleteTodo'],
        data() {
            return {
                MyTodo:this.todo
            }
        },
        methods: {
            //勾选or取消勾选
            handleCheck(id){
                //通知App组件将点击的todo对应的done值取反
                this.checkTodo(id);
            },
            //删除
            handleDelete(id){
                if(confirm('确定删除吗？')){
                    //通知App组件删除id对应的todo对象
                    this.deleteTodo(id)
                }

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
    /* 是否隐藏 
    display: none; 
    */
    display: none; 
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
  /* 鼠标悬浮时效果 */
  li:hover{
      background-color: #ddd;
  }
  li:hover button{
      display: block;
  }
</style>