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
 * 过滤掉无值对象属性
 * parama: filterForm  筛选栏目
 * ***/
export const filterNokeyVal = (obj) => {
  const result = {}
  for (const key in obj) {
    if (obj[key]) {
      result[key] = obj[key]
    }
  }
  return result
}
/**
 * 取数组中某个属性成字符串
 * parama: arr被遍历的数据  key被字符串化的键名
 * ***/
export const stringVal = (arr, key) => {
  const result = []
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i][key]) {
      result.push(arr[i][key])
    }
  }
  return result.join(',')
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
/**
 * 树形数据 结构重组 处理
 *
 * ***/
export const toTreeData = (data, attributes) => {
  // console.log("data, attributes", data, attributes);
  /* **
  //调用
  // const attributes = {
  //   id: "id",
  //   parentId: "pId",
  //   label: "name",
  //   rootId: "0"
  // };
  // const treeData = toTreeData(res, attributes);
  */

  const resData = data;
  const tree = [];
  for (let i = 0; i < resData.length; i++) {
    if (resData[i].pId === attributes.rootId) {
      const obj = {
        id: resData[i][attributes.id],
        label: resData[i][attributes.label],
        children: []
      };
      tree.push(obj);
      resData.splice(i, 1);
      i--;
    }
  }
  run(tree);

  function run(chiArr) {
    if (resData.length !== 0) {
      for (let i = 0; i < chiArr.length; i++) {
        for (let j = 0; j < resData.length; j++) {
          if (chiArr[i].id === resData[j][attributes.parentId]) {
            const obj = {
              id: resData[j][attributes.id],
              label: resData[j][attributes.label],
              children: []
            };
            chiArr[i].children.push(obj);
            resData.splice(j, 1);
            j--;
          }
        }
        run(chiArr[i].children);
      }
    }
  }

  return tree;
}
