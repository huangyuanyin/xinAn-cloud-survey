<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="1">
      <el-icon><icon-menu /></el-icon>
      <template #title>Dashboard</template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><location /></el-icon>
        <span>文件管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">测试数据</el-menu-item>
        <el-menu-item index="1-2">项目jar包</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="3">
      <el-icon><icon-menu /></el-icon>
      <template #title>资产管理</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><document /></el-icon>
      <template #title>日志管理</template>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon><setting /></el-icon>
      <template #title>系统监控</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  border-right: 0px;
}
</style>
