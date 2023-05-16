<template>
  <div class="school">
    <h2>学校名字：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
    <h2></h2>
  </div>
</template>

<script>
export default {
  name:'School',
  props:['getSchoolName'],
  data() {
    return {
      name:'尚硅谷atguigu',
      address:'北京',
    }
  },
  mounted() {
    // console.log('School',this)
    this.$bus.$on('hello',(data)=>{
      console.log('我是School组件，收到了数据:',data)
    })
  },
  beforeDestroy() {
    this.$bus.$off('hello')
  },


}
</script>

<style scoped>
  .school{
    background-color: skyblue;
  }
</style>
