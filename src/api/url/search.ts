import BASE_URL from '@/base/config'
const BASE = BASE_URL.music
interface UrlConfig {
  multimatch: string
  monolayer: string
}
const path: UrlConfig = {
  multimatch: `${BASE}/search/multimatch`,
  monolayer: `${BASE}/search`
}

export default {
  path
}