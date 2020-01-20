<template lang="pug">
.user
  user-info
  recently-searched
  recently-played
</template>
<script lang="ts">
import UserInfo from './userInfo/index.vue'
import RecentlyPlayed from './recently-played/index.vue'
import RecentlySearched from './recently-searched/index.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { CONFIG } from '@/store/types'
@Component({
  components: {
    UserInfo,
    RecentlyPlayed,
    RecentlySearched
  }
})
export default class user extends Vue {
  @State((state: CONFIG) => state.globalEvent.isLogin) isLogin!: boolean

  beforeRouteEnter (to: any, from: any, next: Function) {
    next((vm: any) => {
      if (!vm.isLogin) {
        vm.$router.push('/user/login-register')
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.user{
  position: absolute;
  width: 100%;
}
</style>
