export interface UserInfo {
  username: string,
  avatar: string,
  createTime: string,
  introduction: string,
  phone: number,
  token?: string | null
}
export interface USER {
  userInfo: UserInfo
}