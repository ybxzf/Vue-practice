<template>
  <div >
  
    <h2 @click="showName">学生名字：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
  </div>
</template>

<script>
//引入一个混合（混入）
import {hunhe} from '../mixin'

export default {
  name:'Student',
  data() {
    return {
      name:"张三",
      sex:"男",
    }
  },
    //使用引入的混合（混入）
  mixins:[hunhe]
}
</script>