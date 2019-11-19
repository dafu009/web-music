import axios from 'axios'

// 创建axios实例
let service: any = {}
service = axios.create({
  baseURL: '', // api的base_url
  timeout: 5000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    Promise.reject(error)
  },
)

// respone拦截器
service.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  },
)

export default service
