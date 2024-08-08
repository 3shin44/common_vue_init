import Vue from 'vue'
import Vuex from 'vuex'
import util from '@/util'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 1,
    urlParam: {}
  },
  mutations: {
    setUrlParam(state, urlData) {
      for(const [key, value] of Object.entries(urlData)){
        state.urlParam[key] = value
      }
    },
    setCount(state) {
      state.count++
    }
  },
  actions:{
    aQueryAPI({commit}){
      return new Promise(async (res)=>{
        commit('setCount')
        await util.mockAPI()
        commit('setCount')
        res('')
      })
    }
  }
})
export default store
