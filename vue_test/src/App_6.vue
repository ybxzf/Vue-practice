<template>
  <div>
    <div style="padding: 20px 0">
      <el-button size="small" type="primary" @click="handleDownload"
        >导出EXCEl</el-button
      >
    </div>
    <div class="index-container">
      <div class="button-area">
        <span>当前简报者</span>
        <el-select v-model="presenterId" @change="changePresenter($event)">
          <el-option
            v-for="item in presenters"
            :key="item.presenterId"
            :label="item.cname"
            :value="item.presenterId"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          class="home-button"
          :disabled="
            presenterId == presenters[presenters.length - 1]['presenterId']
          "
          @click="nextPresenter(presenterId)"
        >
          下一个简报者
        </el-button>
        <el-button type="primary" class="home-button" @click="downloadData()">
          数据下载
        </el-button>
        <el-button type="primary" class="home-button" @click="remindScore()">
          提醒评分
        </el-button>
      </div>

      <div class="table-area">

        <el-table
          id="new-table"
          :data="
            presentersScore.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          height="450"
          :header-cell-style="headerSet"
          :cell-style="cellSet"
        >
          <el-table-column
            fixed
            type="index"
            :index="indexMethod"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            fixed
            prop="departmentCode"
            label="所在部门"
            width="80"
          ></el-table-column>
          <el-table-column
            fixed
            prop="presenterName"
            label="简报者"
            width="80"
          ></el-table-column>

          <el-table-column
            v-for="(item, index) in evaluators"
            :key="index"
            :label="item['cname']"
          >
            <el-table-column
              v-for="(ele, idx) in tableScoreColumn"
              :key="idx"
              :label="ele"
              width="100"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.score[index][idx] }}</span>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column fixed="right" :width="totalWidth" label="合计">
            <el-table-column
              v-for="(ele, idx) in tableScoreColumn"
              :key="idx"
              :label="ele"
              width="100"
            >
              <template slot-scope="scope">
                <span>
                  {{ scope.row.score[scope.row.score.length - 1][idx] }}
                </span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>

        <!-- 页码 -->
        <div class="page-area">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="->,total, sizes, prev, pager, next, jumper"
            :total="presentersScore.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { downLoadToExcel } from "@/utils/tools/publicMethods";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment";
import { parseTime } from "@/utils";

