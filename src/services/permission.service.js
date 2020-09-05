import request from '@/help/request'

export function fetchList() {
    return request({
        url: '/user/getall',
        method: 'post'
    })
}

export function fetchOne(id) {
    return request({
        url: '/user/get?id=' + id,
        method: 'get'
    })
}

export function getPagination(current_page = 1, name = '', is_active=true, limit = 100) {
    return request({
        url: '/user/GetPagination',
        method: 'post',
        data: {
            CurrentPage: current_page,
            PageSize: limit,
            Data: {
                Name: name,
                isActive: is_active
            }
        }
    })
}

export function deleteUser(user_id = '') {
    return request({
        url: '/user/delete',
        method: 'post',
        data: {
            Id: user_id['userID']
        }
    })
}


export function insertUser(data) {
    return request({
        url: '/user/add',
        method: 'post',
        data
    })
}


export function getRole(current_page, status, name, limit) {
    return request({
        url: '/role/getAll',
        method: 'post',
        data: {

        }
    })
}

export function edit(data) {
    return request({
        url: '/user/editUser',
        method: 'put',
        data
    })
}
