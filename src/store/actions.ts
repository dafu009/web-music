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
  async GetArtistList ({ commit, state: CONFIG }, { isTop, cat }) {
    let requestConfig: any= {
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
      requestConfig.params.cat  = cat
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
  async getBanner ({ commit, state: CONFIG }) {
    api.recommend.getBanner()
      .then((data) => {
        if (data.code === ERR_OK) {
          commit('setBanner', data)
        }
      })
      .catch(
        () => {
          api.recommend.getBanner().then((data) => {
            if (data.code === ERR_OK) {
              commit('setBanner', data)
            }
          })
        }
      )
  },
  async getRecommendPlayList ({commit, state: CONFIG}) {
    api.recommend.getRecommendPlayList()
      .then(data => {
        if (data.code === ERR_OK) {
          commit('setRecommendPlayList', data.result)
        }
      })
      .catch(() => {
        api.recommend.getRecommendPlayList()
          .then(data => {
            if (data.code === ERR_OK) {
              commit('setRecommendPlayList', data.result)
            }
          })
      })
  }
}
export default actions