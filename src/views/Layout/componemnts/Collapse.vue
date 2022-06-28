<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="false" active-text-color="rgb(85, 85, 85)"
    background-color="rgb(245, 245, 245)" text-color="rgb(51, 51, 51)">
    <el-menu-item index="1">
      <el-icon>
        <icon-menu />
      </el-icon>
      <template #title>Dashboard</template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>文件管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">测试数据</el-menu-item>
        <el-menu-item index="1-2">项目jar包</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="3">
      <el-icon>
        <icon-menu />
      </el-icon>
      <template #title>资产管理</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <document />
      </el-icon>
      <template #title>日志管理</template>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon>
        <setting />
      </el-icon>
      <template #title>系统监控</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { Document, IconMenu, Location, Setting },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
}

// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   height: 100%;
// }
</style>
