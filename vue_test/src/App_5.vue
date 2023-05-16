
<template>
  <div>
    <div style="padding: 20px 0">
      <el-button size="small" type="primary" @click="handleDownload"
        >导出EXCEl</el-button
      >
    </div>
    <div class="table-area">
      <el-table id="new-table" :data="presentersScore" height="450">
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

        <el-table-column label="合计">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      evaluators: [
        //所有评委们
        {
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
  methods: {
    handleDownload() {
      import("@/vendor/Export2Excel").then((excel) => {

        /*
        code:把表格的数据处理成下载所需形式的代码
        */

        //存一级表头的二维数组
        const multiHeader = [
          [
            "序号",
            "所在部门",
            "简报者",
            "评委1",
            "",
            "",
            "评委2",
            "",
            "",
            "评委3",
            "",
            "",
            "合计",
            "",
            "",
          ],
        ];
        //存二级表头的数组
        const header = [
          "",
          "",
          "",
          "评分项1",
          "评分项2",
          "评分项3",
          "评分项1",
          "评分项2",
          "评分项3",
          "评分项1",
          "评分项2",
          "评分项3",
          "评分项1",
          "评分项2",
          "评分项3",
        ];
        //存合并单元格的数组
        const merges = [
          "A1:A2",
          "B1:B2",
          "C1:C2",
          "D1:F1",
          "G1:I1",
          "J1:L1",
          "M1:O1",
        ];
        //存属性名的数组
        const filterVal = [
          "presenterId",
          "departmentCode",
          "presenterName",
          "score11",
          "score21",
          "score31",
          "score12",
          "score22",
          "score32",
          "score13",
          "score23",
          "score33",
          "score14",
          "score24",
          "score34",
        ];
        const list = [
          {
            departmentCode: "KHLP10",
            presenterName: "简报者1",
            presenterId: "111111",
            score11: "99",
            score21: "98",
            score31: "97",
            score12: "96",
            score22: "95",
            score32: "94",
            score13: "93",
            score23: "92",
            score33: "91",
            score14: "999",
            score24: "888",
            score34: "777",
          },
          {
            departmentCode: "KHLP10",
            presenterName: "简报者2",
            presenterId: "222222",
            score11: "89",
            score21: "88",
            score31: "87",
            score12: "86",
            score22: "85",
            score32: "84",
            score13: "83",
            score23: "82",
            score33: "81",
            score14: "666",
            score24: "555",
            score34: "444",
          },
          {
            departmentCode: "KHLP10",
            presenterName: "简报者3",
            presenterId: "333333",
            score11: "79",
            score21: "78",
            score31: "77",
            score12: "76",
            score22: "75",
            score32: "74",
            score13: "73",
            score23: "72",
            score33: "71",
            score14: "333",
            score24: "222",
            score34: "111",
          },
        ];

        let data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          multiHeader,
          header,
          merges,
          data,
        });
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
    indexMethod(index) {
      //设置序号
      return ++index;
    },
  },
};
</script>

<style>
</style>