import request from '@/help/request.agency'

class RobotService {
    fetchList() {
        return request({
            url: '/robot/getall',
            method: 'post',
            data: {
                CurrentPage: 1,
                PageSize: 10000,
                Data: {
                }
            }
        })
    }
    fetchListByArea(id) {
        return request({
            url: '/robot/robotByArea?id=' + id,
            method: 'get'
        })
    }
    fetchOne(id) {
        return request({
            url: '/robot/get?id=' + id,
            method: 'get'
        })
    }

    getPagination(current_page = 1, name = '', is_active = '', limit = 100, user_type = '', is_delete = '', user_id) {
        return request({
            url: '/robot/GetPagination',
            method: 'post',
            data: {
                CurrentPage: current_page,
                PageSize: limit,
                Data: {
                    Name: name
                },
                UserType: user_type,
                UserId: user_id
            }
        })
    }

    delete(user_id = '') {
        return request({
            url: '/robot/delete',
            method: 'post',
            data: {
                Id: user_id['userID']
            }
        })
    }

    insert(data) {
        return request({
            url: '/robot/add',
            method: 'post',
            data
        })
    }

    setMap(data) {
        return request({
            url: '/robot/setMap',
            method: 'put',
            data
        })
    }

    edit(data) {
        return request({
            url: '/robot/edit',
            method: 'put',
            data
        })
    }

    updateStatus(data) {
        return request({
            url: '/robot/updateStatus',
            method: 'put',
            data
        })
    }

    getByArea(data) {
        return request({
            url: '/robot/getByArea',
            method: 'post',
            data: {
                Id: data
            }
        })
    }

    getByCode(id) {
        return request({
            url: '/robot/getByCode?id=' + id,
            method: 'get'
        })
    }
}

export default new RobotService()

