<template>
  <div class="performanceManagement">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>性能管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const data = reactive({
    })
    return {
      router, data
    }
  },
})
</script>

<style lang="scss" scoped>
.performanceManagement {
  margin: 16px 0 0 16px;
}
</style>
