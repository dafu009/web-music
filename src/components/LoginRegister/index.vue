<template lang="pug">
.loginRester
  .login-register
    .wrapper(:class="{'fill-wrapper': checkPassword && !result.exist}")
      .avatar
        img(v-if="result.avatar && userForm.username" v-lazy="result.avatar")
        img.default(v-else src="http://image-source-lsy.oss-cn-shenzhen.aliyuncs.com/static/images/music-avatar.png")
      .form-wrap
        .form(:class="{active: activeIndex === 1}")
          span.iconfont &#xe501
          input.input(
            clearable
            type="text"
            v-model="userForm.username"
            placeholder="请输入用户名完成登录/注册"
            @keyup="query"
            @keyup.enter="submit"
            @focus="focus(1)"
            @blur="activeIndex = 0")
        .form(:class="{active: activeIndex === 2}")
          span.iconfont &#xe644
          input.input(
            clearable
            :type="inputType"
            v-model="userForm.password"
            placeholder="请输入密码"
            @keyup.enter="submit"
            @focus="focus(2)"
            @blur="activeIndex = 0")
          transition(name="fade")
            .operation(@click="changeVisible")
              span.iconfont.visible(v-if="visible") &#xe633
              span.iconfont.invisible(v-else) &#xe634
          .forget(@click="forgetPass" v-if="isForget") 忘记密码？
        transition(name="fade")
          .form(
            v-if="checkPassword && !result.exist"
            :class="{active: activeIndex === 3}")
            span.iconfont &#xe607
            input.input(
              clearable
              :type="inputType"
              v-model="userForm.checkPass"
              placeholder="确认密码"
              @keyup="checkSame"
              @keyup.enter="submit"
              @focus="focus(3)"
              @blur="activeIndex = 0")
            transition(name="fade")
              .operation(@click="changeVisible")
                span.iconfont.visible(v-if="visible") &#xe633
                span.iconfont.invisible(v-else) &#xe634
      .btn.btn-primary.btn-ghost.btn-shine(
        :class="{'btn-register': checkPassword && !result.exist}"
        @click="submit") {{ checkPassword && !result.exist ? '注册' : '登录' }}
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import register from '@/components/register.vue'
import { Action, State, Mutation } from 'vuex-class'
import { CONFIG, UserQuery, UserInfo, CurrentMusic } from '@/store/types'
import { RST } from '@/common/ts/config'
import debounce from 'lodash/debounce'
import sha1 from 'sha1'
@Component({
  components: {}
})
export default class loginRegister extends Vue {
  @State((state: CONFIG) => state.userInfo.queryData) result!: UserQuery
  @State((state: CONFIG) => state.userInfo) UserInfo!: UserInfo
  @State((state: CONFIG) => state.globalEvent.checkPass.success) checkSuccess!: boolean
  @State(state => state.globalEvent.playList) playList!: CurrentMusic[]
  @State((state: CONFIG) => state.globalEvent.isForgot) isForget!: boolean

  @Mutation('setCheckShow') setCheckShow!: Function
  @Action('setGlobalMessage') setGlobalMessage!: Function
  @Mutation('setPlaying') setPlaying!: Function
  @Action('queryUser') queryUser!: Function
  @Action('Register') Register!: Function
  @Action('Login') Login!: Function

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
  private visible: boolean = false
  private inputType: string = 'password'
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
  changeVisible () {
    this.visible = !this.visible
    if (this.visible) {
      this.inputType = 'text'
    } else {
      this.inputType = 'password'
    }
  }
  focus (index: number) {
    this.activeIndex = index
  }
  checkSame () {
    if (this.checkPassword && this.userForm.checkPass) {
      if (this.userForm.password !== this.userForm.checkPass) {
        this.__setMessage('warning', '两次密码不一致')
        this.userForm.checkPass = ''
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
      password: sha1(this.userForm.password)
    }).then(({ type, success, message }: RST) => {
      this.__setMessage(type, message)
      if (success) {
        if (this.playList.length > 0) {
          this.setPlaying(true)
        }
        this._resetUserForm()
        this.$router.push('/recommend')
      }
    })
    
  }
  async userRegister() {
    await this.Register({ 
      username: this.userForm.username,
      password: sha1(this.userForm.password)
    }).then(({ type, success, message }: RST) => {
      this.__setMessage(type, message)
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
  forgetPass() {
    this.$router.push('/user/change-password')
  }
  submit () {
    if (!this.userForm.username) {
      this.__setMessage('warning', '用户名不能为空')
      return
    }
    if (!this.userForm.password) {
      this.__setMessage('warning', '密码不能为空')
      return
    }
    if (this.checkPassword && !this.userForm.checkPass) {
      this.__setMessage('warning', '请输入确认密码')
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
.loginRester {
  position: absolute;
  width: 100%;
  height: 550px;
  .login-register {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .wrapper {
      width: 400px;
      height: 420px;
      transition: height 0.5s;
      border: 1px solid transparent;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
      background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);
      box-sizing: border-box;
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
          position: relative;
          .forget {
            cursor: pointer;
            position: absolute;
            right: 0;
            bottom: -35px;
            font-size: 13px;
            color: #585858;
          }
          .forget:hover {
            color: #fff;
          }
          .iconfont {
            padding: 0 10px;
            font-size: 24px;
            vertical-align: top;
            color: #717171;
          }
          .input {
            height: 100%;
            padding: 0 0 0 5px;
            border-radius: 40px;
            border: none;
            outline: none;
            width: 200px;
            background:#F9F0DA;
            transition: .3s linear;
            vertical-align: top;
            color: #3c3c3c;
          }
          .operation {
            position: absolute;
            top: 0;
            right: 0;
            .iconfont {
              cursor: pointer;
              position: absolute;
              top: 0;
              right: 0;
            }
          }
        }
        .active{
          box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
          border: 2px solid #494949;
        }
      }
  
      .btn {
        --hue: 41;
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
    .fill-wrapper {
      height: 500px;
    }
  }
}
</style>
