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
      Message.error(err)
    })
  },
  //  获取机构选择
  getInstitutionMenuTree: (param) => {
    return httpRequestor.get('a/sys/office/treeData', param).catch(err => {
      Message.error(err)
    })
  },
  //   获取公司选择
  getCompanyMenuTree: (param) => {
    return httpRequestor.get('a/sys/company/treeData', param).catch(err => {
      Message.error(err)
    })
  },
  // 获取岗位类型 a/sys/post/treeData
  getEmployeePosts: (param) => {
    return httpRequestor.get('a/sys/post/treeData', param).catch(err => {
      Message.error(err)
    })
  },
  //   新增用户
  addNewUser: (param) => {
    // postFormData
    return httpRequestor.post('/a/sys/empUser/save?__ajax=json', param).catch(err => {
      // return httpRequestor.postByFormStr('/a/sys/empUser/save', param).catch(err => {
      Message.error(err)
    })
  },

  // 获取用户状态 转汉字 0 2 3
  getUserStaus(param) {
    return httpRequestor.get('/a/sys/dictData/listData', param).catch(err => {
      Message.error(err)
    })
  },
  // 获取用户编辑详情
  getUserDetail: (param) => {
    return httpRequestor.get('/a/sys/empUser/form.json', param).catch(err => {
      Message.error(err)
    })
  },
  // 停用启用用户
  stopUseOrStart: (param) => {
    return httpRequestor.post(`/a/sys/empUser${param.stopOrStart}`, {
      userCode: param.useparam
    }).catch(err => {
      Message.error(err)
    })
  },
  /* 删除用户  userCode*/
  deleteUser: (param) => {
    return httpRequestor.post(`a/sys/empUser/delete?userCode=${param}`).catch(err => {
      Message.error(err)
    })
  },

  /*保存用户角色 */
  saveUserRole: (param) => {
    return httpRequestor.postFormData(`/a/sys/empUser/save`, param).catch(err => {
      Message.error(err)
    })
  },
};
