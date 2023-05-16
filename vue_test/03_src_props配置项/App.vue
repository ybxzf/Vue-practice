<template>
  <div>
    <!-- 要传数字时在数字属性前＋“：”，表示v-bind动态绑定，即VC接收的是引号里的内容 -->
    <Student name="张三" :age="18" sex="男"></Student>
  </div>
</template>

<script>
//引入School组件
import Student from './components/Student.vue';
export default {
  name:'App',
  components:{Student,},
 

}
</script>

<style>

</style>