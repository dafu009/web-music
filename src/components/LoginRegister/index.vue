<template lang="pug">
.login-register
  .wrapper
    .avatar
      img(v-if="result.avatar && userForm.username" v-lazy="result.avatar")
      img.default(v-else src="@/assets/image/default-avatar.png")
    .form-wrap
      .form(:class="{active: activeIndex === 1}")
        span.iconfont &#xe652
        input.input(
          clearable
          type="text"
          v-model="userForm.username"
          placeholder="请输入用户名"
          @keyup="query"
          @focus="focus(1)"
          @blur="activeIndex = 0")
      .form(:class="{active: activeIndex === 2}")
        span.iconfont &#xe616
        input.input(
          clearable
          type="password"
          v-model="userForm.password"
          placeholder="请输入密码"
          @focus="focus(2)"
          @blur="activeIndex = 0")
      transition(name="fade")
        .form(
          v-if="checkPassword && !result.exist"
          :class="{active: activeIndex === 3}")
          span.iconfont &#xe627
          input.input(
            clearable
            type="password"
            v-model="userForm.checkPass"
            placeholder="确认密码"
            @keyup="checkSame"
            @focus="focus(3)"
            @blur="activeIndex = 0")
    .submit(@click="handel") {{ checkPassword && !result.exist ? '注册' : '登录' }}
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import register from '@/components/register.vue'
import { Action, State, Mutation } from 'vuex-class'
import { CONFIG, UserQuery, UserInfo } from '@/store/types'
import debounce from 'lodash/debounce'
@Component({
  components: {}
})
export default class loginRegister extends Vue {
  @State((state: CONFIG) => state.userInfo.queryData) result!: UserQuery
  @State((state: CONFIG) => state.userInfo) UserInfo!: UserInfo
  @State((state: CONFIG) => state.globalEvent.checkPass.success) checkSuccess!: boolean

  @Mutation('setCheckShow') setCheckShow: any
  @Mutation('setGlobalMessageShow') setGlobalMessageShow: any
  @Mutation('setGlobalMessage') setGlobalMessage: any
  
  @Action('queryUser') queryUser: any
  @Action('Register') Register: any
  @Action('Login') Login: any

  @Watch('checkSuccess')
  checkPass (value: boolean) {
    if (value) {
      setTimeout(() => {
        if (this.result.exist) {
          // 登录
          this.userLogin()
        } else {
          // 注册
          this.userRegister()
        }
      }, 1500)
    }
  }
  private activeIndex: number = 0
  private checkPassword: boolean = false
  private userForm = {
    username: '',
    password: '',
    checkPass: ''
  }
  _resetUserForm () {
    this.activeIndex = 0
    this.userForm = {
      username: '',
      password: '',
      checkPass: ''
    }
  }
  beforeRouteLeave(to: any,from: any, next: Function) {
    this._resetUserForm()
    next()
  }
  created () {
    this.query = debounce(this.query, 500)
    this.checkSame = debounce(this.checkSame, 500)
  }
  focus (index: number) {
    this.activeIndex = index
  }
  checkSame () {
    if (this.checkPassword && this.userForm.checkPass) {
      if (this.userForm.password !== this.userForm.checkPass) {
        this.__setMessage('warning', '两次密码不一致')
        this.userForm.checkPass = ''
        this.setGlobalMessageShow(true)
      }
    }
  }
  async query() {
    if (this.userForm.username) {
      this.checkPassword = true
      await this.queryUser(this.userForm.username)
    } else {
      this.checkPassword = false
    }
    if (this.result.exist) {
      this.checkPassword = false
    }
  }
  async userLogin () {
    await this.Login({
      username: this.userForm.username,
      password: this.userForm.password
    })
    this._resetUserForm()
    this.$router.push('/recommend')
  }
  async userRegister() {
    await this.Register({ 
      username: this.userForm.username,
      password: this.userForm.password
    }).then((success: boolean) => {
      if (success) {
        setTimeout(() => {
          this.userLogin()
        }, 1000)
      }
    })
  }
  __setMessage (type: 'success' | 'error' | 'warning', message: string) {
    this.setGlobalMessage({ type, message })
  }
  handel () {
    if (!this.userForm.username) {
      this.__setMessage('warning', '用户名不能为空')
      this.setGlobalMessageShow(true)
      return
    }
    if (!this.userForm.password) {
      this.__setMessage('warning', '密码不能为空')
      this.setGlobalMessageShow(true)
      return
    }
    if (this.checkPassword && !this.userForm.checkPass) {
      this.__setMessage('warning', '请输入确认密码')
      this.setGlobalMessageShow(true)
      return
    }
    if (this.checkPassword && this.userForm.password === this.userForm.checkPass) {
      this.setCheckShow(true)
    }
    if (!this.checkPassword) {
      this.setCheckShow(true)
    }
  }
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
    border: 1px solid transparent;
    background-image: linear-gradient( 135deg, #3677FF 10%, #ffcb5b 100%);
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
        width: 85%;
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
      .active{
        box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
        border: 2px solid #494949;
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
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5)
    }
  }
}
</style>
