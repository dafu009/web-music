import BASE_URL from '@/base/config'
const BASE = BASE_URL.music

interface UrlConfig {
  getBanner: string
  getRecommendPlayList: string
  getRecommendMv: string
  getRecommendNewSong: string
}

const path: UrlConfig = {
  /**获取PC端banner图 */
  getBanner: `${BASE}/banner?type=0`,

  /**获取推荐歌单 */
  getRecommendPlayList: `${BASE}/personalized`,

  /**获取推荐MV */
  getRecommendMv: `${BASE}/personalized/mv`,

  /**获取推荐新歌 */
  getRecommendNewSong:`${BASE}/personalized/newsong`

}

export default {
  path
}