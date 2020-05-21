import {
  loginApi
} from "@/api/login"
import {
  pubApi
} from "@/api/public_request";
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'

const getDefaultState = () => {
  return {
    __sid: getToken(),
    username: '',
    avatar: '',
    userMap: []
  }
}
const state = getDefaultState()
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.__sid = token
    console.log("最新__sid", token)
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_NAME: (state, name) => {
    state.username = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  USER_MAP_LIST(state, data) {
    // console.log(42, data);
    state.userMap = data
  }
}
const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    return new Promise((resolve, reject) => {
      loginApi.login(userInfo).then((data) => {
        commit('SET_TOKEN', data.sessionid)
        commit('SET_NAME', data.user.loginCode)
        setToken(data.sessionid)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info 暂时未启用
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {
          data
        } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const {
          username,
          avatar
        } = data

        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      loginApi.loginOut(state.__sid).then((data) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        // dispatch('tagsView/delAllViews', null, {
        //   root: true
        // })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  getUserMapFeild({
    commit
  }, type) {
    pubApi
      .getMapFieldList({
        dictType: type // "sys_user_status"
      })
      .then(res => {
        commit("USER_MAP_LIST", res)
      });
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
