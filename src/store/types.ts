export interface UserInfo {
  username: string,
  avatar: string,
  createTime: string,
  introduction: string,
  phone: number,
  token?: string | null
}

export interface GlobalEvent {
  checkShow?: boolean,
  playing: boolean,
  loading: boolean,
  globalLoading: boolean
}

export interface Singer {
  artists: [],
  pageNum: number,
  pageSize: number
}

export interface CONFIG {
  userInfo: UserInfo,
  globalEvent: GlobalEvent,
  singer: Singer
}