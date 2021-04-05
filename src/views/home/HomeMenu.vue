<template>
  <div class="menu">
    <el-menu
      default-active="/home/welcome"
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
      <el-menu-item index="1">
        <i class="iconfont iconimage"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="2">
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
