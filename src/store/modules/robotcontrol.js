import * as ACTIONS from '../constants/robotcontrol'

const state = {
    robotStatus: {},
    areaRoomList: [],
    mission: 2,
    workStatus: 1,
    robotCode: '',
    isAutomatic: true
}

const getters = {
    robotStatus: state => state.robotStatus,
    areaRoomList: state => state.areaRoomList,
    mission: state => state.mission,
    workStatus: state => state.workStatus,
    robotCode: state => state.robotCode,
    isAutomatic: state => state.isAutomatic
}

const mutations = {
    [ACTIONS.MUTATION_UPDATE_ROBOT_STATUS](state, payload) {
        const s2 = payload.substr(1)
        const statusList = s2.split('#')
        const status = {}
        status.workMode = statusList[2]
        status.networkStatus = statusList[3]
        status.point_x = statusList[4]
        status.point_y = statusList[5]
        status.delta_deg = statusList[6]
        status.barrier = statusList[7]
        status.e_stop = statusList[8]
        status.missionStatus = statusList[9]
        status.pin = statusList[10]
        status.workType = statusList[11]
        state.robotStatus = status
        if (state.workMode == 0) {
            state.isAutomatic = false
        } else if (state.workMode == 1) {
            state.isAutomatic = true
        }

        if(status.workType !== undefined) {
            state.mission = parseInt(status.workType)
        }
    },
    [ACTIONS.MUTATION_UPDATE_AREA_LIST](state, area) {
        const index = state.areaRoomList.indexOf(area)
        if (index === -1) {
            state.areaRoomList.push(area)
        } else {
            state.areaRoomList.splice(index, 1)
        }
    },
    [ACTIONS.MUTATION_CHANGE_WORK_STATUS](state, status) {
        if (state.workStatus === 0) {
            state.workStatus = 1
        } else {
            state.workStatus = 0
        }
    },
    clearRoomList(state) {
        state.areaRoomList = []
    },
    mutationChangeRobotCode(state, robotCode) {
        state.robotCode = robotCode
    },
    [ACTIONS.MUTATION_CHANGE_AUTOMATIC](state) {
        state.isAutomatic = !state.isAutomatic
    },
    [ACTIONS.MUTATION_CHANGE_WORK_MODE](state) {
        console.log('')
    }
}

const actions = {}

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions
}

