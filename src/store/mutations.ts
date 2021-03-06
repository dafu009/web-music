import { MutationTree } from 'vuex'
import { CONFIG, UserInfo, GlobalEvent, Singer, CurrentMusic, Recommend, Search, SearchParams, CurrentMv, Message, UserQuery, CheckEvent, RandomImage } from './types';
import { setPlayedList, setSearchedList } from '@/common/ts/cache'
import { Deduplication } from '@/common/ts/common'
const mutations: MutationTree<CONFIG> = {
  setIsLogin (state: CONFIG, value: boolean) {
    state.globalEvent.isLogin = value
  },
  setRecentlySearchedList (state: CONFIG, keyword: string) {
    const username = state.userInfo.username || '__tourist__'
    let Total: any = state.globalEvent.recentlySearchedList
    let SingleSearchedList = Total[username] || []
    SingleSearchedList.unshift(keyword)
    let rst = new Set(SingleSearchedList)
    state.globalEvent.recentlySearchedList[username] = [...rst]
    setSearchedList(state.globalEvent.recentlySearchedList)
  },
  setRecentlyPlayedList (state: CONFIG, data) {
    const username = state.userInfo.username || '__tourist__'
    let Total: any = state.globalEvent.recentlyPlayedList
    let SingleSearchedList = Total[username] || []
    SingleSearchedList.unshift(data)
    let rst = Deduplication(SingleSearchedList)
    state.globalEvent.recentlyPlayedList[username] = rst
    setPlayedList(state.globalEvent.recentlyPlayedList)
  },
  setUserQueryData (state: CONFIG, { exist, avatar, username }: UserQuery) {
    state.userInfo.queryData.exist = exist
    state.userInfo.queryData.avatar = avatar
    state.userInfo.queryData.username = username
  },
  resetUserInfo (state: CONFIG) {
    state.userInfo.nickname = ''
    state.userInfo.username = ''
    state.userInfo.avatar = ''
    state.userInfo.introduction = ''
    state.userInfo.phone = 0
    state.userInfo.createTime = ''
  },
  setUserInfo (state: CONFIG, {username, avatar, introduction, phone, createTime, nickname, birthday, email }: UserInfo) {
    state.userInfo.nickname = nickname
    state.userInfo.username = username
    state.userInfo.avatar = avatar
    state.userInfo.introduction = introduction
    state.userInfo.phone = phone
    state.userInfo.createTime = createTime
    state.userInfo.birthday = birthday
    state.userInfo.email = email
  },
  setToken (state: CONFIG, value: string) {
    state.userInfo.token = value
    window.sessionStorage.setItem('token', value)
  },
  removeToken (state: CONFIG) {
    state.userInfo.token = null
    window.sessionStorage.removeItem('token')
  },
  setCheckShow (state: CONFIG, value: boolean) {
    state.globalEvent.checkShow = value
  },
  setCheckSuccess (state: CONFIG, value: boolean) {
    state.globalEvent.checkPass.success = value
  },
  setCheckFail (state: CONFIG, value: boolean) {
    state.globalEvent.checkPass.fail = value
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
  setSearchKeywords (state: CONFIG, value: string) {
    state.search.keywords = value
  },
  async setSearchStatus (state: CONFIG, value: boolean) {
    state.search.status = value
  },
  async setSearchSongs (state: CONFIG, data) {
    data.forEach((item: any) => {
      item.al = item.album
      item.ar = item.artists
    })
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
    }, 1500)
  },
  setGlobalMessage (state: CONFIG, { type, message }: Message) {
    state.globalEvent.message.type = type
    state.globalEvent.message.message = message
  },
  setRandomImage (state: CONFIG, data: RandomImage) {
    state.globalEvent.randomImage.path = data.path
    state.globalEvent.randomImage.rotate = data.rotate
  },
  setConfirmShow (state: CONFIG, value: boolean) {
    state.globalEvent.confirmShow = value
  },
  setCheckMail (state: CONFIG, value: boolean) {
    state.globalEvent.checkMail = value
  },
  setIsForget (state: CONFIG, value: boolean) {
    state.globalEvent.isForgot = value
  }
}

export default mutations