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
export const pubApi = {
  /* 获取全部需要映射的字段 */
  getMapFieldList: (param) => {
    return httpRequestor.get(`/a/sys/dictData/treeData`, param).catch(err => {
      Message.error(err)
    })
  },
  /*  根据 dicType 类型查询各种状态  */
  dictTypeFunc: (param) => {
    return httpRequestor.postFormData(`/a/sys/dictData/listData`, param).catch(err => {
      Message.error(err)
    })
  },
  //  获取机构选择全部数据
  getOfficeMenuTree: (param) => {
    return httpRequestor.get('a/sys/office/treeData', param).catch(err => {
      Message.error(err)
    })
  },
  //   获取公司选择全部数据
  getCompanyMenuTree: (param) => {
    return httpRequestor.get('a/sys/company/treeData', param).catch(err => {
      Message.error(err)
    })
  },
  // 获取岗位类型全部数据 a/sys/post/treeData
  getEmployeePosts: (param) => {
    return httpRequestor.get('a/sys/post/treeData', param).catch(err => {
      Message.error(err)
    })
  }
};
