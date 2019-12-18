import { USER } from './types';
const state: USER = {
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
  }
}
export default state