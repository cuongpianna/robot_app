import SettingService from '@/services/setting'
import * as ACTIONS from '../constants/setting'

const state = {
    settingObject: {}
}

const getters = {
    settingObject: state => state.settingObject
}

const mutations = {
    [ACTIONS.MUTATION_GET_SETTING](state, payload) {
        state.settingObject = payload.records[0]
    }
}

const actions = {
    [ACTIONS.ACT_GET_SETTING]({ commit, state }, { current_page, name, is_active, limit }) {
        return new Promise((resolve, reject) => {
            SettingService.getPagination(current_page, name, is_active, limit)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_GET_SETTING, res.payload)
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

    [ACTIONS.ACT_UPDATE_SETTING]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            SettingService.edit(data).then(res => {
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

