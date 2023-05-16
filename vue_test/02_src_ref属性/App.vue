<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <button @click="showDom">点我显示上方DOM元素</button>
    <school/>
  </div>
</template>

<script>
//引入School组件
import School from './components/School.vue'
export default {
  name:'App',
  components:{School,},
  data () {
    return {
      msg:'你好啊',
    }
  },
  methods:{
    showDom(){
      console.log(this.$refs.title); 
    }
  }
}
</script>

<style>

</style>