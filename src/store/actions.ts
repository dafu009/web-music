import { ActionTree } from 'vuex'
import { UserInfoTpyes } from './types'

const actions: ActionTree<UserInfoTpyes, any> = {
  async SET_USERINFO ({ commit, state: UserInfoTpyes }, data: UserInfoTpyes) {
    commit('setUserInfo', data)
  },
  async SET_TOKEN ({ commit, state: UserInfoTpyes }, data: string) {
    commit('setToken', data)
  },
  async Login ({ commit, state: UserInfoTpyes }, data: UserInfoTpyes) {
    commit('setUserInfo', data)
    commit('setToken', data.token)
  },
  async Logout ({ commit, state: UserInfoTpyes }) {
    commit('setUserInfo')
    commit('removeToken')
  }
}
export default actions