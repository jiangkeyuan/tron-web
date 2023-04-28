<template>
  <div class="login" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="login-header">
      <Logo></Logo>
      <GlobalIzation :isLogin="true"></GlobalIzation>
    </div>
    <div class="login-content">
      <img class="login-content-img" src="@/assets/login/login-content.png" alt="" />
      <div class="login-form-main" v-if="type === '3'">
        <img class="verify-account-bg"
          src="data:image/png;base64,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" />
        <div class="login-form-main-t1">{{ $t('LOGIN-019') }}</div>
        <div class="login-form-main-t2">{{ $t('LOGIN-020', { email: userInfo.email || getParamsNew('email') }) }}</div>
        <a class="login-form-main-t4" @click="againResiter">{{ $t('LOGIN-021') }}</a>
        <el-button type="primary" color="#c53027" class="login-form" @click="() => changeType('0')" round>{{
          $t('LOGIN-022') }}</el-button>
      </div>

      <div class="login-form-main" v-else-if="type === '4'">
        <div class="verify-account-bg">
          <SuccessFilled v-if='isActivave'></SuccessFilled>
          <WarnTriangleFilled v-else></WarnTriangleFilled>
        </div>
        <div class="login-form-main-t1" v-if="registerType == 0">{{ $t("LOGIN-036") }}</div>
        <div class="login-form-main-t1" v-if="registerType == 1">{{ $t("LOGIN-037") }}</div>
        <div class="login-form-main-t1" v-if="registerType == 2">{{ $t("LOGIN-038") }}</div>
        <div class="login-form-main-t2">
          {{ $t('LOGIN-044') }}
          <a>{{ userInfo.email || getParamsNew('email') }}</a>
          {{ registerType == 0 ? $t("LOGIN-036") : registerType == 1 ? $t("LOGIN-037") : $t("LOGIN-038") }}
        </div>

        <a class="login-form-main-t4"></a>
        <el-button type="primary" color="#c53027" class="login-form" @click="() => changeType('0')" round>{{
          $t('LOGIN-022') }}</el-button>
      </div>
      <LoginForm v-else v-model:data.sync="userInfo" :type="type" ref="loginFormRef">
        <div class="login-content-login" v-if="type === '0'">
          <el-button type="primary" color="#c53027" class="login-content-button" @click="login">{{ $t("LOGIN-005")
          }}</el-button>
          <div class="login-content-login-text">
            <el-button type="primary" text class="login-content-login-text-button" @click="() => changeType('1')">{{
              $t("LOGIN-006") }}</el-button>
            <el-button type="primary" text class="login-content-login-text-button" @click="() => changeType('2')">{{
              $t("LOGIN-007") }}</el-button>
          </div>
          <el-divider>{{ $t("LOGIN-008") }}</el-divider>
          <div class="login-content-other-login-text-button" @click="() => tron_login()">
            <img width="20" src="@//assets/login/tron-link-logo.svg" />
            <span>TronLink</span>
          </div>
        </div>
        <div v-if="type === '1'">
          <div>
            <el-button @click="() => register()" type="primary" color="#c53027" class="login-content-button">{{
              t('LOGIN-011') }}</el-button>
          </div>
          <div>
            <el-button class="login-content-button" @click="() => changeType('0')">{{ t('LOGIN-012') }}</el-button>
          </div>
        </div>
        <div v-if="type === '2'" class="login-content-login-text-other">
          <div>
            <el-button type="primary" color="#c53027" class="login-content-button" @click="() => forgetpwds()">{{
              $t("LOGIN-015") }}</el-button>
          </div>
          <div>
            <el-button class="login-content-button" @click="() => changeType('0')">{{ $t("LOGIN-016") }}</el-button>
          </div>
        </div>
        <div v-if="type === '5'" class="login-content-login-text-other">
          <div>
            <el-button type="primary" color="#c53027" class="login-content-button" @click="handleSetemailVerify">{{
              $t('LOGIN-039') }}</el-button>
          </div>
        </div>
        <div v-if="type === '6'" class="login-content-login-text-other">
          <div>
            <el-button type="primary" color="#c53027" class="login-content-button" @click="handleResetPwd">{{
              $t('LOGIN-040') }}</el-button>
          </div>
          <div>
            <el-button class="login-content-button" @click="() => changeType('0')">{{ $t('LOGIN-012') }}</el-button>
          </div>
        </div>
      </LoginForm>
    </div>

    <el-dialog append-to-body v-model="dialogTableVisible" width="450">
      <div class="custom-modal-centent">
        <img class="tron-link-logo" src="@/assets/login/tron-link-logo.svg" width="80" alt="图片加载失败">
        <div class="sign-title">{{ $t("LOGIN-025") }}</div>
        <div class="sign-text">{{ $t("LOGIN-026") }}</div>
        <el-button @click="tron_register" type="primary" color="#c53027" class="login-content-button">{{ $t("LOGIN-027")
        }}</el-button>
      </div>
    </el-dialog>

    <el-dialog append-to-body :title="$t('LOGIN-023')" v-model="dialogVisibleReset" width="450">
      <div class="dialogReset">
        <img :src="verifyCode" @click="() => getCode()" class="resetImage" />
        <el-input v-model="userInfo.verifyCode" :placeholder="$t('LOGIN-014')" />
        <el-button @click="() => resetEmailsSearch()" type="primary" color="#c53027" class="reset-content-button">{{
          $t('LOGIN-024') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script setup>
import Logo from "@/components/logo.vue";
import GlobalIzation from "@/components/GlobalIzation.vue";
import LoginForm from "./components/login-form.vue";
import { getParamsNew, updateQueryStringParameter } from '@/utils/utils/index.js';
import { usersRegister, userActivave, userLogin, tronNonce, setemailVerify, sendEmails, forgetPwd, resetPwd, generateVerifyCode } from '@/utils/axios/login/index.js';
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import TronLink from '@/components/tron-link/index.js'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter();
const store = useStore();
const registerType = ref(0);
const dialogTableVisible = ref(false);
const fullscreenLoading = ref(false);
const userInfo = reactive({
  email: "",
  passWord: "",
  verifyCode: ""
})

let type = ref(getParamsNew('type') || '0');// 0是登陆 1 是注册 2 是忘记密码 3是激活中 4 是激活成功
let loginFormRef = ref('');
const isActivave = ref(false);
const dialogVisibleReset = ref(false);
let verifyCode = ref('');

const resetEmailsSearch = async () => {
  fullscreenLoading.value = true;
  let data = {};
  if (!getParamsNew('reset')) {
    data = await sendEmails({
      email: getParamsNew('email'),
      verifyCode: userInfo.verifyCode,
    })
  } else {
    data = await forgetPwd({
      verifyCode: userInfo.verifyCode,
      email: userInfo.email || getParamsNew('email')
    })
    changeType("3");
  }
  fullscreenLoading.value = false;
  if (data.code === 12000) {
    ElMessage.success(t('LOGIN-041'));
    dialogVisibleReset.value = false;
  } else {
    ElMessage.error(data.msg);
    getCode()
  }
}

const forgetpwds = async () => {
  window.history.replaceState({
    path: updateQueryStringParameter(window.location.href, 'reset', 1),
  }, '', updateQueryStringParameter(window.location.href, 'reset', 1),);
  loginFormRef.value.submitForm(async (e, f) => {
    if (e) {
      resetEmailsSearch()
    }
  })
}

const handleResetPwd = async () => {
  loginFormRef.value.submitForm(async (e, f) => {
    if (e) {
      fullscreenLoading.value = true;
      const data = await resetPwd({ ...userInfo, certificate: getParamsNew('certificate') });
      fullscreenLoading.value = false;
      if (data.code === 12000) {
        ElMessage.success(t('LOGIN-042'));
        setTimeout(() => {
          changeType('0')
        }, 1000)
      } else {
        ElMessage.error(data.msg);
      }
    }
  })

}

const againResiter = async () => {
  getCode();
  dialogVisibleReset.value = true;
}

const handleSetemailVerify = async () => {
  loginFormRef.value.submitForm(async (e, f) => {
    if (e) {
      fullscreenLoading.value = true
      const data = await setemailVerify({
        verifyCode: getParamsNew('verifyCode'),
        email: userInfo.email,
        passWord: userInfo.passWord
      })
      fullscreenLoading.value = false;
      if (data.code === 12000) {
        ElMessage.success(data.msg);
        changeType('0')
      } else {
        ElMessage.error(data.msg)
      }
    }
  });
}

const getCode = async () => {
  const data = await generateVerifyCode(!getParamsNew('reset') ? 'sendemail' : 'forgetpwd');
  if (data.code === 12000) {
    verifyCode.value = 'data:image/png;base64,' + data.data.imageBase64;
  }
}

const login = async () => {
  loginFormRef.value.submitForm(async (e, f) => {
    if (e) {
      fullscreenLoading.value = true
      const data = await userLogin(userInfo);
      fullscreenLoading.value = false;
      if (data.code === 12000 || data.code === 14009) {
        window.localStorage.setItem('token', data.data.token);
        store.dispatch('getUserInfoAction').then(res => {
          localStorage.setItem('roles', res.roles?.toUpperCase())
          store.commit('setRoles', res.roles?.toUpperCase());

          if (res.roles?.toUpperCase() === 'ADMIN') {
            router.push('/console/manager')
          } else {
            router.push('/console')
          }
        })
      } else if (data.code == 14011) {
        changeType('3');
      } else {
        loginFormRef.value.getCode(type.value || 0);
        ElMessage.error(data.msg);
      }
    }
  });
}

const tron_login = async () => {
  dialogTableVisible.value = true;
}

const tron_register = async () => {
  try {
    await TronLink()
    fullscreenLoading.value = true;
    const isRead = await window.tronLink.request({
      method: "tron_requestAccounts",
    });
    if (!isRead) {
      ElMessage.error(t('LOGIN-043'));
      fullscreenLoading.value = false;
      return;
    };
    if (isRead.code == 200) {
      fullscreenLoading.value = true;
      const base58Key = window.tronLink.sunWeb.mainchain.defaultAddress.base58;
      const data = await tronNonce({ walletAddress: base58Key })

      dialogTableVisible.value = false
      if (data.code === 12000) {
        const nonce_certificate = data.data.nonce_certificate
        tronWeb.trx.signMessage(nonce_certificate).then(async (res) => {
          console.log(res, 'xxxxx');
          if (res) {
            const data = await userLogin({
              walletAddress: base58Key,
              nonce_certificate: nonce_certificate
            });
            fullscreenLoading.value = false;
            if (data.code === 12000 || data.code === 14009) {
              window.localStorage.setItem('token', data.data.token);
              store.dispatch('getUserInfoAction');
              router.push('/console')
            } else {
              ElMessage.error(data.msg);
            }
          } else {
            fullscreenLoading.value = false;
          }
        }).catch((error) => {
          fullscreenLoading.value = false;
          ElMessage.error(error)
        })
      } else {
        fullscreenLoading.value = false;
        ElMessage.error(data.msg)
      }
    } else {
      fullscreenLoading.value = false;
      ElMessage.error(isRead.message)
    }
  } catch (error) {
    fullscreenLoading.value = false;
  }
}

const changeType = (t) => {
  var newurl = updateQueryStringParameter(window.location.href, 'type', t);
  //向当前url添加参数，没有历史记录
  window.history.replaceState({
    path: newurl
  }, '', newurl);
  window.history.replaceState({
    path: updateQueryStringParameter(window.location.href, 'email', userInfo.email),
  }, '', updateQueryStringParameter(window.location.href, 'email', userInfo.email),);
  Object.keys(userInfo).map(v => {
    userInfo[v] = '';
  })
  type.value = t;
  nextTick(() => {
    clearRules();
    loginFormRef?.value?.getCode(t);
  })
}

const clearRules = () => {
  loginFormRef.value && loginFormRef.value.clearRules();
}


const register = () => {
  loginFormRef.value.submitForm(async (e, f) => {
    if (e) {
      const beInvitedCode = sessionStorage.getItem('beInvitedCode')
      fullscreenLoading.value = true;
      const data = await usersRegister({
        ...userInfo,
        beInvitedCode: beInvitedCode ?? ''
      });
      fullscreenLoading.value = false;
      if (data.code === 12000 || data.code === 14011) {
        sessionStorage.setItem('beInvitedCode', '')
        changeType('3');
      } else {
        loginFormRef.value.getCode(type.value);
        ElMessage.error(data.msg);
      }
    }
  });
}

onMounted(async () => {
  if (type.value === '4') {
    fullscreenLoading.value = true;
    registerType.value = 1;
    const data = await userActivave(getParamsNew('activateCode'))
    fullscreenLoading.value = false;
    if (data.code === 12000) {
      registerType.value = 2;
      isActivave.value = true;
    } else {
      registerType.value = 1;
      isActivave.value = false;
      ElMessage.error(data.msg);
    }
  }

  if (type.value === '5' || type.value === '6') {
    userInfo.email = getParamsNew('email')
  }
})
</script>
<style scoped>
.dialogReset {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.resetImage {
  width: 60%;
  margin-bottom: 20px;
}

.reset-content-button {
  width: 100%;
  margin-top: 20px;
}

.sign-title {
  font-size: 18px;
  text-align: center;
  margin: 20px 0;
}

.sign-text {
  margin-bottom: 30px;
}

.tron-link-logo {
  width: 80px;
  height: 80px;
}

.custom-modal-centent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.verify-account-bg {
  width: 120px;
  margin-top: 40px;
  margin-bottom: 24px;
  color: #78cd8d;
}

.ant-result-icon {
  margin-bottom: 24px;
  text-align: center;
}

.login-form-main-t1 {
  color: #000000d9;
  font-size: 24px;
  line-height: 1.8;
  text-align: center;
}

.login-form-main-t2 {
  margin: 5px 0;
  font-size: 14px;
}


.login-form-main-t3 {
  font-size: 14px;
}

.login-form-main-t4 {
  margin: 20px 0;
  font-size: 14px;
}

.login-form-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  box-sizing: border-box;
  align-items: center;
  padding: 30px;
}

.login-form-main>img {
  width: 120px;
  margin-top: 40px;
  margin-bottom: 24px;
}

.login-form {
  width: 200px;
  border-radius: 30px;
  background-color: #2a47ab;
  color: #fff;
  padding: 25px 70px;
  display: flex;
  align-items: center;
}

.login {
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/login/login-background.png");
  background-size: 100px 80px;
  background-repeat: repeat;
  position: relative;
}

.login-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 70px;
}

.login-content {
  margin: 0 auto;
  width: 930px;
  max-width: 75%;
  box-sizing: border-box;
  height: 520px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  box-shadow: 1px 1px 10px #c4cade;
  border-radius: 10px;
  overflow: hidden;
}

.login-content-img {
  width: 50%;
  height: 100%;
}

.login-content-right {
  width: 50%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-sizing: border-box;
  padding: 30px;
}

.login-content-button {
  width: 100%;
  height: 40px;
  margin-bottom: 24px;
}

.login-content-login {
  width: 100%;
}

.login-content-login-text {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.login-content-login-text-button {
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  color: #c53027;
}

.login-content-other-login-text-button {
  /* width: 130px;
  height: 24px; */
  height: 40px;
  line-height: 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  color: #c53027;
  margin: auto;
  border: 1px solid #c53027;
  border-radius: 6px;
  padding: 5px 0;
}

.login-content-other-login-text-button img {
  margin-right: 0.3em;
}

.login-content-login-text-other {
  display: flex;
  flex-direction: column;
}
</style>