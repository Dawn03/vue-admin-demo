/**
 * 角色
 * **/
import httpRequestor from './http_requestor'
import {
  Message
} from 'element-ui'
export const roleApi = {
  // 用户角色
  getRoleList: (param) => {
    return httpRequestor.get(`a/sys/role/treeData`, param).catch(err => {
      Message.error(err)
    })
  },
};
