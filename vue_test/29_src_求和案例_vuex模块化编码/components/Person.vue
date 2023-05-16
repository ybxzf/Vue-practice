<template>
  <div>
      <h1>人員列表</h1>
      <h3>Count組件求和為：{{sum}}</h3>
      <h3>列表中第一個人的名字是：{{firstPersonName}}</h3>
      <input type="text" placeholder="請輸入名字" v-model="name">
      <button @click="add">添加</button>
      <button @click="addWang">添加一個姓王的人</button>
      <button @click="addPersonServer">添加一個隨機的人</button>
      <ul>
          <li v-for="p in personList" :key="p.id">{{p.name}}</li>
      </ul>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'//隨機生成id
import { mapState } from 'vuex'
export default {
    name:'Person',
    data() {
        return {
            name:'',
        }
    },
    computed:{
        //...mapState({personList:'personList'}),//對象寫法
        //...mapState(['personList'])//數組寫法
        personList(){
            return this.$store.state.personAbout.personList
        },
        sum(){
            return this.$store.state.countAbout.sum
        },
       
        firstPersonName(){
            return this.$store.getters['personAbout/firstPersonName']
        }

    },
    methods:{
        add(){
            const personObj = {id:nanoid(),name:this.name}
            // console.log(personObj)
            this.$store.commit('personAbout/ADD_PERSON', personObj)
            this.name = ''
        },
        addWang(){
            const personObj = {id:nanoid(),name:this.name}
            this.$store.dispatch('personAbout/addPersonWang', personObj)
            this.name = ''
        },
        addPersonServer(){
            this.$store.dispatch('personAbout/addPersonServer')

        }
    },
    mounted() {
        
    },

}
</script>

<style>

</style>