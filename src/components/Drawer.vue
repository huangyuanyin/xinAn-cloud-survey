<template>
  <div class="">
    <el-drawer
      v-model="isDrawer"
      :direction="direction"
      :append-to-body="false"
      :z-index="10"
    >
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const direction = ref("ltr");
    const isDrawer = computed({
      get() {
        return props.drawer;
      },
      set(value) {
        return value;
      },
    });
    return { direction, isDrawer };
  },
});
</script>

<style lang="scss" scoped>
::v-deep .el-overlay {
  top: 50px;
}
</style>
