<template lang="pug">
  .userinfo(@click="toUser")
    .avatar
      img(v-lazy="UserInfo.avatar || 'https://image.yy.com/yjmf/NzdiZDcxZDUtMjE4Mi00N2JjLWIxMGItOWMyNGIyOGQ1ZjUz.png'")
    .nickname
      span {{ UserInfo.nickname }}
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class';
import { CONFIG, UserQuery, UserInfo } from '@/store/types'
@Component({
  components: {}
})
export default class userInfo extends Vue {
  @State((state: CONFIG) => state.userInfo) UserInfo!:UserInfo
  toUser () {
    if (this.UserInfo.token) {
      this.$router.push('/user')
    } else {
      this.$router.push('/user/login-register')
    }
  }
}
</script>
<style lang="scss" scoped>
.userinfo {
  cursor: pointer;
  .avatar {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    text-align: center;
    border-radius: 50%;
    // border: 2px solid #82bbe4;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .nickname {
    padding-top: 10px;
    font-size: 24px;
    text-align: center;
  }
}
</style>
