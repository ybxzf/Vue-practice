import moment from 'moment';
import ExportJsonExcel from "js-export-excel";
import * as XLSX from 'xlsx/xlsx.mjs'

/**
 * 下载到excel表格中
 * @param {Array} dataTable 需要下载的数据
 * @param {Object} tableKeys 定义excel表列名
 * @param {String} fileName 文件名
 * @param {Array} widths 列宽
 */
export function downLoadToExcel(dataTable,tableKeys,fileName,widths){
  let option = {};  //   option代表的就是excel文件
      let keys = Object.keys(tableKeys)
      let values = Object.values(tableKeys)
      option.fileName = fileName;  //excel文件名
      //excel文件数据
      option.datas = [
        {
          //   excel文件的数据源
          sheetData: dataTable,
          //   excel文件sheet的表名
          sheetName: "sheet",
          //   excel文件表头名
          sheetHeader: values,
          //   excel文件列名
          sheetFilter: keys,
          //列宽
          columnWidths:widths,
        },
      ];
      //   创建ExportJsonExcel实例对象
      let toExcel = new ExportJsonExcel(option);
      //   调用保存方法
      toExcel.saveExcel();
}
/**
 * 上传excel表格
 * @param {xlsx} excel 上传的excel文件
 * @return {Array} 处理好的excelData数据
 */
export function uploadFromExcel(excel){
  //导入信息
  let fileName = excel.target.files[0]
  console.log("excel.target.files[0]",excel);
  return new Promise(function (resolve, reject) {
    let reader = new FileReader()
    //启动函数
    reader.readAsBinaryString(fileName)
    reader.onload = function (excel) {
      const workbook = XLSX.read(excel.target.result, { type: 'binary' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const results = XLSX.utils.sheet_to_json(worksheet)
      resolve(results)
      console.log(resolve,reject);
    }
  })
}

/**
 * 格式化excel中的日期
 * @param {Number} excelDate excel中日期数值
 * @param {String} format excel中年月分隔符
 * @returns 格式化的日期：YYYY-MM-DD
 */
export function formatDate(excelDate, format) {
  const time = new Date((excelDate - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate()  + ''
  if (format && format.length === 1) {
    return moment(new Date(new Date(year + format + month + format + date).getTime())).format("YYYY-MM-DD")
  }
  return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
}