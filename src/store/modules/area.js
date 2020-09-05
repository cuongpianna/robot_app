import AreaService from '@/services/area.service'
import * as ACTIONS from '../constants/area'

const state = {
    totalAreas: 0,
    listAreas: [],
    listParentAreas: [],
    listAreaByParent: [],
    currentParentMap:'',
    listAllChildArea: []
}

const getters = {
    totalAreas: state => state.totalAreas,
    listAreas: state => state.listAreas,
    listParentAreas: state => state.listParentAreas,
    listAreaByParent: state => state.listAreaByParent,
    currentParentMap: state => state.currentParentMap,
    listAllChildArea: state => state.listAllChildArea
}

const mutations = {
    [ACTIONS.MUTATION_FETCH_ALL_AREA](state, payload) {
        state.totalAreas = payload.totalRecords
        state.listAreas = payload.records
    },
    [ACTIONS.MUTATION_DELETE_AREA](state, id) {
        const listAreas = [...state.listAreas]
        const results = listAreas.filter(item => item.id !== id)
        state.listAreas = results
    },
    [ACTIONS.MUTATION_FETCH_ALL_PARENT_AREA](state, payload) {
        state.currentParentMap = payload.records[0].id
        state.listParentAreas = payload.records
    },
    [ACTIONS.MUTATION_FETCH_ALL](state, payload) {
        state.listAreaByParent = payload.records
    },
    [ACTIONS.MUTATION_GET_ALL_CHILD_AREA](state, payload) {
        state.listAllChildArea = payload.records
    }
}

const actions = {
    [ACTIONS.ACT_FETCH_AREA_PAGING]({ commit, state }, { current_page, name, is_active, limit, user_type, is_delete, parent_id }) {
        return new Promise((resolve, reject) => {
            AreaService.getPagination(current_page, name, is_active, limit, user_type, is_delete, parent_id)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_FETCH_ALL_AREA, res.payload)
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
    [ACTIONS.ACT_FETCH_AREA_PARENT]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            AreaService.fetchParentList(data)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_FETCH_ALL_PARENT_AREA, res.payload)
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
    [ACTIONS.ACT_FETCH_AREA_ALL]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            AreaService.fetchList(data)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_FETCH_ALL, res.payload)
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
    [ACTIONS.ACT_FETCH_ONE_AREA]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            AreaService.fetchOne(id)
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

    [ACTIONS.ACT_DELETE_AREA]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            AreaService.delete(id)
                .then(res => {
                    if (res && res.isSuccess) {
                        resolve(res)
                        commit(ACTIONS.MUTATION_DELETE_AREA, id.userID)
                    } else {
                        throw res
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    [ACTIONS.ACT_INSERT_AREA]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            AreaService.insert(data).then(res => {
                if(res) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_EDIT_AREA]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            AreaService.edit(data).then(res => {
                if(res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_UPDATE_AREA_STATUS]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            AreaService.updateStatus(data).then(res => {
                if(res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_GET_ALL_CHILD_AREA]({ commit, state }, { UserType, UserId }) {
        return new Promise((resolve, reject) => {
            AreaService.fetchList(UserType, UserId)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_GET_ALL_CHILD_AREA, res.payload)
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

    [ACTIONS.ACT_UPDATE_THUMB]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            AreaService.updateThumb(data).then(res => {
                if(res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_UPDATE_JSON]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            AreaService.updateJson(data).then(res => {
                if(res && res.isSuccess) {
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

