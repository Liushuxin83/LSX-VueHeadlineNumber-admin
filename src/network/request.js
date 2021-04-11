import axios from 'axios'
import store from '../store/index'
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/'
})
// 拦截器
// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log(config);
    if (Object.keys(store.state.afterUserLoginInfo).length > 0) {
      config.headers.Authorization = `Bearer ${store.state.afterUserLoginInfo.token}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response);
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default request
