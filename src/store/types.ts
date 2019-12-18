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
  playing: false
}

export interface Singer {
  artists: []
}

export interface CONFIG {
  userInfo: UserInfo,
  globalEvent: GlobalEvent,
  singer: Singer
}