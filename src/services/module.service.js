import request from '@/help/request'

class ModuleService {
 fetchAll(current_page, status, name, limit) {
    return request({
      url: '/module/getAllModule',
      method: 'post',
      data: {
        CurrentPage: current_page,
        PageSize: limit,
        Data: {
          IsActive: status,
          Name: name
        }
      }
    })
  }

  fetchList(current_page = 1, limit = 100, id, isActive) {
    return request({
      url: '/module/getAll',
      method: 'post',
      data: {
        CurrentPage: current_page,
        PageSize: limit,
        RoleId: id,
        Data: {
          isActive: isActive
        }
      }
    })
  }

  fetchOne(id) {
    return request({
      url: '/module/get?id=' + id,
      method: 'GET'
    })
  }

  create(data) {
    return request({
      url: '/module/add',
      method: 'POST',
      data
    })
  }

  edit(data) {
    return request({
      url: '/module/editModule',
      method: 'PUT',
      data
    })
  }

  updateStatus(data) {
    return request({
      url: '/module/updateStatus',
      method: 'put',
      data
    })
  }
}

export default new ModuleService()

