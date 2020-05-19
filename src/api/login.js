/**
 * 登录相关
 * **/
import httpRequestor from './http_requestor'
import {
  Message
} from 'element-ui'
export const loginApi = {
  //  登录
  login: (param) => {
    return httpRequestor.get(`/a/login?__login=true&__ajax=json`, param).catch(err => {
      Message.error(err)
    })
  },
  //退出登录
  loginOut: (param) => {
    return httpRequestor.get(`a/logout`, param).catch(err => {
      Message.error(err)
    })
  },
  //   getCode: (param) => {
  //     return httpRequestor.get(`${backUrl}/getCode`, param).catch(err => {
  //       Message.error('服务器请求失败，请检查网络环境。')
  //       console.log('获取验证码', err);
  //     })
  //   },


};
