import { fetchList } from '@/services/permission.service'
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.permissions) {
        return roles.some(role => route.meta.permissions.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    routes: [],
    addRoutes: [],
    name: '',
    avatar: '',
    email: '',
    roles: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    },
    SET_LIST: (state, items) => {
        if (items && items.length > 0) {
            state.list = items
        }
    }
}

const actions = {
    FetchList({ commit, state }, { current_page, query, limit }) {
        return new Promise((resolve, reject) => {
            fetchList(current_page, query, limit)
                .then(res => {
                    if (res && res.success) {
                        const data = (res.data && res.data.list.data) || []
                        commit('SET_LIST', data)
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
    generateRoutes({ commit }, data) {
        return new Promise(resolve => {
            var auth = data
            var dataRoles = JSON.parse(auth.listRoles)
            var arrRoles = []
            for (const roles of dataRoles) {
                var permission = roles.Permissions
                for (const item of permission) {
                    arrRoles.push(item.Name)
                }
            }
            const accessedRoutes = filterAsyncRoutes(asyncRoutes, arrRoles)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
