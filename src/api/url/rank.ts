import BASE_URL from '@/base/config'
const BASE = BASE_URL.music
interface UrlConfig {
  getTopRank: string
}
const path: UrlConfig = {
  getTopRank: `${BASE}/top/list`
}

export default {
  path
}