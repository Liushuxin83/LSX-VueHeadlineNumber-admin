import request from '../network/request'
export function publishArticles (data, draft = false) {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft // 是否存为 草稿  true为存入
    },
    data
  })
}
export function uploadCover (data) {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}
