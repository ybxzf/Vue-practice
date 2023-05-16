<!-- 用过渡实现动画 -->
<template>
  <div>
    <button @click = "isShow = !isShow">显示/隐藏</button>
    <transition-group 
    :appear="true"
    name="animate__animated animate__bounce" 
    enter-active-class="animate__rubberBand"
    leave-active-class="animate__backOutUp"
    >
        <h1 v-show="isShow" key="1">你好啊</h1>
        <h1 v-show="!isShow" key="2">很好哦</h1>
    </transition-group>

  </div>
</template>

<script>
    import 'animate.css'
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

</style>