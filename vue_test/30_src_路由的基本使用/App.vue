<template>
  <div>
    <div class="row">
      <Bunner></Bunner>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
		<!-- 原始html中我们使用a标签实现页面的跳转 -->
    	<!-- <a class="list-group-item active" href="./about.html">About</a> -->
        <!-- <a class="list-group-item" href="./home.html">Home</a> -->

			<!-- vue-router内置的标签 <router-link  to='跳转路径'> 来实现路由跳转。active-class="active"表示被激活时高亮 -->
			<router-link class="list-group-item" active-class="active" to="/about">About</router-link>
        	<router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
			<!-- vue-router内置的标签<router-view>展示，指定组件呈现位置 -->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bunner from './components/Bunner.vue';
	export default {
    name: "App",
    components: { Bunner }
}
</script>
