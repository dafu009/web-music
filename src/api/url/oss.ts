import BASE_URL from '@/base/config'
interface UrlConfig {
  getAliOssOptions: string
}
const BASE: string = BASE_URL.user
const path: UrlConfig = {
  getAliOssOptions: `${BASE}/getAliOssOptions`
}

export default {
  path
}