<template>
  <div class="Layout">
    <el-container>
      <el-header>
        <TopMenu />
      </el-header>
      <el-container>
        <el-aside width="200px">菜单</el-aside>
        <el-main>内容</el-main>
      </el-container>
    </el-container>
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
  .el-header {
    width: 100%;
    height: 50px;
    background-color: #242f42;
    padding-left: 0px;
  }
  .el-aside {
    height: calc(100vh - 50px);
    background-color: #fff;
  }
}
</style>
