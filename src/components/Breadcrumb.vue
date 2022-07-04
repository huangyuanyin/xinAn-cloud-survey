<template>
  <div class="breadcrumb">
    <el-icon v-if="store.getCollapse" @click="handleClick(false)">
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
import { useAppStore } from "../store/modules/app/index";
export default defineComponent({
  components: {
    Expand,
    Fold,
  },
  setup() {
    const route = useRoute();
    const store = useAppStore();
    const matchedList = ref([]);
    const handleClick = (val) => {
      store.handleCollapse(val);
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
      store,
      matchedList,
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
  cursor: pointer;
  .el-breadcrumb {
    display: inline-flex;
    height: 16px;
  }
}
</style>