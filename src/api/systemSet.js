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
  },
  /* 系统设置 模块管理 */
  getModule: (param) => {
    return httpRequestor.postFormData(`a/sys/module/listData`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 系统设置 获取模块编辑初始化数据 */
  initModuleEdit: (param) => {
    return httpRequestor.get(`a/sys/module/form.json?moduleCode=${param.moduleCode}`).catch(err => {
      Message.error(err)
    })
  },
  /* 系统设置 获取模块编辑初始化数据 */
  initModuleAdd: (param) => {
    return httpRequestor.get(`a/sys/module/form.json`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 系统设置 模块管理新增/编辑保存 */
  saveModule: (param) => {
    return httpRequestor.postFormData(`a/sys/module/save`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 系统设置 模块管理删除 */
  deleteModule: (param) => {
    return httpRequestor.post(`a/sys/module/delete?moduleCode=${param.moduleCode}`).catch(err => {
      Message.error(err)
    })
  },
  /* 系统设置 模块管理停启用 */
  setModuleStart: (param) => {
    return httpRequestor.post(`a/sys/module/${param.type}?moduleCode=${param.moduleCode}`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 系统设置  参数设置*/
  getConfig: (param) => {
    return httpRequestor.postFormData(`a/sys/config/listData`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 系统设置  获取编辑参数初始化数据*/
  initConfigEdit: (param) => {
    return httpRequestor.get(`a/sys/config/form.json?id=${param.id}`).catch(err => {
      Message.error(err)
    })
  },
  /* 系统设置  获取编辑参数初始化数据*/
  saveConfig: (param) => {
    return httpRequestor.postFormData(`a/sys/config/save`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 系统设置  参数设置 删除*/
  deleteConfig: (param) => {
    return httpRequestor.post(`a/sys/config/delete?id=${param.id}`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 系统设置  参数设置 清除全部缓存*/
  clearAll: (param) => {
    return httpRequestor.post(`a/sys/cache/clearAll`, param).catch(err => {
      Message.error(err)
    })
  }
}
