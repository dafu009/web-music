import { USER } from './types';
const state: USER = {
  userInfo: {
    username: '',
    token: window.sessionStorage.getItem('token'),
    avatar: '',
    introduction: '',
    createTime: '',
    phone: 0
  }
}
export default state