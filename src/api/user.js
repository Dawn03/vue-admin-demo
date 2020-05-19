import request from '@/utils/request'
import httpRequestor from '@/api/http_requestor';
import {
  Message
} from 'element-ui'

// export function login(data = {}) {
//   return request({
//     url: `a/login?__login=true&__ajax=json`,
//     method: 'get',
//     data
//   })
// }

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
// export const loginApi = {
//   //  登录
//   login: (param) => {
//     return httpRequestor.get(`a/login?__login=true&__ajax=json`, param).catch(err => {
//       Message.error(err)
//     })
//   },

// }
