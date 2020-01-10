<template lang="pug">
  .userinfo
    .avatar
      img(src="https://source.unsplash.com/user/erondu/200x200")
    .nickname
      span username
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class UserInfo extends Vue {}
</script>
<style lang="scss" scoped>
.userinfo {
  .avatar {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    text-align: center;
    border-radius: 50%;
    border: 2px solid #82bbe4;
    overflow: hidden;
  }
  .nickname {
    padding-top: 10px;
    font-size: 24px;
    text-align: center;
  }
}
</style>
