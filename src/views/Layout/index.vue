<template>
  <div class="Layout">
    <!-- {{store.userInfo}} -->
    <div class="header">
      <TopMenu />
    </div>
    <div class="body">
      <div class="left">
        <Collapse />
      </div>
      <div class="right">
        <Breadcrumb />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TopMenu from "./componemnts/TopMenu.vue";
import Collapse from "./componemnts/Collapse.vue";
import Breadcrumb from "./componemnts/Breadcrumb.vue";
export default defineComponent({
  components: {
    TopMenu,
    Collapse,
    Breadcrumb,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.Layout {
  height: 100vh;
  overflow: hidden;
  .header {
    width: 100%;
  }
  .body {
    height: 100%;
    display: flex;
    .left {
      height: 100%;
    }
    .right {
      flex: 1;
      height: 100%;
    }
  }
}
</style>
