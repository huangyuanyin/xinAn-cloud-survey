<script setup>
import * as echarts from "echarts";
import { provide } from "vue";
provide("echarts", echarts);
</script>

<template>
  <router-view></router-view>
</template>

<style>
body {
  margin: 0px;
}
</style>
