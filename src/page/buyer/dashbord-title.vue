<template>
  <div class="home-right-wrapper">
    <div class="home-right-wrapper-header">
      <span class="home-right-wrapper-header-l"> {{ store.state.roles.roles === 'ADMIN' ? '系统设置' :
        store.state.menuList.menuType == 0 ? $t('title-buyer') : $t('title-seller') }} / </span>
      <span class="home-right-wrapper-header-r">
        {{ rightTitle }}
      </span>
    </div>

    <div class="home-wrapper-user">
      <GlobalIzation></GlobalIzation>

      <el-dropdown class="el-dropdown-link" trigger="click">
        <div class="home-wrapper-user">
          <DefaultAvatar class="home-wrapper-user-avatar" width="36" height="36"></DefaultAvatar>
          <div class="home-wrapper-user-no">
            <span class="home-wrapper-user-no-name">
              {{ store.state.userInfo?.userInfo?.email || store.state.userInfo?.userInfo?.walletAddress }}
              <el-icon class="home-left-button-icon">
                <ArrowDown />
              </el-icon>
            </span>
            <span v-if="store.state?.roles?.roles !== 'ADMIN'" class="home-wrapper-user-no-amount">余额：{{
              store.state.userInfo?.userInfo?.availableBalance }} TRX</span>
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div class="home-wrapper-user-item" @click="changePassWord">
                <el-icon color="rgb(47, 76, 159)">
                  <Setting />
                </el-icon>
                <span>修改密码</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item class="home-wrapper-user-item" v-if="store.state?.roles?.roles !== 'ADMIN'">
              <div class="home-wrapper-user-item" @click="gotoFund('/common/fund-change')">
                <el-icon color="rgb(47, 76, 159)">
                  <WalletFilled />
                </el-icon>
                资金账变
              </div>
            </el-dropdown-item>
            <el-dropdown-item class="home-wrapper-user-item" v-if="store.state?.roles?.roles !== 'ADMIN'">
              <div class="home-wrapper-user-item" @click="gotoFund('/common/user-info')">
                <el-icon color="rgb(47, 76, 159)">
                  <Postcard />
                </el-icon>
                用户信息
              </div>
            </el-dropdown-item>
            <!-- <el-dropdown-item class="home-wrapper-user-item">
              <div class="home-wrapper-user-item">
                <el-icon color="rgb(47, 76, 159)">
                  <Star />
                </el-icon>
                我的推荐
              </div>
            </el-dropdown-item> -->
            <el-dropdown-item class="home-wrapper-user-item" v-if="store.state?.roles?.roles !== 'ADMIN'">
              <div class="home-wrapper-user-item" @click="changeMenutype">
                <el-icon color="rgb(47, 76, 159)">
                  <Switch />
                </el-icon>
                {{ $t("switch") }} {{ store.state.menuList.menuType == 1 ? $t('title-buyer') : $t('title-seller') }}
              </div>
            </el-dropdown-item>
            <el-dropdown-item class="home-wrapper-user-item">
              <div class="home-wrapper-user-item" @click="logoutUser">
                <el-icon color="rgb(47, 76, 159)">
                  <SwitchButton />
                </el-icon>
                退出登录
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-dialog width="500" v-model="dialogFormVisible" title="修改密码" center destroy-on-close append-to-body>
      <el-form :model="form" size="" ref="ruleFormRef" :rules="rules">
        <el-form-item prop="passWord">
          <el-input v-model="form.passWord" autocomplete="off" type="password" show-password placeholder="请输入旧密码" />
        </el-form-item>
        <el-form-item prop="newPwd">
          <el-input v-model="form.newPwd" autocomplete="off" type="password" show-password placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item prop="checkNewPassWord">
          <el-input v-model="form.checkNewPassWord" autocomplete="off" type="password" show-password
            placeholder="请再输入新密码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button class="dialog-footer" type="primary" @click="changePassWordConfirm(ruleFormRef)">
          修改密码
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import GlobalIzation from "@/components/GlobalIzation.vue";
import DefaultAvatar from "@/icons/default-avatar.svg?component";
import { changePassWordRequest } from '@/utils/axios/login/index.js';
import { logout } from '@/utils/axios/home/index.js';
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
const store = useStore();
const router = useRouter();
const route = useRoute();
const dialogFormVisible = ref(false);
const form = reactive({});
const ruleFormRef = ref('');
const title = () => {
  return store.state.menuType == 0 ? "买家版" : "卖家版"
};

const logoutUser = async () => {
  const data = await logout({});
  if (data.code === 12000) {
    router.push('/auth/login');
    localStorage.setItem('token', '');
  } else {
    ElMessage.error(data.msg)
  }
}

