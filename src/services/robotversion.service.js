import request from '@/help/request.agency'

class RobotVersionService {
    fetchList(para) {
        return request({
            url: '/robotversion/getall',
            method: 'post',
            data: { Data: para }
        })
    }

    fetchOne(id) {
        return request({
            url: '/robotversion/get?id=' + id,
            method: 'get'
        })
    }

    getPagination(current_page = 1, name = '', is_active = '', limit = 100, user_type = '', is_delete = '') {
        return request({
            url: '/robotversion/GetPagination',
            method: 'post',
            data: {
                CurrentPage: current_page,
                PageSize: limit,
                Data: {
                    Name: name
                }
            }
        })
    }

    delete(user_id = '') {
        return request({
            url: '/robotversion/delete',
            method: 'post',
            data: {
                Id: user_id['userID']
            }
        })
    }

    insert(data) {
        return request({
            url: '/robotversion/add',
            method: 'post',
            data
        })
    }

    edit(data) {
        return request({
            url: '/robotversion/edit',
            method: 'put',
            data
        })
    }

    updateStatus(data) {
        return request({
            url: '/robotversion/updateStatus',
            method: 'put',
            data
        })
    }
}

export default new RobotVersionService()

