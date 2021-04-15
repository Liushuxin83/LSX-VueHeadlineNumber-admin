// 用户信息请求模块
import request from '../network/request'
// 获取用户信息
export function getUserInfo () {
  return request({
    method: 'get',
    url: '/mp/v1_0/user/profile'
    // headers: {
    //   Authorization:
    //     'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU'
    // }
  })
}
// 修改用户图片
// 此时Content-Type	multipart/form-data  此时data必须传递 FormData对象
export function updatedUserPhoto (data) {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}
// 编辑用户信息
export function editUserInfo (data) {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
