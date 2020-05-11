/**
 * 获取已填输入框内容
 * parama: inputValue  输入框里的值
 * ***/
export const getInputVal = (inputValue) => {
  const valObj = {}
  for (let i = 0, len = inputValue.length; i < len; i++) {
    if (inputValue[i].value) {
      valObj[inputValue[i].key] = inputValue[i].value;
    }
  }
  return valObj
}

/**
 * 清除已填输入框内容
 * parama: filterForm  筛选栏目
 * ***/
export const clearFilterVal = (filterForm) => {
  for (let i = 0, len = filterForm.length; i < len; i++) {
    if (filterForm[i].value) {
      filterForm[i].value = "";
    }
  }
}
/**
 * 扩展字段创建
 * parama: filterForm  筛选栏目
 * ***/
export const createKey = (keyType, count, type) => {
  const arrKey = [];
  for (let i = 0; i < count; i++) {
    arrKey.push({
      lable: [keyType + (i + 1)],
      value: "",
      type: type
    });
  }
  return arrKey;
}
/**
 * 状态值映射
 *
 * ***/
export const statusMap = (arr, obj) => {
  const temp = JSON.parse(JSON.stringify(arr));
  for (let i = 0, len = temp.length; i < len; i++) {
    if (temp[i].hasOwnProperty("status")) {
      temp[i].statusText = obj[temp[i].status];
    }
  }
  return temp;
}
