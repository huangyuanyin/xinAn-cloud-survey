<template>
  <div class="performanceManagement">
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>概览</el-breadcrumb-item>
    </el-breadcrumb> -->
    <router-view></router-view>
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
</style>
