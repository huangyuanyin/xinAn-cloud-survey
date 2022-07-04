<template>
  <!--一级菜单下面所拥有的二级菜单-->
  <TestMenuVue :menuList="menuList" />
  <!--以及二级菜单所对应的页面-->
  <el-main>
    <router-view></router-view>
  </el-main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import TestMenuVue from "../../components/TestMenu.vue";
import { POCTestMenuData } from "../../data/menu";
export default defineComponent({
  components: {
    TestMenuVue,
  },
  setup() {
    const router = useRouter();
    const menuList = ref(POCTestMenuData);
    return {
      router,
      menuList,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
