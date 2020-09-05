import request from '@/help/request.agency'
import axios from 'axios'

class RobotMediaService {
    fetchList() {
        return request({
            url: '/robotmedia/getPagination',
            method: 'post',
            data: {
                CurrentPage: 1,
                PageSize: 10,
                Data: {
                }
            }
        })
    }

    getPagination(current_page = 1, name = '', is_active = '', limit = 100, robot_id = '', is_delete = '') {
        return request({
            url: '/robotmedia/GetPagination',
            method: 'post',
            data: {
                CurrentPage: current_page,
                PageSize: limit,
                Data: {
                    FileName: name,
                    RobotId:robot_id
                }
            }
        })
    }

    delete(id = '') {
        return request({
            url: '/robotmedia/delete',
            method: 'post',
            data: {
                Id: id
            }
        })
    }
    upload(data) {
        return request({
            url: '/robotmedia/upload',
            method: 'post',
            data
        })
    }
    export(data) {
        return request({
            url: '/robotmedia/export',
            method: 'post',
            data
        })
    }
  
  

}

export default new RobotMediaService()

