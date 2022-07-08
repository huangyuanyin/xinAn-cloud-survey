<template>
  <div>
    <el-dialog v-model="dialogFormVisible" title="模板参数">
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
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >生成模板</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { reactive, ref, computed, watch } from "vue";
export default defineComponent({
  props: {
    isShowDialog: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    watch(
      () => props.isShowDialog,
      (newValue, oldValue) => {
        dialogFormVisible.value = newValue;
        console.log("啊啊啊");
      }
    );
    const formLabelWidth = "140px";
    const dialogFormVisible = ref();
    // const dialogFormVisible = computed({
    //   get() {
    //     console.log("aaaaaaaa", props.isShowDialog);
    //     return props.isShowDialog;
    //   },
    //   set(value) {
    //     emit("changeShowDialog", value);
    //     console.log("value", value);
    //     return value;
    //   },
    // });
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

    return {
      dialogFormVisible,
      formLabelWidth,
      form,
    };
  },
});
</script>
