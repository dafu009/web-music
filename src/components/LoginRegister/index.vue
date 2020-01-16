<template lang="pug">
.login-register
  .wrapper
    .avatar
      img(v-if="result.avatar" v-lazy="result.avatar")
      img(class="default" v-else src="@/assets/image/default-avatar.png")
    .form-wrap
      .form
        span.iconfont &#xe652
        input.input(
          clearable
          type="text"
          v-model="userForm.username"
          placeholder="请输入用户名"
          @keyup="query")
      .form
        span.iconfont &#xe616
        input.input(
          clearable
          type="text"
          v-model="userForm.password"
          placeholder="请输入密码"
          @keyup="query")
      transition(name="fade")
        .form(v-if="checkPassword && !result.exist")
          span.iconfont &#xe627
          input.input(
            clearable
            type="text"
            v-model="userForm.password"
            placeholder="确认密码"
            @keyup="query")
    .submit(@click="handel") {{ checkPassword && !result.exist ? '注册' : '登录' }}
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import register from '@/components/register.vue'
import { Action, State } from 'vuex-class'
import { CONFIG, UserQuery, UserInfo } from '@/store/types'
import debounce from 'lodash/debounce'
@Component({
  components: {}
})
export default class loginRegister extends Vue {
  @Ref('rippleItem') readonly rippleItem!: any

  @State((state: CONFIG) => state.userInfo.queryData) result!: UserQuery
  @State((state: CONFIG) => state.userInfo) UserInfo!: UserQuery

  @Action('queryUser') queryUser: any
  @Action('Register') Register: any

  private checkPassword:boolean = false
  private userForm = {
    username: '',
    password: ''
  }
  created () {
    this.query = debounce(this.query, 500)
  }
  query() {
    this.checkPassword = true
    this.queryUser(this.userForm.username)
  }
  register() {
    this.Register({ username: '123', password: '456' })
  }
  handel () {}
}
</script>
<style lang="scss" scoped>
.login-register {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  .wrapper {
    width: 400px;
    height: 500px;
    background-color: #ccc;
    border: 1px solid #ccc;
    box-sizing: border-box;
    position: relative;
    border-radius: 20px;
    .avatar {
      box-sizing: border-box;
      width: 130px;
      height: 130px;
      padding: 5px;
      border-radius: 50%;
      text-align: center;
      background-color: #fff;
      overflow: hidden;
      margin: 40px auto;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 50%;
      }
      .default {
        width: 80%;
      }
    }
    .form-wrap {
      .form {
        width: 300px;
        height: 40px;
        margin: 0 auto 25px;
        line-height: 40px;
        border-radius: 40px;
        border: 2px solid #717171;
        background:#F9F0DA;
        .iconfont {
          padding: 0 10px;
          font-size: 24px;
          vertical-align: top;
          cursor: pointer;
          color: #717171;
        }
        .input {
          height: 100%;
          padding: 0 0 0 5px;
          border-radius: 40px;
          border: none;
          outline: none;
          width: 230px;
          background:#F9F0DA;
          transition: .3s linear;
          vertical-align: top;
          color: #3c3c3c;
        }
      }
    }
    .submit {
      cursor: pointer;
      text-align: center;
      width: 300px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      position: absolute;
      left: 50%;
      bottom: 20px;
      transform: translateX(-50%);
      color: #3c3c3c;
      background-image: linear-gradient( 90deg, #ffcb5b 10%, #3677FF 100%);
      transition: 1s;
    }
    .submit:hover {
      background-image: linear-gradient( 90deg, #ffd884 10%, #125cfd 100%);
    }
    .submit:active {
      box-shadow: 0 0 5px rgba(0,0,0,0.5)
    }
  }
}
</style>
