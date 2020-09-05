import RoleService from '@/services/role.service'
import { ACT_FETCH_ALL_ROLE, ACT_UPDATE_ROLE_MODULE_FUNCTION } from '../constants/role'
import { MUTATION_FETCH_ALL_ROLES } from '../constants/role'

const state = {
    listRoles: [],
    totalRoles: 0
}

const getters = {
    listRoles: state => state.listRoles,
    totalRoles: state => state.totalRoles
}

const mutations = {
    [MUTATION_FETCH_ALL_ROLES](state, payload) {
        state.listRoles = payload.records
        state.totalRoles = payload.totalRecords
    }
}

const actions = {

    // get list
    [ACT_FETCH_ALL_ROLE]({ commit, state }, { current_page, status, name, limit }) {
        return new Promise((resolve, reject) => {
            RoleService.fetchList(current_page, status, name, limit)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(MUTATION_FETCH_ALL_ROLES, res.payload)
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

    FetchOne({ commit, state }, { id }) {
        return new Promise((resolve, reject) => {
            RoleService.fetchOne(id)
                .then(res => {
                    if (res && res.isSuccess) {
                        const data = (res.payload.records) || []
                        commit('SET_ITEM', data)
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

    [ACT_UPDATE_ROLE_MODULE_FUNCTION]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RoleService.updateRoleModuleFunction(data)
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
            RoleService.create(dataForm)
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

    Edit({ commit, state }, dataForm) {
        return new Promise((resolve, reject) => {
            RoleService.edit(dataForm)
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
            RoleService.deleteRole(id)
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
            RoleService.updateStatus(data).then(res => {
                if (res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },
}

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}

