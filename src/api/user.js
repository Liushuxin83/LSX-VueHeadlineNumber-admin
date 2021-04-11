// 用户信息请求模块
import request from '../network/request'
// 获取用户信息
export function getUserInfo () {
  request({
    method: 'get',
    url: '/mp/v1_0/user/profile',
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU'
    }
  })
}
