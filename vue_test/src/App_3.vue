




<template>
  <div class="EvalSimEvaluateCard">
    <div class="container">
      <el-table
        :data="tableDataList"
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
          <template slot-scope="scope">
            {{scope.row[index]}}
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
      contentDetailsKeys: {
        companyType: "工厂类型",
        site: "site",
        plant: "廠端",
        picEname: "PIC 英文名",
      },
      tableData: [
        {
          id: 27,
          companyType: "WSD",
          site: "WMX",
          plant: "P2",
          picEname: "PENGFANG DU",
          picCname: "杜彭芳 ",
          picEmplid: "D22010553",
          updateTime: "2022-10-12T08:22:39.000Z",
          updateUser: "D20070049",
        },
        {
          id: 28,
          companyType: "WSD",
          site: "WMX",
          plant: "P1",
          picEname: "RIAN ZHANG",
          picCname: "张润鑫 ",
          picEmplid: "D21051113",
          updateTime: "2022-10-13T18:59:13.000Z",
          updateUser: "D20070049",
        },
        {
          id: 26,
          companyType: "WSD",
          site: "WMX",
          plant: "SITE",
          picEname: "VIVIAN HE",
          picCname: "何金萍 ",
          picEmplid: "D20070049",
          updateTime: "2022-10-13T18:59:26.000Z",
          updateUser: "D20070049",
        },
        {
          id: 25,
          companyType: "WT",
          site: "WCD",
          plant: "P1",
          picEname: "LIV ZHANG",
          picCname: "张萍 ",
          picEmplid: "D16090003",
          updateTime: "2022-08-10T06:16:54.000Z",
          updateUser: "D20070049",
        },
        {
          id: 39,
          companyType: "WT",
          site: "WCD",
          plant: "P2",
          picEname: "VIVIAN HE",
          picCname: "何金萍 ",
          picEmplid: "D20070049",
          updateTime: "2022-10-13T16:47:46.000Z",
          updateUser: "D20070049",
        },
        {
          id: 18,
          companyType: "WT",
          site: "WCD",
          plant: "SITE",
          picEname: "LIV ZHANG",
          picCname: "张萍 ",
          picEmplid: "D16090003",
          updateTime: "2022-08-10T06:26:04.000Z",
          updateUser: "D20070049",
        },
        {
          id: 19,
          companyType: "WT",
          site: "WCQ",
          plant: "P1",
          picEname: "BECKY XU",
          picCname: "徐文晞 ",
          picEmplid: "D22050711",
          updateTime: "2022-08-09T06:59:07.000Z",
          updateUser: "D20070049",
        },
        {
          id: 20,
          companyType: "WT",
          site: "WCQ",
          plant: "SITE",
          picEname: "KEELY CHEN",
          picCname: "陈彦伶 ",
          picEmplid: "D22040511",
          updateTime: "2022-10-25T03:33:40.000Z",
          updateUser: "D16090003",
        },
        {
          id: 21,
          companyType: "WT",
          site: "WZS",
          plant: "P1",
          picEname: "PENGFANG DU",
          picCname: "杜彭芳 ",
          picEmplid: "D22010553",
          updateTime: "2022-08-12T02:05:42.000Z",
          updateUser: "D20070049",
        },
        {
          id: 23,
          companyType: "WT",
          site: "WZS",
          plant: "SITE",
          picEname: "RIAN ZHANG",
          picCname: "张润鑫 ",
          picEmplid: "D21051113",
          updateTime: "2022-08-06T06:15:42.000Z",
          updateUser: "D20070049",
        },
        {
          id: 24,
          companyType: "WT",
          site: "WZS",
          plant: "P6",
          picEname: "BEATA ZHANG",
          picCname: "张欢 ",
          picEmplid: "D18030021",
          updateTime: "2022-08-06T06:16:11.000Z",
          updateUser: "D20070049",
        },
        {
          id: 22,
          companyType: "WT",
          site: "WZS",
          plant: "P3",
          picEname: "BECKY XU",
          picCname: "徐文晞 ",
          picEmplid: "D22050711",
          updateTime: "2022-08-06T06:12:54.000Z",
          updateUser: "D20070049",
        },
      ],
      plantLists:[],  //組織樹數據  
      tableDataList:[], 
      siteAndPlant: [],  //表格合併數據
      siteTree: [],  //盘点组织树装
    };
  },
  methods: {
    // 獲取組織樹的數據
    async fetchPlantLists() {
      // store.dispatch('loading/openLoading', true)
      // const filter = {
      //   order: "companyType ASC, site ASC"
      // }
      this.plantLists = this.tableData
      //深拷贝
      this.siteAndPlant = JSON.parse(JSON.stringify(this.plantLists))
      this.tableDataList = JSON.parse(JSON.stringify(this.plantLists))

      // siteAndPlant-用于合并表格；siteTree-用于盘点组织的级联选择
      const siteGroup = {};
      let siteTreeIndex = -1;   // 记录siteTree的下标
      this.siteTree = [];
      // console.log("--------->>>this.siteAndPlant",this.siteAndPlant);
      for (const item of this.siteAndPlant) {
        if (!siteGroup[item.companyType]) {
          siteGroup[item.companyType] = {};
          const data = this.siteAndPlant.filter(a => a.companyType == item.companyType);
          item['rowspan1'] = data.length;   //第一列需合并的行数
          // 级联选择第一层
          siteTreeIndex++;
          this.siteTree[siteTreeIndex] = {value:item.companyType, label:item.companyType}
        }
        if (!siteGroup[item.companyType][item.site]) {
          const data = this.siteAndPlant.filter(a => a.companyType == item.companyType && a.site == item.site);
          item['rowspan2'] = data.length;
          siteGroup[item.companyType][item.site] = data.length;   //第二列需合并的行数、
          //级联选择第二层
          for(const dataItem of data){
            (this.siteTree[siteTreeIndex].children || (this.siteTree[siteTreeIndex].children = [])).push({
              value:dataItem.site +'-'+ dataItem.plant,label:dataItem.site +' '+ dataItem.plant
            });
          }
        }
      }
      this.siteTree = JSON.parse(JSON.stringify(this.siteTree))
      console.log(siteGroup,this.siteAndPlant,this.siteTree);
      // 觸發父組件方法，初始化級聯選擇菜單的數據
      // this.$emit('getTreeData', this.plantLists, this.siteTree)
      // store.dispatch('loading/closeLoading')
    },
    // 合併
    objectSpanMethod({ rowIndex, columnIndex }) {
      // // console.log(row.rowspan1,row.rowspan2, column,rowIndex,columnIndex);
      if (columnIndex === 0 ) {   //第一列
        if (!this.siteAndPlant[rowIndex].rowspan1) {
          return {
            rowspan: 0,   //合并的行数
            colspan: 0    //合并的列数，设为０则直接不显示
          }
        } else {
          return {
            rowspan: this.siteAndPlant[rowIndex].rowspan1,
            colspan: 1
          }
        }
      }else if (columnIndex === 1 ) {    //第二列
        if (!this.siteAndPlant[rowIndex].rowspan2) {
          return {
            rowspan: 0,
            colspan: 0
          }
        } else {
          return {
            rowspan: this.siteAndPlant[rowIndex].rowspan2,
            colspan: 1
          }
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