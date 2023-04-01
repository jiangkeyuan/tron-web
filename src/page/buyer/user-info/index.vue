<template>
  <div class="user-content">
    <h5>基本信息</h5>
    <div class="user-content-one">
      <div class="basic-info">
        <div class="font">账户名称</div>
        <div class="font text">{{ store.state.userInfo.userInfo.userName || store.state.userInfo.userInfo.email }}</div>
        <div class="font">绑定钱包</div>
        <div class="font text">
          {{ store.state.userInfo.userInfo.walletAddress }}
        </div>
      </div>
      <div class="content-line"></div>
      <div class="basic-info">
        <div class="font">可用余额</div>
        <div class="font text">
          {{ store.state.userInfo.userInfo.availableBalance }}
          <span style="margin: 0px 20px 0px 8px"> TRX </span>
          <div class="font btn" style="margin-right: 20px">充值</div>
          <div class="font btn">提币</div>
        </div>
        <div class="font">注册时间</div>
        <div class="font text">2023-03-02 12:09:42</div>
      </div>
    </div>
  </div>
  <div class="user-content">
    <h1>登录方式</h1>
    <p class="fontn tips">账号支持多种登录方式，便捷管理您的账号</p>
    <div class="login-method">
      <div class="font">邮箱</div>
      <div class="font">支持账号密码登录，可找回账号</div>
      <div class="font text">{{ store.state.userInfo.userInfo.email }}</div>
      <div class="btn font" @click="handleBind" v-if="!store.state.userInfo.userInfo.email">绑定邮箱</div>
      <div v-else></div>
      <div class="font">Tron钱包地址</div>
      <div class="font">绑定钱包地址，充值自动识别入账</div>
      <div class="font text">{{ store.state.userInfo.userInfo.walletAddress }}</div>
      <div class="btn font" @click="handleBindAdress" v-if="!store.state.userInfo.userInfo.walletAddress">绑定</div>
    </div>
    <div v-if="showBind">
      <BindEmailsInput @close='showBind = false'></BindEmailsInput>
    </div>

  </div>
</template>
<script setup>
import BindEmailsInput from '../../../components/bind-emails-input.vue';
import { isConnectedWallet, walletAddress, connectedWallet } from '@/utils/utils/tron.js';
import { bindWallets } from '@/utils/axios/buyer/index';

const store = useStore();
const showBind = ref(false);

const handleBind = () => {
  showBind.value = true;
}

const handleBindAdress = () => {
  if (isConnectedWallet()) {
    bind()
  } else {
    connectedWallet().then(res => {
      bind()
    })
  }
}

const bind = async () => {
  const data = await bindWallets({
    walletAddress: walletAddress()
  })

  if (data.code === 12000) {
    ElMessage.success('绑定成功')
    store.dispatch('getUserInfoAction')
  } else {
    ElMessage.error(data.msg);
  }
}

onMounted(() => {
  if (!store.state.userInfo.userInfo.email) {
    store.dispatch('getUserInfoAction');
  }
})

</script>
<style scoped>
.login-method {
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  gap: 10px 60px;
  align-items: center;
}

h1 {
  font-size: 16px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #121c41;
}

.tips {
  font-size: 12px;
  color: #989fae;
  margin-bottom: 15px;
  margin-top: 8px;
}

.btn {
  display: inline-block;
  cursor: pointer;
  color: #266ef1 !important;
}

.content-line {
  width: 1px;
  height: 38px;
  margin: 0 70px;
  border: 1px solid #e3ecfc;
}

.user-content {
  background: #fff;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 20px;
  font-size: 16px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #121c41;
}

.user-content-one {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}

.basic-info {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 8px 60px;
}

.font {
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #707582;
}

.text {
  color: #121c41;
}
</style>
