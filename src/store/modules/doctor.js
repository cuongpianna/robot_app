import DoctorService from '@/services/doctor.service'
import * as ACTIONS from '../constants/doctor'

const state = {
    totalDoctors: 0,
    listDoctors: [],
    allDoctors: []
}

const getters = {
    totalDoctors: state => state.totalDoctors,
    listDoctors: state => state.listDoctors,
    allDoctors: state => state.allDoctors
}

const mutations = {
    [ACTIONS.MUTATION_FETCH_ALL_DOCTOR](state, payload) {
        state.totalDoctors = payload.totalRecords
        state.listDoctors = payload.records
    },
    [ACTIONS.MUTATION_DELETE_DOCTOR](state, id) {
        const listDoctors = [...state.listDoctors]
        const results = listDoctors.filter(item => item.id !== id)
        state.listDoctors = results

        const allDoctors = [...state.allDoctors]
        const result = allDoctors.filter(item => item.id !== id)
        state.allDoctors = result
    },
    [ACTIONS.MUTATION_GET_ALL_DOCTORS](state, payload) {
        state.allDoctors = payload.records
    }
}

const actions = {
    [ACTIONS.ACT_FETCH_DOCTOR_PAGING]({ commit, state }, { current_page, name, is_active, limit, user_type, is_delete }) {
        return new Promise((resolve, reject) => {
            DoctorService.getPagination(current_page, name, is_active, limit, user_type, is_delete)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_FETCH_ALL_DOCTOR, res.payload)
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

    [ACTIONS.ACT_FETCH_ONE_DOCTOR]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            DoctorService.fetchOne(id)
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

    [ACTIONS.ACT_DELETE_DOCTOR]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            DoctorService.delete(id)
                .then(res => {
                    if (res && res.isSuccess) {
                        resolve(res)
                        commit(ACTIONS.MUTATION_DELETE_DOCTOR, id.userID)
                    } else {
                        throw res
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    [ACTIONS.ACT_INSERT_DOCTOR]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            DoctorService.insert(data).then(res => {
                if(res) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_EDIT_DOCTOR]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            DoctorService.edit(data).then(res => {
                if(res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_UPDATE_DOCTOR_STATUS]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            DoctorService.updateStatus(data).then(res => {
                if(res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_GET_ALL_DOCTORS]({ commit, state }) {
        return new Promise((resolve, reject) => {
            DoctorService.fetchList()
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_GET_ALL_DOCTORS, res.payload)
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

