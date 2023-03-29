<template>
  <el-dialog v-model="innerVisible" width="30%" append-to-body title="绑定邮箱">
    <el-form-item>
      <el-input class="login-content-right-input-l" v-model.trim="value.email" placeholder="请输入您的邮箱地址">
        <template #prefix>
          <img src="@/assets/login/login-user.svg" alt="" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="login-content-right-input login-content-right-c" prop="verifyCode">
      <el-input class="login-content-right-input-l login-content-right-input-code" v-model="value.verifyCode"
        placeholder="请输入验证码">
        <template #prefix>
          <img src="@/assets/login/login-code.svg" alt="" />
        </template>
      </el-input>
      <img class="login-content-right-c-img" alt="" :src="verifyCode" @click="() => getCode()" />
    </el-form-item>
    <el-button type="primary" color="#294aa5" class="login-content-button" @click="() => bindEmails()">绑定</el-button>
  </el-dialog>
</template>
<script setup>
import { generateVerifyCode } from '@/utils/axios/login/index.js';
import { setEmail } from '@/utils/axios/buyer/index.js';
import { onMounted } from 'vue';
import { ElMessage } from 'element-plus';
const innerVisible = ref(true);
const value = reactive({})
const verifyCode = ref('');
const props = defineProps({
  callBack: Function
})

const getCode = async () => {
  const data = await generateVerifyCode('bindemail ');
  if (data.code === 12000) {
    verifyCode.value = 'data:image/png;base64,' + data.data.imageBase64;
  }
}

const bindEmails = async () => {
  if (!value.email) {
    return ElMessage.error('邮箱未填写')
  }
  if (!value.verifyCode) {
    return ElMessage.error('验证码未填写')
  }
  const data = await setEmail({ ...value, Authorization: localStorage.getItem('token') })
  if (data.code === 12000) {
    innerVisible.value = false;
    props.callBack && props.callBack()
  } else {
    getCode();
    ElMessage.error(data.msg)
  }
}

onMounted(() => {
  getCode()
})
</script>
<style scoped>
.login-content-button {
  width: 100%;
  height: 40px;
}

.login-content-right-c-img {
  margin-left: 10px;
}

.login-content-right-input-code {
  width: 60%;
}
</style>