<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入任务" v-model="inputTask" clearable>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="onAddTask">添加事项</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="computedTodoList" style="width: 100%">
        <el-table-column label="是否完成" width="80">
          <template slot-scope="scope">
            <div>
              <el-checkbox
                v-model="scope.row.done"
                @change="onCheckboxChange(scope.row, $event)"
              ></el-checkbox>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="info" label="任务信息" width="500">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <div>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="onDelTask(scope.row)"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-checkbox v-model="isAllChecked"></el-checkbox>
        <span>剩余{{ unDoneLength }}条任务未完成</span>
        <el-radio-group
          v-model="isAll"
          class="is-all"
          @change="onRadioBtnChange"
        >
          <el-radio-button :label="1">全部</el-radio-button>
          <el-radio-button :label="0">未完成</el-radio-button>
          <el-radio-button :label="-1">已完成</el-radio-button>
        </el-radio-group>
        <el-button type="warning" @click="onClearTask">清除已完成</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'TodoList',
  data () {
    return {
      // tableData: [],
      // 输入任务
      // inputTask: ''
      isAll: 1
    }
  },
  created () {
    this.$store.dispatch('getToDoListData')
  },
  computed: {
    ...mapState(['todoList']),
    inputTask: {
      get () {
        return this.$store.state.inputTask
      },
      set (newVal) {
        this.$store.commit('setInputTask', newVal)
      }
    },
    ...mapGetters(['unDoneLength', 'computedTodoList']),
    // 通过计算属性来控制全选框的选中与否
    isAllChecked: {
      get () {
        // 如果单选框全部选中返回true，有一个没有选中返回false
        return this.computedTodoList.every(item => item.done)
      },
      set (newVal) {
        // 只要isAllChecked发生变化就会触发set函数，并且有一个newValue的参数，然后在通过forEach来改变computedTodoList数组中的选中状态
        this.computedTodoList.forEach(item => {
          item.done = newVal
        })
      }
    }
  },
  methods: {
    onAddTask () {
      if (this.inputTask.trim().length <= 0) {
        return this.$message.warning('添加事项不能为空!')
      }
      this.$store.commit('addTask')
    },
    onDelTask (row) {
      // console.log(row.id)
      this.$store.commit('delTask', row.id)
    },
    onCheckboxChange (row, val) {
      // console.log(row.id, val)
      const params = {
        id: row.id,
        status: val
      }
      this.$store.commit('changeCheckStatus', params)
    },
    // 清除勾选任务
    onClearTask () {
      this.$store.commit('clearTask')
    },
    // 切换全部，未完成，已完成
    onRadioBtnChange () {
      // console.log(this.isAll)
      this.$store.commit('changeViewKey', this.isAll)
    }
  }
}
</script>
<style lang="less" scoped>
.is-all {
  margin-left: 100px;
  margin-right: 100px;
}
</style>
