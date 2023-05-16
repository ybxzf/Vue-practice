<template>
  <div class="student">
  
    <h2>学生名字：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2> 
    <button @click = "sendStudentName">点我把学生姓名传给school组件</button>
  </div>
</template>

<script>

  //引入pubsub库
  import pubsub from 'pubsub-js'
  export default {
    name:'Student',
    data() {
      return {
        name:"张三",
        sex:"男",
        number:0
      }
    },
    methods: {
      sendStudentName(){
        //发布消息：
        //pubsub.publish('消息名',数据)
        pubsub.publish('hello',666)
      }
    },


  }
</script>

<style scoped>
  .student{
    background-color: orange;
  }
</style>