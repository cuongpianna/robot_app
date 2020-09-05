    import AreaService from '@/services/area.service'
import CameraService from '@/services/camera.service'
import * as ACTIONS from '../constants/camera'

const state = {
    totalCameras: 0,
    listCameras: [],
    allCameras: [],
    availableCameras: [],
    // camera tracking
    listParentAreas: [],
    listAreaByParent: [],
    currentParentMap: '',
    currentFloor: '',
    currentMap: {},
    currentArea: '',
    parentName: '',
    listCamera:[],
    mainCamera: null,
    currentMapObject: {}
}

const getters = {
    totalCameras: state => state.totalCameras,
    listCameras: state => state.listCameras,
    allCameras: state => state.allCameras,
    availableCameras: state => state.availableCameras,
    // Tracking map
    listParentAreas: state => state.listParentAreas,
    listAreaByParent: state => state.listAreaByParent,
    currentParentMap: state => state.currentParentMap,
    currentMap: state => state.currentMap,
    currentFloor: state => state.currentFloor,
    currentArea: state => state.currentArea,
    parentName: state => state.parentName,
    listCamera: state => state.listCamera,
    mainCamera: state => state.mainCamera,
    currentMapObject: state => state.currentMapObject
}

const mutations = {
    [ACTIONS.MUTATION_FETCH_ALL_CAMERA](state, payload) {
        state.totalCameras = payload.totalRecords
        state.listCameras = payload.records
    },
    [ACTIONS.MUTATION_DELETE_CAMERA](state, id) {
        const listCameras = [...state.listCameras]
        const results = listCameras.filter(item => item.id !== id)
        state.listCameras = results

        const allCameras = [...state.allCameras]
        const result = allCameras.filter(item => item.id !== id)
        state.allCameras = result
    },
    [ACTIONS.MUTATION_GET_ALL_CAMERA](state, payload) {
        state.allCameras = payload.records
    },
    [ACTIONS.MUTATION_GET_CAMERA_AVAILABLE](state, payload) {
        state.availableCameras = payload.records
    },
    [ACTIONS.MUTATION_FETCH_AREA_PARENT](state, payload) {
        state.currentParentMap = payload.records[0].id
        state.parentName = payload.records[0].name
        state.listParentAreas = payload.records
    },
    [ACTIONS.MUTATION_FETCH_ALL](state, payload) {
        state.currentMapObject = payload.records[0]
        const data = payload.records.reverse()
        state.currentFloor = data[0]
        state.currentArea = data[0].name
        state.listCamera = payload.records[0].cameras
        state.mainCamera = state.listCamera[0]
        state.listAreaByParent = data
        state.currentMapObject = payload.records[0]
    },
    changeParentName(state, data) {
        state.parentName = data
        // state.currentMapObject = data
    },
    [ACTIONS.MUTATION_CHANGE_MAIN_CAMERA](state, id) {
        var mainCamera = state.listCamera.filter(item => item.id === id)
        if(mainCamera.length > 0) {
            state.mainCamera = mainCamera[0]
        }
    },
    [ACTIONS.MUTATION_SET_CURRENT_MAP_OBJECT](state, item) {
        state.currentMapObject = item
    }
}

const actions = {
    [ACTIONS.ACT_FETCH_CAMERA_PAGING]({ commit, state }, { current_page, name, is_active, limit, user_type, is_delete }) {
        return new Promise((resolve, reject) => {
            CameraService.getPagination(current_page, name, is_active, limit, user_type, is_delete)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_FETCH_ALL_CAMERA, res.payload)
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

    [ACTIONS.ACT_GET_CAMERA_AVAILABLE]({ commit, state }, { current_page, name, is_active, limit, user_type, is_delete }) {
        return new Promise((resolve, reject) => {
            CameraService.getAvailable(current_page, name, is_active, limit, user_type, is_delete)
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_GET_CAMERA_AVAILABLE, res.payload)
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

    [ACTIONS.ACT_FETCH_ONE_CAMERA]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            CameraService.fetchOne(id)
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

    [ACTIONS.ACT_DELETE_CAMERA]({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            CameraService.delete(id)
                .then(res => {
                    if (res && res.isSuccess) {
                        resolve(res)
                        commit(ACTIONS.MUTATION_DELETE_CAMERA, id.userID)
                    } else {
                        throw res
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    [ACTIONS.ACT_INSERT_CAMERA]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            CameraService.insert(data).then(res => {
                if (res) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_EDIT_CAMERA]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            CameraService.edit(data).then(res => {
                if (res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_UPDATE_CAMERA_STATUS]({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            CameraService.updateStatus(data).then(res => {
                if (res && res.isSuccess) {
                    resolve(res)
                } else {
                    throw res
                }
            })
        })
    },

    [ACTIONS.ACT_GET_ALL_CAMERA]({ commit, state }) {
        return new Promise((resolve, reject) => {
            CameraService.fetchList()
                .then(res => {
                    if (res && res.isSuccess) {
                        commit(ACTIONS.MUTATION_GET_ALL_CAMERA, res.payload)
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
    // tracking camera
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
                        for (var item of state.listParentAreas) {
                            if (item.id === state.currentParentMap) {
                                commit('changeParentName', item)
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
    [ACTIONS.ACT_FETCH_CAMERA]({ commit, state }, data) {
        state.listCamera = data.cameras

        state.currentFloor = data.id
        state.mainCamera = state.listCamera[0]
    }

}

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}

