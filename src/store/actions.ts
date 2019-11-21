import { ActionTree } from 'vuex'
import { UserInfoTpyes } from './types'

const actions: ActionTree<UserInfoTpyes, any> = {
  async SET_USERNAME_ASYNC ({ commit, state: UserInfoTpyes }, data: string) {
    commit('setUsername', data)
  },
  async SET_TOKEN_ASYNC ({ commit, state: UserInfoTpyes }, data: string) {
    commit('setToken', data)
  },
  async Login ({ commit, state: UserInfoTpyes }, data: UserInfoTpyes) {
    commit('setUsername', data.username)
    commit('setToken', data.token)
  },
  async Logout ({ commit, state: UserInfoTpyes }) {
    commit('setUsername')
    commit('removeToken')
  }
}
export default actions