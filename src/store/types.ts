export interface UserInfo {
  username: string,
  avatar: string,
  createTime: string,
  introduction: string,
  phone: number,
  token?: string | null
}

export interface CurrentMusic {
  songName: string,
  songUrl: string,
  imgUrl: string,
  artist: string,
  singerId: number,
  songId: number
}

export interface GlobalEvent {
  checkShow?: boolean,
  playing: boolean,
  loading: boolean,
  globalLoading: boolean,
  currentMusic: CurrentMusic
}

export interface Singer {
  detail: {},
  artists: [],
  pageNum: number,
  pageSize: number
}

export interface CONFIG {
  userInfo: UserInfo,
  globalEvent: GlobalEvent,
  singer: Singer
}