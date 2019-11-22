import { ActionTree } from 'vuex'
import { USER } from './types'

const actions: ActionTree<USER, any> = {
  async SET_USERINFO ({ commit, state: USER }, data: USER) {
    commit('setUserInfo', data.userInfo)
  },
  async SET_TOKEN ({ commit, state: USER }, data: string) {
    commit('setToken', data)
  },
  async Login ({ commit, state: USER }, data: USER) {
    const { userInfo } = data
    commit('setUserInfo', userInfo)
    commit('setToken', userInfo.token)
  },
  async Logout ({ commit, state: USER }) {
    commit('resetUserInfo')
    commit('removeToken')
  }
}
export default actions