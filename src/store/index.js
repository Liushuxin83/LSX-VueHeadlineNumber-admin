import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from 'element-ui'
import { getToDoList } from '../api/todoList'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    afterUserLoginInfo: {},
    todoList: [],
    // 输入框 输入的内容
    inputTask: '',
    // 下一个id值
    nextId: 4,
    viewKey: 1
  },
  mutations: {
    saveUserLoginInfo (state, payload) {
      state.afterUserLoginInfo = payload
    },
    initTodoList (state, payload) {
      state.todoList = payload
		},
		// input输入框 和vuex进行双向绑定
    setInputTask (state, payload) {
      state.inputTask = payload
    },
    // 添加任务
    addTask (state) {
      const taskObj = {
        id: state.nextId,
        info: state.inputTask.trim(),
        done: false
      }
      state.todoList.push(taskObj)
			state.nextId++
			// 添加该对象成功之后，需要把输入框内的数据置为空
      state.inputTask = ''
    },
    // 删除任务
    delTask (state, payload) {
      // 根据id查找对应项
      const delIndex = state.todoList.findIndex(item => {
        return item.id === payload
      })
      // console.log(delIndex)
      // 根据索引，删除对应元素
      if (delIndex !== -1) {
        state.todoList.splice(delIndex, 1)
        Message.success('删除任务项成功！')
      }
    },
    changeCheckStatus (state, payload) {
      const checkIndex = state.todoList.findIndex(
        item => item.id === payload.id
      )
      if (checkIndex !== -1) {
        state.todoList[checkIndex].done = payload.status
      }
    },
    // 清除已勾选任务
    clearTask (state) {
      state.todoList = state.todoList.filter(item => item.done === false)
    },
    changeViewKey (state, payload) {
      state.viewKey = payload
    }
  },
  actions: {
    getToDoListData ({ commit }) {
      getToDoList().then(({ data }) => {
        // console.log(data)
        commit('initTodoList', data)
      })
    }
  },
  getters: {
    // 统计未完成的任务
    unDoneLength (state) {
      return state.todoList.filter(item => item.done === false).length
    },
    // 统计全部数据，未完成数据，已完成数据
    computedTodoList (state) {
      switch (state.viewKey) {
        case 1:
          return state.todoList
        case 0:
          return state.todoList.filter(item => item.done === false)
        case -1:
          return state.todoList.filter(item => item.done === true)
        default:
          break
      }
    }
  }
})
