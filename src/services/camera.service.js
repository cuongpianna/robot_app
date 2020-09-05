import request from '@/help/request.agency'

class CameraService {
    fetchList() {
        return request({
            url: '/camera/getall',
            method: 'post',
            data: {
            }
        })
    }

    fetchOne(id) {
        return request({
            url: '/camera/get?id=' + id,
            method: 'get'
        })
    }

    getPagination(current_page = 1, name = '', is_active = '', limit = 100, user_type = '', is_delete = '') {
        return request({
            url: '/camera/GetPagination',
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
            url: '/camera/delete',
            method: 'post',
            data: {
                Id: user_id['userID']
            }
        })
    }

    insert(data) {
        return request({
            url: '/camera/add',
            method: 'post',
            data
        })
    }

    edit(data) {
        return request({
            url: '/camera/edit',
            method: 'put',
            data
        })
    }

    updateStatus(data) {
        return request({
            url: '/camera/updateStatus',
            method: 'put',
            data
        })
    }

    getAvailable(current_page = 1, name = '', is_active = '', limit = 100, user_type = '', is_delete = '') {
        return request({
            url: '/camera/getAvailable',
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
}

export default new CameraService()

