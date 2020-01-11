import BASE_URL from '@/base/config'
const BASE = BASE_URL.music
interface UrlConfig {
  getAlbumDetail: string
}
const path: UrlConfig = {
  getAlbumDetail: `${BASE}/album`
}

export default {
  path
}