import { MutationTree } from 'vuex'
import { UserInfoTpyes } from './types'

const mutations: MutationTree<UserInfoTpyes> = {
  setUsername (state: UserInfoTpyes, data: string) {
    state.username = data
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