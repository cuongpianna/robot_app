import RobotService from '@/services/robot.service'
import AreaService from '@/services/area.service'
import * as ACTIONS from '../constants/dashboard'

const state = {
    listParentAreas: [],
    listAreaByParent: [],
    listRobots: [],
    currentParentMap: '',
    currentFloor: '',
    currentMap: {},
    currentArea: '',
    parentName: '',
    currentMapObject: {},
    listAllChildArea: []
}

const getters = {
    listParentAreas: state => state.listParentAreas,
    listAreaByParent: state => state.listAreaByParent,
    currentParentMap: state => state.currentParentMap,
    currentMap: state => state.currentMap,
    listRobots: state => state.listRobots,
    currentFloor: state => state.currentFloor,
    currentArea: state => state.currentArea,
    parentName: state => state.parentName,
    currentMapObject: state => state.currentMapObject,
    listAllChildArea: state => state.listAllChildArea
}

const mutations = {
    [ACTIONS.MUTATION_FETCH_ROBOT](state, payload) {
        state.listRobots = payload.records
    },
    [ACTIONS.MUTATION_FETCH_AREA_PARENT](state, payload) {
        state.currentParentMap = payload.records[0].id
        state.parentName = payload.records[0].name
        state.listParentAreas = payload.records
    },
    [ACTIONS.MUTATION_FETCH_ALL](state, payload) {
        const data = payload.records.reverse()
        state.currentFloor = data[0].id
        state.currentArea = data[0].name
        state.listAreaByParent = data
        state.currentMapObject = data[0]
    },
    changeParentName(state, data) {
        state.parentName = data
    },
    [ACTIONS.MUTATION_SET_CURRENT_MAP_OBJECT](state, item) {
        state.currentMapObject = item
    },
    [ACTIONS.MUTATION_GET_ALL_CHILD_AREA](state, payload) {
        for(const item of payload.records) {
            const parentArea = state.listParentAreas.filter((area) => {
                return item.parentId === area.id
            })[0]

            item.parentName = parentArea.name
        }
        state.listAllChildArea = payload.records
    },
    [ACTIONS.MUTATION_UPDATE_POSITION_ROBOT](state, message) {
        const message_dump = message.split('#')
        const robotCode = message_dump[message_dump.length - 1]
        const width = parseInt(message_dump[4])
        const height = parseInt(message_dump[5])
        var robotsList = JSON.parse(JSON.stringify(state.listAllChildArea))
        for(const item of robotsList) {
            for(const robot of item.robots) {
                if(robot.code === robotCode) {
                    robot.mapWidth = width / item.width
                    robot.mapHeight = height / item.height
                    break
                }
            }
        }
        state.listAllChildArea = robotsList
    }
}

const actions = {
    [ACTIONS.ACT_FETCH_ROBOT]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            RobotService.fetchListByArea(id)
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
    [ACTIONS.ACT_FETCH_AREA_PARENT]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            AreaService.fetchParentList(data)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_FETCH_AREA_PARENT, res.payload)
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
                        state.currentParentMap = data.ParentId
                        for(var item of state.listParentAreas) {
                            if(item.id === state.currentParentMap) {
                                commit('changeParentName', item.name)
                                break
                            }
                        }
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

    [ACTIONS.ACT_GET_ALL_CHILD_AREA]({ commit, state }, { UserType, UserId }) {
        return new Promise((resolve, reject) => {
            AreaService.getAllChildArea(UserType, UserId)
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
    }
}

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}

