import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    //所有项列表
    list: [],
    //input中的值
    initVal: '张三',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    setInputValue(state, val) {
      state.initVal = val
    },
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.initVal.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.initVal = ''
    },
    deleteItem(state, id) {
      //1. 通过id查找list中对应的索引值
      const i = state.list.findIndex(x => x.id === id)
      //2. 通过索引值删除对应的列表项
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    removeDoneItem(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeStatus(state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    changeList(state, key) {
      state.viewKey = key
    }

  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(res => {
        console.log(res.data);
        context.commit('initList', res.data)
      })
    },
  },
  modules: {
  },
  getters: {
    showDoneNum(state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList(state) {
      if (state.viewKey === 'all') {
        return state.list
      } else if (state.viewKey === 'unDone') {
        return state.list.filter(x => x.done === false)
      } else if (state.viewKey === 'done') {
        return state.list.filter(x => x.done === true)
      }
      return state.list
    }
  }
})
