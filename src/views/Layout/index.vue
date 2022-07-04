<template>
  <div class="Layout">
    <el-container>
      <el-header>
        <TopMenu />
      </el-header>
      <el-container>
        <!-- <el-aside>
          <TestMenuVue />
        </el-aside>
        <el-main>
          <MainContent />
        </el-main> -->
        <router-view :key="key"></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import TopMenu from "./components/TopMenu.vue";
// import MainContent from "./components/MainContent.vue";
import TestMenuVue from "../../components/TestMenu.vue";
import Collapse from "../../components/CollapseMenu.vue";
export default defineComponent({
  components: {
    TopMenu,
    // MainContent,
    Collapse,
    TestMenuVue,
  },
  setup() {
    const route = useRoute();
    const key = computed(() => {
      return route.path;
    });
    return { route, key };
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
}
</style>
