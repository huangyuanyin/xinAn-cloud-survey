<template>
	<div>
		<el-breadcrumb separator="/" style="margin-bottom: 30px;">
			<el-breadcrumb-item :to="{ path: '/POCTest/overview' }">POC测试</el-breadcrumb-item>
			<el-breadcrumb-item>性能测试任务</el-breadcrumb-item>
		</el-breadcrumb>
		
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { instrumentManagementData } from "./data.js"
export default defineComponent({
	setup() {
		const tableData = ref(instrumentManagementData)
		const handleClick = () => {
			console.log('click')
		}
		const toAddTask = () => { }
		return {
			tableData, handleClick, toAddTask
		}
	},
})
</script>