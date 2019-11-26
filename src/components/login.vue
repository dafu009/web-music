<template>
  <div class="login">
    <el-tabs v-model="activeName">
      <el-tab-pane label="登录" name="first">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="名称" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
            <el-button @click="submitLogout">登出</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="second">
        <register></register>
      </el-tab-pane>
    </el-tabs>
    <check-image v-show="globalEvent.checkShow" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide } from 'vue-property-decorator'
import { State, Action, Getter, Mutation } from 'vuex-class'
import register from '@/components/register.vue'
import CheckImage from '@/components/checkImage.vue'
import api from '@/api'
interface RuleForm {
  username: string
  password: string
  checkPass: string
}
@Component({
  components: {
    register,
    CheckImage
  }
})
export default class login extends Vue {
  // vuex
  @State('userInfo') userInfo: any
  @State(state => state.globalEvent) globalEvent: any
  @Mutation('setGlobalEvent') setGlobalEvent: any
  @Action('Login') login: any
  @Action('Logout') logout: any

  app: any = this
  activeName: string = 'first'
  ruleForm: RuleForm = {
    username: '',
    password: '',
    checkPass: ''
  }
  type: string = ''

  submitForm(formName: string) {
    const ref: any = this.$refs[formName]
    ref.validate((valid: any) => {
      // console.log(valid)
      //   if (valid) {}
      this.setGlobalEvent({
        checkShow: true
      })
      //   if (this.globalEvent.isPass) {
      //     api.user
      //       .login({
      //         method: 'post',
      //         data: {
      //           username: this.ruleForm.username,
      //           password: this.ruleForm.password
      //         }
      //       })
      //       .then(data => {
      //         if (data.success) {
      //           this.type = 'success'
      //         } else {
      //           this.type = 'error'
      //         }
      //         this.app.$message({
      //           type: this.type,
      //           message: data.message
      //         })
      //         this.login(data)
      //       })
      //       .catch(err => {
      //         console.log(err)
      //       })
      //   }
    })
  }

  submitLogout() {
    this.logout()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.login {
  width: 400px;
  margin: 0 auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-tabs__item {
  text-align: center;
  width: 60px;
}
</style>
