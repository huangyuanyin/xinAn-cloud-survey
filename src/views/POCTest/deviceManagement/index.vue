<template>
  <div class="performanceManagement">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="仪表管理" name="instrumentManagement">
        <el-button type="primary" @click="dialogVisible = true" style="margin-bottom: 20px">添加设备</el-button>
        <el-table :data="tableData">
          <el-table-column fixed prop="date" label="Date" width="150" align="center" />
          <el-table-column prop="name" label="Name" width="120" align="center" />
          <el-table-column prop="state" label="State" width="120" align="center" />
          <el-table-column prop="city" label="City" width="120" align="center" />
          <el-table-column prop="address" label="Address" width="600" align="center" />
          <el-table-column prop="zip" label="Zip" width="120" align="center" />
          <el-table-column fixed="right" label="Operations" align="center">
            <template #default>
              <el-button link type="primary" size="small" @click="handleDedit">编辑</el-button>
              <el-button link type="primary" size="small" @click="termailDialogVisible = true">终端</el-button>
              <el-button link type="primary" size="small" @click="handleDelete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="被测设备管理" name="second">被测设备管理</el-tab-pane>
      <el-tab-pane label="交换机管理" name="third">交换机管理</el-tab-pane>
      <el-tab-pane label="build管理" name="fourth">build管理</el-tab-pane>
    </el-tabs>

    <el-dialog v-model="dialogVisible" title="添加设备" width="25%" :before-close="handleClose">
      <span>
        <el-form :inline="false" :model="addDeviceForm" ref="addDeviceRuleFormRef" :rules="addDeviceFormRules"
          class="addDevice-form" label-width="110px">
          <el-form-item label="IP" prop="ip">
            <el-input v-model="addDeviceForm.ip" placeholder="请输入..." />
          </el-form-item>
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="addDeviceForm.userName" placeholder="请输入..." />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addDeviceForm.password" placeholder="请输入..." />
          </el-form-item>
          <el-form-item label="端口" prop="port">
            <el-input v-model="addDeviceForm.port" placeholder="请输入..." />
          </el-form-item>
          <el-form-item label="设备状态探测" prop="status">
            <el-select v-model="addDeviceForm.status" placeholder="请选择...">
              <el-option label="状态一" value="shanghai" />
              <el-option label="状态二" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onResetDeviceForm(addDeviceRuleFormRef)">取消</el-button>
          <el-button type="primary" @click="onAddDeviceForm(addDeviceRuleFormRef)">添加</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 终端 -->
    <el-dialog custom-class="termailDialog" v-model="termailDialogVisible" draggable :close-on-click-modal="false">
      <Termmail />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref, reactive } from "vue";
import type { TabsPaneContext } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { instrumentManagementData } from "./data.js"
import Termmail from '../../../components/Termail.vue'
export default defineComponent({
  components: {
    Termmail
  },
  setup() {
    const activeName = ref("instrumentManagement");
    const dialogVisible = ref(false);
    const termailDialogVisible = ref(false);
    const tableData = ref(instrumentManagementData)
    const addDeviceForm = reactive({
      ip: "",
      userName: "",
      password: "",
      port: "",
      status: "",
    });
    const addDeviceRuleFormRef = ref<FormInstance>();
    const addDeviceFormRules = reactive<FormRules>({
      ip: [{ required: true, message: "ip不能为空", trigger: "blur" }],
      userName: [
        { required: true, message: "用户名不能为空", trigger: "blur" },
      ],
      password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
      port: [
        { required: true, message: "请填写端口号", trigger: "blur" },
      ],
      status: [
        { required: true, message: "请选择设备状态", trigger: "change" },
      ],
    });
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event);
    };
    const onAddDeviceForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log("submit!");
          dialogVisible.value = false;
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    const onResetDeviceForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
      dialogVisible.value = false;
    };
    const handleClose = (done: () => void) => {
      dialogVisible.value = false;
    };
    const handleDedit = () => {
      console.log("编辑")
    }
    const handleDelete = () => {
      console.log('删除')
    }
    const toConsole = () => { }
    return {
      termailDialogVisible,
      tableData,
      activeName,
      dialogVisible,
      addDeviceForm,
      handleClick,
      handleDedit,
      handleDelete,
      handleClose,
      onAddDeviceForm,
      onResetDeviceForm,
      addDeviceRuleFormRef,
      addDeviceFormRules,
      toConsole
    };
  },
});
</script>

<style lang="scss" scoped>
.addDevice-form {
  .el-input {
    width: 214px;
  }
}
</style>

<style lang="scss">
.termailDialog {
  .el-dialog__body {
    padding: 0 !important;
    width: 100%;
  }

  .el-dialog__headerbtn {
    height: 40px;
    line-height: 40px;
  }

  .el-dialog__header {
    padding-bottom: 20px;
  }
}
</style>
