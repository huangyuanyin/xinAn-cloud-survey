<template>
  <div class="performanceManagement">
    <!--此文件用于解决三级路由跳转 路径改变页面不改变问题-->
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
