import request from '@/help/request'

class AuthService {
    login(data) {
        return request({
            url: '/user/token',
            method: 'post',
            data
        })
    }

    loginAgencyOwner(data) {
        return request({
            url: '/user/tokenByUserId',
            method: 'post',
            data
        })
    }

    logout() {
        return request({
            url: '/user/logout',
            method: 'post'
        })
    }
    getInfo(token) {
        return request({
            url: '/user/getInfo',
            method: 'post',
            data: {
                token: token
            }
        })
    }
}
export default new AuthService()