export default {
  components: {},
  data() {
    return {
      currentPage: 1, //当前页 刷新后默认显示第一页
      pageSize: 10, //每一页显示的数据量 此处每页显示10条数据
      presenterId: "111111", //当前简报者
      presenters: [
        {
          //所有简报者们
          presenterId: "111111",
          cname: "简报者1",
        },
        {
          presenterId: "222222",
          cname: "简报者2",
        },
        {
          presenterId: "333333",
          cname: "简报者3",
        },
      ],
      evaluators: [
        {
          //所有评委们
          evaluatorId: "111111",
          cname: "评委1",
        },
        {
          evaluatorId: "222222",
          cname: "评委2",
        },
        {
          evaluatorId: "333333",
          cname: "评委3",
        },
      ],
      evaProjects: [
        //所有评分项目
        {
          name: "评分项1",
          score: 0,
          scoreMax: 10,
          scoreMin: 0,
          description: "取10%进行计算",
        },
        {
          name: "评分项2",
          score: 1,
          scoreMax: 10,
          scoreMin: 0,
          description: "是否主動尋找創新點（含Y22和Y23）",
        },
        {
          name: "评分项3",
          score: 2,
          scoreMax: 10,
          scoreMin: 0,
          description: "主管本人在管理方式、領導力方面的提升",
        },
      ],
      tableScoreColumn: {
        //所有评分项与分数对应表头
        score1: "评分项1",
        score2: "评分项2",
        score3: "评分项3",
      },
      //所有简报者得分
      presentersScore: [
        {
          departmentCode: "KHLP10",
          presenterName: "简报者1",
          presenterId: "111111",
          score: [
            //第一个简报者所有评委的评分
            {
              score1: "99",
              score2: "98",
              score3: "97",
            },
            {
              score1: "96",
              score2: "95",
              score3: "94",
            },
            {
              score1: "93",
              score2: "92",
              score3: "91",
            },
            {
              score1: "999",
              score2: "888",
              score3: "777",
            },
          ],
        },
        {
          departmentCode: "KHLP10",
          presenterName: "简报者2",
          presenterId: "222222",
          score: [
            //第二个简报者所有评委的评分
            {
              score1: "89",
              score2: "88",
              score3: "87",
            },
            {
              score1: "86",
              score2: "85",
              score3: "84",
            },
            {
              score1: "83",
              score2: "82",
              score3: "81",
            },
            {
              score1: "666",
              score2: "555",
              score3: "444",
            },
          ],
        },
        {
          departmentCode: "KHLP10",
          presenterName: "简报者3",
          presenterId: "333333",
          score: [
            //第三个简报者所有评委的评分
            {
              score1: "79",
              score2: "78",
              score3: "77",
            },
            {
              score1: "76",
              score2: "75",
              score3: "74",
            },
            {
              score1: "73",
              score2: "72",
              score3: "71",
            },
            {
              score1: "333",
              score2: "222",
              score3: "111",
            },
          ],
        },
      ],
    };
  },
  computed: {
    totalWidth() {
      return Object.keys(this.tableScoreColumn).length * 100;
    },
  },
  created() {},
  beforeDestroy() {},
  mounted() {
    this.initialization();
  },
  methods: {
    handleDownload() {
      import("@/vendor/Export2Excel").then((excel) => {
        //一级表头
        let multiHeader = [["序号", "所在部门", "简报者"]];
        // Array(
        //   this.presentersScore[0].score.length *
        //     Object.keys(this.tableScoreColumn).length
        // ).fill("");
        // multiHeader.unshift("序号", "所在部门", "简报者");

        for (let i = 0; i <= this.evaluators.length; i++) {
          let j = 0;
          for (const key in this.tableScoreColumn) {
            if (j == 0) {
              if (i == this.evaluators.length) {
                multiHeader[0].push("合计");
              } else {
                multiHeader[0].push(this.evaluators[i].cname);
              }
            } else {
              multiHeader[0].push("");
            }
            j++;
          }
        }
        //二级表头
        const header = Array(3).fill("");
        for (let i = 0; i < this.presentersScore[0].score.length; i++) {
          for (const key in this.tableScoreColumn) {
            header.push(this.tableScoreColumn[key]);
          }
        }
        //数据对应值的属性名
        const filterVal = ["presenterId", "departmentCode", "presenterName"];
        // 需要合并的单元格数据
        const merges = [`A1:A2`, `B1:B2`, `C1:C2`];
        let START_ASCII = 68; //合并起始的字母对应的ASCII码
        let END_ASCII = START_ASCII; //合并结束的字母对应的ASCII码
        let MORE_START_COLUMN = ""; //合并的单元格超过A-Z时的起始前缀
        let MORE_END_COLUMN = ""; //合并的单元格超过A-Z时的结束前缀
        let MORE_NUM = 0; //给MORE_START_COLUMN计数
        for (let i = 0; i < this.presentersScore[0].score.length; i++) {
          const element = this.presentersScore[0].score[i];
          for (const key in element) {
            filterVal.push(key + (i + 1));
            END_ASCII++;
          }
          if (END_ASCII > 90) {
            MORE_START_COLUMN =
              MORE_NUM == 0 ? "" : String.fromCharCode(65 + MORE_NUM - 1);
            MORE_END_COLUMN = String.fromCharCode(65 + MORE_NUM);
            // merges.push(
            //   `${MORE_START_COLUMN}${String.fromCharCode(START_ASCII)}1:
            //   ${MORE_END_COLUMN}${String.fromCharCode(END_ASCII-1)}1`
            // )
            END_ASCII -= 26; //回退到从'A'开始计算的ASCII码
            MORE_NUM++;
          }
          // else{
          merges.push(
            `${MORE_START_COLUMN}${String.fromCharCode(
              START_ASCII
            )}1:${MORE_END_COLUMN}${String.fromCharCode(END_ASCII - 1)}1`
          );
          MORE_START_COLUMN =
            MORE_NUM == 0 ? "" : String.fromCharCode(65 + MORE_NUM - 1);
          // }
          START_ASCII = END_ASCII;
        }
        //需要下载的数据
        const list = [];

        for (let i = 0; i < this.presentersScore.length; i++) {
          const presenter = this.presentersScore[i];
          const presenterItem = {
            departmentCode: presenter.departmentCode,
            presenterName: presenter.presenterName,
            presenterId: presenter.presenterId,
          };
          let z = 1;
          for (let j = 0; j < presenter.score.length; j++) {
            const scoreObject = presenter.score[j];
            // console.log('scoreObject',scoreObject);
            for (const scoreKey in scoreObject) {
              console.log("scoreKey", scoreKey);
              presenterItem[scoreKey + z] = scoreObject[scoreKey];
            }
            ++z;
          }
          list.push(presenterItem);
        }

        let data = this.formatJson(filterVal, list);

        console.log("multiHeader", multiHeader);
        console.log("header", header);
        console.log("merges", merges);
        console.log("data", data);
        console.log("filterVal", filterVal);
        console.log("list", list);

        // excel.export_json_to_excel({
        //   multiHeader,
        //   header,
        //   merges,
        //   data,
        // });
      });
    },
    /**
     * 格式化数据
     * @param {object[]} filterVal 存放属性名的数组
     * @param {object[]} jsonData 格式化的数据
     */
    formatJson(filterVal, jsonData) {
      let res = jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
      return res;
    },

    initialization() {
      //初始化方法
      console.log("页面初始化了");
    },
    changePresenter(presenterId) {
      //更改简报者
      console.log("开始给：" + presenterId + "评分");
    },
    nextPresenter(presenterId) {
      //切换下一个简报者
      this.presenters.forEach((ele, index) => {
        if (presenterId == ele["presenterId"]) {
          this.presenterId = this.presenters[index + 1]["presenterId"];
          console.log(
            "轮到" + this.presenters[index + 1]["presenterId"] + "开始简报"
          );
        }
      });
    },

    // 表格下载成Excel
    downLoad() {
      // const table = document.getElementById('new-table');
      const table = document.getElementsByClassName(
        "el-table__header-wrapper"
      )[0].innerHTML;

      console.log("table", table);
      // console.log('table',table.outerHTML);
      const excelName = "test";
      this.exportTableAsExcelFile(table, excelName);
    },

    // 表格中excel下载方法
    exportTableAsExcelFile(data, excelName) {
      const worksheet = XLSX.utils.table_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, excelName);
    },
    // 返回二进制流文件下载
    saveAsExcelFile(buffer, fileName) {
      const EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const EXCEL_EXTENSION = ".xlsx";
      const data = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      const today = this.getDate();
      FileSaver.saveAs(data, fileName + "_" + today + EXCEL_EXTENSION);
    },
    // 获取时间
    getDate() {
      const today = new Date().getTime();
      return moment(today).format("YYYYMMDD");
    },

    async downloadData() {
      //下载评分数据
      console.log("下载表格数据");

      this.downLoad();
    },
    remindScore() {
      //提醒评委评分
      this.$message.success("已发送提醒评委评分消息");
    },

    indexMethod(index) {
      //设置序号
      return ++index;
    },
    headerSet({ row, rowIndex }) {
      //设置表头
      let hdSet =
        "background-color:rgb(200,200,200);" +
        "color:red !important;" +
        "text-align:center";
      return hdSet;
    },
    cellSet({ row, column, rowIndex, columnIndex }) {
      //设置行、列、具体单元格
      let rowSet = "text-align:center;";
      if (row["presenterId"] == this.presenterId) {
        rowSet = rowSet + `background-color:rgb(231, 118, 118);`;
        return rowSet;
      }
      return rowSet;
    },
    handleCurrentChange(currentPage) {
      //当前第几页
      this.currentPage = currentPage;
    },
    handleSizeChange(pageSize) {
      //每页显示条数
      this.pageSize = pageSize;
    },
  },
};
</script>
<style lang="scss" scoped>
.index-container {
  // float: left;
  border: 1px solid rgb(202, 200, 200);
  width: 99%;
  height: 640px;
  position: relative;
  .button-area {
    margin-top: 70px;
    padding-left: 5%;
    span {
      margin-right: 2vh;
      font-weight: bolder;
    }
    .home-button {
      //按钮设置
      margin-left: 20px;
      display: inline;
    }
  }
  .table-area {
    width: 96%;
    margin-left: 2%;
    margin-top: 2%;
  }
  .page-area {
    padding-right: 2%;
  }
}
</style>