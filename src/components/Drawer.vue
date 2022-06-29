<template>
  <div class="drawer-wrapper">
    <el-drawer v-model="isDrawer" :direction="direction" :append-to-body="false" :z-index="-1" :with-header="false">
      <el-menu default-active="POCTest" class="el-menu-vertical-demo" @select="handleClose" router>
        <el-menu-item class="elMenu">
          <el-icon>
            <Setting />
          </el-icon>
          <span>产品与服务</span>
          <el-icon class="arrow">
            <ArrowRight />
          </el-icon>
        </el-menu-item>
        <el-menu-item index="/POCTest/overview">
          <el-icon>
            <IconMenu />
          </el-icon>
          <span>POC测试</span>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Location />
            </el-icon>
            <span>文件管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">文件管理一</el-menu-item>
            <el-menu-item index="1-2">文件管理二</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="/test">
          <el-icon>
            <Setting />
          </el-icon>
          <span>测试</span>
        </el-menu-item>
      </el-menu>
      <span class="close" @click="handleClose">
        <el-icon>
          <Close />
        </el-icon>
      </span>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  ArrowRight,
  Close
} from '@element-plus/icons-vue';
export default defineComponent({
  components: {
    IconMenu, Document, Location, Setting, ArrowRight, Close
  },
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const direction = ref("ltr");
    const isDrawer = computed({
      get() {
        return props.drawer;
      },
      set(value) {
        emit("changeDrawer", value)
        return value;
      },
    });
    const handleClose = () => {
      isDrawer.value = false
    }
    return {
      direction, isDrawer, handleClose
    };
  },
});
</script>

<style lang="scss" scoped>
.drawer-wrapper {
  ::v-deep .el-drawer__header {
    margin-bottom: 0px;
    padding: 0px;
  }

  ::v-deep .el-drawer__body {
    padding: 0px;
  }

  ::v-deep .el-overlay {
    top: 50px;
  }

  .el-menu-vertical-demo {
    height: 100vh;
    width: 240px;

    .elMenu {
      background-color: #ebebeb;
    }

    .arrow {
      position: absolute;
      top: 50%;
      right: var(--el-menu-base-level-padding);
      margin-top: -7px;
      font-size: 12px;
      margin-right: 0;
      width: inherit;
    }
  }

  .close {
    display: inline-block;
    position: absolute;
    top: 20px;
    right: 20px;
    line-height: 20px;
    font-size: 16px;
    cursor: pointer;
  }
  ::v-deep .el-menu-item-group__title {
    padding: 0px;
  }
}
</style>
