<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/welcome' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>个人设置</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- form表单 -->
      <el-row :gutter="100">
        <el-col :span="10">
          <el-form
            ref="form"
            :model="personalSettingsForm"
            label-width="80px"
            class="personal-settings"
          >
            <el-form-item label="编号：">{{ userId }}</el-form-item>
            <el-form-item label="手机：">{{ userPhone }}</el-form-item>
            <el-form-item label="用户名：">
              <el-input v-model="personalSettingsForm.name"></el-input>
            </el-form-item>
            <el-form-item label="介绍：">
              <el-input
                type="textarea"
                v-model="personalSettingsForm.intro"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
              <el-input v-model="personalSettingsForm.email"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary">保存</el-button>
        </el-col>
        <el-col :span="14">
          <label for="file">
            <el-image
              style="width: 200px; height: 200px"
              :src="userPhoto"
              fit="cover"
            ></el-image>
            <p style="fontSize:30px;color:red">
              点击修改头像
            </p>
          </label>
          <input
            type="file"
            id="file"
            ref="file"
            hidden
            @change="onSelectImage"
          />
        </el-col>
      </el-row>
    </el-card>
    <!-- 当选择图片之后 展示图片的弹出层 -->
    <el-dialog
      title="提示"
      :visible.sync="previewImgDialogVisible"
      width="500px"
      append-to-body
      @opened="previewImgDialogOpened"
    >
      <div class="previewImgWrapper">
        <img :src="previewImg" alt="" ref="previewImg" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="previewImgDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="previewImgDialogConfirm"
          :loading="confirmChangePhotoLoading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getUserInfo, updatedUserPhoto } from '../../api/user'
// 导入 裁剪插件
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import bus from '../../utils/global-bus'
export default {
  name: 'PersonalSettings',
  data () {
    return {
      personalSettingsForm: {
        name: '',
        intro: '',
        email: ''
      },
      userId: null,
      userPhone: null,
      userPhoto: null,
      previewImgDialogVisible: false,
      // 预览图片
      previewImg: '',
      // 用来保存初始化好的cropperjs对象  ，便于多个地方访问该对象中的方法
      cropper: null,
      // 给确定更改图片 的确定按钮增加loading效果
      confirmChangePhotoLoading: false
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      getUserInfo().then(res => {
        this.personalSettingsForm.name = res.data.data.name
        this.personalSettingsForm.intro = res.data.data.intro
        this.personalSettingsForm.email = res.data.data.email
        this.userId = res.data.data.id
        this.userPhone = res.data.data.mobile
        this.userPhoto = res.data.data.photo
      })
    },
    // 点击选择图片
    onSelectImage () {
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      const file = this.$refs.file
      // console.log(file.files[0])
      const blobData = window.URL.createObjectURL(file.files[0]) // 获取图片的url   H5的api
      // console.log(blobData)
      this.previewImg = blobData
      // 当用户选择图片之后展示弹出层 预览图片
      this.previewImgDialogVisible = true
      // 解决选择相同文件不触发input type="file" 的change事件问题
      this.$refs.file.value = ''
    },
    // 裁剪图片插件必须基于图片进行初始化  此时img必须是可见状态才能正常完成 cropperjs的初始化,所以在dialog关闭后初始化cropperjs
    previewImgDialogOpened () {
      // 当第一次初始化好 cropperjs之后，如果预览的图片发生了变化，裁剪器不会更新，解决方法：方式一：使用裁切器的replace方法，
      // 方式二：销毁裁剪器，重新初始化
      if (this.cropper) {
        this.cropper.replace(this.previewImg)
        return
      }
      // 要裁剪的图片元素
      const image = this.$refs.previewImg
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        // 防止裁剪器被拖出到图片外
        viewMode: 1,
        // 不可随意拖裁剪器s
        dragMode: 'none',
        background: false
        // 移动裁剪器会触发 crop方法
        // crop (event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      })
    },
    // dialog关闭之后 解决裁剪器图片不发生变化
    previewImgDialogConfirm () {
      this.confirmChangePhotoLoading = true
      // 获取裁剪的图片对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        // console.log(file)
        const fd = new FormData()
        // photo 为请求数据接口中的body参数
        fd.append('photo', file)
        // console.log(fd)
        // 请求更换图片数据接口
        updatedUserPhoto(fd).then(res => {
          // console.log(res)
          if (res.status === 201) {
            this.previewImgDialogVisible = false
            // 数据请求成功之后 更新页面
            // 方式一：使用服务器的图片地址
            // this.userPhoto = res.data.data.photo
            // 方式二：直接把裁剪结果的文件对象转为blob数据 本地预览
            this.userPhoto = window.URL.createObjectURL(file)
            this.$message.success('更换头像成功')
            this.confirmChangePhotoLoading = false
            bus.$emit('updateUserPhoto', this.userPhoto)
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.personal-settings {
  margin-top: 30px;
}
.previewImgWrapper img {
  display: block;
  max-width: 100%;
  height: 300px;
}
</style>
