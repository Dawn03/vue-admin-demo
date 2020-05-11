/**
 * 组织机构
 * **/
import httpRequestor from './http_requestor'
import {
  Message
} from 'element-ui'
/**
 * 用户管理
 * **/
export const orgApi = {
  //  获取用户列表
  getUserList: (param) => {
    return httpRequestor.get(`/a/sys/empUser/listData`, param).catch(err => {
      Message.error('服务器请求失败，请检查网络环境。')
      console.log('请检查网络环境', err);
    })
  }
  //   getCode: (param) => {
  //     return httpRequestor.get(`${backUrl}/getCode`, param).catch(err => {
  //       Message.error('服务器请求失败，请检查网络环境。')
  //       console.log('获取验证码', err);
  //     })
  //   },
  //   //  登出
  //   logout: (param) => {
  //     return httpRequestor.post(`${backUrl}/quit`, param).catch(err => {
  //       console.log('退出登录', err);
  //       Message.error('服务器请求失败，请检查网络环境。')
  //     })
  //   }

};
