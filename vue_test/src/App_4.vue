
<template>
  <div class="EvalSimEvaluateCard">
    <div class="container">
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        class="table eleChange"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column
          v-for="(item, index) in contentDetailsKeys"
          :key="index"
          :prop="index"
          :label="item"
          width="180"
        >
          <!-- 分行显示 -->
          <template slot-scope="scope">
            <!-- {{scope.row.item}} -->
            <div class="myCellDiv" v-for="(item1, index1) in (scope.row[index].split(';'))"
              :key="index1">
              {{ item1 }}
            </div>
          </template>
        </el-table-column>

       
        <el-table-column label="操作" min-width="230">
          <template #default="scope">
            <el-button
              type="primary"
              text
              icon="Edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="primary"
              text
              icon="Delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
export default {
  name: "simParams",
  data() {
    return {
      contentDetailsKeys:{
        departmentCode:'部门代码',
        departmentLevel:'管理层级',
        name:'姓名',
      },
      // tableData: [
      //   {
      //     departmentCode:'KDLP10',
      //     departmentLevel: '非课级;课级;部级',
      //     name: '熊镇锋;张润鑫;黄帅',
      //   },{
      //     departmentCode:'KDLP20',
      //     departmentLevel: '非课级;课级;部级',
      //     name: '倪雷;龚豪;王琪',
      //   },{
      //     departmentCode:'KDLP30',
      //     departmentLevel: '非课级;课级;部级',
      //     name: '你;我;他',
      //   }
      // ],
      tableData: [
        {
          id:0,
          departmentCode:'KDLP10',
          departmentLevel: '非课级',
          name: '熊镇锋',
        },{
          id:1,
          departmentCode:'KDLP10',
          departmentLevel: '非课级',
          name: '张润鑫',
        },{
          id:2,
          departmentCode:'KDLP10',
          departmentLevel: '课级',
          name: '黄帅',
        },{
          id:3,
          departmentCode:'KDLP20',
          departmentLevel: '非课级',
          name: '倪雷',
        },{
          id:4,
          departmentCode:'KDLP20',
          departmentLevel: '课级',
          name: '龚豪',
        },{
          id:5,
          departmentCode:'KDLP20',
          departmentLevel: '课级',
          name: '王琪',
        },{
          id:6,
          departmentCode:'KDLP30',
          departmentLevel: '部级',
          name: '你',
        },{
          id:7,
          departmentCode:'KDLP30',
          departmentLevel: '部级',
          name: '我',
        },{
          id:8,
          departmentCode:'KDLP30',
          departmentLevel: '课级',
          name: '他',
        }
      ],

      count:1
    };
  },
  methods: {
    initialization(){

    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          
      // console.log('row, column, rowIndex, columnIndex',row['departmentCode']);
      // console.log('row, column, rowIndex, columnIndex',row['name'],row, column, rowIndex, columnIndex);
      if (columnIndex === 0) {
        console.log('row',row['id']);
        if (rowIndex==0) {
          console.log('row, column, rowIndex, columnIndex',row, column, rowIndex, columnIndex);
          return {
            rowspan: 3,
            colspan: 1
          };
        }else if (rowIndex==3) {
          return {
            rowspan: 3,
            colspan: 1
          };
        }else if (rowIndex==6) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }if (columnIndex === 1) {
        if (rowIndex  == 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else if (rowIndex  == 2) {
          return {
            rowspan: 1,
            colspan: 1
          };
        } else if (rowIndex  == 3) {
          return {
            rowspan: 1,
            colspan: 1
          };
        } else if (rowIndex  == 4) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else if (rowIndex  == 6) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else if (rowIndex  == 8) {
          return {
            rowspan: 1,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      
    },








    handleEdit(index, row) {
      console.log("index,row", index, row);
    },
    handleDelete(index, row) {
      console.log("index,row", index, row);
    },
  },
};
</script>

<style>
.myCell:not(.table-header),
.myCell:not(.table-header) .cell {
  padding: unset !important;
}
.myCell .myCellDiv {
  border-bottom: 1px solid #ebeef5;
  padding: 2px 12px;
}
.myCell .cell .myCellDiv:last-child {
  border-bottom: unset;
}
</style>




