import RobotActionService from '@/services/robotaction.service'
import * as ACTIONS from '../constants/robotaction'

const state = {
    totalRobotActions: 0,
    listRobotActions: [],
    autoRobotActions: [],
    manualRobotActions: [],
    allRobotActions: [],
    listManualAction: []
}

const getters = {
    totalRobotActions: state => state.totalRobotActions,
    listRobotActions: state => state.listRobotActions,
    allRobotActions: state => state.allRobotActions,
    autoRobotActions: state => state.autoRobotActions,
    manualRobotActions: state => state.manualRobotActions,
    listManualAction: state => state.listManualAction,
    listRobotSchedule: state => state.listRobotSchedule
}

const mutations = {
    [ACTIONS.MUTATION_FETCH_PAGING_ROBOT_ACTION](state, payload) {
        state.totalMedias = payload.totalRecords
        state.listRobotActions = payload.records
        state.autoRobotActions = state.listRobotActions.filter(item => item.showInRobotDashboard == true)
        state.manualRobotActions = state.listRobotActions.filter(item => item.showInManualRobotDashboard == true)
    },
    [ACTIONS.MUTATION_DELETE_ROBOT_ACTION](state, id) {
        const listRobotActions = [...state.listRobotActions]
        const results = listRobotActions.filter(item => item.id !== id)
        state.listRobotActions = results
    },
    [ACTIONS.MUTATION_GET_ALL_ROBOT_ACTIONS](state, payload) {
        state.allRobotActions = payload.records
    },
    [ACTIONS.MUTATION_FETCH_MANUAL_ACTIONS](state, payload) {
        state.listManualAction = payload.records
    },
    [ACTIONS.MUTATION_FETCH_ROBOT_SCHEDULE](state, payload) {
        state.listRobotSchedule = payload.records
    }
}

// current_page = 1, name = '', is_active = '', limit = 100, showInRobotDashboard = false, showInManualRobotDashboard = false
const actions = {
    [ACTIONS.ACT_FETCH_ROBOT_ACTION_PAGING]({ commit, state }, { current_page, name, is_active, limit, isAutomaticAction, showInRobotDashboard, showInManualRobotDashboard }) {
        return new Promise((resolve, reject) => {
            RobotActionService.getPagination(current_page, name, is_active, limit, isAutomaticAction, showInRobotDashboard, showInManualRobotDashboard)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_FETCH_PAGING_ROBOT_ACTION, res.payload)
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

    [ACTIONS.ACT_DELETE_ROBOT_ACTION]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            RobotActionService.delete(id)
                .then(res => {
                    if (res && res.isSuccess) {
                        resolve(res)
                        commit(ACTIONS.MUTATION_DELETE_ROBOT_ACTION, id)
                    } else {
                        throw res
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    [ACTIONS.ACT_INSERT_ROBOT_ACTION]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotActionService.create(data).then(res => {
                if (res) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },
    [ACTIONS.ACT_INSERT_ROBOT_SCHEDULE]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotActionService.createSchedule(data).then(res => {
                if (res) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_GET_ROBOT_SCHEDULE]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotActionService.getAllSchedule()
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_FETCH_ROBOT_SCHEDULE, res.payload)
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

    [ACTIONS.ACT_GET_ACTION_PARRAM]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotActionService.getActionParram()
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
    [ACTIONS.ACT_UPDATE_ACTION_PARRAM]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotActionService.updateActionParram(data)
                .then(res => {
                    if (res) {
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
    [ACTIONS.ACT_UPDATE_ROBOT_ACTION]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotActionService.update(data).then(res => {
                if (res) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },
    [ACTIONS.ACT_FETCH_ALL_ROBOT_ACTIONS]({ commit, state }) {
        return new Promise((resolve, reject) => {
            RobotActionService.fetchList().then(res => {
                if (res && res.isSuccess) {
                    resolve(res)
                    commit(ACTIONS.ACT_FETCH_ALL_ROBOT_ACTIONS, res.payload)
                } else {
                    throw res
                }
            })
        })
    },
    [ACTIONS.ACT_FETCH_ONE_ROBOT_ACTION]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            RobotActionService.fetchOne(id)
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
    [ACTIONS.ACT_GET_LIST_MANUAL]({ commit, state }, { current_page, name, is_active, limit, robot_id, is_delete, showInManualRobotDashboard }) {
        return new Promise((resolve, reject) => {
            RobotActionService.getListManual(current_page, name, is_active, limit, robot_id, is_delete, showInManualRobotDashboard)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_FETCH_MANUAL_ACTIONS, res.payload)
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

