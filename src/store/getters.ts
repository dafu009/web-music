import { GetterTree } from 'vuex'
import { USER } from './types'

const getter: GetterTree<USER, any> = {
  username: (state: USER) => state.userInfo.username,
  token: (state: USER) => state.userInfo.token
}

export default getter