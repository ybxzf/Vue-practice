<template>
  <div class="student">
  
    <h2>学生名字：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2> 
    <button @click = "sendStudentName">点我把学生姓名传给school组件</button>
  </div>
</template>

<script>

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
      this.$bus.$emit('hello',this.name)
    }
  },


}
</script>

<style scoped>
  .student{
    background-color: orange;
  }
</style>