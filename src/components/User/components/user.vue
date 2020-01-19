<template lang="pug">
  user-info
</template>
<script lang="ts">
import UserInfo from './userInfo/index.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { CONFIG } from '@/store/types'
@Component({
  components: {
    UserInfo
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
<style lang="scss" scoped></style>
