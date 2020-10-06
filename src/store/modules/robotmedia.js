import RobotMediaService from '@/services/robotmedia.service'
import * as ACTIONS from '../constants/robotmedia'

const state = {
    totalMedias: 0,
    listMedias:[],
    allMedias:[]
}

const getters = {
    totalMedias: state => state.totalMedias,
    listMedias: state => state.listMedias,
    allMedias:state => state.allMedias,
}

const mutations = {
    [ACTIONS.MUTATION_FETCH_PAGING_MEDIA](state, payload) {
        state.totalMedias = payload.totalRecords
        state.listMedias = payload.records
    },
    [ACTIONS.MUTATION_DELETE_MEDIA](state, id) {
        const listMedias = [...state.listMedias]
        const results = listMedias.filter(item => item.id !== id)
        state.listMedias = results

        const allMedias = [...state.allMedias]
        const resultsAllMedias = allMedias.filter(item => item.id !== id)
        state.allMedias = resultsAllMedias

    },
    [ACTIONS.MUTATION_GET_ALL_MEDIAS](state, payload) {
        state.allMedias = payload.records
    },

}

const actions = {
    [ACTIONS.ACT_FETCH_MEDIA_PAGING]({ commit, state }, { current_page, name, is_active, limit, robot_id, is_delete }) {
        return new Promise((resolve, reject) => {
            RobotMediaService.getPagination(current_page, name, is_active, limit, robot_id, is_delete)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_FETCH_PAGING_MEDIA, res.payload)
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

    [ACTIONS.ACT_DELETE_MEDIA]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            RobotMediaService.delete(id)
                .then(res => {
                    if (res && res.isSuccess) {
                        resolve(res)
                        commit(ACTIONS.MUTATION_DELETE_MEDIA, id)
                    } else {
                        throw res
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    [ACTIONS.ACT_INSERT_MEDIA]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotMediaService.upload(data).then(res => {
                if(res) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },
    [ACTIONS.ACT_EXPORT_MEDIA]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            RobotMediaService.export(data).then(res => {
                if(res) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },
    [ACTIONS.ACT_FETCH_ALL_Medias]({ commit, state }) {
        return new Promise((resolve, reject) => {
            RobotMediaService.fetchList().then(res => {
                if(res && res.isSuccess) {
                    resolve(res)
                    commit(ACTIONS.ACT_FETCH_ALL_MEDIAS, res.payload)
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

