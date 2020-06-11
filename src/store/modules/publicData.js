/* 页面需要多处公用的store 状态 */
import {
  pubApi
} from "@/api/public_request";
import {
  toTreeData
} from "@/utils/pubFunc";

const state = {
  officeList: [],
  companyList: [],
  employeePosts: [],
  allDicType: "",
  selectDicType: ""
}
const mutations = {
  GET_OFFICE_TREE_LIST: (state, data) => {
    const attributes = {
      id: "id",
      parentId: "pId",
      label: "name",
      rootId: "YD"
    };
    state.officeList = toTreeData(data, attributes)
  },
  GET_COMPANY_TREE_LIST: (state, data) => {
    state.companyList = data
  },
  GET_EMPLOYEE_POSTS_LIST: (state, data) => {
    state.employeePosts = data
  },
  GET_ALL_DIC_TYPE: (state, res) => {
    const obj = {}
    const selectObj = {}
    for (let i = 0, len = res.length; i < len; i++) {
      if (!obj[res[i].dictType]) {
        obj[res[i].dictType] = []
        obj[res[i].dictType].push({
          [res[i].dictValue]: res[i].dictLabel
        })
      } else {
        obj[res[i].dictType].push({
          [res[i].dictValue]: res[i].dictLabel
        })
      }
      if (!selectObj[res[i].dictType]) {
        selectObj[res[i].dictType] = []
        selectObj[res[i].dictType].push({
          value: res[i].dictValue,
          label: res[i].dictLabel
        })
      } else {
        selectObj[res[i].dictType].push({
          value: res[i].dictValue,
          label: res[i].dictLabel
        })
      }
    }

    /* 用于table表格 显示中文字符 */
    sessionStorage.setItem('allDicType', JSON.stringify(obj))
    /* 用于下拉选择框 数据 */
    sessionStorage.setItem('selectDicType', JSON.stringify(selectObj))
    // state.allDicType = data
  }
}
const actions = {
  /* 获取机构全部数据 */
  getOfficeMenuTree({
    commit
  }) {
    pubApi.getOfficeMenuTree().then(res => {
      commit("GET_OFFICE_TREE_LIST", res)
    });
  },
  /* 获取公司全部数据 */
  getCompanyMenuTree({
    commit
  }) {
    pubApi.getCompanyMenuTree().then(res => {
      // console.log('GET_COMPANY_TREE_LIST', res);
      const attributes = {
        id: "id",
        parentId: "pId",
        label: "name",
        rootId: "YD"
      };
      commit("GET_COMPANY_TREE_LIST", toTreeData(res, attributes))
    });
  },
  /* 获取岗位全部数据 */
  getEmployeePosts({
    commit
  }) {
    pubApi.getEmployeePosts().then(res => {
      commit("GET_EMPLOYEE_POSTS_LIST", res)
      console.log('GET_EMPLOYEE_POSTS_LIST', res);
    });
  },
  /* 获取字典全部数据 */
  getAllDicType({
    commit
  }) {
    pubApi.dictTypeFunc().then(res => {
      // console.log(73, res)

      commit("GET_ALL_DIC_TYPE", res)
      console.log(82, res)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
