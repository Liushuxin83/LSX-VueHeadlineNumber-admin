import request from '../network/request'
// 获取文章数据
export function getArticlesData (params) {
  return request({
    method: 'get',
    url: '/mp/v1_0/articles',
    params
  })
}
// 获取文章频度
export function getArticlesChannel () {
  return request({
    method: 'get',
    url: '/mp/v1_0/channels'
  })
}
