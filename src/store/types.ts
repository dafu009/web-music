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
  isPass?: boolean
}
export interface USER {
  userInfo: UserInfo,
  globalEvent: GlobalEvent
}