<template>
  <div class="school">
    <h2>学校名字：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
    <h2></h2>
  </div>
</template>

<script>
//引入pubsub库
import pubsub from 'pubsub-js'
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
    //回调函数(消息名,收到的数据)
    demo(msgName,data){
      console.log("有人发布了hello消息，hello消息的回调执行了",msgName,data)
    }
  },
  mounted() {
    //订阅消息：每次订阅会返回一个订阅的Id，销毁时可用Id去指定
    //pubsub.subscribe('消息名',回调函数)，若要在里面直接写函数，需写为箭头函数，保证对象一致性
    this.pubId = pubsub.subscribe('hello',this.demo)
  },
  beforeDestroy() {
    //销毁订阅
    pubsub.unsubscribe(this.pubId)
  },


}
</script>

<style scoped>
  .school{
    background-color: skyblue;
  }
</style>
