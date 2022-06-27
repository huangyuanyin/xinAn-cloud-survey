<template>
  <div>
    <el-form ref="ruleFormRef" :rules="rules" :model="formData" class="form-style">
      <el-form-item label="" prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名" :prefix-icon="Avatar" />
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input v-model="formData.password" type="password" placeholder="请输入密码" show-password :prefix-icon="Lock" />
      </el-form-item>
      <el-form-item>
        <el-button class="submit-style" type="primary" @click="onSubmit(ruleFormRef)" :loading="loading">Login
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Lock, Avatar } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { useUserStore } from "@/store/modules/user";
export default defineComponent({
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const store = useUserStore();
    const ruleFormRef = ref<FormInstance>();
    const userInfo = ref({});
    const rules = reactive<FormRules>({
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    });
    const formData = reactive({
      username: "",
      password: "",
    });
    const onSubmit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          loading.value = true;
          store
            .Login(formData)
            .then(() => {
              router.push("/center/mine");
            })
            .finally(() => {
              loading.value = false;
            });
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    return {
      Lock,
      Avatar,
      formData,
      rules,
      loading,
      ruleFormRef,
      onSubmit,
      userInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-style {
  width: 250px;

  .submit-style {
    width: 100%;
  }
}
</style>