<template>
  <div>
    <div class="btns">
      <!-- 全部和收藏按钮 -->
      <el-radio-group
        v-model="collect"
        size="medium"
        @change="getImagesData(1)"
      >
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <!-- 添加素材 -->
      <el-button
        type="success"
        size="medium"
        class="addImages"
        @click="onAddMaterial"
        v-if="isAddMaterialShow"
        >添加素材</el-button
      >
    </div>
    <!-- 图片区域 -->
    <el-row :gutter="10">
      <el-col
        :lg="4"
        :sm="6"
        :xs="12"
        v-for="(item, index) in imagesData"
        :key="item.id"
        class="imageCol"
        @click.native="selectedIndex = index"
      >
        <el-image
          style="width: 100%; height: 150px"
          :src="item.url"
          fit="cover"
        ></el-image>
        <div class="selected" v-if="isShowSelected && selectedIndex === index">
          <img
            src="https://img0.baidu.com/it/u=4232178994,2150672907&fm=26&fmt=auto&gp=0.jpg"
            alt=""
          />
        </div>
        <div class="image-footer" v-if="isIconShow">
          <el-button
            type="warning"
            :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            circle
            size="mini"
            @click="onCollect(item)"
            :loading="item.loading"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="onDelete(item)"
            :loading="item.loading"
          ></el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <el-pagination
      @size-change="onHandleSizeChange"
      @current-change="onHandleCurrentChange"
      :current-page.sync="pageNum"
      :page-sizes="[10, 15, 5]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="imagesTotal"
    >
    </el-pagination>
    <!-- 添加素材对话框 -->
    <el-dialog
      :modal-append-to-body="false"
      title="提示"
      :visible.sync="addMaterialDialogVisible"
      width="400px"
    >
      <el-upload
        v-if="addMaterialDialogVisible"
        :headers="requestHeaders"
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        multiple
        name="image"
        :on-success="uploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script>
import {
  getImagesData,
  collectMaterial,
  deleteMaterial
} from '@/api/materialmanage'
export default {
  name: 'Materiallist',
  props: {
    isAddMaterialShow: {
      type: Boolean,
      default: true
    },
    isIconShow: {
      type: Boolean,
      default: true
    },
    isShowSelected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const userAuthorization = this.$store.state.afterUserLoginInfo.token
    return {
      // 默认查询全部素材列表
      collect: false,
      // 图片素材数据
      imagesData: [],
      imagesTotal: 0,
      pageNum: 1,
      pageSize: 10,
      addMaterialDialogVisible: false,
      requestHeaders: {
        Authorization: `Bearer ${userAuthorization}`
      },
      // 选中图片的索引
      selectedIndex: null
    }
  },
  created () {
    this.getImagesData(1)
  },
  methods: {
    getImagesData (page = 1) {
      this.pageNum = page
      getImagesData({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        // console.log(res)
        // 由于在给收藏按钮加loading的时候，所有收藏按钮都会被加上loading效果，所以需要处理后端的数据，为每个对象添加个loadin属性为false
        let result = res.data.data.results
        result.forEach(item => {
          item.loading = false
        })
        this.imagesData = result
        this.imagesTotal = res.data.data.total_count
      })
    },
    onHandleSizeChange (newSize) {
      this.pageSize = newSize
      this.getImagesData()
    },
    onHandleCurrentChange (newPage) {
      // this.pageNum = newPage
      this.getImagesData(newPage)
    },
    onAddMaterial () {
      this.addMaterialDialogVisible = true
    },
    uploadSuccess () {
      this.$message.success('图片上传成功！')
      this.addMaterialDialogVisible = false
      // 更新素材数据
      this.getImagesData(false)
    },
    // 收藏
    onCollect (item) {
      item.loading = true
      collectMaterial(item.id, !item.is_collected).then(res => {
        if (res.status === 201) {
          this.$message.success('操作成功！')
          item.is_collected = !item.is_collected
          item.loading = false
        }
      })
      // if (item.is_collected) {
      //   // 已收藏，取消收藏
      //   collectMaterial(item.id, false)
      // } else {
      //   // 为收藏，添加收藏
      //   collectMaterial(item.id, true)
      // }
    },
    // 删除
    onDelete (item) {
      // console.log(111)
      item.loading = true
      deleteMaterial(item.id).then(res => {
        console.log(res)
        this.getImagesData()
        item.loading = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-radio-group {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .addImages {
    height: 36px;
  }
}
.imageCol {
  position: relative;
  .selected {
    position: absolute;
    background-color: red;
    margin-right: 10px;
    margin-bottom: 10px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .image-footer {
    position: absolute;
    left: 5px;
    bottom: 0px;
    right: 5px;
    height: 30px;
    background: rgba(
      0,
      0,
      0,
      0.3
    ); // 注意 rgba括号中一定要写数字 不然该属性会不起作用 display: flex;
    justify-content: space-around;
  }
}
</style>
