import ModuleService from  '@/services/module.service'
import { FETCH_ALL_MODULE, FETCH_LIST_MODULE } from '../constants/module'

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
    listModule: [],
    totalModules: 0
}

const getters = {
    listModule: state => state.listModule,
    totalModules: state => state.totalModules
}

const mutations = {
    fetchPaginationModule: (state, payload) => {
        state.listModule = payload.records
        state.totalModules = payload.totalRecords
    }
}

const actions = {

    FetchOne({ commit, state }, { id }) {
        return new Promise((resolve, reject) => {
            ModuleService.fetchOne(id)
                .then(res => {
                    if (res && res.isSuccess) {
                        const data = (res.payload.records) || []
                        //commit('fetchAllModule', res.payload)
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

    [FETCH_ALL_MODULE]({ commit, state }, { current_page, status, name, limit }) {
        return new Promise((resolve, reject) => {
            ModuleService.fetchAll(current_page, status, name, limit)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit('fetchPaginationModule', res.payload)
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

    [FETCH_LIST_MODULE]({ commit, state }, { current_page, limit, id, isActive }) {
        return new Promise((resolve, reject) => {
            ModuleService.fetchList(current_page, limit, id, isActive)
                .then(res => {
                    if (res && res.isSuccess) {
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
            ModuleService.create(dataForm)
                .then(response => {
                    if (response && response.success) {
                        const data = (response) || false
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
            ModuleService.edit(dataForm)
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
    },

    Remove({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            ModuleService.deleteRole(id)
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
    },
    UpdateStatus({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            ModuleService.updateStatus(data).then(res => {
                if (res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

