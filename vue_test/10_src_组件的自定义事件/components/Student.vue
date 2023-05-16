<template>
  <div class="student">
  
    <h2>学生名字：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <h2>当前求和为：{{number}}</h2>
    <button @click="add">点我number++</button>
    <button @click = 'sendStudentName'>把学生名给App组件</button>
    <button @click = 'unbind'>解绑atguigu事件</button>
    <button @click = 'death'>销毁当前Student组件的实例对象vc</button>

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
    add(){//当vc被销毁后仍会被调用，但是页面不会变化了
      console.log('add回调被调用了')
      this.number++
    },
    sendStudentName(){
      //触发Student组件实例对象身上的atguigu事件
      this.$emit('atguigu',this.name)
    },
    unbind(){
      this.$off('atguigu')//适用于解绑一个自定义事件
      //this.$off(['xxx','yyy','zzz'])//适用于解绑多个自定义事件，用[]数组装起来
      //this.$off()//全部解绑
    },
    death(){
      this.$destroy()//销毁了当前Student组件的实例对象vc，销毁后该组件实例对象绑定的所有自定义事件都失效了，原生事件不受影响
    }
  },
}
</script>

<style scoped>
  .student{
    background-color: orange;
  }
</style>