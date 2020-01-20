<template lang="pug">
  .user-info
    .avatar
      img(v-lazy="userInfo.avatar" alt="头像")
    .info
      .item.nickname 昵称： {{ userInfo.nickname }}
      .item.desc 个人描述： {{ userInfo.introduction ? userInfo.introduction : '这个人很懒，什么也没留下' }}
      .item.birthday 邮箱：{{ userInfo.email }} (可作为登录账号)
      .item.birthday 生日：{{ userInfo.birthday | formatDate }}
      .item.createTime 创建日期：{{ userInfo.createTime | formatDate }}
    .operate
      .item.quit(@click="quit")
        span.iconfont &#xe61d
        span 退出
      .item.edit(@click="edit")
        span.iconfont &#xe639
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
    }
    .nickname {
      font-size: 24px;
    }
    .desc {
      color: #595959;
      max-width: 700px;
    }
    .birthday {
      color: #595959;
    }
    .createTime {
      color: #595959;
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
