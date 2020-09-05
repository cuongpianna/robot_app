import request from '@/help/request.agency'
import axios from 'axios'

class UserMediaService {
    fetchList() {
        return request({
            url: '/usermedia/getPagination',
            method: 'post',
            data: {
                CurrentPage: 1,
                PageSize: 10,
                Data: {
                }
            }
        })
    }

    getPagination(current_page = 1, name = '', is_active = '', limit = 100, user_id = '', is_delete = '') {
        return request({
            url: '/usermedia/GetPagination',
            method: 'post',
            data: {
                CurrentPage: current_page,
                PageSize: limit,
                Data: {
                    FileName: name,
                    UserId:user_id
                }
            }
        })
    }

    delete(id = '') {
        return request({
            url: '/usermedia/delete',
            method: 'post',
            data: {
                Id: id
            }
        })
    }
    upload(data) {
        return request({
            url: '/usermedia/upload',
            method: 'post',
            data
        })
    }
    uploadMediaToRobot(data) {
        // debugger;
        return request({
            url: '/usermedia/uploadmediatorobot',
            method: 'post',
            data:{
                MediaIds:data.MediaIds,
                RobotIds:data.RobotIds
            }
        })
    }
    getRobotMedia(current_page = 1, name = '', is_active = '', limit = 100, robot_id = '', is_delete = '') {
        return request({
            url: '/usermedia/getRobotPagination',
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
}

export default new UserMediaService()

