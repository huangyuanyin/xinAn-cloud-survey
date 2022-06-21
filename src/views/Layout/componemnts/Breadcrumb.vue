<template>
  <div class="breadcrumb">
    <el-icon v-if="isCollapse" @click="handleOpen"><Expand /></el-icon>
    <el-icon v-else @click="handleClose"><Fold /></el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import { ref } from "vue";
export default defineComponent({
  components: {
    Expand,
    Fold,
  },
  setup() {
    const isCollapse = ref<Boolean>(false);
    const handleOpen = () => {
      isCollapse.value = false;
      console.log("打开", isCollapse.value);
    };
    const handleClose = () => {
      isCollapse.value = true;
      console.log("关闭", isCollapse.value);
    };

    return {
      isCollapse,
      handleOpen,
      handleClose,
      Expand,
      Fold,
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