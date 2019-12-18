import BASE_URL from '@/base/config'
interface UrlConfig {
  getSongUrl: string,
  getLyric: string
}
const BASE = BASE_URL.music
const path: UrlConfig = {
  getLyric: `${BASE}/lyric`,
  getSongUrl: `${BASE}/song/url`
}

export default {
  path
}