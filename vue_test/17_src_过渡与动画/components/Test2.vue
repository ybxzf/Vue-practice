<!-- 用过渡实现动画 -->
<template>
  <div>
    <button @click = "isShow = !isShow">显示/隐藏</button>
    <!-- 
        过渡标签，你想谁发生过渡或者动画效果，就用transition标签把它包起来,
        transition可以取名name='xxx'，但css动画名也要跟着变为：.xxx-enter-active{}
        :appear="true"表示一开始就展示动画
        transition最终解析的时候vue就会把它脱掉
    -->
    <transition-group name="hello" :appear="true">
        <h1 v-show="isShow" key="1">你好啊</h1>
        <h1 v-show="!isShow" key="2">很好哦</h1>
    </transition-group>

  </div>
</template>

<script>
export default {
    name:"Test2",
    data() {
        return {
         isShow:true,   
        }
    },

}
</script>

<style scoped>
    h1{
        background-color: orange;
        

    }
    /* 来的起点，离开的终点 */
    .hello-enter,.hello-leave-to{
        transform: translateX(-100%);
    }
    /* 来的终点，离开的起点 */
    .hello-enter-to,.hello-leave{
        transform: translateX(0);
    }
    /* 来和去的整个过程 */
    .hello-enter-active,.hello-leave-active{
        /* 0.5s，匀速过渡 */
        transition: 0.5s linear;
    }

</style>