import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import Encale from 'element-ui/lib/locale/lang/en' // lang i18n
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import '@/utils/UtilJs'
import './directives.js'
import App from './App'
import store from './store'
import router from './router'
// import adaptive from './directive/adaptive'
// Vue.use(adaptive)
import '@/icons' // icon
import '@/permission' // permission control
import 'default-passive-events'
import '@/components/messageBox'

import baseUrl_ from '@/api/config'
Vue.prototype.GLOBAL = baseUrl_;
import adaptive from "@/directive/el-table"
Vue.use(adaptive)

import {
  pubApi
} from "@/api/public_request"
// import {
//   pubFunc
// } from "@/utils/pubFunc"
Vue.prototype.pubApi = pubApi
// Vue.prototype.pubFunc = pubFunc
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const {
    mockXHR
  } = require('../mock')
  mockXHR()
}

// set ElementUI lang to zh-CN
Vue.use(ElementUI, {
  zhLocale
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
