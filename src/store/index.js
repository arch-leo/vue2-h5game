import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: null,
    popLoad: false,
    popInfo: null,
    popFirm: null,
    goTop: false,
    isWeixin: false,
    isApp: null
  },
  getters: {
  },
  mutations: {
    setUserInfo (state, stat) {
      if (stat) {
        state.userInfo = stat
      } else {
        state.userInfo = null
      }
    },
    setUserProp (state, stat) {
      if (stat) {
        state.userInfo[stat['prop']] = stat['val']
      } else {
        state.userInfo = null
      }
    },
    popLoadFn (state, stat) {
      state.popLoad = stat
    },
    popInfoFn (state, stat) {
      state.popInfo = stat
      setTimeout(() => {
        state.popInfo = ''
      }, 1500)
    },
    popFirmFn (state, stat) {
      state.popFirm = stat
    },
    goTopFn (state, stat) {
      state.goTop = stat
    },
    setWeixin (state, stat) {
      state.isWeixin = stat
    },
    setApp (state, stat) {
      state.isApp = stat
    }
  },
  actions: {
  }
})
