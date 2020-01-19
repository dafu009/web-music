import BASE_URL from '@/base/config'
const BASE = BASE_URL.user
interface UrlConfig {
  getRandomImage: string
  checkImage: string
}
const path: UrlConfig = {
  getRandomImage: `${BASE}/getRandomImage`,
  checkImage: `${BASE}/checkImage`
}

export default {
  path
}