<template>
  <div>
    <el-button type="primary" round @click="open()">打开</el-button>
    <div class="uploadOuter">
      <span
        style="
          width: 100%;
          height: 100%;
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
        "
        >上传</span
      >
      <input
        id="uploadInner"
        type="file"
        accept=".xlsx"
        @change="uploadExcel"
      />
    </div>
    <a type="success" style="margin-left: 2%" @click="downLoadTemplate()"
      >下载模板</a
    >
    <form name="form1">
      <input
        type="file"
        name="picpath"
        id="picpath"
        style="display: none"
        onChange="document.form1.path.value=this.value"
      />
      <input name="path" readonly />
      <input
        type="button"
        value="上传照片"
        onclick="document.form1.picpath.click()"
      />
    </form>

    <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      :auto-upload="false"
      :file-list="fileList"
      :on-change="handleChange"
      multiple
      :show-file-list="false"
    >
      <!-- <el-button type="text">点击上传</el-button> -->
    </el-upload>

    <TableTest
      v-if="isVisible"
      :is-visible="isVisible"
      @closeChange="handleCloseChange"
    ></TableTest>
  </div>
</template>

<script>
import { downLoadToExcel, uploadFromExcel } from "@/excelAboutDetails.js";
import TableTest from "./tableTest.vue";
export default {
  components: { TableTest },
  data() {
    return {
      isVisible: false,
      fileList: [],
      file: "",
    };
  },
  methods: {
    handleCloseChange(bool) {
      console.log("接收子组件传给父组件的值：", bool);
      console.log("调用初始化方法！！");
      this.isVisible = bool;
    },
    open() {
      this.isVisible = true;
    },
    uploadExcel(excel) {
      this.$confirm("将表格中所有数据新增至当前列表, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        closeOnClickModal: false, //点击确认框边缘不关闭框
      })
        .then(async () => {
          //点击确定执行
          try {
            console.log("excel", excel);
            let excelData = await uploadFromExcel(excel);
            console.log(excelData); //此为excel表中的数据
            /**
             * 此处处理数据
             */
            // formatDate(excel['time'],'/') //格式化excel表中的时间，详见js文件
          } catch (e) {
            console.log(e);
          } finally {
            //清空上传的excel文件信息
            var file = document.getElementById("uploadInner");
            file.value = "";
          }
        })
        .catch(() => {
          //点击取消执行
          this.$message({
            type: "info",
            message: "已取消",
          });
          // this.initialization()
          var file = document.getElementById("uploadInner");
          file.value = "";
        });
    },
    //下载模板
    downLoadTemplate() {
      let templateKeys = {
        emplid: "工号",
        testItem: "项目",
        grade: "项目得分",
        acquisitionTime: "项目时间",
      };
      downLoadToExcel([], templateKeys, "模板", [
        "10",
        "10",
        "10",
        "10",
        "10",
        "10",
      ]);
      this.$message.success("下载成功!");
    },
    handleChange() {},
  },
};
</script>

<style lang="scss" scoped>
.uploadOuter {
  display: inline-block;
  border: 1px solid green;
  border-radius: 20px;
  background-color: green;
  position: relative;
  margin-left: 1%;
  padding-left: 10px;
  padding-right: 5px;
  padding-top: 8px;
  width: 73px;
  height: 35px;
  font-size: 12px;
  color: white;
  #uploadInner {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>