<template>
  <div class="app">
    <h1>{{msg}}</h1>
    <!-- 组件标签事件默认使用自定义事件，必须配置&emit，要想让vue把它当原生事件直接处理，在事件后加native即可，如： @click.native="show" -->

    <!-- 子组件 => 父组件，父组件传函数，通过props实现 -->
    <School :getSchoolName = "getSchoolName" />
    <hr>
    <!-- 子组件 => 父组件，绑定自定义事件，什么都没有传，子组件通过$emit触发实现 -->
      <!-- v-on,缩写就是@:给其所在标签Student组件的实例对象VC绑定一个事件，给谁绑定事件，就找谁去触发 -->
    <!-- <Student v-on:atguigu = "getStudentName"/> -->
    
    <!-- 子组件 => 父组件,使用ref标记，在需要的组件里使用this.$refs.组件名  即可获取到ref标记的组件的实例对象VC,再通过
    this.$refs.student.$on('atguigu',this.getStudentName)调用 -->
    <Student ref = "student" @click.native="show"/>
  </div>
</template>

<script>
import School from './components/School.vue';
//引入School组件
import Student from './components/Student.vue';
export default {
  name:'App',
  components:{Student, School,},
  data() {
    return {
      msg:'你好啊'
    }
  },
  methods: {
    getSchoolName(name){
      console.log("app收到了学校名：",name)
    },
    getStudentName(name){
      console.log("demo被调用了：",name)
    },
    show(){
      alert('组件标签使用原生事件，不用$emit')
    }
  },
  mounted() {//挂载完毕执行
    setTimeout(() => {//更灵活
      //this.$refs.student表示student组件的实例对象VC，$on表示当什么时候怎么怎么样，在此处表示当atguigu自定义事件被触发的时候执行this.getStudentName
      this.$refs.student.$on('atguigu',this.getStudentName)
    }, 3000);
  },
}
</script>

<style>
  .app{
    background-color: gray;
  }
</style>
 