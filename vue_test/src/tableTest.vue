<template>
  <div>
    <!-- :before-close表示点击对话框外部调用方法 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose(true)"
    >
      <!-- 表格 -->
      <el-table
      height="370px"
        :data="
          performancesAllData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
      >
        <el-table-column :show-overflow-tooltip="true" prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column prop="name" width="180">
          <template slot="header" slot-scope="scope">
            <el-popover
              ref="popover"
              placement="bottom"
              trigger="click"
              popper-class="popoverStyle"
            >
              <div slot="reference" class="div-popover">
                姓名<i class="el-icon-arrow-down" />
              </div>
              <el-checkbox-group v-model="checkList" style="width: 80px">
                  <el-checkbox el-checkbox label="王小虎" class="el-checkbox__statusFirst"></el-checkbox>
                  <el-checkbox el-checkbox label="王大锤" class="el-checkbox__statusOthers"></el-checkbox>
              </el-checkbox-group>
              <el-row :gutter="1">
                <el-col :span="12">
                  <el-link
                    :underline="false"
                    type="primary"
                    :disabled="checkList.length == 0"
                    @click="filterStatus(scope.row)"
                  >筛选</el-link>
                </el-col>
                <el-col :span="12">
                  <el-link :underline="false" type="primary" @click="resetQuery">重置</el-link>
                </el-col>
              </el-row>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="block" style="margin-top: 15px">
        <el-pagination
          align="center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="performancesAllData.length"
        >
        </el-pagination>
      </div>
      <el-button type="primary" round @click="handleClose(false)">关闭</el-button>
    </el-dialog>
  </div>
</template>
 
  <script>
export default {
  props:{
    isVisible:{
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {
      performanceDetailsKeys:{
        date:'日期',
        name:'姓名',
        address:'地址',
      },
      filterRequirements:[],

      performancesAllData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王大锤",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王大锤",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王大锤",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王大锤",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王大锤",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王大锤",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王大锤",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      performancesAllData2: [],
      checkList: [],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
    };
  },
  computed:{
    dialogVisible:{
      get(){
        console.log('isVisible',this.isVisible);
        return this.isVisible
      },
      set(value){
       console.log("value",value);
       this.$emit('closeChange',value)//子組件調用父組件的方法，並傳參
      }
    }
  },
  created() {
    //获取表头的key值并去重
    let keys = Object.keys(this.performanceDetailsKeys)
    for (let i = 0; i < keys.length; i++) {
      let set = new Set(this.performancesAllData.map(item => item[keys[i]]))
      let array = [...set];
    // console.log("set",set);
    // console.log("array",array);
      this.filterRequirements[keys[i]] = []
      array.forEach(item=>{
        this.filterRequirements[keys[i]].push({'text':item,'value':item})
      })
    }
    console.log("this.filterRequirements",this.filterRequirements);
    this.performancesAllData2 = this.performancesAllData;
  },
  methods: {
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    //筛选
    filterStatus() {
      let newArr = this.performancesAllData.filter((item) => {
        console.log(this.checkList);
        return item.name == this.checkList[0] || item.name == this.checkList[1];
      });
      this.performancesAllData = newArr;
      //点击筛选后，popover消失
      this.$refs.popover.showPopper = false;
    },
    //重置
    resetQuery() {
      this.performancesAllData=this.performancesAllData2
      this.checkList = [];
      //点击重置后，popover消失
      this.$refs.popover.showPopper = false;
    },
    handleClose(bool){
      this.$emit('closeChange',bool)//子組件調用父組件的方法，並傳參
    }
  },
};
  </script>
<style>
.div-popover {
  display: inline-block;
}
.el-checkbox__statusFirst {
  display: block;
  margin-bottom: 8px;
}
.el-checkbox__statusOthers {
  display: block;
  margin-top: 8px;
  margin-bottom: 8px;
}
.el-popover.popoverStyle {
  min-width: 100px;
}
.el-popover.popoverStyle {
  min-width: 100px;
}
</style>