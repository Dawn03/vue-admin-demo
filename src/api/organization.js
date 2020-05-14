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
      Message.error('服务器请求失败，请检查网络环境。', err)
    })
  },
  //  获取机构选择
  getInstitutionMenuTree: (param) => {
    return httpRequestor.get('a/sys/office/treeData', param).catch(err => {
      Message.error('服务器请求失败，请检查网络环境。', err)
    })
  },
  //   获取公司选择
  getCompanyMenuTree: (param) => {
    return httpRequestor.get('a/sys/company/treeData', param).catch(err => {
      Message.error('服务器请求失败，请检查网络环境。', err)
    })
  },
  // 获取岗位类型 a/sys/post/treeData
  getEmployeePosts: (param) => {
    return httpRequestor.get('a/sys/post/treeData', param).catch(err => {
      Message.error('服务器请求失败，请检查网络环境。', err)
    })
  },
  //   新增用户
  addNewUser: (param) => {
    return httpRequestor.postFormData('/a/sys/empUser/save', param).catch(err => {
      // Message.error('服务器请求失败，请检查网络环境。', err)
    })
  },
  // 获取角色 http://192.168.7.147:8980/js/a/sys/role/treeData
  getRole: (param) => {
    return httpRequestor.get('/a/sys/role/treeData', param).catch(err => {
      Message.error('服务器请求失败，请检查网络环境。', err)
    })
  }
};
