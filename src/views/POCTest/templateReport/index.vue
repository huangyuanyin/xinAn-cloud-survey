<template>
  <el-card>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="任务ID">
        <el-input v-model="formInline.id" placeholder="请输入..." />
      </el-form-item>
      <el-form-item label="测试时间">
        <el-col :span="11">
          <el-date-picker v-model="formInline.date1" type="date" placeholder="请选择开始时间..." style="width: 100%" />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker v-model="formInline.date2" placeholder="请选择结束时间..." style="width: 100%" />
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

    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%; margin-top: 10px"
      @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column property="id" label="任务ID" width="120" align="center">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="toDetail(scope.row.id)">{{ scope.row.id }}</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column property="stamp" label="任务执行标识" width="120" />
    <el-table-column property="resultid" label="测试结果ID" width="120" /> -->
      <el-table-column label="测试时间" width="200" align="center">
        <template #default="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column property="status" label="测试结果状态" width="120" align="center" />
      <el-table-column property="apv_model" label="设备型号" width="200" align="center" />
      <el-table-column property="build" label="版本" show-overflow-tooltip align="center" />
      <el-table-column property="ipversion" label="ipversion" width="120" align="center" />
      <el-table-column property="test_case" label="测试用例" align="center" />
      <el-table-column fixed="right" label="Operations" width="120" align="center">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="openReportDialog(scope.row.id)">生成报告</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toDataAnalysis()" type="primary"> 数据分析 </el-button>
      <el-button @click="clearSelection()">重新选择</el-button>
    </div>
  </el-card>
  <DataTemplateDialog :dialogData="dialogData" :isShowDialog="isShowDialog" @closeDialog="closeDialog" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
import { datas } from "@/api/POC/index.js";
import { filterData } from "../../../utils/util.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { getDataApi } from "../../../utils/getApi.js"
import DataTemplateDialog from './components/dataTemplateDialog.vue';
export default defineComponent({
  components: {
    DataTemplateDialog
  },
  setup() {
    const router = useRouter();
    const multipleTableRef = ref();
    const multipleSelection = ref([]);
    const tableData = ref([]);
    const dialogData = ref([])
    const isShowDialog = ref(false)
    const loading = ref(false)
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
      if (multipleSelection.value.length < 2) {
        ElMessage({
          message: "请至少选择两组数据进入数据对比....",
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
    // 生成报告
    const openReportDialog = (id) => {
      isShowDialog.value = true
      getDataApi(id).then(res => {
        dialogData.value = res[0];
      })
    }
    const closeDialog = () => {
      isShowDialog.value = false
    }
    // 报告详情
    const toDetail = (id) => {
      router.push({
        path: "/POCTest/reportDetail",
        query: {
          resultid: id
        }
      })
    }
    const getDatas = async (params) => {
      loading.value = true
      const res = await datas(params);
      if (res.code == 1000) {
        setTimeout(() => {
          loading.value = false
        }, 500);
        tableData.value = res.data;
      } else {
        setTimeout(() => {
          loading.value = false
        }, 500);
      }
    };
    onMounted(() => {
      getDatas(filterData(formInline));
    });
    return {
      loading,
      dialogData,
      isShowDialog,
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
      openReportDialog,
      closeDialog,
      toDetail
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
