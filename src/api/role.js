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
  // 编辑角色
  editRole: (param) => {
    return httpRequestor.get(`a/sys/role/form.json`, param).catch(err => {
      Message.error(err)
    })
  },
  // 用户角色
  getRoleList: (param) => {
    return httpRequestor.get(`a/sys/role/treeData`, param).catch(err => {
      Message.error(err)
    })
  },
  // 新增角色初始化
  addRolInit: (param) => {
    return httpRequestor.get(`a/sys/role/form.json?op=add`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 获取授权功能菜单数据 */
  getAuthorizeData: (param) => {
    // console.log("param", param)
    return httpRequestor.postFormData(`a/sys/role/menuTreeData?___t=1590552373020`, param).catch(err => {
      Message.error(err)
    })
  },
  // /* 保存授权功能菜单数据   不是formData格式 后端接口不支持*/
  saveAuthorizeData: (param) => {
    return httpRequestor.postFormData(`a/sys/role/save`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 新增角色  &  保存授权功能菜单数据  //postFormData*/
  addRole: (param) => {
    return httpRequestor.postFormData(`a/sys/role/save`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 删除角色 */
  deleteRole: (param) => {
    return httpRequestor.get(`a/sys/role/delete?roleCode=${param.roleCode}`).catch(err => {
      Message.error(err)
    })
  },
  /* 停用或启用角色 postFormData*/
  stopOrStartRole: (param) => {
    return httpRequestor.post(`a/sys/role/${param.type}?roleCode=${param.roleCode}`).catch(err => {
      Message.error(err)
    })
  },
  /* 角色分配数据权限  获取初始化*/
  getAuthDataScope: (param) => {
    return httpRequestor.get(`a/sys/role/formAuthDataScope.json?roleCode=${param.roleCode}`).catch(err => {
      Message.error(err)
    })
  },
  /* 角色分配数据权限  获取初始化 机构树列表 ctrlPermi: 2 ?___t=${param.___t}*/
  getOffice: (param) => {
    return httpRequestor.get(`a/sys/office/treeData`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 角色分配数据权限  获取初始化 公司树列表 ctrlPermi: 2*/
  getCompany: (param) => {
    return httpRequestor.get(`a/sys/company/treeData`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 角色分配数据权限  设置保存*/
  saveAuthDataScope: (param) => {
    return httpRequestor.postFormData(`a/sys/role/saveAuthDataScope`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 角色分配用户  初始化列表*/
  getFormAuthUser: (param) => {
    return httpRequestor.get(`a/sys/user/listData`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 角色分配用户 角色授权给用户*/
  saveAuthUser: (param) => {
    return httpRequestor.postFormData(`a/sys/role/saveAuthUser`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 角色分配用户 取消授权*/
  deleteAuthUser: (param) => {
    return httpRequestor.post(`a/sys/role/deleteAuthUser?roleCode=${param.roleCode}&userRoleString=${param.userRoleString}`).catch(err => {
      Message.error(err)
    })
  },
  /* 角色分配用户 取消授权*/
  deleteAuthUsers: (param) => {
    return httpRequestor.postFormData(`a/sys/role/deleteAuthUser`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 二级管理员*/
  /* 获取列表 */
  getSecAdmin: (param) => {
    return httpRequestor.postFormData(`a/sys/secAdmin/listData`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 删除二级列表*/
  deleteSecAdmin: (param) => {
    return httpRequestor.post(`a/sys/secAdmin/delete?userCode=${param.userCode}`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 编辑初始化页面*/
  editInitSecAdmin: (param) => {
    return httpRequestor.post(`a/sys/secAdmin/form.json?userCode=${param.userCode}`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 编辑保存*/
  saveSecAdmin: (param) => {
    return httpRequestor.postFormData(`a/sys/secAdmin/save`, param).catch(err => {
      Message.error(err)
    })
  }
};
