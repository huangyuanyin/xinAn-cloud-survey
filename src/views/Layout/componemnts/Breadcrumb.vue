<template>
  <div class="breadcrumb">
    <el-icon v-if="isCollapse" @click="handleClick(false)">
      <Expand />
    </el-icon>
    <el-icon v-else @click="handleClick(true)"><Fold /></el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import { ref } from "vue";
import { mainStore } from "@/store/index.js";
export default defineComponent({
  components: {
    Expand,
    Fold,
  },
  setup() {
    const isCollapse = ref<Boolean>(false);
    const store = mainStore();

    const handleClick = (val) => {
      isCollapse.value = val;
      store.changeCollapse(isCollapse.value);
    };

    return {
      isCollapse,
      handleClick,
      Expand,
      Fold,
      store,
    };
  },
});
</script>

<style lang="scss" scoped>
.breadcrumb {
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
}
</style>