<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    background-color="#00142a"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0" class="logo">
      <img :src="logo" />
      信安云测平台
    </el-menu-item>
    <el-menu-item index="1">测试中心</el-menu-item>
    <el-menu-item index="2">性能测试</el-menu-item>
    <el-menu-item index="3">接口测试</el-menu-item>
    <el-menu-item index="4">测试工具</el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import logo from "@/assets/logo.png";
export default defineComponent({
  setup() {
    const activeIndex = ref("1");
    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    return {
      logo,
      activeIndex,
      handleSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-menu-demo {
  .logo {
    padding-left: 0px;
    width: 220px;
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    vertical-align: middle;
    img {
      width: 40px;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
  .flex-grow {
    flex-grow: 1;
  }
  ::v-deep .el-menu-item {
    color: #fff;
  }
  ::v-deep .el-sub-menu__title {
    color: #fff;
  }
}
.el-menu--horizontal {
  border-bottom: 0px;
}
</style>>