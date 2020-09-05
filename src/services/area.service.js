import request from '@/help/request.agency'

class AreaService {
    getAllChildArea(user_type, user_id) {
        console.log(user_type)
        return request({
            url: '/area/getAllChildArea',
            method: 'post',
            data:
                {
                    UserType: user_type,
                    UserId: user_id
                }
        })
    }

    fetchList(para) {
        return request({
            url: '/area/getall',
            method: 'post',
            data: { Data: para }
        })
    }

    fetchParentList(para) {
        return request({
            url: '/area/getParentArea',
            method: 'post',
            data: { Data: para }
        })
    }

    fetchOne(id) {
        return request({
            url: '/area/get?id=' + id,
            method: 'get'
        })
    }

    getPagination(current_page = 1, name = '', is_active = '', limit = 100, user_type = '', is_delete = '', parent_id = '') {
        return request({
            url: '/area/GetPagination',
            method: 'post',
            data: {
                CurrentPage: current_page,
                PageSize: limit,
                Data: {
                    Name: name,
                    parentId: parent_id
                }
            }
        })
    }

    delete(user_id = '') {
        return request({
            url: '/area/delete',
            method: 'post',
            data: {
                Id: user_id['userID']
            }
        })
    }

    insert(data) {
        return request({
            url: '/area/add',
            method: 'post',
            data
        })
    }

    edit(data) {
        return request({
            url: '/area/edit',
            method: 'put',
            data
        })
    }

    updateStatus(data) {
        return request({
            url: '/area/updateStatus',
            method: 'put',
            data
        })
    }

    updateThumb(data) {
        return request({
            url: '/area/updateThumb',
            method: 'put',
            data
        })
    }

    updateJson(data) {
        return request({
            url: '/area/updateJson',
            method: 'put',
            data
        })
    }
}

export default new AreaService()

