import { MutationTree } from 'vuex'
import { CONFIG, UserInfo, GlobalEvent, Singer, CurrentMusic, Recommend, Search } from './types';
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
  async setPlaying (state: CONFIG, value: boolean) {
    state.globalEvent.playing = value
  },
  setLoading (state: CONFIG, value: boolean) {
    state.globalEvent.loading = value
  },
  setGlobalLoading (state: CONFIG, value: boolean) {
    state.globalEvent.globalLoading = value
  },
  async setSingerPageNum (state: CONFIG, value: number) {
    state.singer.pageNum = value
  },
  async reSetSingerConfig (state: CONFIG) {
    state.singer.artists = []
    state.singer.pageNum = 0
    state.singer.pageSize = 20
  },
  setSingerList (state: CONFIG, data: []) {
    state.singer.artists = data
  },
  setSingerDetail (state: CONFIG, data: {}) {
    state.singer.detail = data
  },
  async setCurrentIndex (state: CONFIG, value: number) {
    state.globalEvent.currentIndex = value
  },
  async setCurrentSong (state: CONFIG, data: CurrentMusic) {
    state.globalEvent.currentMusic = data   
  },
  async setDrawer (state: CONFIG, value: boolean) {
    state.globalEvent.drawerShow = value
  },
  async setPlayList (state: CONFIG, data) {
    state.globalEvent.playList = data
  },
  async setBanner (state: CONFIG, data: Recommend) {
    state.recommend.banners = data.banners
  },
  async setRecommendPlayList (state: CONFIG, data) {
    state.recommend.playList = data
  },
  setPlayListDetail (state: CONFIG, data) {
    state.recommend.playListDetail = data
  },
  setAlbumDetail (state: CONFIG, data) {
    state.album = data
  },
  async setSearchKeywords (state: CONFIG, value: string) {
    state.search.keywords = value
  },
  async setSearchSongs (state: CONFIG, data) {
    state.search.songs.result = data
  },
  async setSearchMvs (state: CONFIG, data) {
    state.search.mvs.result = data
  },
  async setSearchArtists (state: CONFIG, data) {
    state.search.artists.result = data
  },
  async setSearchAlbums (state: CONFIG, data) {
    state.search.albums.result = data
  },
  async setSearchPlayList (state: CONFIG, data) {
    state.search.playLists.result = data
  }
}

export default mutations