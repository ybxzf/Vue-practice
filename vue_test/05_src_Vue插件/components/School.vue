<template>
  <div >
    <!-- 使用过滤器 -->
    <h2>学校名字：{{name | mySlice}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="test">点我测试一下hello</button>
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
  methods:{
    test(){
      this.hello();
    }
  },

}
</script>
