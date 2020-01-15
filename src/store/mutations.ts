import { MutationTree } from 'vuex'
import { CONFIG, UserInfo, GlobalEvent, Singer, CurrentMusic, Recommend, Search, SearchParams, CurrentMv, Message } from './types';
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
  async setSingerDetail (state: CONFIG, data) {
    state.singer.detail = data
  },
  async setCurrentIndex (state: CONFIG, value: number) {
    state.globalEvent.currentIndex = value
  },
  async setCurrentSong (state: CONFIG, data: CurrentMusic) {
    state.globalEvent.currentMusic = data
  },
  setCurrentMv (state: CONFIG, data: CurrentMv) {
    state.globalEvent.currentMv = data
  },
  setMvPlayerStatus (state: CONFIG, value) {
    state.globalEvent.mvPlayerStatus = value
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
  async setAlbumDetail (state: CONFIG, data) {
    state.album = data
  },
  async setSearchKeywords (state: CONFIG, value: string) {
    state.search.keywords = value
  },
  async setSearchStatus (state: CONFIG, value: boolean) {
    state.search.status = value
  },
  async setSearchSongs (state: CONFIG, data) {
    state.search.songs.result = data
  },
  setSearchSongsPage (state: CONFIG, value: number) {
    state.search.songs.offset = value
  },
  async setSearchMvs (state: CONFIG, data) {
    state.search.mvs.result = data
  },
  setSearchMvsPage (state: CONFIG, value: number) {
    state.search.mvs.offset = value
  },
  async setSearchArtists (state: CONFIG, data) {
    state.search.artists.result = data
  },
  setSearchArtistsPage (state: CONFIG, value: number) {
    state.search.artists.offset = value
  },
  async setSearchAlbums (state: CONFIG, data) {
    state.search.albums.result = data
  },
  setSearchAlbumsPage (state: CONFIG, value: number) {
    state.search.albums.offset = value
  },
  async setSearchPlayList (state: CONFIG, data) {
    state.search.playLists.result = data
  },
  setSearchPlayListsPage (state: CONFIG, value: number) {
    state.search.playLists.offset = value
  },
  setSearchIsReset (state: CONFIG, value: boolean) {
    state.search.reset = value
  },
  resetSearchAllConfig (state: CONFIG) {
    const model: SearchParams = {
      limit: 10,
      offset: 0,
      result: []
    }
    state.search.reset = true
    state.search.songs = {
      type: 1,
      ...model
    }
    state.search.albums = {
      type: 10,
      ...model
    },
      state.search.artists = {
        type: 100,
        ...model
      },
      state.search.playLists = {
        type: 1000,
        ...model
      },
      state.search.mvs = {
        type: 1004,
        ...model
      }
  },
  setCurrentRank (state: CONFIG, { creator, list, name, desc , cover, updateTime }) {
    state.rank.creator = creator
    state.rank.list = list
    state.rank.name = name
    state.rank.desc = desc
    state.rank.cover = cover
    state.rank.updateTime = updateTime
  },
  setGlobalMessageShow (state: CONFIG, value: boolean) {
    state.globalEvent.message.show = value
    setTimeout(() => {
      state.globalEvent.message.show = false
    }, 1000)
  },
  setGlobalMessage (state: CONFIG, { type, message }: Message) {
    state.globalEvent.message.type = type
    state.globalEvent.message.message = message
  }
}

export default mutations