import request from '@/help/request'

class RoleService {
  fetchList(current_page, status, name, limit) {
    return request({
      url: '/role/getPaging',
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

  deleteRole(id) {
    return request({
      url: '/role/updateDeleted',
      method: 'POST',
      data: {
        Id: id
      }
    })
  }

  fetchOne(id) {
    return request({
      url: '/role/get?id=' + id,
      method: 'GET'
    })
  }

  updateRoleModuleFunction(data) {
    return request({
      url: '/role/updateRoleModuleFunction',
      method: 'PUT',
      data
    })
  }

  create(data) {
    return request({
      url: '/role/add',
      method: 'POST',
      data
    })
  }

  edit(data) {
    return request({
      url: '/role/editRoleNoModule',
      method: 'PUT',
      data
    })
  }

  updateStatus(data) {
    return request({
      url: '/role/updateStatus',
      method: 'put',
      data
    })
  }
}

export default new RoleService()
