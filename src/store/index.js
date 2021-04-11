import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    afterUserLoginInfo: {}
  },
  mutations: {
    saveUserLoginInfo (state, payload) {
      state.afterUserLoginInfo = payload
    }
  },
  actions: {}
})
