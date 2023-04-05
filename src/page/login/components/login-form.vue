<template>
  <div class="login-content-right">
    <el-form :model="value" :rules="rules" ref="ruleFormRef">
      <h2 class="login-content-right-title">
        {{ filterName(props.type) }}
      </h2>
      <el-form-item class="login-content-right-input" prop="email">
        <div v-if="props.type === '5'" class="mb-10">绑定邮箱</div>
        <el-input class="login-content-right-input-l" :disabled='props.type === "5" || props.type === "6"'
          v-model.trim="value.email" placeholder="请输入您的邮箱地址">
          <template #prefix>
            <img src="@/assets/login/login-user.svg" alt="" />
          </template>
        </el-input>
      </el-form-item>
      <Transition :duration="550" name="slide-up">
        <div>
          <div v-if="props.type === '5'" class="mb-10">密码</div>
          <el-form-item v-if="props.type !== '2'" class="login-content-right-input" prop="passWord" :rules="[
            { required: true, message: '请输入密码！', trigger: ['blur', 'change'] },
            { required: true, min: 8, message: '请输入大于8位数的密码！', trigger: ['blur', 'change'] },
          ]">
            <el-input class="login-content-right-input-l" v-model.trim="value.passWord" type="password"
              placeholder="请输入您的密码" show-password>
              <template #prefix>
                <img src="@/assets/login/login-password.svg" alt="" color="red" />
              </template>
            </el-input>
          </el-form-item>
        </div>
      </Transition>
      <Transition :duration="550" name="slide-up">
        <div>
          <div v-if="props.type === '5'" class="mb-10">确认密码</div>
          <el-form-item v-if="props.type === '1' || props.type === '5' || props.type === '6'" prop="confirmPassword"
            class="login-content-right-input" :rules="[
              { required: true, message: '请输入二次密码！', trigger: ['blur', 'change'] },
              { required: true, validator: checkPassWord, trigger: ['blur', 'change'] },
            ]">
            <el-input clearable class="login-content-right-input-l" v-model.trim="value.confirmPassword" type="password"
              placeholder="确认密码" show-password>
              <template #prefix>
                <img src="@/assets/login/login-password.svg" alt="" color="red" />
              </template>
            </el-input>
          </el-form-item>
        </div>
      </Transition>

      <el-form-item class="login-content-right-input login-content-right-c" prop="verifyCode" v-if="props.type !== '5'">
        <el-input class="login-content-right-input-l login-content-right-input-code" v-model="value.verifyCode"
          placeholder="请输入验证码">
          <template #prefix>
            <img src="@/assets/login/login-code.svg" alt="" />
          </template>
        </el-input>
        <img class="login-content-right-c-img" alt="" :src="verifyCode" @click="() => getCode()" />
      </el-form-item>
    </el-form>
    <slot></slot>
  </div>
</template>
<script setup>
import { generateVerifyCode } from '@/utils/axios/login/index.js';
import { getParamsNew } from '@/utils/utils/index.js';
const props = defineProps({
  data: {
    default: {},
    type: Object
  },
  forgetpwds: Function,
  type: String
});

const emit = defineEmits(['update:data'])
const ruleFormRef = ref();

const verifyCode = ref('');
let dialogVisibleReset = ref(false);

const value = reactive(props.data);
const progress = reactive({
  value: 0,
  color: ""
})
watch(value, (o, n) => {
  emit('update:data', n);
})

const rules = reactive({
  verifyCode: [
    { required: true, message: '请输入验证码', trigger: ['blur', 'change'] },
  ],
  email: [
    { required: true, message: '请输入邮箱！', trigger: ['blur', 'change'] },
    { required: true, pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱！', trigger: ['blur', 'change'] },
  ]
})

const submitForm = async (callback) => {
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      callback && callback(true)
    } else {
      callback && callback(false, fields)
    }
  })
}

const getCode = async (type) => {
  let routeValue;
  console.log(type, props.type, getParamsNew('type'))
  switch (type || props.type || getParamsNew('type')) {
    case '0':
      routeValue = 'login'
      break;
    case '1':
      routeValue = 'register'
      break;
    case '2':
      routeValue = 'forgetpwd'
      break;
    case '6':
      routeValue = 'resetpwd'
      break;
    default:
      routeValue = 'login'
      break;
  }
  console.log(routeValue);
  const data = await generateVerifyCode(routeValue);
  if (data.code === 12000) {
    verifyCode.value = 'data:image/png;base64,' + data.data.imageBase64;
  }
}

const filterName = (type) => {
  switch (type) {
    case '0':
      return '登陆'
    case '1':
      return '注册'
    case '2':
      return '忘记密码'
    case '5':
      return '绑定邮箱'
    case '6':
      return '重置密码'
    default:
      return '登陆'
  }
}

const clearRules = () => {
  ruleFormRef.value.resetFields();
}

const checkPassWord = (rule, v, callback) => {
  if (v !== value.passWord) {
    callback(new Error("两次输入的密码不一致！"))
  } else {
    callback()
  }
}

onMounted(() => {
  getCode();
})

defineExpose({
  clearRules,
  submitForm,
  getCode
})
</script>
<style scoped>
.mb-10 {
  margin-bottom: 10px;
}

.mb-20 {
  margin-bottom: 15px;
}

.login-content-right-title {
  font-size: 30px;
  margin-bottom: 30px;
  font-weight: 700;
}

.login-content-right-input {
  margin-bottom: 24px;
}

.login-content-right-input-l {
  height: 40px;
}

.login-content-right-input-l img {
  width: 16px;
}

.login-content-right-input-code {
  width: 60%;
}

.login-content-right-c {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
}

.login-content-right-c-img {
  width: 120px;
  height: 40px;
  position: absolute;
  right: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>