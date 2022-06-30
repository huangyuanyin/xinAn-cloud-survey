<template>
  <div class="Layout">
    <el-container>
      <el-header>
        <TopMenu />
      </el-header>
      <el-container>
        <el-aside>
          <!-- <Collapse /> -->
          <TestMenuVue />
        </el-aside>
        <el-main>
          <AppMain />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TopMenu from "./components/TopMenu.vue";
import TestMenuVue from "../../components/TestMenu.vue";
import Collapse from "../../components/CollapseMenu.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import AppMain from '../../components/AppMain.vue'
export default defineComponent({
  components: {
    TopMenu,
    Collapse,
    TestMenuVue,
    Breadcrumb,
    AppMain
  },
  setup() {
    return {
    };
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
    z-index: 999;
  }

  .el-aside {
    height: calc(100vh - 50px);
    width: 210px;
    background-color: rgb(245, 245, 245);
    color: rgb(51, 51, 51);
  }
}
</style>
