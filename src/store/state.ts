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
    isPass: false,
    checkShow: false
  }
}
export default state