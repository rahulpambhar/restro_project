import axios from 'axios'

import { createStore } from 'vuex'


export default createStore({
  state: {
    names: [
      {
        id: 1,
        name: "rahul",

      }, {
        id: 2,
        name: "drishit",

      }, {
        id: 3,
        name: "ved",

      }, {
        id: 4,
        name: "het",

      },
    ],
    database: [],
    todo: []
  },


  getters: {
    allNames: state => state.names,
    alldatabase: state => state.database,
    alltodo: state => state.todo,
  },

  // mutations 
  mutations: {
    newName (state, userInfo) {
      state.names = [userInfo, ...state.names]
    },
    deleteName: (state, id) => {
      state.names = state.names.filter(name => name.id != id)

    },
    editStateUser: (state, data) => {
      state.names.forEach((el, index) => {
        if (el.id === data.editId) {
          state.names[index].name = data.editUser;
        }
      })
    },
    fetchUsersData: (state, userInfo) => {
      state.database = userInfo
      state.todo = userInfo   

    },
    RemoveId: (state, R_Id) => {
      state.todo = state.todo.filter(todo => todo.id != R_Id)

    },
    updateToDo: (state, data) => {

      state.todo.forEach((el, index) => {
        if (el.id === data.ToDoId) {
          state.todo[index].name = data.ToDoName
          state.todo[index].email = data.ToDoEmail
        }
      })
    },
    addNewName: (state, NewData) => {
      state.todo = [NewData, ...state.todo]
    },
    FilterToDo: (state, todo) => {
      state.todo = todo
    },

    searchdata: (state, search) => {
      state.todo = state.todo.filter(todo => todo.name === search)


    }
  },

  // actions
  actions: {
    addName: ({ commit }, userInfo) => {
      commit("newName", userInfo)

    },
    removeName: ({ commit }, id) => {
      commit("deleteName", id)
    },
    updateStateUser: ({ commit }, name) => {
      commit("editStateUser", name)
    },
    async fetchUser({ commit }) {
      
      const response = await axios.get('http://127.0.0.1:8000/api/database')      
      commit('fetchUsersData',response.data.customer)  
    },
    RemoveId: ({ commit }, R_Id) => {
      commit('RemoveId', R_Id)
    },
    updateToDo: ({ commit }, data) => {
      commit('updateToDo', data)

    },
    addNewName: ({ commit }, NewData) => {
      commit('addNewName', NewData)

    },
    async FilterToDo({ commit }, e) {

      const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
      if (limit > 40) {
        const response = await axios.get('http://localhost:3000/user')
        this.commit('FilterToDo', response.data)
      }
      const response = await axios.get(`http://localhost:3000/user/?_limit=${limit}`)
      commit('FilterToDo', response.data)
    },

    async searchdata({ commit }, search) {
      commit('searchdata', search)

    }
  },
  modules: {
  }
})


