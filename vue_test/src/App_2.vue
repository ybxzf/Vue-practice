<template>
  <div class="block">
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%; margin-top: 20px;font-weight: 500;">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="departmentCode"
        label="部门代码">
      </el-table-column>      
      <el-table-column
        prop="departmentLevel"
        label="管理层级">
      </el-table-column>   
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>   
      <el-table-column fixed="right" label="编辑" align="center" width="60">
        <template slot-scope="scope">
          <i  class="el-icon-edit"  @click="openEditDialog(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[
        {
          departmentCode:'KDLP10',
          departmentLevelData: [{departmentLevel:'非课级'},{departmentLevel:'课级'},{departmentLevel:'部级'}],
          successorData: [{name:'熊镇锋'},{name:'张润鑫'},{name:'黄帅'}],
        },{
          departmentCode:'KDLP20',
          departmentLevelData: [{departmentLevel:'非课级'},{departmentLevel:'课级'},{departmentLevel:'部级'}],
          successorData: [{name:'倪雷'},{name:'龚豪'},{name:'王琪'}],
        },{
          departmentCode:'KDLP30',
          departmentLevelData: [{departmentLevel:'非课级'},{departmentLevel:'课级'},{departmentLevel:'部级'}],
          successorData: [{name:'你'},{name:'我'},{name:'他'}],
        }
      ],
      multipleSelection:[],

      nameArr:[],//合并name
      nameIndex:0,//合并name索引
      amount1Arr:[],//合并amount1
      amount1Index:0,//合并amount1索引
    };
  },
  watch:{
   
  },
  computed:{
  },
  mounted() {

  },
  methods: {


    //row:行数据，column:列信息，rowIndex:行索引，columnIndex:列索引
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log('row, column, rowIndex, columnIndex',row, column, rowIndex, columnIndex);
      // console.log('row',row);
      // console.log('column', column);
      // console.log('rowIndex', rowIndex);
      // console.log('columnIndex', columnIndex);
      // if (columnIndex === 0||columnIndex === 1||columnIndex === 2||columnIndex === 6) {
        // if ([0, 1, 4].includes(columnIndex)) {
        //   return {
        //       rowspan: 2,
        //       colspan: 1
        //     };
        // } 
        // else {
        //   return {
        //     rowspan: 0,
        //     colspan: 0
        //   };
        // }

      // }
    },

































    handleSelectionChange(val) {
      console.log('选中数据：',val);
      this.multipleSelection = val;
    },
    openEditDialog(row){
      console.log('选中数据：',row);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>