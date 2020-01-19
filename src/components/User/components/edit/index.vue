<template lang="pug">
.edit-wrapper
  back-to(:title="backTo" @back="goBack")
  .edit-content
    .edit-item.edit-avatar
      el-upload.avatar-uploader(
        :show-file-list="false"
        action="''"
        :http-request="upload"
        :before-upload="beforeAvatarUpload")
        img.avatar(v-if="info.avatar" :src="info.avatar")
      .preview
        img.pic_1(v-lazy="info.avatar")
        img.pic_2(v-lazy="info.avatar")
    .tips tips: 单击头像以进行上传
    .edit-item.edit-username
      span.title 用户名
      el-input(v-model="info.username" :disabled="true")
    .edit-item.edit-nickname
      span.title 昵称
      el-input(v-model="info.nickname" placeholder="请输入昵称" )
    .edit-item.edit-nickname
      span.title 描述
      el-input(v-model="info.introduction" type="textarea" placeholder="请输入个人描述")
    .edit-item
      span.title
      .btn.btn-primary.btn-ghost.btn-shine(@click="submit") 提交
</template>
<script lang="ts">
import clone from 'lodash/cloneDeep'
import 'element-ui/lib/theme-chalk/upload.css'
import 'element-ui/lib/theme-chalk/input.css'
import { Component, Vue, Prop } from 'vue-property-decorator'
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
  @State((state: CONFIG) => state.userInfo) userInfo!: UserInfo
  @State((state: CONFIG) => state.globalEvent.isLogin) isLogin!: boolean
  @Action('Update') Update!: Function
  
  private backTo: string = '个人中心'
  private info = {} as UserInfo
  created() {
    if (!this.isLogin) {
      this.$router.push('/user')
      return
    }
    this.info = clone(this.userInfo)
  }

  beforeAvatarUpload(file: File) {
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return isLt2M
  }

  upload(item: any) {
    api.oss
      .getAliOssOptions()
      .then(({ success, data }) => {
        let ossConfig = data.oss_options
        let client = new OSS({
          ...ossConfig
        })
        let key = `resource/images/${createOnlyId()}-${item.file.name}.png`
        return client.put(key, item.file)
      })
      .then(({ url, rst }: any) => {
        this.info.avatar = url
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
  }
}
</script>
<style lang="scss">
.edit-wrapper {
  .edit-content {
    padding: 30px;
    .edit-avatar {
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 200px;
        height: 200px;
        object-fit: contain;
        display: block;
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
      width: 200px;
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
      .el-input {
        width: 300px;
      }
      .el-textarea {
        width: 300px;
      }
      .btn {
        --hue: 210;
        position: relative;
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
            box-shadow: 0 0 20px 10px hsla(var(--hue), 74%, 44%, 0.8);
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
