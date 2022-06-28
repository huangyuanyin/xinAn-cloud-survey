<template>
  <div class="performanceManagement">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="仪表管理" name="instrumentManagement">
        <el-button type="primary" @click="dialogVisible = true">添加设备</el-button>
        <Table />
      </el-tab-pane>
      <el-tab-pane label="被测设备管理" name="second">被测设备管理</el-tab-pane>
      <el-tab-pane label="交换机管理" name="third">交换机管理</el-tab-pane>
      <el-tab-pane label="build管理" name="fourth">build管理</el-tab-pane>
    </el-tabs>

    <el-dialog v-model="dialogVisible" title="添加设备" width="30%" :before-close="handleClose">
      <span>
        <el-form :inline="false" :model="formInline" class="demo-form-inline">
          <el-form-item label="设备接口情况">
            <el-input v-model="formInline.user" placeholder="请输入..." />
          </el-form-item>
          <el-form-item label="设备状态探测">
            <el-select v-model="formInline.region" placeholder="请输入...">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit">添加</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref, reactive } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Table from "./component/table.vue"
import { ElMessageBox } from 'element-plus'
export default defineComponent({
  components: { Table },
  setup() {
    const activeName = ref('instrumentManagement')
    const dialogVisible = ref(false)
    const formInline = reactive({
      user: '',
      region: '',
    })
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }
    const onSubmit = () => {
      console.log('submit!')
      dialogVisible.value = false
    }
    const handleClose = (done: () => void) => {
      // ElMessageBox.confirm('Are you sure to close this dialog?')
      //   .then(() => {
      //     done()
      //   })
      //   .catch(() => {
      //     // catch error
      //   })
      dialogVisible.value = false
    }
    return {
      activeName, dialogVisible, formInline, handleClick, handleClose, onSubmit
    }
  },
})
</script>

<style lang="scss" scoped>
.tabs {
  margin-top: 20px;
}
</style>
