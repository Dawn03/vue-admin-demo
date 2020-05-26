/**
 * 权限管理
 * **/
import httpRequestor from './http_requestor'
import {
  Message
} from 'element-ui'
export const roleApi = {
  // 权限管理/角色管理列表
  getRoleManageList: (param) => {
    return httpRequestor.get(`a/sys/role/listData`, param).catch(err => {
      Message.error(err)
    })
  },
  // 用户角色
  getRoleList: (param) => {
    return httpRequestor.get(`a/sys/role/treeData`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 获取授权功能菜单数据 */
  getAuthorizeData: (param) => {
    return httpRequestor.post(`a/sys/role/menuTreeData`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 新增角色 postFormData*/
  addRole: (param) => {
    return httpRequestor.post(`a/sys/role/save`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 删除角色 */
  deleteRole: (param) => {
    return httpRequestor.get(`a/sys/role/delete?roleCode=${param.roleCode}`).catch(err => {
      Message.error(err)
    })
  }
};
