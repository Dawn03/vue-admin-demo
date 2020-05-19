import {
  roleApi
} from "@/api/role";
const state = {
  roleList: []
}
const mutations = {
  GET_ROLE_LIST: (state, data) => {
    state.roleList = data
  }
}
const actions = {
  getRole({
    commit
  }) {
    roleApi.getRoleList().then(res => {
      commit("GET_ROLE_LIST", res)
      console.log(20, res);
    });
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
