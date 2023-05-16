import ExportJsonExcel from 'js-export-excel'

/**
 * 
 * @param {Array} arr 需要去重的对象数组 
 * @returns 去重成功的数组
 */
export function unRepeatObject(arr) {
    var tmepArr = [];
    // 将数组对象转成数组字符串
    var newStr = changeArrStr(arr);
    newStr.sort();
    // 数组去重
    for (var i = 0; i < newStr.length; i++) {
        if (newStr[i] !== tmepArr[tmepArr.length - 1]) {
            tmepArr.push(newStr[i]);
        }
    }
    var newArr = [];
    // 新数组字符串转成数组对象
    for (var j = 0; j < tmepArr.length; j++) {
        newArr.push(JSON.parse(tmepArr[j]));
    }
    // console.log('newArr', newArr);
    return newArr;
}
function changeArrStr(arr){
    var newArr = [];
    if (arr.length !== 0) {
        for (var i = 0; i < arr.length; i++) {
            var thisObj = sortObjectFun(arr[i]);
            var thisStr = JSON.stringify(thisObj);
            thisStr = thisStr.replace(/(\s|[\\t])/g, ''); // 去除空格及\t空白字符
            newArr.push(thisStr);
        }
    }
    return newArr;
}
function sortObjectFun(obj){
    var keyArr = [];// 对象的key
    for (var item in obj) {
        keyArr.push(item);
    }
    keyArr.sort(); // 降序
    var newObj = {};
    for (var i = 0; i < keyArr.length; i++) {
        newObj[keyArr[i]] = obj[keyArr[i]]
    }
    return newObj;
}


/**
 * 下载到excel表格中
 * @param {Array} dataTable 需要下载的数据
 * @param {Object} tableKeys 定义excel表列名
 * @param {String} fileName 文件名
 * @param {Array} widths 列宽
 */
export function downLoadToExcel(dataTable, tableKeys, fileName, widths) {
    let option = {} //   option代表的就是excel文件
    let keys = Object.keys(tableKeys)
    let values = Object.values(tableKeys)
    option.fileName = fileName //excel文件名
    //excel文件数据
    option.datas = [
      {
        //   excel文件的数据源
        sheetData: dataTable,
        //   excel文件sheet的表名
        sheetName: 'sheet',
        //   excel文件表头名
        sheetHeader: values,
        //   excel文件列名
        sheetFilter: keys,
        //列宽
        columnWidths: widths,
      },
    ]
    //   创建ExportJsonExcel实例对象
    let toExcel = new ExportJsonExcel(option)
    //   调用保存方法
    toExcel.saveExcel()
  }