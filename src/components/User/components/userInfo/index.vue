<template lang="pug">
  .user-info
    .avatar
      img(v-lazy="userInfo.avatar" alt="头像")
    .info
      .item.nickname 
        span.iconfont &#xe511
        span {{ userInfo.nickname }}
      .item.desc 
        span.iconfont &#xe62a
        span {{ userInfo.introduction ? userInfo.introduction : '这个人很懒，什么也没留下' }}
      .item.birthday 
        span.iconfont &#xe610
        span {{ userInfo.email }} (可作为登录账号)(可用于找回密码)
      .item.birthday 
        span.iconfont &#xe620
        span {{ userInfo.birthday | formatDate }}
      .item.createTime 
        span.iconfont &#xe68c
        span {{ userInfo.createTime | formatDate }}
    .operate
      .item.quit(@click="quit")
        span.iconfont &#xe692
        span 退出
      .item.edit(@click="edit")
        span.iconfont &#xe613
        span 编辑信息
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Mutation, Action, State } from 'vuex-class'
import api from '@/api'
import { formatDate } from '@/common/ts/filter'
import { CONFIG, UserInfo } from '@/store/types'
@Component({
  components: {

  },
  filters: {
    formatDate
  }
})
export default class user extends Vue {
  @State((state: CONFIG) => state.userInfo) userInfo!: UserInfo
  @Mutation('setConfirmShow') setConfirmShow!: Function
  quit () {
    this.setConfirmShow(true)
  }
  edit () {
    this.$router.push('/user/edit')
  }
}
</script>
<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  padding: 30px;
  border-bottom: 1px solid #ccc;
  .avatar {
    box-sizing: border-box;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    padding: 5px;
    margin-right: 30px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .info {
    flex: 1;
    .item {
      padding: 5px;
      span {
        vertical-align: middle;
        color: #595959;
      }
      .iconfont {
        font-size: 24px;
        margin-right: 10px;
      }
    }
    .nickname {
      font-size: 24px;
    }
    .desc {
      max-width: 700px;
    }
  }
  .operate {
    .item {
      margin: 10px 0;
      cursor: pointer;
      span {
        font-size: 18px;
        color: #595959;
        vertical-align: middle;
      }
      .iconfont {
        font-size: 20px;
        margin: 0 10px;
      }
    }
  }
}
</style>
