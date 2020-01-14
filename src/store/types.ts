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
export interface CurrentMv {
  url: string
  name: string
  cover: string
  artist: string
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
  currentMv: CurrentMv
  mvPlayerStatus: boolean
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
  album: {}
  rank: Rank
}
export interface SearchParams {
  type?: number
  limit: number
  offset: number
  result: []
}
export interface Search {
  [key: string]: any
  keywords: string
  status: boolean
  reset: boolean
  songs: SearchParams
  artists: SearchParams
  albums: SearchParams
  mvs: SearchParams
  playLists: SearchParams
}

export interface Rank {
  list: []
  creator: {}
  name: string
  desc: string
}