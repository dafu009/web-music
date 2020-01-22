<template lang="pug">
.edit-wrapper
  back-to(:title="backTo" @back="goBack")
  .edit-content
    .edit-item.edit-avatar
      .upload(
        :class="{'active': over}"
        @dragover="dragenter"
        @dragenter="dragenter"
        @dragleave="dragleave"
        @drop="drop"
        @click="triggerUpload")
        transition(name="fade")
          .mask(v-if="over") 释放以上传
        img(v-lazy="info.avatar")
        input.hidden(ref="uploader" type="file" @change="change")
      .preview
        img.pic_1(v-lazy="info.avatar")
        img.pic_2(v-lazy="info.avatar")
    .tips tips: 单击头像/拖拽图片至头像处进行上传
    .edit-item
      span.title 用户名
      span.username {{info.username }}
      el-button.changePassword(@click="changePass" size="small") 修改密码
    .edit-item
      span.title 昵称
      el-input.input(v-model="info.nickname" placeholder="请输入昵称" )
    .edit-item
      span.title 描述
      el-input.input(type="textarea" v-model="info.introduction" rows="3" placeholder="请输入个人描述")
    .edit-item
      span.title 邮箱
      .switch
        el-switch(v-model="switchValue")
      el-input.input.mail(v-model="info.email" :disabled="!switchValue" style="cursor: not-allowed" placeholder="请输入可用邮箱")
      el-input.checkInput(ref="checkInput" v-if="isCheckMail" v-model="checkCode" maxlength="6" @keyup="numberOnly" placeholder="验证码")
      el-button.send(@click="sendOrCheck" :disabled="!switchValue" type="primary" :class="{check: isCheckMail}") {{ isCheckMail ? '校验' : '发送验证码' }}
    .edit-item
      span.title 生日
      el-date-picker(
        v-model="info.birthday"
        placeholder="选择日期时间"
        type="datetime")
      .btn.btn-primary.btn-ghost.btn-shine(@click="submit") 提交
      
</template>
<script lang="ts">
import clone from 'lodash/cloneDeep'
import '@/common/style/button.scss'
import 'element-ui/lib/theme-chalk/date-picker.css'
import 'element-ui/lib/theme-chalk/button.css'
import 'element-ui/lib/theme-chalk/icon.css'
import 'element-ui/lib/theme-chalk/input.css'
import 'element-ui/lib/theme-chalk/switch.css'

import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import BackTo from '@/common/components/BackTo.vue'
import { State, Action } from 'vuex-class'
import { CONFIG, UserInfo } from '@/store/types'
import { createOnlyId } from '@/common/ts/common'
import api from '@/api'
import OSS from 'ali-oss'
import router from '../../../../router/index';

@Component({
  components: {
    BackTo
  }
})
export default class index extends Vue {
  @Ref('uploader') readonly uploader!: HTMLInputElement
  @Ref('checkInput') readonly checkInput!: HTMLInputElement

  @State((state: CONFIG) => state.userInfo) userInfo!: UserInfo
  @State((state: CONFIG) => state.globalEvent.isLogin) isLogin!: boolean
  @State((state: CONFIG) => state.globalEvent.checkMail) isCheckMail!: boolean

  @Action('Update') Update!: Function
  @Action('setGlobalMessage') setGlobalMessage!: Function
  @Action('sendMailCheckCode') sendMailCheckCode!: Function
  @Action('checkMailCode') checkMailCode!: Function
  @Action('upDateEmail') upDateEmail!: Function

  private backTo: string = '个人中心'
  private info = {} as UserInfo
  private over: boolean = false
  private checkCode: string = ''
  private switchValue: boolean = false

  beforeRouteEnter(to: any, from: any, next: Function): void {
    next((vm: Vue) => {
      vm.$data.switchValue = false
    })
  }

