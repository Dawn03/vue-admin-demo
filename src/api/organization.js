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
    return httpRequestor.post('/a/sys/empUser/save?__ajax=json', param).catch(err => {
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
    // userCode: user8_6s3j
    // loginCode: user8
    // userName: 用户08
    // userDataScopeListJson: [
    //   { "ctrlType": "Office", "ctrlData": "SD" },
    //   { "ctrlType": "Office", "ctrlData": "SDJN" },
    //   { "ctrlType": "Office", "ctrlData": "SDJN01" }
    // ]
    return httpRequestor.postFormData(`/a/sys/empUser/saveAuthDataScope.form.json?userCode=${param.userCode}`).catch(err => {
      Message.error(err)
    })
  },
  // 停用启用用户  js/a/sys/empUser/disable?userCode=user19_92w0
  stopUseOrStart: (param) => {
    console.log('param', param)
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
  /* 获取全部需要映射的字段 */
  getMapFieldList: (param) => {
    return httpRequestor.postFormData(`/a/sys/dictData/treeData`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 重置密码到初始状态  userCode=user18_rcn8*/
  resetPw: (param) => {
    return httpRequestor.postFormData(`/a/sys/empUser/resetpwd?userCode=${param.userCode}`).catch(err => {
      Message.error(err)
    })
  }
};
