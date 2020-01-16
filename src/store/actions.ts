import { ActionTree } from 'vuex'
import { CONFIG } from './types';
import state from './state';
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
  async GetArtistList ({ commit, dispatch, state: CONFIG }, { isTop, cat }) {
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
  async GetCurrentMusic ({ commit, dispatch, state: CONFIG }, obj: any) {
    Promise.all([
      api.song.getSongUrl({ params: { id: obj.item.songId } }),
      api.song.getLyric({ params: { id: obj.item.songId } })
    ])
      .then(async ([{ code: reqCode_1, data: [{ url }] }, { code: reqCode_2, lrc: { lyric } }]) => {
        if (reqCode_1 === ERR_OK && reqCode_2 === ERR_OK) {
          if (!url) {
            state.globalEvent.playList[obj.index].disable = true
            commit('setGlobalMessage', { type: 'error', message: '没有音源,自动跳过' })
            commit('setGlobalMessageShow', true)
            state.globalEvent.currentIndex++
            return
          }
          commit('setCurrentSong', { songUrl: url, lyric, ...obj.item })
          commit('setPlaying', true)
        }
      })
      .catch(() => {
        dispatch('GetCurrentMusic', obj.item)
      })
  },
  async getCurrentMv ({ commit, dispatch, state: CONFIG }, { id, name, artistName, cover }) {
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
  async getBanner ({ commit, dispatch, state: CONFIG }) {
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
  async getRecommendPlayList ({ commit, dispatch, state: CONFIG }) {
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
  async getPlayListDetail ({ commit, dispatch, state: CONFIG }, id: number) {
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
  async getAlbumDetail ({ commit, dispatch, state: CONFIG }, id: number) {
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
  async getSearchSongs ({ commit, dispatch, state: CONFIG }) {
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
  async getSearchArtists ({ commit, dispatch, state: CONFIG }) {
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
  async getSearchAlbums ({ commit, dispatch, state: CONFIG }) {
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
  async getSearchPlaylist ({ commit, dispatch, state: CONFIG }) {
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
  async getSearchMv ({ commit, dispatch, state: CONFIG }) {
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

  async getTopRank ({ commit, dispatch, state: CONFIG }, idx: number) {
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

  async queryUser ({ commit, dispatch, state }, username: string) {
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
  async SET_CONFIGINFO ({ commit }, data: CONFIG) {
    commit('setUserInfo', data.userInfo)
  },
  async SET_TOKEN ({ commit }, data: string) {
    commit('setToken', data)
  },
  async Register ({ commit }, data) {
    api.user.register({ method: 'POST', data })
  },
  async Login ({ commit }, data: CONFIG) {
    const { userInfo } = data
    commit('setUserInfo', userInfo)
    commit('setToken', userInfo.token)
  },
  async Logout ({ commit }) {
    commit('resetUserInfo')
    commit('removeToken')
  },
}
export default actions