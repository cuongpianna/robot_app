import RobotVersionService from '@/services/robotversion.service'
import * as ACTIONS from '../constants/robotversion'

const state = {
    totalRobotVersion: 0,
    listRobotVersion: [],
    listAllRobotVersion: []
}

const getters = {
    totalRobotVersion: state => state.totalRobotVersion,
    listRobotVersion: state => state.listRobotVersion,
    listAllRobotVersion: state => state.listAllRobotVersion
}

const mutations = {
    [ACTIONS.MUTATION_GET_PAGING_ROBOT_VERSION](state, payload) {
        state.totalRobotVersion = payload.totalRecords
        state.listRobotVersion = payload.records
    },
    [ACTIONS.MUTATION_DELETE_ROBOT_VERSION](state, id) {
        const listRobotVersion = [...state.listRobotVersion]
        const results = listRobotVersion.filter(item => item.id !== id)
        state.listRobotVersion = results
    },
    [ACTIONS.MUTATION_GET_ALL_ROBOT_VERSION](state, payload) {
        state.listAllRobotVersion = payload.records
    }
}

const actions = {
    [ACTIONS.ACT_GET_ROBOT_VERSION_PAGING]({ commit, state }, { current_page, name, is_active, limit, user_type, is_delete }) {
        return new Promise((resolve, reject) => {
            RobotVersionService.getPagination(current_page, name, is_active, limit, user_type, is_delete)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_GET_PAGING_ROBOT_VERSION, res.payload)
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
    [ACTIONS.ACT_FETCH_ONE_ROBOT_VERSION]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            RobotVersionService.fetchOne(id)
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

    [ACTIONS.ACT_DELETE_ROBOT_VERSION]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            RobotVersionService.delete(id)
                .then(res => {
                    if (res && res.isSuccess) {
                        resolve(res)
                        commit(ACTIONS.MUTATION_DELETE_ROBOT_VERSION, id.userID)
                    } else {
                        throw res
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    [ACTIONS.ACT_INSERT_ROBOT_VERSION]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotVersionService.insert(data).then(res => {
                if(res) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_EDIT_ROBOT_VERSION]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotVersionService.edit(data).then(res => {
                if(res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_UPDATE_ROBOT_VERSION_STATUS]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotVersionService.updateStatus(data).then(res => {
                if(res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_GET_ALL_ROBOT_VERSION]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotVersionService.fetchList(data)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_GET_ALL_ROBOT_VERSION, res.payload)
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
    getters,
    state,
    mutations,
    actions
}

