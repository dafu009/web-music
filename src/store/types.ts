export interface UserQuery {
  avatar: string
  exist: boolean
  username?: string
}
export interface CheckEvent {
  success: boolean
  fail: boolean
}
export interface UserInfo {
  username: string
  nickname: string
  avatar: string
  createTime: string
  introduction: string
  birthday: string
  phone: number
  token: string | null
  queryData: UserQuery
  email: string
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
  disable?: boolean
}
export interface CurrentMv {
  url: string
  name: string
  cover: string
  artist: string
}
export interface RandomImage {
  path: string
  rotate: number
}

export interface storage {
  [key: string]: any
} 
export interface GlobalEvent {
  recentlyPlayedList: storage
  recentlySearchedList: storage
  isLogin: boolean | null
  checkShow: boolean
  checkPass: CheckEvent
  drawerShow: boolean
  playing: boolean
  loading: boolean
  globalLoading: boolean
  currentIndex: number
  currentMusic: CurrentMusic
  playList: CurrentMusic[]
  currentMv: CurrentMv
  mvPlayerStatus: boolean
  message: Message
  randomImage: RandomImage
  confirmShow: boolean
  checkMail: boolean
  isForgot: boolean
}
export interface Message {
  show: boolean
  type: string
  message: string
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
  cover: string
  updateTime: number
}