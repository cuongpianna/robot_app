import RobotService from '@/services/robot.service'
import UserService from '@/services/usermanagement.service'
import AreaService from '@/services/area.service'
import UserMediaService from '@/services/usermedia.service'
import * as ACTIONS from '../constants/robot'

const state = {
    totalRobots: 0,
    listRobots: [],
    listUsers: [],
    allRobots: [],
    listParentArea: [],
    parentAreaModel: '',
    listChildrenArea: [],
    listRobotMedia: []
}

const getters = {
    totalRobots: state => state.totalRobots,
    listRobots: state => state.listRobots,
    listUsers: state => state.listUsers,
    allRobots: state => state.allRobots,
    listParentArea: state => state.listParentArea,
    listChildrenArea: state => state.listChildrenArea,
    parentAreaModel: state => state.parentAreaModel,
    listRobotMedia: state => state.listRobotMedia
}

const mutations = {
    [ACTIONS.MUTATION_FETCH_PAGING_ROBOT](state, payload) {
        state.totalRobots = payload.totalRecords
        state.listRobots = payload.records
    },
    [ACTIONS.MUTATION_DELETE_ROBOT](state, id) {
        const listRobots = [...state.listRobots]
        const results = listRobots.filter(item => item.id !== id)
        state.listRobots = results

        const allRobots = [...state.allRobots]
        const resultsAllRobot = allRobots.filter(item => item.id !== id)
        state.allRobots = resultsAllRobot
    },
    [ACTIONS.MUTATION_FETCH_ALL_USERS](state, payload) {
        state.listUsers = payload.records
    },
    [ACTIONS.MUTATION_GET_ALL_ROBOTS](state, payload) {
        state.allRobots = payload.records
    },
    [ACTIONS.MUTATION_ROBOT_FETCH_ALL_PARENT_AREA](state, payload) {
        state.listParentArea = payload.records
    },
    [ACTIONS.MUTATION_ROBOT_GET_ALL_CHILD_AREA](state, payload) {
        state.listChildrenArea = payload.records
    },
    [ACTIONS.MUTATION_SET_PARENT_AREA](state, data) {
        state.parentAreaModel = data
    },
    [ACTIONS.MUTATION_GET_ROBOT_MEDIA](state, payload) {
        state.listRobotMedia = payload.records
    }
}

const actions = {
    [ACTIONS.ACT_FETCH_ROBOT_PAGING]({ commit, state }, { current_page, name, user_id, is_active, limit, user_type, is_delete }) {
        return new Promise((resolve, reject) => {
            console.log(user_type)
            RobotService.getPagination(current_page, name, is_active, limit, user_type, is_delete, user_id)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_FETCH_PAGING_ROBOT, res.payload)
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

    [ACTIONS.ACT_FETCH_ONE_ROBOT]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            RobotService.fetchOne(id)
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

    [ACTIONS.ACT_DELETE_ROBOT]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            RobotService.delete(id)
                .then(res => {
                    if (res && res.isSuccess) {
                        resolve(res)
                        commit(ACTIONS.MUTATION_DELETE_ROBOT, id.userID)
                    } else {
                        throw res
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    [ACTIONS.ACT_INSERT_ROBOT]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotService.insert(data).then(res => {
                if(res) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_EDIT_ROBOT]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotService.edit(data).then(res => {
                if(res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_UPDATE_ROBOT_STATUS]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotService.updateStatus(data).then(res => {
                if(res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_FETCH_USERS]({ commit, state }) {
        return new Promise((resolve, reject) => {
            UserService.fetchList().then(res => {
                if(res && res.isSuccess) {
                    resolve(res)
                    commit(ACTIONS.MUTATION_FETCH_ALL_USERS, res.payload)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_FETCH_ALL_ROBOTS]({ commit, state }) {
        return new Promise((resolve, reject) => {
            RobotService.fetchList().then(res => {
                if(res && res.isSuccess) {
                    resolve(res)
                    commit(ACTIONS.MUTATION_GET_ALL_ROBOTS, res.payload)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_SET_MAP]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotService.setMap(data).then(res => {
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
                        commit(ACTIONS.MUTATION_ROBOT_FETCH_ALL_PARENT_AREA, res.payload)
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
                        commit(ACTIONS.MUTATION_ROBOT_GET_ALL_CHILD_AREA, res.payload)
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

    [ACTIONS.ACT_SET_PARENT_AREA]({ commit, state }, data) {
        commit(ACTIONS.MUTATION_SET_PARENT_AREA, data)
    },

    [ACTIONS.ACT_GET_ROBOT_MEDIA]({ commit, state }, { current_page, name, is_active, limit, robot_id, is_delete }) {
        return new Promise((resolve, reject) => {
            UserMediaService.getRobotMedia(current_page, name, is_active, limit, robot_id, is_delete)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_GET_ROBOT_MEDIA, res.payload)
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

    [ACTIONS.ACT_GET_ROBOT_INFO_BY_CODE]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            RobotService.getByCode(id)
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
    }
}

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}

