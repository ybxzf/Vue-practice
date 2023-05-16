<template>
  <div >
    <h2 @click="showName">学校名字：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
//引入一个混合（混入）
import {hunhe} from '../mixin'

export default {
  name:'School',
  data() {
    return {
      name:'尚硅谷',
      address:'北京',
    }
  },
  //使用引入的混合（混入）
  mixins:[hunhe]
}
</script>
