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
  getInstitutionMenuTree: (param) => {
    return httpRequestor.get('a/sys/office/treeData', param).catch(err => {
      Message.error(err)
    })
  },
  getCompanyMenuTree: (param) => {
    return httpRequestor.get('a/sys/company/treeData', param).catch(err => {
      Message.error(err)
    })
  },
  getEmployeePosts: (param) => {
    return httpRequestor.get('a/sys/post/treeData', param).catch(err => {
      Message.error(err)
    })
  },
  //   新增用户
  addNewUser: (param) => {
    // postFormData
    return httpRequestor.post(`/a/sys/empUser/save?op=${param.op}`, param).catch(err => {
      // return httpRequestor.postByFormStr('/a/sys/empUser/save', param).catch(err => {
      Message.error(err)
    })
  },
  // 获取用户编辑详情
  getUserDetail: (param) => {
    return httpRequestor.get('/a/sys/empUser/form.json', param).catch(err => {
      Message.error(err)
    })
  },
  // 获取数据权限详情 userCode
  getDataRightDetail: (param) => {
    return httpRequestor.get(`/a/sys/empUser/formAuthDataScope.form.json?userCode=${param.userCode}`).catch(err => {
      Message.error(err)
    })
  },
  // 保存数据权限 http://demo.jeesite.com/js/a/sys/empUser/saveAuthDataScope
  saveDataRightDetail: (param) => {
    return httpRequestor.postFormData(`/a/sys/empUser/saveAuthDataScope.form.json`, param).catch(err => {
      Message.error(err)
    })
  },
  // 停用启用用户  js/a/sys/empUser/disable?userCode=user19_92w0
  stopUseOrStart: (param) => {
    return httpRequestor.post(`/a/sys/empUser/${param.stopOrStart}?userCode=${param.userCode}`, {
      userCode: param.userCode
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
  /* 保存用户角色 */
  saveUserRole: (param) => {
    return httpRequestor.postFormData(`/a/sys/empUser/save`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 重置密码到初始状态  userCode=user18_rcn8*/
  resetPw: (param) => {
    return httpRequestor.postFormData(`/a/sys/empUser/resetpwd?userCode=${param.userCode}`).catch(err => {
      Message.error(err)
    })
  },
  /**
   * 机构管理
   * **/
  //  获取机构列表
  getOfficeList: (param) => {
    return httpRequestor.get(`/a/sys/office/listData`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 懒加载表格中的子菜单 */
  getChildList: (param) => {
    return httpRequestor.get(`/a/sys/office/listData`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 保存机构管理  postFormData  sys/office/save*/
  saveOfficeAdd: (param) => {
    return httpRequestor.post(`/a/sys/office/save`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 获取机构编辑详情*/
  getOfficeDetail: (param) => {
    return httpRequestor.post(`/a/sys/office/form.json?officeCode=${param.officeCode}`).catch(err => {
      Message.error(err)
    })
  },
  /* 启用停用 */
  stopOfficeOrStart: (param) => {
    return httpRequestor.post(`/a/sys/office/${param.type}?officeCode=${param.officeCode}`).catch(err => {
      Message.error(err)
    })
  },
  /* 删除机构和子机构  formDataSt*/
  deleteOffice: (param) => {
    return httpRequestor.post(`/a/sys/office/delete?officeCode=${param.officeCode}`).catch(err => {
      Message.error(err)
    })
  }
};
