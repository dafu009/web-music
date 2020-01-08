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
  singer: {
    detail: {},
    artists: [],
    pageNum: 0,
    pageSize: 20
  },
  recommend: {
    banners: [],
    playList: [],
    playListDetail: {}
  },
  globalEvent: {
    checkShow: false,
    playing: false,
    loading: false,
    globalLoading: false,
    currentIndex: -1,
    drawerShow: false,
    currentMusic: {
      songName: '',
      songUrl: '',
      imgUrl: '',
      artist: '',
      singerId: 0,
      songId: 0,
      lyric: '',
      album: ''
    },
    playList: []
  }
}
export default state