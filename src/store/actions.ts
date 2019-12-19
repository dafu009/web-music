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
  async GetTopArtistList ({ commit, state: CONFIG }, params) {
    let requestConfig = {
      params: {
        offset: state.singer.pageNum * state.singer.pageSize,
        limit: state.singer.pageSize,
      }
    }
    const { code, artists } = await api.singer.getTopArtistList(requestConfig)
    if (code === ERR_OK) {
      commit('setSingerList', artists)
    }
  },
  async GetArtistList ({ commit, state: CONFIG }, { cat }) {
    let requestConfig = {
      params: {
        cat,
        offset: state.singer.pageNum * state.singer.pageSize,
        limit: state.singer.pageSize,
      }
    }
    const { code, artists } = await api.singer.getArtistList(requestConfig)
    if (code === ERR_OK) {
      commit('setSingerList', artists)
    }
  },
  async GetArtistDetail ({ commit, state: CONFIG }, id) {
    const { code, hotSongs, artist } = await api.singer.getArtistDetail({
      params: {
        id
      }
    })
    if (hotSongs.length > 20) hotSongs.splice(20, 50)
    const detail = {...artist, hotSongs }
    commit('setSingerDetail', detail)
  }
}
export default actions