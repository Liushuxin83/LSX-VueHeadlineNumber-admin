<template>
  <div>
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/welcome' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>发布文章</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- form表单 -->
      <el-form
        ref="publishArticlesRef"
        :model="publishArticlesForm"
        label-width="80px"
        class="publish-articles"
      >
        <el-form-item label="标题：">
          <el-input v-model="publishArticlesForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input v-model="publishArticlesForm.content"></el-input>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="publishArticlesForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="publishArticlesForm.cover.type > 0">
          <div>
            <!-- 如果当给子组件提供的数据既要使用又要修改，这个时候可以在组件上使用v-model -->
            <upload-cover
              v-for="(item, index) in publishArticlesForm.cover.type"
              :key="item"
              @coverImage="coverImage(index, $event)"
            />
          </div>
        </template>
        <el-form-item label="频道：">
          <el-select
            v-model="publishArticlesForm.channel_id"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in channelsData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="onPublishArticles"
          >发布文章</el-button
        >
        <el-button @click="onPublishArticles(true)">存入草稿</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getArticlesChannel } from '../../api/article'
import { publishArticles } from '../../api/publishArticles'
import UploadCover from '../publishArticles/UploadCover'
export default {
  name: 'PubishArticles',
  data () {
    return {
      publishArticlesForm: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      // 频道数据
      channelsData: []
    }
  },
  created () {
    this.getArticlesChannel()
  },
  components: {
    UploadCover
  },
  methods: {
    async getArticlesChannel () {
      const { data } = await getArticlesChannel()
      this.channelsData = data.data.channels
    },
    // 点击发布文章
    async onPublishArticles (draft = false) {
      const res = await publishArticles(this.publishArticlesForm, draft)
      // console.log(res)
      if (res.status !== 201) return this.$message.error('该操作失败了哦！')
      this.$message({
        message: '恭喜你，该操作成功了！',
        type: 'success'
      })
    },
    // 接收子组件传过来的  image的url
    coverImage (index, url) {
      console.log(index, url)
      this.publishArticlesForm.cover.images[index] = url
    }
  },
  watch: {
    // 'publishArticlesForm.cover.type': {
    //   handler () {
    //     if (
    //       this.publishArticlesForm.cover.type === 0 ||
    //       this.publishArticlesForm.cover.type === -1
    //     ) { this.publishArticlesForm.cover.images = [] }
    //   }
    // }
  }
}
</script>
<style lang="less" scoped>
.publish-articles {
  margin-top: 30px;
}
</style>
