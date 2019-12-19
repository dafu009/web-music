import BASE_URL from '@/base/config'
const BASE = BASE_URL.music
interface UrlConfig {
  getSongUrl: string,
  getLyric: string,
  getSongDetail: string
}
const path: UrlConfig = {
  getLyric: `${BASE}/lyric`,
  getSongUrl: `${BASE}/song/url`,
  getSongDetail: `${BASE}/song/detail`
}

export default {
  path
}