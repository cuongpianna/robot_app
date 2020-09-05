import AuthService from '@/services/auth.service'
import { getToken, setToken, removeToken } from '@/help/auth'
import { resetRouter } from '@/router'

const state = {
    token: getToken(),
    name: '',
    email: '',
    avatar: '',
    roles: [],
    agencyName: '',
    id: '',
    setting: {},
    areaNo: 0,
    userType: 1
}

const getters = {
    setting: state => state.setting,
    areaNo: state => state.areaNo
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_ID: (state, id) => {
        state.id = id
    },
    SET_SETTING: (state, setting) => {
        state.setting = setting
    },
    SET_AREA_NO: (state, areaNo) => {
        state.areaNo = areaNo
    },
    SET_USER_TYPE: (state, userType) => {
        state.userType = userType
    },
    SET_NAME: (state, name) => {
        state.name = name
    }
}
const actions = {
    Login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            AuthService.login({ username: username.trim(), password: password }).then(response => {
                setToken(response.token)
                commit('SET_TOKEN', response.token)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    LoginAgencyOwner({ commit }, userId) {
        return new Promise((resolve, reject) => {
            AuthService.loginAgencyOwner({ id: userId }).then(response => {
                setToken(response.token)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            AuthService.getInfo(state.token).then(response => {
                if (response && response.listRoles !== null) {
                    var auth = response
                    const { setting, areaNo, id, token, userType, name } = auth
                    var dataRoles = JSON.parse(auth.listRoles)
                    var arrRoles = []
                    for (const roles of dataRoles) {
                        var permission = roles.Permissions
                        for (const item of permission) {
                            arrRoles.push(item.Name)
                        }
                    }
                    commit('SET_NAME', name)
                    commit('SET_ID', id)
                    commit('SET_TOKEN', token)
                    commit('SET_ROLES', arrRoles)
                    commit('SET_SETTING', setting)
                    commit('SET_AREA_NO', areaNo)
                    commit('SET_USER_TYPE', userType)
                    resolve(response)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            removeToken()
            resetRouter()
            resolve()
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
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
