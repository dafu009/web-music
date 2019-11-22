export interface USER {
  userInfo: object
}
export interface UserInfo {
  username: string,
  avatar: string,
  create_time: string,
  introduction: string,
  phone: number,
  token?: string | null
}