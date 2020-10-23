import request from '@/help/request'

class UsermanagementService {
    fetchList() {
        return request({
            url: '/user/getall',
            method: 'post',
            data: {
                CurrentPage: 1,
                PageSize: 10000,
                Data: {
                }
            }
        })
    }

    fetchOne(id) {
        return request({
            url: '/user/get?id=' + id,
            method: 'get'
        })
    }

    getPagination(current_page = 1, name = '', is_active = '', limit = 100, user_type = '', is_delete = '') {
        return request({
            url: '/user/GetPagination',
            method: 'post',
            data: {
                CurrentPage: current_page,
                PageSize: limit,
                Data: {
                    UserName: name,
                    isActive: is_active,
                    filterType: 1,
                    userType: user_type,
                    isDeleted: is_delete
                }
            }
        })
    }

    deleteUser(user_id = '') {
        return request({
            url: '/user/delete',
            method: 'post',
            data: {
                Id: user_id['userID']
            }
        })
    }

    insertUser(data) {
        return request({
            url: '/user/add',
            method: 'post',
            data
        })
    }

    getRole(current_page, status, name, limit) {
        return request({
            url: '/role/getAll',
            method: 'post',
            data: {

            }
        })
    }

    edit(data) {
        return request({
            url: '/user/editUser',
            method: 'put',
            data
        })
    }

    resetPassword(data) {
        return request({
            url: '/user/resetPassword',
            method: 'put',
            data
        })
    }

    updateStatus(data) {
        return request({
            url: '/user/updateStatus',
            method: 'put',
            data
        })
    }

    getUserAgency() {
        return request({
            url: '/user/getUserAgency',
            method: 'get'
        })
    }

    updateUsername(data) {
        return request({
            url: '/user/UpdateUsername',
            method: 'put',
            data
        })
    }
}

export default new UsermanagementService()

