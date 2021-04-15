<template>
  <div class="cover-wrapper">
    <div class="cover" @click="onUploadCover">
      <span v-show="isTextShow">+上传封面</span>
      <img ref="publishImg" />
    </div>
    <el-dialog
      title="提示"
      :visible.sync="uploadcoverDialogVisible"
      width="600px"
      append-to-body
    >
      <el-tabs v-model="uploadCoverActiveName" type="card">
        <el-tab-pane label="素材库" name="first">
          素材库内容
          <material-list
            :isAddMaterialShow="false"
            :isIconShow="false"
            ref="materialListRef"
            :isShowSelected="true"
          />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input type="file" @change="onFileChange" ref="file" />
          <img ref="previewImg" width="150px" />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadcoverDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUploadCoverConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { uploadCover } from '../../api/publishArticles'
import MaterialList from '@/components/MaterialList'
export default {
  name: 'UploadCover',
  data () {
    return {
      uploadcoverDialogVisible: false,
      // tab栏 活跃的name
      uploadCoverActiveName: 'first',
      isTextShow: true
    }
  },
  components: {
    MaterialList
  },
  methods: {
    onUploadCover () {
      this.uploadcoverDialogVisible = true
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0] // 固定写法
      const blob = window.URL.createObjectURL(file) // 获取blob数据  用于图片预览
      this.$refs.previewImg.src = blob
      console.log(blob)
      // 防止用户选择同一张图片不触发change事件s
      // this.$refs.file.value = ''
    },
    onUploadCoverConfirm () {
      if (this.uploadCoverActiveName === 'second') {
        if (!this.$refs.file.files[0]) {
          return this.$message.warning('请选择文件！')
        }
        // 执行上传图片操作
        const fd = new FormData()
        fd.append('image', this.$refs.file.files[0])
        uploadCover(fd).then(res => {
          console.log(res)
          if (res.status === 201) {
            // 关闭弹出层
            this.uploadcoverDialogVisible = false
            // 展示图片
            this.$refs.publishImg.src = res.data.data.url
            this.isTextShow = false
            // 将图片的地址发送给父组件
            this.$emit('coverImage', res.data.data.url)
          }
        })
      } else if (this.uploadCoverActiveName === 'first') {
        // 通过ref来访问子组件中的数据   父访问子
        const selectedIndex = this.$refs.materialListRef.selectedIndex
        if (selectedIndex < 0) return this.$message.warning('请您选择图片！')
        // 关闭对话框
        this.uploadcoverDialogVisible = false
        // 展示选中的图片
        this.$refs.publishImg.src = this.$refs.materialListRef.imagesData[
          selectedIndex
        ].url
        this.isTextShow = false
        // 修改父组件数据
        this.$emit(
          'coverImage',
          this.$refs.materialListRef.imagesData[selectedIndex].url
        )
      }
    }
  }
}
</script>
<style lang="less" scoped>
.cover-wrapper {
  position: relative;
  display: inline-block;
  margin-right: 30px;
  margin-bottom: 0px;
  .cover {
    width: 150px;
    height: 150px;
    border: 1px solid #000;
    text-align: center;
    line-height: 150px;
    img {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      background-size: cover;
    }
  }
}
</style>
