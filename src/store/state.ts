import { CONFIG } from './types';
const state: CONFIG = {
  userInfo: {
    username: '',
    token: window.sessionStorage.getItem('token'),
    avatar: '',
    introduction: '',
    createTime: '',
    phone: 0,
  },
  globalEvent: {
    checkShow: false,
    playing: false,
    loading: false,
    globalLoading: false,
    currentIndex: 0,
    currentMusic: {
      songName: '',
      songUrl: '',
      imgUrl: '',
      artist: '',
      singerId: 0,
      songId: 0,
      lyric: ''
    },
    playList: []
  },
  singer: {
    detail: {},
    artists: [],
    pageNum: 0,
    pageSize: 20
  }
}
export default state