import request from '../network/request'
// 获取图片素材请求
export function getImagesData (params) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
// 收藏图片数据接口
export function collectMaterial (image_id, collect) {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${image_id}`,
    data: {
      collect
    }
  })
}
// 删除图片数据接口
export function deleteMaterial (image_id) {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${image_id}`
  })
}
