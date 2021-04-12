<template>
  <div>
    <el-container class="layout-container">
      <el-aside width="auto">
        <home-menu :collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <div class="head">
            <i
              :class="{
                'el-icon-s-fold': isCollapse,
                'el-icon-s-unfold': !isCollapse
              }"
              @click="onCollapseClick"
            ></i>
            <span>Vue头条号管理系统</span>
          </div>
          <!-- 头部头像下拉菜单 -->
          <div>
            <el-dropdown>
              <div class="head-right">
                <div class="touxiang">
                  <img :src="userInfo.photo" />
                </div>
                <span>{{ userInfo.name }}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人设置</el-dropdown-item>
                <el-dropdown-item @click.native="onQuitLoginClick"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import HomeMenu from '../home/HomeMenu'
import { mapState } from 'vuex'
import { getUserInfo } from '../../api/user'
import bus from '../../utils/global-bus'
export default {
  name: 'HomeIndex',
  data () {
    return {
      isCollapse: false,
      userInfo: null
    }
  },
  created () {
    this.getUserInfo()
    bus.$on('updateUserPhoto', data => {
      this.userInfo.photo = data
    })
  },
  components: {
    HomeMenu
  },
  methods: {
    onCollapseClick () {
      this.isCollapse = !this.isCollapse
    },
    onQuitLoginClick () {
      this.$store.state.afterUserLoginInfo = {}
      this.$router.push('/login')
    },
    // 获取用户信息
    getUserInfo () {
      getUserInfo().then(res => {
        // console.log(res)
        this.userInfo = res.data.data
      })
    }
  },
  computed: {
    ...mapState(['afterUserLoginInfo'])
  }
}
</script>
<style lang="less" scoped>
.layout-container {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.el-aside {
  background-color: rgb(211, 220, 230);
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: rgb(179, 192, 209);
  .head {
    height: 100%;
    font-size: 24px;
    line-height: 57px;
  }
  .head-right {
    display: flex;
    align-items: center;
    margin-top: 5px;
    .touxiang {
      width: 45px;
      height: 45px;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
.el-main {
  background-color: rgb(233, 238, 243);
}
</style>
