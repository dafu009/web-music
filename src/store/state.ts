import { CONFIG } from './types'
const state: CONFIG = {
  
  userInfo: {
    username: '',
    nickname: '',
    token: window.sessionStorage.getItem('token'),
    avatar: '',
    introduction: '',
    createTime: '',
    phone: 0,
    birthday: '',
    email: '',
    queryData: {
      exist: false,
      avatar: ''
    }
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
    recentlySearched: window.sessionStorage.getItem('recently-searched') || '[]',
    recentlyPlayedList: window.sessionStorage.getItem('recently-played-list') || '[]',
    isLogin: null,
    checkShow: false,
    checkPass: {
      success: false,
      fail: false
    },
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
    playList: [],
    currentMv: {
      url: '',
      name: '',
      cover: '',
      artist: ''
    },
    mvPlayerStatus: false,
    message: {
      show: false,
      type: '',
      message: ''
    },
    randomImage: {
      path: '',
      rotate: 0
    },
    confirmShow: false,
    checkMail: false
  },
  album: {},
  rank: {
    list: [],
    creator: {},
    name: '',
    desc: '',
    cover: '',
    updateTime: 0
  },
  search: {
    keywords: '',
    status: false,
    reset: false,
    songs: {
      type: 1,
      limit: 10,
      offset: 0,
      result: []
    },
    albums: {
      type: 10,
      limit: 10,
      offset: 0,
      result: []
    },
    artists: {
      type: 100,
      limit: 10,
      offset: 0,
      result: []
    },
    playLists: {
      type: 1000,
      limit: 10,
      offset: 0,
      result: []
    },
    mvs: {
      type: 1004,
      limit: 10,
      offset: 0,
      result: []
    }
  }
}
export default state