<template>
  <el-dialog :model-value="isShowDialog" title="模板参数" @close="closeDialog">
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="closeDialog">生成模板</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { reactive, ref, computed, watch } from "vue";
export default defineComponent({
  emits: ['closeDialog'],
  props: {
    isShowDialog: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const formLabelWidth = "140px";
    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    });
    const closeDialog = () => {
      emit('closeDialog', false)
    }
    return {
      formLabelWidth,
      form,
      closeDialog,
    };
  },
});
</script>
