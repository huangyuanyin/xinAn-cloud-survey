<template>
  <el-menu default-active="overview" class="el-menu-vertical-demo" :collapse="false" active-text-color="rgb(85, 85, 85)"
    background-color="rgb(245, 245, 245)" text-color="rgb(51, 51, 51)" router>
    <el-menu-item disabled>
      <template #title>POC测试</template>
    </el-menu-item>
    <el-menu-item index="overview">
      <el-icon>
        <document />
      </el-icon>
      <template #title>概览</template>
    </el-menu-item>
    <el-sub-menu index="performanceManagement">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>性能管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/POCTest/deviceManagement">设备管理</el-menu-item>
        <el-menu-item index="1-2">模板管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="4">
      <el-icon>
        <document />
      </el-icon>
      <template #title>性能测试</template>
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

  .el-menu-item.is-disabled {
    opacity: 100%;
    cursor: context-menu;
  }

  ::v-deep .el-menu-item-group__title {
    padding: 0px;
  }
}
</style>
