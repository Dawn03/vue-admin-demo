import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import publicData from './modules/publicData'
import user from './modules/user'
import role from './modules/role'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    publicData,
    user,
    role
  },
  getters
})

export default store
