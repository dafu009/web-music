import BASE_URL from '@/base/config'
const BASE = BASE_URL.music


interface UrlConfig {
  /** 获取歌手分类列表 */
  getArtistList: string
  /** 获取热门歌手列表 */
  getTopArtistList: string
  /** 获取歌手详情 */
  getArtistDetail: string
  getAlbum: string
}

const path: UrlConfig = {
  getArtistList: `${BASE}/artist/list`,
  getTopArtistList: `${BASE}/top/artists`,
  getArtistDetail: `${BASE}/artists`,
  getAlbum: `${BASE}/artist/album`
} 

export default {
  path
}