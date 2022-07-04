<template>
  <div class="breadcrumb">
    <el-icon v-if="isCollapse" @click="handleClick(false)">
      <Expand />
    </el-icon>
    <el-icon v-else @click="handleClick(true)"><Fold /></el-icon>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in matchedList"
        :key="'matchedList' + index"
        :to="{ path: item.path }"
      >
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  components: {
    Expand,
    Fold,
  },
  setup() {
    const route = useRoute();
    const matchedList = ref([]);
    const isCollapse = ref<Boolean>(true);
    const handleClick = (val) => {
      isCollapse.value = val;
    };
    watch(
      () => route.path,
      (newPath, oldPath) => {
        matchedList.value = route.matched;
      },
      { immediate: true }
    );
    return {
      route,
      matchedList,
      isCollapse,
      handleClick,
      Expand,
      Fold,
    };
  },
});
</script>

<style lang="scss" scoped>
.breadcrumb {
  padding-bottom: 20px;
  .el-breadcrumb {
    display: inline-flex;
    height: 16px;
  }
}
</style>