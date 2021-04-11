<template>
  <div class="menu">
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      :collapse="collapse"
      :collapse-transition="false"
    >
      <!-- :collapse="isCollapse" -->
      <el-menu-item index="/home/welcome">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/home/content">
        <i class="iconfont iconneirongguanli"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/home/materialmanage">
        <i class="iconfont iconimage"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/home/publisharticles">
        <i class="iconfont iconfabu"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="iconfont iconpinglun"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="iconfont iconfensi"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="iconfont iconneirongguanli"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'HomeMenu',
  props: {
    collapse: {
      type: Boolean
    }
  },
  data () {
    return {
      active: '/home/welcome'
    }
  },
  watch: {
    // 由于每次点击浏览器的回退按钮。default-active都不会发生改变，解决方法，监听路由的变化，动态的为default-active赋值
    $route: {
      handler (to) {
        console.log(to.fullPath)
        this.active = to.fullPath
      }
    }
  }
}
</script>
<style lang="less" scoped>
.menu {
  /deep/ .el-menu {
    height: 100vh;
    .iconfont {
      margin-right: 5px;
      padding-left: 5px;
    }
  }
}
</style>
