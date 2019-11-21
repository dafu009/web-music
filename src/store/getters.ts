import { GetterTree } from 'vuex'
import { UserInfoTpyes } from './types'

const getter: GetterTree<UserInfoTpyes, any> = {
  username: (state: UserInfoTpyes) => state.username,
  token: (state: UserInfoTpyes) => state.token
}

export default getter