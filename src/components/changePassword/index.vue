<template lang="pug">
.forget-pass
  back-to(:title="title" @back="goBack")
  .wrapper
    .main(:class="{fill: resetPassPart}")
      .title {{ subTitle }}
      .form(v-if="!resetPassPart")
        span.iconfont &#xe610
        input.input(
          clearable
          v-model="EMail"
          type="text"
          @keyup="query"
          placeholder="请输入绑定的邮箱")
        input.checkInput(
          ref="checkInput"
          v-if="isCheckMail"
          v-model="checkCode"
          maxlength="6"
          @keyup="numberOnly"
          @keyup.enter="sendAndCheck"
          placeholder="验证码")
        .send.btn.btn-primary.btn-ghost.btn-shine(
          @click="sendAndCheck"
          v-if="!isCheckMail") 发送验证码
      transition(name="fade")
        .resetPass(v-if="resetPassPart")
          .form
            span.iconfont &#xe644
            input.input(
              clearable
              :type="inputType"
              v-model="passwordForm.password"
              placeholder="请输入新密码"
              @keyup.enter="submit")
            transition(name="fade")
              .operation(@click="changeVisible")
                span.iconfont.visible(v-if="visible") &#xe633
                span.iconfont.invisible(v-else) &#xe634
          .form
            span.iconfont &#xe607
            input.input(
              clearable
              :type="inputType"
              v-model="passwordForm.checkPass"
              placeholder="确认密码"
              @keyup="checkSame"
              @keyup.enter="submit")
            transition(name="fade")
              .operation(@click="changeVisible")
                span.iconfont.visible(v-if="visible") &#xe633
                span.iconfont.invisible(v-else) &#xe634
          .submit.btn.btn-primary.btn-ghost.btn-shine(@click="submit") 提交
</template>
<script lang="ts">
import '@/common/style/button.scss'
import BackTo from '@/common/components/BackTo.vue'
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { State, Action, Mutation } from 'vuex-class'
import { CONFIG } from '@/store/types'
import debounce from 'lodash/debounce'
import api from '@/api'
const sha1 = require('sha1')

@Component({
  components: {
    BackTo
  }
})
export default class index extends Vue {
  @Ref('checkInput') readonly checkInput!: HTMLInputElement

  @State((state: CONFIG) => state.globalEvent.checkMail) isCheckMail!: boolean
  @State((state: CONFIG) => state.globalEvent.checkPass.success) checkSuccess!: boolean

  @Mutation('setCheckShow') setCheckShow!: Function
  
  @Action('sendMailCheckCode') sendMailCheckCode!: Function
  @Action('checkMailCode') checkMailCode!: Function
  @Action('setGlobalMessage') setGlobalMessage!: Function
  @Action('queryUser') queryUser!: Function

  private visible: boolean = false
  private inputType: string = 'password'
  private checkCode: string  = ''
  private EMail: string = ''
  private resetPassPart: boolean = false
  private title: string = ''
  private subTitle: string = ''

  private passwordForm = {
    password: '',
    checkPass: ''
  }

  @Watch('checkSuccess')
  checkPass (value: boolean) {
    if (value) {
      api.user.updatePasswprd({
        method: 'PUT', 
        data: {
          email: this.EMail,
          password: sha1(this.passwordForm.password)
        }
      })
      .then(({success, message}) => {
        setTimeout(() => {
          this.__setMessage(
            success ? 'success' : 'error',
            message
          )
          this.$router.go(-1)
        }, 1000)
      })
    }
  }

  beforeRouteEnter(to: any, from: any, next: Function): void {
    next((vm: Vue) => {
      let title = ''
      let subTitle = ''
      switch(from.name) {
        case 'loginRegister':
          title = '登录'
          subTitle = '忘记密码'
          break
        case 'edit':
          title = '个人中心'
          subTitle = '修改密码'
          break
      }
      vm.$data.title = title
      vm.$data.subTitle = subTitle
    })
  }
  created () {
    this.query = debounce(this.query, 1000)
    this.checkSame = debounce(this.checkSame, 1000)
  }

  changeVisible () {
    this.visible = !this.visible
    if (this.visible) {
      this.inputType = 'text'
    } else {
      this.inputType = 'password'
    }
  }

  checkSame () {
    if (this.passwordForm.checkPass) {
      if (this.passwordForm.password !== this.passwordForm.checkPass) {
        this.__setMessage('warning', '两次密码不一致')
        this.passwordForm.checkPass = ''
      }
    }
  }

  async query() {
    if (this.EMail) {
      if (!this.EMail.match(/@/g)) {
        this.__setMessage(
          'warning',
          '请输入正确的邮箱'
        )
        return
      }
      await this.queryUser(this.EMail)
        .then((exist: boolean) => {
          if (!exist) {
            this.__setMessage(
              'error',
              '该邮箱未绑定，请确认'
            )
          }
        })
    }
  }

  async submit () {
    if (!this.passwordForm.password) {
      this.__setMessage('warning', '密码不能为空')
      return
    }
    if (!this.passwordForm.checkPass) {
      this.__setMessage('warning', '请输入确认密码')
      return
    }
    this.setCheckShow(true)
  }

  async sendAndCheck () {
    if (!this.EMail) {
      this.__setMessage('warning', '校验邮箱不能为空')
      return
    }
    if (this.isCheckMail) {
      await this.checkMailCode(this.checkCode)
        .then((success: boolean) => {
          if (success) {
            this.resetPassPart = true
          }
        })
      this.checkCode = ''
    } else {
      await this.sendMailCheckCode(this.EMail)
      this.checkInput.focus()
    }
  }

  goBack () {
    this.$router.go(-1)
  }

  numberOnly() {
    this.checkCode = this.checkCode.replace(/\D/g, '')
  }
  __setMessage (type: 'success' | 'error' | 'warning', message: string) {
    this.setGlobalMessage({ type, message })
  }
}
</script>
<style lang="scss" scoped>
.forget-pass {
  position: absolute;
  width: 100%;
  height: 550px;
  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .main {
      height: 150px;
      padding: 30px;
      background-color: #fff;
      border-radius: 20px;
      transition: height 0.4s;
      box-shadow: 1px 1px 20px rgba(0,0,0,0.5);
      .title {
        padding-bottom: 20px;
        height: 50px;
        text-align: center;
        font-size: 22px;
      }
      .form {
        width: 450px;
        height: 45px;
        margin: 0 auto 25px;
        line-height: 45px;
        border-radius: 40px;
        border: 2px solid #717171;
        background:#F9F0DA;
        position: relative;
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
          width: 300px;
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
        .checkInput {
          position: absolute;
          text-align: center;
          right: 2px;
          top: 2px;
          height: 40px;
          line-height: 40px;
          border: 1px solid #dcdfe6;
          padding: 0 15px;
          background-color: #fff;
          color: #606266;
          border-radius: 20px;
          width: 70px;
        }
        .checkInput:focus{
          outline: none;
          border-color: #409eff;
        }
        .send {
          font-size: 14px;
          --hue: 225;
          position: absolute;
          width: 100px;
          top: 2px;
          right: 2px;
        }
      }
      .active{
        box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
        border: 2px solid #494949;
      }
      .submit {
        --hue: 225;
        margin: 0 auto;
      }
    }
    .fill {
      height: 260px;
    }
  }
}
</style>
