<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      :model="formData"
      class="form-style"
    >
      <el-form-item label="" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入用户名"
          :prefix-icon="Avatar"
        />
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
          show-password
          :prefix-icon="Lock"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="submit-style"
          type="primary"
          @click="onSubmit(ruleFormRef)"
          :loading="loading"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, toRefs } from "vue";
import { login } from "@/api/user.js";
import { getInfo } from "@/api/manger/index.js";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { Lock, Avatar } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElNotification } from "element-plus";
// import { useCookies } from '@vueuse/integrations/useCookies'
import { setToken } from "@/utils/auth.js";
import { mainStore } from "@/store/index.js";
import jwt_decode from "jwt-decode";
export default defineComponent({
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const store = mainStore();
    const ruleFormRef = ref<FormInstance>();
    const userInfo = ref({});
    const rules = reactive<FormRules>({
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        // { min: 3, max: 5, message: '用户名长度必须是3-5个字符', trigger: 'blur' },
      ],
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
          login(formData.username, formData.password)
            .then((res) => {
              // 解析token
              userInfo.value = jwt_decode(res.token);
              // 存储 token
              setToken(res.token);
              store.getUserInfo(JSON.stringify(userInfo.value));
              router.push("/center/mine");
              // 获取用户相关信息
              // getInfo().then((res2) => {
              //   store.getUserInfo(res2);
              //   localStorage.setItem("userInfo", JSON.stringify(res2));
              //   console.log("用户信息...", res2);
              // });
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