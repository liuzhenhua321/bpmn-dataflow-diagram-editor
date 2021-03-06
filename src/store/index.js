import Vue from 'vue'
import Vuex from 'vuex'
import reusableModule from './module'
// import { getNodeById, eventBus } from '../bpmn'
Vue.use(Vuex)

// vue root store keep track of project key, registerModule if needed, mutations are shortcut to children store.
const store = new Vuex.Store({
  state: {
    key: null,
  },
  mutations: {
    createKey:(state, key) => {
      if(state[key] === undefined) {
        store.registerModule(key, reusableModule)
      }
      else {
        throw new Error(`module ${key} arelady exist `)
      }
    },
    removeKey:(state, key) => {
      if(state[key]){
        store.unregisterModule(key)
      }
    },
    setCurrentKey:(state, key) => {
      state.key = key
    },
    selectNode:(state, payload) => {
      store.commit(`${state.key}/selectNode`, payload)
    },
    startProject:(state) => {
      store.commit(`${state.key}/startProject`)
    },
    setZoomLevel:(state, payload) => {
      store.commit(`${state.key}/setZoomLevel`, payload)
    },
    setInput:(state, payload) => {
      store.commit(`${state.key}/setInput`, payload)
    },
    setOutput:(state, payload) => {
      store.commit(`${state.key}/setOutput`, payload)
    },
    setTransfer:(state, payload) => {
      store.commit(`${state.key}/setTransfer`, payload)
    },
    updateTransfer:(state, payload) => {
      store.commit(`${state.key}/updateTransfer`, payload)
    }
  },
  strict: process.env.NODE_ENV !== 'production',
})

export default store
