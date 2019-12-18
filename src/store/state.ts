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
    playing: false
  },
  singer: {
    artists: []
  }
}
export default state