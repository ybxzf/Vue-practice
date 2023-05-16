<template>
    <div>
        <div class="row">
            <!-- 展示用戶列表 -->
			<div v-show="info.users.length" class="card" v-for="user in info.users" :key="user.login">
				<a :href="user.html_url" target="_blank">
				<img :src="user.avatar_url" style='width: 100px'/>
				</a>
				<p class="card-text">{{user.login}}</p>
			</div>
            <!-- 展示歡迎詞 -->
            <h1 v-show="info.isFirst">歡迎使用</h1>
            <!-- 展示加載中 -->
            <h1 v-show="info.isLoading">加載中。。。 。。。</h1>
            <!-- 展示錯誤信息 -->
            <h1 v-show="info.errMsg">{{info.errMsg}}</h1>
        </div>
    </div>
</template>

<script>
export default {
    name:'List',
    data() {
        return {
            info:{
                isFirst:true,
                isLoading:false,
                errMsg:'',
                users:[],
            }

        }
    },
    mounted() {
        this.$bus.$on('updateListData',(dataObj)=>{
            //es6語法：表示將後者的對象裡的數據和前者裡的對比，找到有相同屬性名的就替換其值，沒找到的屬性名保持原樣不動，順序可以隨意
            this.info = {...this.info,...dataObj}
            
        })
    },

}
</script>

<style scoped>
    .album {
		min-height: 50rem; /* Can be removed; just added for demo purposes */
		padding-top: 3rem;
		padding-bottom: 3rem;
		background-color: #f7f7f7;
	}

	.card {     
		float: left;
		width: 33.333%;
		padding: .75rem;
		margin-bottom: 2rem;
		border: 1px solid #efefef;
		text-align: center;
	}

	.card > img {
		margin-bottom: .75rem;
		border-radius: 100px;
	}

	.card-text {
		font-size: 85%;	
	}

</style>