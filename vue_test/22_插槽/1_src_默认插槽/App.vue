<template>
	<div class="container">
		<category title="美食" >
			<img src="../public/pdd.jpg" alt="">
		</category>
		<category title="遊戲">
			<ul>
				<li v-for="(item,index) in games" :key="index">{{item}}</li>
			</ul> 
		</category>
		<category title="電影" >
			<video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
		</category>
	</div>
</template>

<script>
import Category from './components/Category.vue'
	

	export default {
		components: { 
			Category,
			},
		name:'App',
		data() {
			return {
				foods:['火锅','烧烤','小龙虾','牛排'],
				games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
				films:['《教父》','《拆弹专家》','《你好，李焕英》','《尚硅谷》']
			}
		},
	}
</script>

<style lang="css">
.container{
	display: flex;
	justify-content: space-around;
}
img{
    width: 100%;
    height: 80%;
}
video{
    width: 100%;
}
</style>