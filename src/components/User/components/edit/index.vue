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
      span.title 生日
      el-date-picker(
        v-model="info.birthday"
        placeholder="选择日期时间"
        type="datetime")
    .edit-item
      span.title
      .btn.btn-primary.btn-ghost.btn-shine(@click="submit") 提交
</template>
<script lang="ts">
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

  @State((state: CONFIG) => state.userInfo) userInfo!: UserInfo
  @State((state: CONFIG) => state.globalEvent.isLogin) isLogin!: boolean
  @Action('Update') Update!: Function
  @Action('setGlobalMessage') setGlobalMessage!: Function
  private backTo: string = '个人中心'
  private info = {} as UserInfo
  private over: boolean = false

  created() {
    if (!this.isLogin) {
      this.$router.push('/user')
      return
    }
    this.info = clone(this.userInfo)
  }

  dragenter (e: DragEvent) {
    e.preventDefault()
    this.over = true
  }
  dragleave (e: DragEvent) {
    e.preventDefault()
    this.over = false
  }
  drop (e: any) {
    e.preventDefault()
    this.over = false
    const file = e.dataTransfer.files[0]
    this.upload(file)
  }

  triggerUpload () {
    this.uploader.click()
  }
  change (event: any) {
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
          background-color: rgba(0,0,0,0.5);
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
      .title {
        width: 50px;
        margin-right: 20px;
        text-align: right;
      }
      input.input {
        width: 300px;
        height: 40px;
      }
      textarea.input {
        width: 300px
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
        border-color: #c0c4cc
      }
      .input:focus {
        outline: none;
        border-color: #409eff
      }
      .username {
        background-color: #ccc;
      }
      .username:hover {
        cursor: not-allowed;
      }
      .btn {
        --hue: 210;
        position: relative;
        width: 322px;
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
          --hue: 6;
        }
        &-ghost {
          color: hsla(var(--hue), 89%, 65%, 0.8);
          border-color: hsla(var(--hue), 89%, 65%, 0.8);
        }

        &-shine {
          &::before {
            position: absolute;
            content: '';
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
            box-shadow: 0 0 10px 10px hsla(var(--hue), 74%, 44%, 0.8);
          }

          &:hover::before {
            transform: translateX(100%);
          }
        }
      }
    }
  }
}
</style>
