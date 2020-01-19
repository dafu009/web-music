import { ActionTree } from 'vuex'
import { CONFIG, Message } from './types'
import { Deduplication } from '@/common/ts/common'
import api from '@/api'
import { ERR_OK } from '@/common/ts/config'
import { AxiosRequestConfig } from 'axios'
interface SearchParams {
  type?: number
  offset?: number
  limit?: number
  keywords?: string
}
function initSearchParams (state: CONFIG, genre: string) {
  let data: SearchParams = {}
  data.type = state.search[genre].type
  data.limit = state.search[genre].limit
  data.offset = state.search[genre].offset
  data.keywords = state.search.keywords
  return {
    params: {
      type: data.type,
      offset: data.offset,
      limit: data.limit,
      keywords: data.keywords
    }
  }
}

const actions: ActionTree<CONFIG, any> = {
  async GetArtistList ({ commit, dispatch, state }, { isTop, cat }) {
    let requestConfig: AxiosRequestConfig = {
      params: {
        offset: state.singer.pageNum * state.singer.pageSize,
        limit: state.singer.pageSize
      }
    }
    let method = null
    if (isTop) {
      method = api.singer.getTopArtistList
    } else {
      method = api.singer.getArtistList
      requestConfig.params.cat = cat
    }
    await method(requestConfig)
      .then(({ code, artists }) => {
        if (code === ERR_OK) {
          commit('setSingerList', artists)
          commit('setLoading', false)
          commit('setGlobalLoading', false)
        }
      })
      .catch(() => {
        dispatch('GetArtistList', { isTop, cat })
      })
  },
  async GetArtistDetail ({ commit, dispatch }, id) {
    await Promise.all([
      api.singer.getAlbum({ params: { id } }),
      api.singer.getArtistDetail({ params: { id } })
    ]).then(
      (
        [
          { code: req_code_1, hotAlbums },
          { code: req_code_2, hotSongs, artist }
        ]
      ) => {
        if (req_code_1 === ERR_OK && req_code_2 === ERR_OK) {
          if (hotSongs.length > 20) hotSongs.splice(20, 50)
          if (hotAlbums.length > 20) hotAlbums.splice(20, 50)
          const detail = { ...artist, hotSongs, hotAlbums }
          commit('setSingerDetail', detail)
        }
      })
      .catch(() => {
        dispatch('GetArtistDetail', id)
      })
  },
  async GetCurrentMusic ({ commit, dispatch, state }, obj: any) {
    Promise.all([
      api.song.getSongUrl({ params: { id: obj.item.songId } }),
      api.song.getLyric({ params: { id: obj.item.songId } })
    ])
      .then(async ([{ code: reqCode_1, data: [{ url }] }, { code: reqCode_2, lrc: { lyric } }]) => {
        if (reqCode_1 === ERR_OK && reqCode_2 === ERR_OK) {
          if (!url) {
            state.globalEvent.playList[obj.index].disable = true
            dispatch('setGlobalMessage', { type: 'error', message: '没有音源,自动跳过' })
            state.globalEvent.currentIndex++
            return
          }
          commit('setCurrentSong', { songUrl: url, lyric, ...obj.item })
          commit('setPlaying', true)
          let list = JSON.parse(state.globalEvent.recentlyPlayedList)
          list.push(state.globalEvent.currentMusic)
          list = Deduplication(list.reverse())
          let value = JSON.stringify(list)
          window.sessionStorage.setItem('recently-played-list', value)
          commit('setRecentlyPlayedList', value)
        }
      })
      .catch(() => {
        dispatch('GetCurrentMusic', obj.item)
      })
  },
  async getCurrentMv ({ commit, dispatch }, { id, name, artistName, cover }) {
    api.mv.getMvUrl({ params: { id } })
      .then(data => {
        if (data.code === ERR_OK) {
          commit('setCurrentMv', { url: data.data.url, name, cover, artist: artistName })
        }
      })
      .catch(() => {
        dispatch('getCurrentMv', { id, name, cover, artistName })
      })
  },
  async getBanner ({ commit, dispatch }) {
    api.recommend.getBanner()
      .then((data) => {
        if (data.code === ERR_OK) {
          commit('setBanner', data)
        }
      })
      .catch(() => {
        dispatch('getBanner')
      })
  },
  async getRecommendPlayList ({ commit, dispatch }) {
    const requestConfig: AxiosRequestConfig = {
      params: {
        limit: 40
      }
    }
    api.recommend.getRecommendPlayList(requestConfig)
      .then(({ code, result }) => {
        if (code === ERR_OK) {
          commit('setRecommendPlayList', result)
        }
      })
      .catch(() => {
        dispatch('getRecommendPlayList')
      })
  },
  async getPlayListDetail ({ commit, dispatch }, id: number) {
    await api.song.getPlayListDetail({ params: { id } })
      .then(({ playlist, code }) => {
        if (code === ERR_OK) {
          const {
            coverImgUrl: picUrl,
            description: desc,
            tags,
            tracks,
            name,
            id
          } = playlist
          commit('setPlayListDetail', {
            id,
            name,
            tags,
            tracks,
            desc,
            picUrl
          })
        }
      })
      .catch(() => {
        dispatch('getPlayListDetail', id)
      })
  },
  async getAlbumDetail ({ commit, dispatch }, id: number) {
    await api.album.getAlbumDetail({ params: { id } })
      .then(({ code, songs, album }) => {
        if (code === ERR_OK) {
          commit('setAlbumDetail', { songs, album })
        }
      })
      .catch(() => {
        dispatch('getAlbumDetail', id)
      })
  },
  async getSearchSongs ({ commit, dispatch, state }) {
    const genre: string = 'songs'
    const requestConfig: AxiosRequestConfig = initSearchParams(state, genre)
    api.search.monolayer(requestConfig)
      .then(({ result }) => {
        commit('setSearchSongs', result.songs)
      })
      .catch(err => {
        dispatch('getSearchSongs')
      })
  },
  async getSearchArtists ({ commit, dispatch, state }) {
    const genre: string = 'artists'
    const requestConfig: AxiosRequestConfig = initSearchParams(state, genre)
    api.search.monolayer(requestConfig)
      .then(({ result }) => {
        commit('setSearchArtists', result.artists)
      })
      .catch(err => {
        dispatch('getSearchArtists')
      })
  },
  async getSearchAlbums ({ commit, dispatch, state }) {
    const genre: string = 'albums'
    const requestConfig: AxiosRequestConfig = initSearchParams(state, genre)
    api.search.monolayer(requestConfig)
      .then(({ result }) => {
        commit('setSearchAlbums', result.albums)
      })
      .catch(err => {
        dispatch('getSearchAlbums')
      })
  },
  async getSearchPlaylist ({ commit, dispatch, state }) {
    const genre: string = 'playLists'
    const requestConfig: AxiosRequestConfig = initSearchParams(state, genre)
    api.search.monolayer(requestConfig)
      .then(({ result }) => {
        commit('setSearchPlayList', result.playlists)
      })
      .catch(err => {
        dispatch('getSearchPlaylist')
      })
  },
  async getSearchMv ({ commit, dispatch, state }) {
    const genre: string = 'mvs'
    const requestConfig: AxiosRequestConfig = initSearchParams(state, genre)
    api.search.monolayer(requestConfig)
      .then(({ result }) => {
        commit('setSearchMvs', result.mvs)
      })
      .catch(err => {
        dispatch('getSearchMv')
      })
  },

  async getTopRank ({ commit, dispatch }, idx: number) {
    api.rank.getTopRank({ params: { idx } })
      .then(({ code, playlist }) => {
        if (code === ERR_OK) {
          commit('setCurrentRank', {
            creator: playlist.creator,
            list: playlist.tracks,
            name: playlist.name,
            desc: playlist.description,
            cover: playlist.coverImgUrl,
            updateTime: playlist.trackUpdateTime
          })
        }
      })
      .catch(() => {
        dispatch('getTopRank', idx)
      })
  },

  setGlobalMessage ({ commit, }, { type, message }: Message) {
    commit('setGlobalMessage', { type, message })
    commit('setGlobalMessageShow', true)
  },

  async queryUser ({ commit, dispatch }, username: string) {
    await api.user.queryUser({ params: { username } })
      .then(({ success, data, exist }) => {
        if (success) {
          commit('setUserQueryData', { ...data, exist })
        }
      })
      .catch(() => {
        dispatch('queryUser', username)
      })
  },
  async Register ({ commit }, data) {
    let rst = {
      success: false,
      type: '',
      message: ''
    }
    await api.user.register({
      method: 'POST',
      data
    })
      .then(({ success, message }) => {
        rst.type = success ? 'success' : 'error'
        rst.message = message
        rst.success = success
      })
      .catch(err => {
        console.log(err)
      })
    return rst
  },
  async Login ({ commit, dispatch }, data) {
    let rst = {
      type: '',
      message: '',
      success: false
    }
    await api.user.login({
      method: 'POST',
      data
    })
      .then(({ token, success, message }) => {
        if (success) {
          commit('setToken', token)
          dispatch('getLoginStatus')
        }
        rst.type = success ? 'success' : 'error'
        rst.message = message
        rst.success = success
      })
      .catch(err => {
        console.log(err)
      })
    return rst
  },
  async Update ({ commit, dispatch }, data) {
    await api.user.update({
      method: 'PUT', data: {
        ...data
      }
    })
      .then(async ({ success, message }) => {
        await dispatch('getLoginStatus')
        dispatch('setGlobalMessage', { type: success ? 'success' : 'error', message })
      })
  },
  async Logout ({ commit, dispatch }) {
    commit('setIsLogin', false)
    commit('resetUserInfo')
    commit('removeToken')
    dispatch('setGlobalMessage', { type: 'success', message: '退出成功' })
  },
  async getLoginStatus ({ commit, state }) {
    let message = ''
    let isLogin = false
    await api.user.getUserInfo()
      .then(({ success, code, data }) => {
        if (success && code === ERR_OK) {
          commit('setUserInfo', data.userInfo)
        }
        commit('setIsLogin', data.isLogin)
        message = data.message
        isLogin = data.isLogin
      })
      .catch(err => {
        console.log(err)
      })
    return { message, isLogin }
  },
  async getRandomImg ({ commit, dispatch }) {
    await api.image.getRandomImage()
      .then(({ success, data }) => {
        if (success) {
          commit('setRandomImage', data)
        }
      })
      .catch(() => { })
  },
  async checkImagePass ({ commit }, rotate: number) {
    await api.image.checkImage({ params: { rotate } })
      .then(({ success }) => {
        if (success) {
          commit('setCheckSuccess', true)
        } else {
          commit('setCheckFail', true)
        }
      })
  },
  async resetCheckStatus ({ commit }) {
    commit('setCheckSuccess', false)
    commit('setCheckFail', false)
  }
}
export default actions