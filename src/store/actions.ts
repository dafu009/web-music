import { ActionTree } from 'vuex'
import { CONFIG } from './types';
import state from './state'
import api from '@/api'
import { ERR_OK } from '@/common/ts/config';

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
  async GetTopArtistList ({ commit, state: CONFIG }, { root }) {
    commit('setGlobalLoading', true)
    let requestConfig = {
      params: {
        offset: state.singer.pageNum * state.singer.pageSize,
        limit: state.singer.pageSize,
      }
    }
    await api.singer.getTopArtistList(requestConfig)
      .then(data => {
        if (data.code === ERR_OK) {
          commit('setSingerList', data.artists)
        }
      })
      .catch(() => {
        root.$message({
          type: 'error',
          message: '数据请求失败请重试'
        })
        commit('setGlobalLoading', false)
      })
    commit('setGlobalLoading', false)
  },
  async GetArtistList ({ commit, state: CONFIG }, { cat, root }) {
    commit('setGlobalLoading', true)
    let requestConfig = {
      params: {
        cat,
        offset: state.singer.pageNum * state.singer.pageSize,
        limit: state.singer.pageSize,
      }
    }
    await api.singer.getArtistList(requestConfig)
      .then(data => {
        if (data.code === ERR_OK) {
          commit('setSingerList', data.artists)
        }
      })
      .catch(() => {
        root.$message({
          type: 'error',
          message: '数据请求失败请重试'
        })
        commit('setGlobalLoading', false)
      })
    commit('setGlobalLoading', false)

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
    const { songs, code: code1 } = await api.song.getSongDetail({
      params: {
        ids: ID
      }
    })
    const { data, code: code2 } = await api.song.getSongUrl({
      params: {
        id: ID
      }
    })
    const { lrc: { lyric } } = await api.song.getLyric({
      params: {
        id: ID
      }
    })
    const [{ id, name, al, ar }] = songs
    const [{ url }] = data
    const imgUrl = al.picUrl
    const album = al.name
    const [singer] = ar
    const songName = name
    const songUrl = url
    const songId = id
    const artist = singer.name
    const singerId = singer.id
    const CurrentMusic = {
      imgUrl,
      artist,
      songName,
      songUrl,
      songId,
      singerId,
      lyric,
      album
    }
    if (code1 === ERR_OK && code2 === ERR_OK) {
      return CurrentMusic
    }
  }
}
export default actions