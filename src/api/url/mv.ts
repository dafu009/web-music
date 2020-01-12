import BASE_URL from '@/base/config'
const BASE = BASE_URL.music
interface UrlConfig {
  getMvDetail: string
  getMvUrl: string
}
const path: UrlConfig = {
  getMvDetail: `${BASE}/mv/detail`,
  getMvUrl: `${BASE}/mv/url`
}

export default {
  path
}