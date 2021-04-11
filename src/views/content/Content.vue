<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 顶部面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/welcome' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /顶部面包屑 -->
      </div>
      <!-- form表单 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select
            v-model="form.channels"
            placeholder="请选择文章频道"
            clearable
          >
            <el-option
              v-for="item in articleChannels"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            clearable
            v-model="form.date"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onScreenClick" :disabled="loading"
            >筛选</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table-card">
      <!-- 表格区域 -->
      <el-table
        :data="articlesTableData"
        style="width: 100%"
        size="mini"
        v-loading="loading"
      >
        <el-table-column label="封面" width="180">
          <template v-slot="scope">
            <div v-if="scope.row.cover.images">
              <img
                v-if="scope.row.cover.images[0]"
                :src="scope.row.cover.images[0]"
                class="imageWidth"
              />
              <img v-else src="../../assets/noImg.jpeg" class="imageWidth" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template v-slot="scope">
            <div>
              <el-tag :type="articlesStatus[scope.row.status].type">
                {{ articlesStatus[scope.row.status].text }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[25, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :disabled="isPaginationDisabled"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { getArticlesData, getArticlesChannel } from '../../api/article'
export default {
  name: 'Content',
  data () {
    return {
      form: {
        date: '',
        name: '',
        channels: null,
        // 查询文章的状态，不传的话就是全部
        status: null
      },
      articlesTableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      articlesStatus: [
        { text: '草稿', status: 0, type: 'info' },
        { text: '待审核', status: 1, type: '' },
        { text: '审核通过', status: 2, type: 'success' },
        { text: '审核失败', status: 3, type: 'warning' },
        { text: '已删除', status: 4, type: 'danger' }
      ],
      // 文章频度数据
      articleChannels: [],
      begin_pubdate: '',
      end_pubdate: '',
      // table是否 loading
      loading: false,
      // 控制分页是否被禁用
      isPaginationDisabled: false
    }
  },
  created () {
    this.getArticlesData()
    this.getArticlesChannel()
  },
  methods: {
    timeHander (time) {
      if (time < 10) {
        return `0${time}`
      }
    },
    // 获取文章数据
    async getArticlesData () {
      this.loading = true
      this.isPaginationDisabled = true
      if (this.form.date) {
        let begin = new Date(this.form.date[0])
        let end = new Date(this.form.date[1])
        let yB = begin.getFullYear()
        let yE = end.getFullYear()
        let mB = begin.getMonth() + 1
        let mE = end.getMonth() + 1
        let dB = begin.getDate()
        let dE = end.getDate()
        mB = this.timeHander(mB)
        mE = this.timeHander(mE)
        dB = this.timeHander(dB)
        dE = this.timeHander(dE)
        this.begin_pubdate = `${yB}-${mB}-${dB}`
        this.end_pubdate = `${yE}-${mE}-${dE}`
      }
      const res = await getArticlesData({
        page: this.pageNum,
        per_page: this.pageSize,
        status: this.form.status,
        channel_id: this.form.channels,
        begin_pubdate: this.begin_pubdate,
        end_pubdate: this.end_pubdate
      })
      console.log(res)
      if (res.status !== 200) return this.$message.error('获取文章数据失败')
      this.$message.success('获取文章数据成功')
      this.begin_pubdate = ''
      this.end_pubdate = ''
      this.articlesTableData = res.data.data.results
      this.total = res.data.data.total_count
      this.loading = false
      this.isPaginationDisabled = false
    },
    // 获取文章频度
    async getArticlesChannel () {
      const res = await getArticlesChannel()
      // console.log(res)
      if (res.status !== 200) return this.$message.error('获取文章频度数据失败')
      this.articleChannels = res.data.data.channels
    },
    handleSizeChange (newSize) {
      // console.log(newSize);
      this.pageSize = newSize
      this.getArticlesData()
    },
    handleCurrentChange (newPage) {
      // console.log(newPage);
      this.pageNum = newPage
      this.getArticlesData()
    },
    onScreenClick () {
      // console.log(111);
      this.getArticlesData()
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .table-card {
  margin-top: 20px;
}
.imageWidth {
  width: 100px;
  height: 80px;
  background-size: cover;
}
</style>
