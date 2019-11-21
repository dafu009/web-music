import axios from 'axios'
import URL from '@/api/user'
// 创建axios实例
let service: any = {}
service = axios.create({
  timeout: 5000, // 请求超时时间
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

service.defaults.headers.post['Content-Type'] = 'application/json'
// request拦截器
service.interceptors.request.use(
  (config: any) => {
    if (config.method === 'post') {
      config.data = JSON.stringify(config.data)
    }
    return config
  },
  (error: any) => {
    Promise.reject(error)
  },
)

// respone拦截器
service.interceptors.response.use(
  (response: any) => {
    const { data } = response
    return data
  },
  (error: any) => {
    let info: object = {}
    const { status, statusText, data } = error.response
    if (!error.response) {
      info = {
        code: 5000,
        msg: 'Network Error'
      }
    } else {
      info = {
        code: status,
        data: data,
        msg: statusText
      }
    }
    return Promise.reject(info)
  },
)

export default {
  //获取用户
  getUser () {
    return service.get(URL.getUser)
  },
  // 获取所有用户
  getAllUser () {
    return service.get(URL.getAllUsers)
  },
  // 用户注册
  userRegister (data: object) {
    return service.post(URL.register, data)
  },
  //用户登录
  userLogin (data: object) {
    return service.post(URL.login, data)
  },
  //用户登出
  userLogout (data: object) {
    return service.post(URL.logout, data)
  },
  //删除用户
  userDelete (data: object) {
    return service.post(URL.delUser, data)
  }
}
