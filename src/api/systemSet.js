/**
 * 系统设置
 * **/
import httpRequestor from './http_requestor'
import {
  Message
} from 'element-ui'
export const sysApi = {
  /* 系统设置 字典管理 */
  getMenu: (param) => {
    return httpRequestor.postFormData(`a/sys/menu/listData`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 系统设置 模块管理 */
  initMenuCodeEdit: (param) => {
    return httpRequestor.get(`a/sys/menu/form.json?menuCode=${param.menuCode}`).catch(err => {
      Message.error(err)
    })
  },
  /* 系统设置 模块管理 */
  getModules: (param) => {
    return httpRequestor.postFormData(`a/sys/module/listData`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 系统设置 获取icon */
  getIcons: (param) => {
    return httpRequestor.post(`tags/iconselect?value=icon-social-foursqare`, param).catch(err => {
      Message.error(err)
    })
  }

}
