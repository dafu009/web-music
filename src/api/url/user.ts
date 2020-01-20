import BASE_URL from '@/base/config'
interface UrlConfig {
  login: string,
  logout: string,
  checkLogin: string,
  register: string,
  queryUser: string,
  delUser: string,
  getAllUsers: string
  getUserInfo: string
  update: string
  updateEmail: string
}
const BASE: string = BASE_URL.user
const path: UrlConfig = {
  login: `${BASE}/login`,
  logout: `${BASE}/logout`,
  checkLogin: `${BASE}/checkLogin`,
  register: `${BASE}/register`,
  queryUser: `${BASE}/queryUser`,
  getAllUsers: `${BASE}/getAllUsers`,
  delUser: `${BASE}/delUser`,
  getUserInfo: `${BASE}/getUserInfo`,
  update: `${BASE}/update`,
  updateEmail: `${BASE}/updateEmail`
}

export default {
  path
}