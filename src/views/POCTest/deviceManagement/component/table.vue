<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="date" label="Date" width="150" align="center" />
    <el-table-column prop="name" label="Name" width="120" align="center" />
    <el-table-column prop="state" label="State" width="120" align="center" />
    <el-table-column prop="city" label="City" width="120" align="center" />
    <el-table-column prop="address" label="Address" width="600" align="center" />
    <el-table-column prop="zip" label="Zip" width="120" align="center" />
    <el-table-column fixed="right" label="Operations" width="120" align="center">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { instrumentManagementData } from "../data.js"
export default defineComponent({
  setup() {
    const tableData = ref(instrumentManagementData)
    const handleClick = () => {
      console.log('click')
    }
    return {
      tableData, handleClick,
    }
  },
})
</script>