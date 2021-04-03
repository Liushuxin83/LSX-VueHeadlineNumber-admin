<template>
  <div class="login">
    <el-form
      :model="userInfo"
      label-width="60px"
      :rules="userInfoRules"
      ref="userInfoRef"
    >
      <el-form-item prop="phone">
        <el-input
          v-model="userInfo.phone"
          prefix-icon="el-icon-mobile"
          class="inputUserInfo"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="userInfo.password"
          prefix-icon="el-icon-apple"
          class="inputUserInfo"
        ></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-checkbox v-model="checked"
        >我已经阅读并同意用户协议和隐私条款</el-checkbox
      >
    </div>
    <el-button type="primary" class="loginbtn" @click="onLoginBtn"
      >登录</el-button
    >
  </div>
</template>
<script>
import request from '@/network/request.js'
export default {
  data () {
    // 验证手机号的规则
    let checkMobile = (rule, value, callback) => {
      let regMobile = /(^1\d{10}$)|(^[0-9]\d{7}$)/
      if (regMobile.test(value)) {
        return callback()
      } else {
        callback(new Error('手机号码格式不正确'))
      }
    }
    return {
      userInfo: {
        phone: '13911111111',
        password: '246810'
      },
      // 是否勾选协议
      checked: false,
      userInfoRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onLoginBtn () {
      this.$refs.userInfoRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await request({
          method: 'POST',
          url: '/mp/v1_0/authorizations',
          data: { mobile: this.userInfo.phone, code: this.userInfo.password }
        })
        if (this.checked === false) {
          return this.$message({ message: '请勾选用户协议！', type: 'warning' })
        }
        if (res.message !== 'OK') {
          return this.$message.error('登录失败，手机号或密码错误')
        }
        this.$message({ message: '登录成功！', type: 'success' })
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  width: 420px;
  height: 430px;
  background: #fff;
  .el-form {
    margin-top: 100px;
  }
  .el-checkbox {
    margin: 20px 0 0 60px;
  }
  .inputUserInfo {
    width: 300px;
  }
  .loginbtn {
    display: block;
    width: 80%;
    margin: 60px auto;
  }
}
</style>
