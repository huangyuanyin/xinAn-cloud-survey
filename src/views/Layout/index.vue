<template>
  <div class="Layout">
    <el-container>
      <el-header>
        <TopMenu />
      </el-header>
      <el-container>
        <AppMain />
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TopMenu from "./componemnts/TopMenu.vue";
import Collapse from "./componemnts/Collapse.vue";
import Breadcrumb from "./componemnts/Breadcrumb.vue";
import AppMain from './componemnts/AppMain.vue'
export default defineComponent({
  components: {
    TopMenu,
    Collapse,
    Breadcrumb,
    AppMain
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.Layout {
  .el-header {
    width: 100%;
    height: 50px;
    background-color: #242f42;
    padding: 0px;
  }

  .el-aside {
    height: calc(100vh - 50px);
    background-color: #fff;
  }

  .el-container {
    z-index: -999;
    height: 50px;
  }
}
</style>