const changeMenutype = () => {
  if (store.state.menuList.menuType === 0) {
    //切换买家版本
    router.push('/console/seller/dashboard');
    store.commit("changeMenuType", 1);
  } else {
    router.push("/console/buyer/dashboard");
    store.commit("changeMenuType", 0);
  }
}

const rightTitleFunc = () => {
  let name = "";
  store.getters.menuList.map((v) => {
    if (v.isActive) {
      name = v.title;
    }
  });

  const adminRouter = [{
    router: '/console/admin',
    name: "统计面板"
  },
  {
    router: '/console/user',
    name: "用户列表"
  },
  {
    router: '/console/manager',
    name: "系统配置"
  }]

  adminRouter.map(v => {
    if (v.router === route.fullPath) {
      name = v.name
    }
  })

  return name;
}
const rightTitle = ref(rightTitleFunc() || '管理面板');
const leftTitle = ref(title());

const checkPassWord = (rule, v, callback) => {
  if (v !== form.newPwd) {
    callback(new Error("两次输入的密码不一致！"))
  } else {
    callback()
  }
}

const rules = reactive({
  passWord: [
    { required: true, message: '请输入密码！', trigger: ['blur', 'change'] },
    { required: true, min: 8, message: '请输入大于8位数的密码！', trigger: ['blur', 'change'] },
  ],
  newPwd: [
    { required: true, message: '请输入新密码！', trigger: ['blur', 'change'] },
    { required: true, min: 8, message: '请输入大于8位数的密码！', trigger: ['blur', 'change'] },
  ],

  checkNewPassWord: [
    { required: true, message: '请输入二次密码！', trigger: ['blur', 'change'] },
    { required: true, validator: checkPassWord, trigger: ['blur', 'change'] },
  ]

})

const changePassWord = () => {
  dialogFormVisible.value = true;
};

const changePassWordConfirm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const data = await changePassWordRequest(form);

      if (data.code === 12000) {
        ElMessage.success(data.msg);
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000)
      } else {
        ElMessage.error(data.msg);
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const gotoFund = (route) => {
  router.push(route);
};

watch(route, () => {
  rightTitle.value = rightTitleFunc();
  leftTitle.value = title();
});

const menuType = computed(() => {
  return store.state.menuList.menuType;
});

onMounted(() => {
  store.dispatch('getUserInfoAction');
})
</script>
<style scoped>
.dialog-footer {
  width: 100%;
  height: 40px;
}

.home-wrapper-user-item {
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: black;
}

.home-wrapper-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  cursor: pointer;
}

.home-wrapper-user-no {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.home-wrapper-user-avatar {
  margin-left: 22px;
  margin-right: 12px;
}

.home-wrapper-user-no-name {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
}

.home-wrapper-user-no-amount {
  font-size: 12px;
  height: 22px;
  line-height: 22px;
  color: #c53027;
}

.home-left-button-icon {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  margin-left: 3px;
}

.home-right-wrapper-header {
  font-size: 18px;
  color: #121c41;
}

.home-right-wrapper-header-l {
  color: #000000a6;
}

.home-right-wrapper {
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.home-left-button {
  width: 170px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  border: 2px solid #dfeaff;
  background: linear-gradient(#ffffff, #f4f8ff);
  border-radius: 40px;
  font-size: 16px;
  color: #c53027;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  margin: 50px auto 0;
}

.home-left-button-icon {
  width: 16px;
  height: 16px;
  display: block;
  margin-right: 4px;
  color: #c53027;
}

.home-left-menu-li-active {
  color: #c53027 !important;
  background-color: #294aa51a;
}

.home-left-menu-li-active:after {
  right: -15px !important;
  width: 3px !important;
  border-radius: 3px 0 0 3px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: block;
  width: 2px;
  content: "";
  background-color: #c53027;
}

.home-right {
  box-sizing: border-box;
  width: calc(100vw - 240px);
  background: #f0f2f5;
  z-index: 1;
  padding: 0 16px 0;
}

.home-left-menu-li-icon {
  font-size: 16px;
}

.home-left-menu {
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
}

.home-left-menu-li {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  padding: 14px 0;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  color: #707582;
}

.home-left-menu-li-title {
  margin-left: 10px;
}

.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.home-left {
  width: 240px;
  height: 100%;
  background: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  z-index: 10;
  /* justify-content: center; */
}

.home-left-logo {
  height: 70px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #c53027;
}

/* .slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
}

.slide-up-leave-to {
  display: none;
} */
</style>
