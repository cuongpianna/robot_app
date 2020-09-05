import { fetchList } from '@/services/functions.service'

const keyModel = 'role'

function updateList(object, list) {
  let isUpdate = false
  const _list = list.map(item => {
    if (item.id === object.id) {
      isUpdate = true
      return object
    } else {
      return item
    }
  })
  return isUpdate ? _list : false
}

const state = {
  list: [],
  item: {},
  listImages: []
}

const mutations = {
  SET_LIST: (state, items) => {
    if (items && items.length > 0) {
      state.list = items
    }
  },
  SET_ITEM: (state, item) => {
    let isExit = false
    if (state.list.length > 0) isExit = updateList(item, state.list)
    if (isExit) {
      state.list = isExit
    } else {
      state.list.unshift(item)
      state.list.pop()
    }
  },
  REMOVE_ITEM: (state, item_id) => {
    if (item_id) {
      state.list = state.list.filter(item => item.id !== item_id)
    }
  }
}

const actions = {

  // get list
  FetchList({ commit, state }, { current_page, limit }) {
    return new Promise((resolve, reject) => {
      fetchList(current_page, limit)
        .then(res => {
          if (res && res.isSuccess) {
            const data = (res.payload.records) || []
            commit('SET_LIST', data)
            resolve(res)
          } else {
            throw res
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  Create({ commit, state }, dataForm) {
    return new Promise((resolve, reject) => {
      create(dataForm)
        .then(response => {
          if (response && response.success) {
            const data = (response && response.data[keyModel]) || false
            if (data) commit('SET_ITEM', data)
            resolve(response)
          } else {
            throw response
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  Edit({ commit, state }, dataForm) {
    return new Promise((resolve, reject) => {
      edit(dataForm)
        .then(response => {
          if (response && response.success) {
            const data = (response && response.data[keyModel]) || false
            if (data) {
              commit('SET_ITEM', data)
              commit('SET_ITEM_HOTEL', data)
            }
            resolve(response)
          } else {
            throw response
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  Remove({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      deleteRole(id)
        .then(res => {
          if (res && res.isSuccess) {
            commit('REMOVE_ITEM', id)
            resolve(res)
          } else {
            throw res
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