  created() {
    if (!this.isLogin) {
      this.$router.push('/user')
      return
    }
    this.info = clone(this.userInfo)
  }
  numberOnly() {
    this.checkCode = this.checkCode.replace(/\D/g, '')
  }

  dragenter(e: DragEvent) {
    e.preventDefault()
    this.over = true
  }
  dragleave(e: DragEvent) {
    e.preventDefault()
    this.over = false
  }
  drop(e: any) {
    e.preventDefault()
    this.over = false
    const file = e.dataTransfer.files[0]
    this.upload(file)
  }

  triggerUpload() {
    this.uploader.click()
  }
  change(event: any) {
    const file = event.target.files[0]
    this.upload(file)
  }
  upload(file: any) {
    console.log(file)
    api.oss
      .getAliOssOptions()
      .then(({ success, data }) => {
        let ossConfig = data.oss_options
        let client = new OSS({
          ...ossConfig
        })
        let key = `resource/images/${createOnlyId()}-${file.name}`
        return client.put(key, file)
      })
      .then(({ url, res }: any) => {
        this.info.avatar = url
        if (res.status === 200) {
          this.setGlobalMessage({ type: 'success', message: '上传成功' })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  goBack() {
    this.$router.go(-1)
  }

  async sendOrCheck() {
    if (this.isCheckMail) {
      await this.checkMailCode(this.checkCode)
        .then((success: boolean) => {
          if (success) {
            this.upDateEmail(this.info.email)
          }
        })
      this.checkCode = ''
    } else {
      await this.sendMailCheckCode(this.info.email)
      this.checkInput.focus()
    }
  }

  async submit() {
    await this.Update(this.info)
    setTimeout(() => {
      this.$router.go(-1)
    }, 500)
  }

  changePass () {
    this.$router.push('/user/change-password')
  }
}
</script>
<style lang="scss">
.edit-wrapper {
  .edit-content {
    padding: 30px;
    .edit-avatar {
      .upload {
        box-sizing: border-box;
        position: relative;
        border: 2px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        width: 210px;
        height: 210px;
        overflow: hidden;
        .mask {
          position: absolute;
          width: 100%;
          height: 100%;
          line-height: 210px;
          text-align: center;
          font-size: 18px;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .hidden {
          display: none;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .upload:hover {
        border-color: #56a6f5cc;
      }
      .active {
        border: 3px dashed #56a6f5cc;
      }
      .preview {
        margin-left: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          border-radius: 50%;
          box-sizing: border-box;
          padding: 5px;
          border: 1px solid #e9e9e9;
        }
        .pic_1 {
          height: 60px;
          width: 60px;
          object-fit: cover;
          margin-bottom: 20px;
        }
        .pic_2 {
          height: 110px;
          width: 110px;
          object-fit: cover;
        }
      }
    }
    .tips {
      width: 210px;
      text-align: center;
      color: #818181;
      font-size: 14px;
    }
    .edit-item {
      margin-top: 20px;
      display: flex;
      align-items: center;
      width: 650px;
      position: relative;
      .title {
        width: 50px;
        margin-right: 20px;
        text-align: right;
        flex-shrink: 0;
      }
      .switch {
        position: absolute;
        top: 6px;
        left: 80px;
        z-index: 9;
      }
      .mail {
        input {
          padding-left: 60px;
        }
      }
      .username {
        color: #9c9c9c;
      }
      .username:hover {
        cursor: not-allowed;
      }
      .changePassword {
        margin-left: 10px;
      }
      .checkInput {
        width: 80px;
        flex-shrink: 0;
        margin-left: 10px;
        input {
          text-align: center;
        }
      }
      .send {
        flex-shrink: 0;
        width: 112px;
        margin-left: 10px;
      }
      .check {
        width: 70px;
      }
      .disable {
        cursor: not-allowed;
        background-color: #ccc;
      }
      .btn {
        flex: 1;
        margin-left: 10px;
        --hue: 210;
        border-radius: 5px;
      }
    }
  }
}
</style>
