<template>
  <div class="school">
    <h2>学校名字：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click = 'sendSchoolName'>把学校名给App组件</button>
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
  methods: {
    sendSchoolName(){
      this.getSchoolName(this.name);
    }
  },


}
</script>

<style scoped>
  .school{
    background-color: skyblue;
  }
</style>
