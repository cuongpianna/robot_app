import request from '@/help/request.agency'

export function uploadBgAgencyApi(data) {
  return request({
    url: '/file/files',
    method: 'post',
    data
  })
}

export function fetchListImages() {
  return request({
    url: '/file/images',
    method: 'get'
  })
}
