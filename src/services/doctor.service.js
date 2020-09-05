import request from '@/help/request.agency'

class DoctorService {
    fetchList() {
        return request({
            url: '/doctor/getall',
            method: 'post',
            data: {
            }
        })
    }

    fetchOne(id) {
        return request({
            url: '/doctor/get?id=' + id,
            method: 'get'
        })
    }

    getPagination(current_page = 1, name = '', is_active = '', limit = 100, user_type = '', is_delete = '') {
        return request({
            url: '/doctor/GetPagination',
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
            url: '/doctor/delete',
            method: 'post',
            data: {
                Id: user_id['userID']
            }
        })
    }

    insert(data) {
        return request({
            url: '/doctor/add',
            method: 'post',
            data
        })
    }

    edit(data) {
        return request({
            url: '/doctor/edit',
            method: 'put',
            data
        })
    }

    updateStatus(data) {
        return request({
            url: '/doctor/updateStatus',
            method: 'put',
            data
        })
    }
}

export default new DoctorService()

