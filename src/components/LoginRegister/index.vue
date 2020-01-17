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
    .btn.btn-primary.btn-ghost.btn-shine(
      :class="{'btn-register': checkPassword && !result.exist}"
      @click="handel") {{ checkPassword && !result.exist ? '注册' : '登录' }}
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
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
    background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);
    // background-image: linear-gradient( 225deg, #C2FFD8 10%, #465EFB 140%);
    // background-image: linear-gradient( 135deg, #79F1A4 10%, #0E5CAD 100%);
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

    .btn {
      --hue: 172;
      position: absolute;
      left: 50%;
      bottom: 20px;
      transform: translateX(-50%);
      width: 300px;
      height: 40px;
      line-height: 38px;
      font-size: 1rem;
      text-decoration: none;
      text-transform: uppercase;
      border: 1px solid hsla(var(--hue), 89%, 65%, 0.8);
      outline: transparent;
      overflow: hidden;
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
      transition: 0.25s;
      border-radius: 20px;
      text-align: center;

      &-register {
        --hue: 6
      }
      &-ghost {
        color: hsla(var(--hue), 89%, 65%, 0.8);
        border-color: hsla(var(--hue), 89%, 65%, 0.8);
      }

      &-shine {
        &::before {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            hsla(var(--hue), 89%, 65%, 0.8),
            transparent
          );
          transform: translateX(-100%);
          transition: 0.6s;
        }

        &:hover {
          background: transparent;
          box-shadow: 0 0 20px 10px hsla(var(--hue), 74%, 44%, 0.8);
        }

        &:hover::before {
          transform: translateX(100%);
        }
      }
    }
    
  }
}
</style>
