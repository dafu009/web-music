import { MutationTree } from 'vuex'
import { USER, UserInfo } from './types'

const mutations: MutationTree<USER> = {
  setUserInfo (state: USER, data: UserInfo) {
    state.userInfo.username = data.username
    state.avatar = data.avatar
    state.introduction = data.introduction
    state.phone = data.phone
    state.create_time = data.create_time
  },
  setToken (state: UserInfoTpyes, data: string) {
    state.token = data
    window.sessionStorage.setItem('token', data)
  },
  removeToken (state: UserInfoTpyes) {
    state.token = null
    window.sessionStorage.removeItem('token')
  }
}

export default mutations