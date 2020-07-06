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
    return httpRequestor.get(`a/sys/menu/form.json?${param.key}=${param.value}`).catch(err => {
      Message.error(err)
    })
  },
  /* 系统设置 模块管理 */
  getModules: (param) => {
    return httpRequestor.postFormData(`a/sys/module/listData`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 获取上级菜单 数据*/
  getMenuTree: (param) => {
    return httpRequestor.post(`a/sys/menu/treeData?excludeCode=${param.excludeCode}&sysCode=default`).catch(err => {
      Message.error(err)
    })
  },
  /* 保存菜单编辑*/
  saveMenu: (param) => {
    return httpRequestor.postFormData(`a/sys/menu/save`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 删除编辑 */
  deleteMenu: (param) => {
    return httpRequestor.post(`a/sys/menu/delete?menuCode=${param.menuCode}`).catch(err => {
      Message.error(err)
    })
  },
  /* 保存排序*/
  updateTreeSort: (param) => {
    return httpRequestor.postFormData(`a/sys/menu/updateTreeSort`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 获取新增下级菜单初始化数据*/
  getSubMenuData: (param) => {
    return httpRequestor.get(`a/sys/menu/form.json?parentCode=${param.parentCode}&sysCode=default`).catch(err => {
      Message.error(err)
    })
  }

}
