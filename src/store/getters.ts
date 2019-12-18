import { GetterTree } from 'vuex'
import { CONFIG } from './types'

const getter: GetterTree<CONFIG, any> = {
  username: (state: CONFIG) => state.userInfo.username,
  token: (state: CONFIG) => state.userInfo.token
}

export default getter