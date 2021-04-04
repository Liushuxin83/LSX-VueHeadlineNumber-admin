// 对于代码中的请求操作：1.接口请求可能需要重用 2.实际工作中接口非常容易变动，改起来麻烦
import request from '../../network/request'
// 登录请求数据
export function getLoginData(data) {
	return request({
		method: 'POST',
		url: '/mp/v1_0/authorizations',
		data
	})
}
