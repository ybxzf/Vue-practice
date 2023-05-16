<template>
  <div>
    <button @click = "isShow = !isShow">显示/隐藏</button>
    <!-- 
        过渡标签，你想谁发生过渡或者动画效果，就用transition标签把它包起来,
        transition可以取名name='xxx'，但css动画名也要跟着变为：.xxx-enter-active{}
        :appear="true"表示一开始就展示动画
        transition最终解析的时候vue就会把它脱掉
    -->
    <transition name="hello" :appear="true">
        <h1 v-show="isShow" >你好啊</h1>
    </transition>

  </div>
</template>

<script>
export default {
    name:"Test",
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

    /* 动画keyframes */
    @keyframes atguigu{
        from{
            transform: translateX(-100%);
        }to{
            transform: translateX(0%);
        }
    }
    /* vue设置的来的时候播放动画，如果transition起了名字，如hello，就要写为：hello-enter-active */
    .hello-enter-active{
        /* 显示时播放atguigu 1s放完 linear匀速 */
        animation: atguigu 0.5s linear;
    }
    /* 走的时候播放动画 */
    .hello-leave-active{
        /* 隐藏时播放atguigu 1s放完 reverse反转 */
        animation: atguigu 0.5s reverse;
    }
</style>