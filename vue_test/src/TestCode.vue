<template>
  <div>
    <!-- @filter-change="handleFilterChange"表示当筛选条件发生变化时会调用handleFilterChange方法 -->
    <el-table
      :data="performancesShowData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      @filter-change="handleFilterChange"
    >
        <!-- 循环数据展示列。
            :column-key="index" 表示拿到performanceDetailsKeys循环的每个key值
            :filters=filterRequirements[index] 表示展示在页面中可供选择的筛选条件
        -->
      <el-table-column
          v-for="(item,index) in performanceDetailsKeys"
          :key="index"
          :prop="index"
          :label="item"
          :column-key="index"
          :filters=filterRequirements[index]
        >
        </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {selectPerformances} from ''
export default {
    data() {
        return {
            currentPage: 1,     //当前页 刷新后默认显示第一页
            pageSize: 10,     //每一页显示的数据量 此处每页显示10条数据
            //table展示的列名和属性数据
            performanceDetailsKeys:{
                emplid:'工号',
                employeeCname:'姓名',
                site:'所在Site',
                departmentCode:'所在部门',
                testItem:'项目',
                acquisitionTime:'项目时间',
                grade:'项目得分',
            },
            //定义所有筛选条件
            filterRequirements:{},      
            //定义确认筛选的数据    
            allFilters:{},
        }
    },
    mounted() {
        
    },
    methods: {
        async initialization(){
            //请求api获取所有数据
            let selectResult = await selectPerformances()
            if(selectResult.code==200){
                this.performancesInitialData = selectResult.data
            }else{
                throw '未查询到数据'
            }
            //首先拿到所有数据，赋值给另一个变量，不能破坏原数据
            this.performancesShowData = this.performancesInitialData 
            console.log("this.performancesShowData",this.performancesShowData);
            //获取表头的key值并去重，得到所有筛选条件，存入filterRequirements
            let keys = Object.keys(this.performanceDetailsKeys)
            for (let i = 0; i < keys.length; i++) {
                let set = new Set(this.performancesShowData.map(item => item[keys[i]]))
                let array = [...set];
                this.filterRequirements[keys[i]] = []
                array.forEach(item=>{
                this.filterRequirements[keys[i]].push({'text':item,'value':item})
                })
            }
        },
        //自定义筛选
        handleFilterChange(filters){
            // filters为每次每列筛选的条件，allFilters为所有列每次筛选的条件，每次将filters更新进入allFilters
            this.allFilters = Object.assign(this.allFilters, filters)
            //获取所有需要筛选的条件的key值
            let filterKeys = Object.keys(this.allFilters)
            /*如点了项目时间筛选和得分筛选，
            则this.allFilters={
                acquisitionTime:['2022-10-17','2022-10-12'],
                grade:['A','B']
            }
            此时filterKeys=['acquisitionTime', 'grade']
            */
            this.currentPage = 1 //页数改为第一页，否则如果在第2页开始筛选就筛不到第一页的数据
            this.performancesShowData = this.performancesInitialData //将初始数据赋给展示数据
            let filterResultData = JSON.parse(JSON.stringify(this.performancesShowData)) //深拷贝，也可直接赋值
            let tempFiltersData = [] //用于存放每列满足条件的数据，一个中间变量
            /*进行循环筛选，原理：假如有两列需要筛选，每次筛选一列，
                第一列筛选出满足条件的数据，第二列筛选是在第一列已经筛选出的数据的基础上进行二次筛选的。
                筛选多列时以此类推，在上一次筛出的数据的基础上再进行筛选。
            */
            filterKeys.forEach(key=>{//拿到key值
                let flag = false//记录是否筛选到匹配的数据
                for (let j = 0; j < this.allFilters[key].length; j++) {
                // console.log(this.allFilters[key][j]);
                for (let i = 0; i < filterResultData.length; i++) {
                    if(filterResultData[i][key]==this.allFilters[key][j]){
                    tempFiltersData.push(filterResultData[i])
                    }
                }
                flag = true//如果能执行到这里，说明此列有满足条件的数据
                }
                if(flag){
                //此列有满足条件的数据时，将中间变量的数据存入filterResultData
                filterResultData = JSON.parse(JSON.stringify(tempFiltersData))
                }
                tempFiltersData = []
            })
            this.performancesShowData = filterResultData
            console.log("this.performancesShowData",this.performancesShowData)
        },
    },
}
</script>