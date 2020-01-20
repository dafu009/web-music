import BASE_URL from '@/base/config'
const BASE = BASE_URL.user
interface UrlConfig {
  sendMailCode: string
  checkMailCode: string
}
const path: UrlConfig = {
  sendMailCode: `${BASE}/sendMailCode`,
  checkMailCode: `${BASE}/checkMailCode`
}

export default {
  path
}