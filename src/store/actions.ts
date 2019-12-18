import { ActionTree } from 'vuex'
import { CONFIG } from './types'

const actions: ActionTree<CONFIG, any> = {
  async SET_CONFIGINFO ({ commit, state: CONFIG }, data: CONFIG) {
    commit('setUserInfo', data.userInfo)
  },
  async SET_TOKEN ({ commit, state: CONFIG }, data: string) {
    commit('setToken', data)
  },
  async Login ({ commit, state: CONFIG }, data: CONFIG) {
    const { userInfo } = data
    commit('setUserInfo', userInfo)
    commit('setToken', userInfo.token)
  },
  async Logout ({ commit, state: CONFIG }) {
    commit('resetUserInfo')
    commit('removeToken')
  }
}
export default actions