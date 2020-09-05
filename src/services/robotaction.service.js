import request from '@/help/request.agency'

class RobotActionService {
    fetchList() {
        return request({
            url: '/robotaction/getPagination',
            method: 'post',
            data: {
                CurrentPage: 1,
                PageSize: 10,
                Data: {}
            }
        })
    }

    fetchOne(id) {
        return request({
            url: '/robotaction/get?id=' + id,
            method: 'get'
        })
    }

    getPagination(current_page = 1, name = '', is_active = '', limit = 100, isAutomaticAction = false, showInRobotDashboard = false, showInManualRobotDashboard = false) {
        return request({
            url: '/robotaction/GetPagination',
            method: 'post',
            data: {
                CurrentPage: current_page,
                PageSize: limit,
                Data: {
                    ActionName: name,
                    ShowInRobotDashboard: showInRobotDashboard,
                    showInManualRobotDashboard: showInManualRobotDashboard,
                    IsAutomaticAction: isAutomaticAction
                }
            }
        })
    }

    delete(id = '') {
        return request({
            url: '/robotaction/delete',
            method: 'post',
            data: {
                Id: id
            }
        })
    }

    create(data) {
        return request({
            url: '/robotaction/add',
            method: 'POST',
            data
        })
    }

    createSchedule(data) {
        return request({
            url: '/robotaction/addRobotShedule',
            method: 'POST',
            data
        })
    }

    getActionParram() {
        return request({
            url: '/robotaction/getActionParram',
            method: 'GET'
        })
    }

    updateActionParram(data) {
        return request({
            url: '/robotaction/updateActionParram',
            method: 'POST',
            data
        })
    }

    getAllSchedule() {
        return request({
            url: '/robotaction/getRobotSchedules',
            method: 'GET'
        })
    }

    update(data) {
        return request({
            url: '/robotaction/edit',
            method: 'POST',
            data
        })
    }

    getListManual(current_page = 1, name = '', is_active = '', limit = 100, robot_id = '', is_delete = '', showInManualRobotDashboard = true) {
        return request({
            url: '/robotaction/GetList',
            method: 'post',
            data: {
                CurrentPage: current_page,
                PageSize: limit,
                Data: {
                    ActionName: name,
                    ShowInManualRobotDashboard: showInManualRobotDashboard
                }
            }
        })
    }
}

export default new RobotActionService()

