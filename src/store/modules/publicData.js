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
  employeePosts: []
}
const mutations = {
  GET_OFFICE_TREE_LIST: (state, data) => {
    const attributes = {
      id: "id",
      parentId: "pId",
      label: "name",
      rootId: "0"
    };
    state.officeList = toTreeData(data, attributes)
  },
  GET_COMPANY_TREE_LIST: (state, data) => {
    state.companyList = data
  },
  GET_EMPLOYEE_POSTS_LIST: (state, data) => {
    state.employeePosts = data
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
      console.log('GET_COMPANY_TREE_LIST', res);
      const attributes = {
        id: "id",
        parentId: "pId",
        label: "name",
        rootId: "0"
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
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
