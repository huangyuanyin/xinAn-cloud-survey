<template>
  <el-card>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="任务ID">
        <el-input v-model="formInline.id" placeholder="请输入..." />
      </el-form-item>
      <el-form-item label="测试时间">
        <el-col :span="11">
          <el-date-picker
            v-model="formInline.date1"
            type="date"
            placeholder="请选择开始时间..."
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="formInline.date2"
            placeholder="请选择结束时间..."
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="测试结果状态">
        <el-select v-model="formInline.status" placeholder="请输入...">
          <el-option label="Need confirm" value="Need confirm" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="设备型号">
        <el-select v-model="formInline.apv_model" placeholder="请输入...">
          <el-option label="APV5860" value="APV5860" />
          <el-option label="ArrayAPV7850" value="ArrayAPV7850" />
        </el-select>
      </el-form-item>
      <el-form-item label="ipversion">
        <el-select v-model="formInline.ipversion" placeholder="请输入...">
          <el-option label="IPv4" value="IPv4" />
          <el-option label="IPv6" value="IPv6" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQuery">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%; margin-top: 10px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        property="id"
        label="任务ID"
        width="120"
        align="center"
      />
      <!-- <el-table-column property="stamp" label="任务执行标识" width="120" />
    <el-table-column property="resultid" label="测试结果ID" width="120" /> -->
      <el-table-column label="测试时间" width="200" align="center">
        <template #default="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column
        property="status"
        label="测试结果状态"
        width="120"
        align="center"
      />
      <el-table-column
        property="apv_model"
        label="设备型号"
        width="200"
        align="center"
      />
      <el-table-column
        property="build"
        label="版本"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        property="ipversion"
        label="ipversion"
        width="120"
        align="center"
      />
      <el-table-column property="test_case" label="测试用例" align="center" />
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toDataAnalysis()" type="primary"> 数据分析 </el-button>
      <el-button @click="clearSelection()">重新选择</el-button>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
import { datas } from "@/api/POC/index.js";
import { filterData } from "../../../utils/util.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    const router = useRouter();
    const multipleTableRef = ref();
    const multipleSelection = ref([]);
    const tableData = ref([]);
    const formInline: any = reactive({
      id: "",
      user: "",
      date1: "",
      date2: "",
      status: "",
      apv_model: "",
      ipversion: "",
      build: "",
    });
    const onQuery = () => {
      getDatas(filterData(formInline));
    };
    const onReset = () => {
      Object.keys(formInline).map((key) => {
        formInline[key] = "";
      });
    };
    const clearSelection = () => {
      // if (rows) {
      //   rows.forEach((row) => {
      //     // TODO: improvement typing when refactor table
      //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //     multipleTableRef.value!.toggleRowSelection(row);
      //     router.push("/POCTest/dataAnalysis");
      //   });
      // } else {
      //   multipleTableRef.value!.clearSelection();
      // }
      multipleTableRef.value!.clearSelection();
    };
    const handleSelectionChange = (val) => {
      multipleSelection.value = val;
      console.log("选中的...", multipleSelection.value);
    };
    // 数据分析
    const toDataAnalysis = () => {
      if (multipleSelection.value.length !== 2) {
        ElMessage({
          message: "请选择两组数据进入数据对比....",
          type: "warning",
        });
        return;
      }
      sessionStorage.setItem(
        "dataList",
        JSON.stringify(multipleSelection.value)
      );
      router.push("/POCTest/dataAnalysis");
    };
    const getDatas = async (params) => {
      const res = await datas(params);
      if (res.code == 1000) {
        tableData.value = res.data;
      }
      console.log("测试数据...", tableData.value);
    };
    onMounted(() => {
      getDatas(filterData(formInline));
    });
    return {
      router,
      formInline,
      onQuery,
      onReset,
      multipleTableRef,
      multipleSelection,
      tableData,
      clearSelection,
      handleSelectionChange,
      toDataAnalysis,
      getDatas,
    };
  },
});
</script>

<style lang="scss" scoped>
.text-center {
  display: flex;
  justify-content: center;
}
</style>
