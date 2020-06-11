/**
 * 系统设置
 * **/
import httpRequestor from './http_requestor'
import {
  Message
} from 'element-ui'
export const sysApi = {
  /* 系统设置 字典管理 */
  dictType: (param) => {
    return httpRequestor.get(`a/sys/dictType/listData`, param).catch(err => {
      Message.error(err)
    })
  }
}
