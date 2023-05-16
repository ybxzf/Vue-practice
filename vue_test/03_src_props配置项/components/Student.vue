<template>
  <div >
    <h1>{{msg}}</h1>
    <h2>学生名字：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <!-- 传入的年龄加工之后再显示在页面上 -->
    <h2>学校年龄：{{myAge+1}}</h2>

    <button @click="updateAge">尝试修改收到的年龄</button>
  </div>
</template>

<script>
export default {
  name:'Student',
  data() {
    return {
      msg:'一个大学生',
      //当data和props中的数据发生冲突（二者里面都有name属性），props优先级更高，并且vue不建议直接修改props转入的值，非要修改，可传给data去改
      myAge:this.age,
    }
  },
  methods:{
    updateAge(){
     this.myAge++;
    }
  },
   //props属性：App组件Student标签中传入数据，Student.vue组件VC中接收，类似于微信收款，一方发送，另一方确认收款
  //1.简单接收，传啥收啥
  props:["name","age","sex"],
  
  //2.限制接收类型，但是还是会接收
  // props:{
  //   name:String,
  //   age:Number,
  //   sex:String,
  // }

  //3.接收时：限制类型+必要+默认值
  // props:{
  //   name:{
  //     type:String,//类型
  //     required:true,//是否必要，必传
  //   },
  //   age:{
  //     type:Number,//类型
  //     //required:true,//是否必要，必传
  //     default:99,//不传默认是99
  //   },
  //   sex:{
  //     type:String,//类型
  //     required:true,//是否必要，必传
  //   }
  // }
  

}
</script>