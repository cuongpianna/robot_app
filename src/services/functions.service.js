import request from '@/help/request'

export function fetchList(current_page = 1, limit = 100) {
  return request({
    url: '/function/getAllFunction',
    method: 'post',
    data: {
      CurrentPage: current_page,
      PageSize: limit
    }
  })
}