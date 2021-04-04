<template>
  <div class="login" @click="onLoginBody">
    <!-- 背景视频 -->
    <div class="video-wrapper">
      <video
        muted
        autoplay
        loop
        src="https://sf3-ttcdn-tos.pstatp.com/obj/mp/welcome-video.mp4"
        class="video"
      ></video>
    </div>
    <!-- 登录注册按钮 -->
    <div class="btn">
      <el-tooltip content="系统正在维护中，暂时无法注册" placement="bottom">
        <el-button class="register">注册</el-button>
      </el-tooltip>
      <el-button type="danger" @click.stop="onLoginClick">登录</el-button>
    </div>
    <!-- 登录组件 -->
    <login-form
      class="login-form"
      v-show="isLoginFormShow"
      @click.native.stop="onLoginFormClick"
    />
  </div>
</template>
<script>
import LoginForm from '../login/LoginForm'
export default {
  data () {
    return {
      isLoginFormShow: false
    }
  },
  mounted () {},
  components: {
    LoginForm
  },
  methods: {
    onLoginClick () {
      this.isLoginFormShow = !this.isLoginFormShow
    },
    onLoginBody () {
      this.isLoginFormShow = false
    },
    onLoginFormClick () {
      this.isLoginFormShow = true
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  position: relative;
  .video-wrapper {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    min-width: 1024px;
    min-height: 722px;
  }
  .btn {
    position: absolute;
    width: 170px;
    height: 40px;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    .register {
      background: transparent;
      margin-right: 20px;
    }
  }
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
}
</style>
