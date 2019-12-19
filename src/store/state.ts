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
    globalLoading: false
  },
  singer: {
    detail: {},
    artists: [],
    pageNum: 0,
    pageSize: 20
  }
}
export default state