import UserService from '@/services/usermanagement.service'
import { ACT_FETCH_USER_PAGING, ACT_RESET_PASSWORD, ACT_UPDATE_STATUS, ACT_DELETE_USER, ACT_FETCH_ONE_USER, ACT_FETCH_ROLES, ACT_INSERT_USER, ACT_EDIT_USER } from '../constants/user'
import { MUTATION_FETCH_ALL_USER, MUTATION_DELETE_USER, MUTATION_FETCH_ROLES } from '../constants/user'
import * as ACTIONS from '../constants/user'
import AreaService from '@/services/area.service'
import RobotService from '@/services/robot.service'

const state = {
    totalUsers: 0,
    listUsers: [],
    listRoles: [],
    listParentArea: [],
    parentAreaModel: '',
    listChildrenArea: [],
    listRobotByArea: []
}

const getters = {
    totalUsers: state => state.totalUsers,
    listUsers: state => state.listUsers,
    listRoles: state => state.listRoles,
    listParentArea: state => state.listParentArea,
    listChildrenArea: state => state.listChildrenArea,
    parentAreaModel: state => state.parentAreaModel,
    listRobotByArea: state => state.listRobotByArea
}

const mutations = {
    [MUTATION_FETCH_ALL_USER](state, payload) {
        state.totalUsers = payload.totalRecords
        state.listUsers = payload.records
    },
    [MUTATION_DELETE_USER](state, id) {
        const listUsers = [...state.listUsers]
        const results = listUsers.filter(item => item.id !== id)
        state.listUsers = results
    },
    [MUTATION_FETCH_ROLES](state, listRoles) {
        state.listRoles = listRoles
    },
    [ACTIONS.MUTATION_USER_FETCH_ALL_PARENT_AREA](state, payload) {
        state.listParentArea = payload.records
    },
    [ACTIONS.MUTATION_USER_GET_ALL_CHILD_AREA](state, payload) {
        state.listChildrenArea = payload.records
    },
    [ACTIONS.ACT_MUTATION_ROBOT_BY_AREA](state, payload) {
        state.listRobotByArea = payload.records
    }
}

const actions = {
    [ACT_FETCH_USER_PAGING]({ commit, state }, { current_page, name, is_active, limit, user_type, is_delete }) {
        return new Promise((resolve, reject) => {
            UserService.getPagination(current_page, name, is_active, limit, user_type, is_delete)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(MUTATION_FETCH_ALL_USER, res.payload)
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

    [ACT_FETCH_ONE_USER]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            UserService.fetchOne(id)
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

    [ACT_DELETE_USER]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            UserService.deleteUser(id)
                .then(res => {
                    if (res && res.isSuccess) {
                        resolve(res)
                        commit(MUTATION_DELETE_USER, id.userID)
                    } else {
                        throw res
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    [ACT_INSERT_USER]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            UserService.insertUser(data).then(res => {
                if(res) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACT_FETCH_ROLES]({ commit, state }, { current_page, status, name, limit }) {
        return new Promise((resolve, reject) => {
            UserService.getRole(current_page, status, name, limit)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(MUTATION_FETCH_ROLES, res.payload.records)
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

    [ACT_EDIT_USER]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            UserService.edit(data).then(res => {
                if(res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACT_RESET_PASSWORD]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            UserService.resetPassword(data).then(res => {
                if(res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACT_UPDATE_STATUS]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            UserService.updateStatus(data).then(res => {
                if(res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_GET_PARENT_AREA]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            AreaService.fetchParentList(data)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_USER_FETCH_ALL_PARENT_AREA, res.payload)
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

    [ACTIONS.ACT_GET_CHILD_AREA_BY_PARENT]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            AreaService.fetchList(data)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_USER_GET_ALL_CHILD_AREA, res.payload)
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

    [ACTIONS.ACT_GET_ROBOT_BY_AREA]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotService.getByArea(data).then(res => {
                if(res) {
                    commit(ACTIONS.ACT_MUTATION_ROBOT_BY_AREA, res.payload)
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
    getters,
    state,
    mutations,
    actions
}

