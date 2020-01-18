<template lang="pug">
  .userinfo(@click="toUser")
    .avatar
      img(v-lazy="UserInfo.avatar || 'http://image-source-lsy.oss-cn-shenzhen.aliyuncs.com/static/images/default-avatar.png'")
    .nickname
      span {{ isLogin ? UserInfo.nickname : '点此登录/注册'}}
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
  @State((state: CONFIG) => state.globalEvent.isLogin) isLogin!:boolean

  toUser () {
    this.$router.push('/user')
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
    color: #393939;
    padding-top: 10px;
    font-size: 24px;
    text-align: center;
  }
}
</style>
