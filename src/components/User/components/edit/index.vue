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
      input.input.username(v-model="info.username" :disabled="true")
    .edit-item
      span.title 昵称
      input.input(v-model="info.nickname" placeholder="请输入昵称" )
    .edit-item
      span.title 描述
      textarea.input(v-model="info.introduction" rows="3" placeholder="请输入个人描述")
    .edit-item
      span.title 邮箱
      input.input.mail(v-model="info.email" placeholder="请输入可用邮箱")
      input.checkInput(ref="checkInput" v-if="isCheckMail" v-model="checkCode" maxlength="6" @keyup="numberOnly" placeholder="验证码")
      .send(@click="sendOrCheck" :class="{check: isCheckMail}") {{isCheckMail ? '校验' : '发送验证码'}}
    .edit-item
      span.title 生日
      el-date-picker(
        v-model="info.birthday"
        placeholder="选择日期时间"
        type="datetime")
      .btn.btn-primary.btn-ghost.btn-shine(@click="submit") 提交
    .edit-item
      span.title
      
</template>
<script lang="ts">
import '@/common/style/button.scss'
import clone from 'lodash/cloneDeep'
import 'element-ui/lib/theme-chalk/date-picker.css'
import 'element-ui/lib/theme-chalk/button.css'
import 'element-ui/lib/theme-chalk/icon.css'

import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import BackTo from '@/common/components/BackTo.vue'
import { State, Action } from 'vuex-class'
import { CONFIG, UserInfo } from '@/store/types'
import { createOnlyId } from '@/common/ts/common'
import api from '@/api'
import OSS from 'ali-oss'

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

  private backTo: string = '个人中心'
  private info = {} as UserInfo
  private over: boolean = false
  private checkCode: string = ''

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
      await this.checkMailCode({ code: this.checkCode, email: this.info.email })
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
      width: 600px;
      .title {
        width: 50px;
        margin-right: 20px;
        text-align: right;
      }
      input.input {
        flex: 1;
        height: 40px;
      }
      textarea.input {
        flex: 1;
      }
      .input {
        line-height: 40px;
        border: 1px solid #dcdfe6;
        padding: 0 10px;
        background-color: #fff;
        color: #606266;
        border-radius: 5px;
        line-height: 2;
      }
      .input:hover {
        border-color: #c0c4cc;
      }
      input:focus {
        outline: none;
        border-color: #409eff;
      }
      .checkInput {
        margin-left: 10px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #dcdfe6;
        padding: 0 10px;
        background-color: #fff;
        color: #606266;
        border-radius: 5px;
        width: 50px;
      }
      .username {
        background-color: #ccc;
      }
      .username:hover {
        cursor: not-allowed;
      }
      input.mail {
        width: 220px;
        transition: width 0.4s;
      }
      .send {
        cursor: pointer;
        width: 100px;
        height: 40px;
        text-align: center;
        line-height: 38px;
        border-radius: 5px;
        margin-left: 10px;
        border: 1px solid #87c1fb;
        background-color: #87c1fb;
        color: #fff;
      }
      .check {
        width: 70px;
      }
      .disable {
        cursor: not-allowed;
        background-color: #ccc;
      }
      .btn {
        margin-left: 10px;
        --hue: 210;
        border-radius: 5px;
      }
    }
  }
}
</style>
