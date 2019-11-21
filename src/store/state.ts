import { UserInfoTpyes } from './types';
const state: UserInfoTpyes = {
  username: '',
  token: window.sessionStorage.getItem('token')
}
export default state