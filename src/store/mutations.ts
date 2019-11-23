import { MutationTree } from 'vuex'
import { USER, UserInfo, GlobalEvent } from './types';
import state from './state';

const mutations: MutationTree<USER> = {
  resetUserInfo (state: USER) {
    const userinfo = state.userInfo
    userinfo.username = ''
    userinfo.avatar = ''
    userinfo.introduction = ''
    userinfo.phone = 0
    userinfo.createTime = ''
  },
  setUserInfo (state: USER, data: UserInfo) {
    const userinfo = state.userInfo
    userinfo.username = data.username
    userinfo.avatar = data.avatar
    userinfo.introduction = data.introduction
    userinfo.phone = data.phone
    userinfo.createTime = data.createTime
  },
  setToken (state: USER, data: string) {
    state.userInfo.token = data
    window.sessionStorage.setItem('token', data)
  },
  removeToken (state: USER) {
    state.userInfo.token = null
    window.sessionStorage.removeItem('token')
  },
  setGlobalEvent (state: USER, data: GlobalEvent) {
    const globalEvent = state.globalEvent
    globalEvent.checkShow = data.checkShow
    globalEvent.isPass = data.isPass
  },
}

export default mutations