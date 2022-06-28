<template>
  <router-view :key="key"></router-view>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import Collapse from "./CollapseMenu.vue";
export default defineComponent({
  components: {
    Collapse
  },
  setup() {
    const route = useRoute()
    const key = computed(() => {
      return route.path
    })
    return {
      route,
      key
    }
  },
})
</script>

<style lang="scss" scoped>
.el-aside {
  width: 210px;
  height: calc(100vh - 50px);
}
</style>
