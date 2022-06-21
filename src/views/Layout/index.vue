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

<script lang="ts" setup>
import { mainStore } from "@/store/index.js";
import TopMenu from "./componemnts/TopMenu.vue";
import Collapse from "./componemnts/Collapse.vue";
import Breadcrumb from "./componemnts/Breadcrumb.vue";

const store = mainStore();
</script>

<style lang="scss" scoped>
.Layout {
  height: 100vh;
  overflow: hidden;
  .header {
    width: 100%;
    height: 55px;
  }
  .body {
    height: 100%;
    display: flex;
    .left {
      width: 200px;
      height: 100%;
    }
    .right {
      flex: 1;
      height: 100%;
    }
  }
}
</style>
