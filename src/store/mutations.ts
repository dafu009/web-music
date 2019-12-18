import { MutationTree } from 'vuex'
import { CONFIG, UserInfo, GlobalEvent, Singer } from './types';
import state from './state';

const mutations: MutationTree<CONFIG> = {
  resetUserInfo (state: CONFIG) {
    const userinfo = state.userInfo
    userinfo.username = ''
    userinfo.avatar = ''
    userinfo.introduction = ''
    userinfo.phone = 0
    userinfo.createTime = ''
  },
  setUserInfo (state: CONFIG, data: UserInfo) {
    const userinfo = state.userInfo
    userinfo.username = data.username
    userinfo.avatar = data.avatar
    userinfo.introduction = data.introduction
    userinfo.phone = data.phone
    userinfo.createTime = data.createTime
  },
  setToken (state: CONFIG, data: string) {
    state.userInfo.token = data
    window.sessionStorage.setItem('token', data)
  },
  removeToken (state: CONFIG) {
    state.userInfo.token = null
    window.sessionStorage.removeItem('token')
  },
  setGlobalEvent (state: CONFIG, data: GlobalEvent) {
    const globalEvent = state.globalEvent
    globalEvent.checkShow = data.checkShow || false
  },
  setPlaying (state: CONFIG, data: GlobalEvent) {
    state.globalEvent.playing = data.playing || false
  },
  setSingerList (state: CONFIG, data: Singer) {
    state.singer.artists = data.artists
  }
}

export default mutations