<template>
  <div>
    <button @click="getStudents">获取学生信息</button>
    <button @click="getCars">获取汽车信息</button>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    
    name:'App',

    methods: {
      getStudents(){
        //使用axios进行服务器数据请求，给两个回调，成功和失败
        // axios.get('http://localhost:5000/students').then(  直接请求会产生跨域错误
        axios.get('http://localhost:8080/atguigu/students').then( //使用代理服务器去请求students
          response=>{
            console.log("请求成功了：",response.data)
          },
          error=>{
            console.log("请求失败了，原因是",error.message)
          }
          )
      },
      getCars(){
        axios.get('http://localhost:8080/demo/cars').then(//不加demo前缀就先在public文件夹中找，找不到再去请求服务器
          response=>{
            console.log("请求成功了：",response.data)
          },
          error=>{
            console.log("请求失败了，原因是",error.message)
          }
          )
      }
    },

  }
</script>
