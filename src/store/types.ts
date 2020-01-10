export interface UserInfo {
  username: string
  avatar: string
  createTime: string
  introduction: string
  phone: number
  token?: string | null
}

export interface CurrentMusic {
  songName: string
  songUrl: string
  imgUrl: string
  artist: string
  singerId: number
  songId: number
  lyric: string
  album: string
}

export interface GlobalEvent {
  checkShow?: boolean
  drawerShow: boolean
  playing: boolean
  loading: boolean
  globalLoading: boolean
  currentIndex: number
  currentMusic: CurrentMusic
  playList: CurrentMusic[]
}

export interface Singer {
  detail: {}
  artists: []
  pageNum: number
  pageSize: number
}

export interface Recommend {
  banners: []
  playList: []
  playListDetail: {}
}

export interface CONFIG {
  userInfo: UserInfo
  globalEvent: GlobalEvent
  singer: Singer
  recommend: Recommend
  search: Search
}
export interface SearchParams {
  type: number
  limit: number
  offset: number
  result: []
}
export interface Search {
  [key: string]: any
  keywords: string
  songs: SearchParams
  artists: SearchParams
  albums: SearchParams
  mvs: SearchParams
  playLists: SearchParams
}