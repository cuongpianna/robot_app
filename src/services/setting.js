import request from '@/help/request.agency'

class SettingService {
    fetchOne(id) {
        return request({
            url: '/setting/get?id=' + id,
            method: 'get'
        })
    }

    getPagination(current_page = 1, name = '', is_active = '', limit = 100, user_type = '') {
        return request({
            url: '/setting/GetPagination',
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

    edit(data) {
        return request({
            url: '/setting/edit',
            method: 'put',
            data
        })
    }
}

export default new SettingService()

