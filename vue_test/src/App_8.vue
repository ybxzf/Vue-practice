<template>
  <div style="padding: 20px">
    <el-button size="small" type="primary" @click="exchange = !exchange"
      >切换</el-button
    >
    <div v-if="exchange">
      <div style="padding: 20px 0">
        <el-button size="small" type="primary" @click="handleDownload"
          >导出EXCEl</el-button
        >
      </div>
      <el-table class="center-table" :data="tableData" size="small">
        <el-table-column prop="date" label="日期" width="150" />
        <el-table-column label="配送信息">
          <el-table-column prop="name" label="姓名" width="120" />
          <el-table-column label="地址">
            <el-table-column prop="province" label="省份" width="120" />
            <el-table-column prop="city" label="市区" width="120" />
            <el-table-column prop="address" label="地址" />
            <el-table-column prop="zip" label="邮编" width="120" />
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <app-5></app-5>
    </div>
  </div>
</template>
 
<script>
import app5 from "./App_5.vue";
export default {
  name: "MergeHeader",
  components: { app5 },
  data() {
    return {
      exchange: true,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
      receiveMsg:null
    };
  },
  mounted() {



  },
  destroyed() {
  },  

  methods: {

    // websocket的回调函数，msg表示收到的消息
    global_callback(msg) {
      console.log("websocket的回调函数收到服务器信息：" + JSON.stringify(msg));
      // console.log("收到服务器信息：" + msg);
    },

    handleDownload() {
      import("@/vendor/Export2Excel").then((excel) => {
        const multiHeader = [
          ["日期", "配送信息", "", "", "", ""], //第一行
          ["", "姓名", "地址", "", "", ""], //第二行
        ]; // 前两行的表头数据，二维数组，不够的用空白补全
        const header = ["", "", "省份", "市区", "市区", "邮编"]; // 最后一行的表头数据
        const filterVal = [
          "date",
          "name",
          "province",
          "city",
          "address",
          "zip",
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        const merges = ["A1:A3", "B1:F1", "B2:B3", "C2:F2"]; // 合并单元格的数据，
        excel.export_json_to_excel({
          multiHeader,
          header,
          merges,
          data,
        });

        console.log(multiHeader);
        console.log(header);
        console.log(merges);
        console.log(data);
        console.log(filterVal);
        console.log(list);
      });
    },
    formatJson(filterVal, jsonData) {
      let res = jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
      return res;
    },
  },
};
</script>
<style>
.center-table td,
.center-table th {
  text-align: center;
}
</style>