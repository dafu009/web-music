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
  },
  async GetArtistList ({ commit, state: CONFIG }, { isTop, cat }) {
    let requestConfig: AxiosRequestConfig = {
      params: {
        offset: state.singer.pageNum * state.singer.pageSize,
        limit: state.singer.pageSize
      }
    }
    let method = null
    let flag = false
    if (isTop) {
      method = api.singer.getTopArtistList
    } else {
      method = api.singer.getArtistList
      requestConfig.params.cat = cat
    }
    await method(requestConfig)
      .then((data) => {
        flag = true
        if (data.code === ERR_OK) {
          commit('setSingerList', data.artists)
        }
      })
      .catch(() => {
        flag = false
      })
    return new Promise((resolve, reject) => {
      if (flag) {
        resolve(flag)
      } else {
        resolve(flag)
      }
    })
  },
  async GetArtistDetail ({ commit, state: CONFIG }, id) {
    const { code, hotSongs, artist } = await api.singer.getArtistDetail({
      params: {
        id
      }
    })
    if (hotSongs.length > 20) hotSongs.splice(20, 50)
    const detail = { ...artist, hotSongs }
    commit('setSingerDetail', detail)
  },
  async GetCurrentMusic ({ commit, state: CONFIG }, ID) {
    const { data } = await api.song.getSongUrl({
      params: {
        id: ID
      }
    })
    const { lrc: { lyric } } = await api.song.getLyric({
      params: {
        id: ID
      }
    })
    const [{ url }] = data
    const songUrl = url
    const CurrentMusic = {
      songUrl,
      lyric
    }
    return CurrentMusic
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
      .then(data => {
        if (data.code === ERR_OK) {
          commit('setRecommendPlayList', data.result)
        }
      })
      .catch(() => {
        dispatch('getRecommendPlayList')
      })
  },
  async getPlayListDetail ({ commit, state: CONFIG }, id: number) {
    const { playlist, code } = await api.song.getPlayListDetail({
      params: {
        id
      }
    })
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
  },
  async getAlbumDetail ({ commit, dispatch, state: CONFIG }, id: number) {
    const { code, songs, album } = await api.album.getAlbumDetail({ params: { id } })
    if (code === ERR_OK) {
      commit('setAlbumDetail', { songs, album })
    }
  },
  async getSearchSongs ({ commit, dispatch, state: CONFIG }) {
    const genre: string = 'songs'
    const requestConfig: AxiosRequestConfig = initSearchParams(state, genre)
    api.search.monolayer(requestConfig)
      .then(data => {
        commit('setSearchSongs', data.result.songs)
      })
      .catch(err => {
        dispatch('getSearchSongs')
      })
  },
  async getSearchArtists ({ commit, dispatch, state: CONFIG }) {
    const genre: string = 'artists'
    const requestConfig: AxiosRequestConfig = initSearchParams(state, genre)
    api.search.monolayer(requestConfig)
      .then(data => {
        commit('setSearchArtists', data.result.artists)
      })
      .catch(err => {
        dispatch('getSearchArtists')
      })
  },
  async getSearchAlbums ({ commit, dispatch, state: CONFIG }) {
    const genre: string = 'albums'
    const requestConfig: AxiosRequestConfig = initSearchParams(state, genre)
    api.search.monolayer(requestConfig)
      .then(data => {
        commit('setSearchAlbums', data.result.albums)
      })
      .catch(err => {
        dispatch('getSearchAlbums')
      })
  },
  async getSearchPlaylist ({ commit, dispatch, state: CONFIG }) {
    const genre: string = 'playLists'
    const requestConfig: AxiosRequestConfig = initSearchParams(state, genre)
    api.search.monolayer(requestConfig)
      .then(data => {
        commit('setSearchPlayList', data.result.playlists)
      })
      .catch(err => {
        dispatch('getSearchPlaylist')
      })
  },
  async getSearchMv ({ commit, dispatch, state: CONFIG }) {
    const genre: string = 'mvs'
    const requestConfig: AxiosRequestConfig = initSearchParams(state, genre)
    api.search.monolayer(requestConfig)
      .then(data => {
        commit('setSearchMvs', data.result.mvs)
      })
      .catch(err => {
        dispatch('getSearchMv')
      })
  },

  async getTopRank ({ commit, dispatch, state: CONFIG }, idx: number) {
    api.rank.getTopRank({ params: { idx } })
      .then(data => {
        if (data.code === ERR_OK) {
          commit('setCurrentRank', {
            creator: data.playlist.creator,
            list: data.playlist.tracks,
            name: data.playlist.name,
            desc: data.playlist.description
          })
        }
      })
      .catch(() => {
        dispatch('getTopRank', idx)
      })
  }
}
export default actions