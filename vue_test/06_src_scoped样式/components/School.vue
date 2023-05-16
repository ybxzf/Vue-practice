<template>
  <div class="demo">
    <!-- 使用过滤器 -->
    <h2>学校名字：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
export default {
  name:'School',
  data() {
    return {
      name:'尚硅谷atguigu',
      address:'北京',
    }
  },


}
</script>

<style scoped>
  .demo{
    background-color: skyblue;
  }
</style>
