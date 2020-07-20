/**
 * 系统监控
 * **/
import httpRequestor from './http_requestor'
import {
  Message
} from 'element-ui'
export const sysApi = {
  /* 系统监控 字典管理 */
  getLog: (param) => {
    return httpRequestor.postFormData(`a/sys/log/listData`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 系统监控 访问日志 日志详情 获取 */
  getLogDetail: (param) => {
    return httpRequestor.postFormData(`a/sys/log/form.json?${param.key}=${param.value}`).catch(err => {
      Message.error(err)
    })
  },
  /* 系统监控 缓存监控 缓存名称 */
  getCacheNameList: (param) => {
    return httpRequestor.postFormData(`a/state/cache/cacheNameList`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 系统监控 缓存监控 缓存键名*/
  getCacheKeyList: (param) => {
    return httpRequestor.post(`a/state/cache/cacheKeyList?cacheName=${param.id}`).catch(err => {
      Message.error(err)
    })
  },
  /* 系统监控 缓存监控 缓存名称*/
  deleteKeyFunc: (param) => {
    return httpRequestor.post(`a/state/cache/clearCache?cacheName=${param.id}`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 系统监控 缓存监控 缓存键名 */
  deleteValFunc: (param) => {
    return httpRequestor.post(`a/state/cache/clearCache?cacheName==${param.cacheName}&key=${param.id}`).catch(err => {
      Message.error(err)
    })
  },
  /* 系统监控 缓存监控 获取缓存内容*/
  getCacheValue: (param) => {
    return httpRequestor.postFormData(`a/state/cache/cacheValue`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 系统监控 缓存监控 清理全部缓存*/
  clearAll: (param) => {
    return httpRequestor.post(`a/state/cache/clearAll`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 系统监控 服务器监控 */
  getServer: (param) => {
    return httpRequestor.get(`a/state/server/rtInfo?__notUpdateSession=true`).catch(err => {
      Message.error(err)
    })
  },
  /* 系统监控 服务器监控 */
  getServerIndex: (param) => {
    return httpRequestor.get(`a/state/server/index.form.json`, param).catch(err => {
      Message.error(err)
    })
  },
  /* 系统监控 作业监控 */
  getJob: (param) => {
    return httpRequestor.postFormData(`a/job/listData`, param).catch(err => {
      Message.error(err)
    })
  },

}
