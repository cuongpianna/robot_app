import { fetchListImages, uploadBgAgencyApi } from '@/services/file.service'

const state = {
  listImages: []
}

const mutations = {
  SET_LIST_IMAGES: (state, items) => {
    if (items && items.length > 0) {
      state.listImages = items
    }
  }
}

const actions = {

  FetchImages({ commit, state }) {
    return new Promise((resolve, reject) => {
      fetchListImages()
        .then(res => {
          if (res && res.isSuccess) {
              const data = res.imageFiles || []
            commit('SET_LIST_IMAGES', data)
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

  UploadBgAgencyApi({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      uploadBgAgencyApi(data)
        .then(response => {
          if (response && response.isSuccess) {
            resolve(response)
          } else {
            throw response
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

