<template>
  <div class="user-content">
    <h5>{{$t('USRER-025')}}</h5>
    <div class="user-content-one">
      <div class="basic-info">
        <div class="font">{{$t('USRER-026')}}</div>
        <div class="font text">{{ store.state.userInfo?.userInfo?.userName || store.state.userInfo?.userInfo?.email }}
        </div>
        <div class="font">{{$t('USRER-027')}}</div>
        <div class="font text">
          {{ store.state.userInfo?.userInfo?.walletAddress }}
        </div>
      </div>
      <div class="content-line"></div>
      <div class="basic-info">
        <div class="font">{{$t('USRER-028')}}</div>
        <div class="font text">
          {{ store.state.userInfo?.userInfo?.availableBalance?.toLocaleString() }}
          <span style="margin: 0px 20px 0px 8px"> TRX </span>
          <div class="font btn" style="margin-right: 20px" @click="() => pushRecharge()">{{$t('USRER-020')}}</div>
          <div class="font btn" @click="()=> withdrawbalance()" :loading='loading'>{{$t('USRER-030')}}</div>
        </div>
        <div class="font">{{$t('USRER-031')}}</div>
        <div class="font text">2023-03-02 12:09:42</div>
      </div>
    </div>
  </div>
  <div class="user-content">
    <h1>{{$t('USRER-032')}}</h1>
    <p class="fontn tips">{{$t('USRER-033')}}</p>
    <div class="login-method">
      <div class="font">{{$t('USRER-034')}}</div>
      <div class="font">{{$t('USRER-035')}}</div>
      <div class="font text">{{ store.state?.userInfo?.userInfo?.email }}</div>
      <div class="btn font" @click="handleBind" v-if="!store.state.userInfo?.userInfo?.email">{{$t('USRER-044')}}</div>
      <div v-else></div>
      <div class="font">{{$t('USRER-036')}}</div>
      <div class="font">{{$t('USRER-043')}}</div>
      <div class="font text">{{ store.state.userInfo?.userInfo?.walletAddress }}</div>
      <div class="btn font" @click="handleBindAdress" v-if="!store.state.userInfo.userInfo.walletAddress">{{$t('USRER-045')}}</div>
    </div>
    <div v-if="showBind">
      <BindEmailsInput @close='showBind = false'></BindEmailsInput>
    </div>

  </div>
</template>
<script setup>
import BindEmailsInput from '../../../components/bind-emails-input.vue';
import { isConnectedWallet, walletAddress, connectedWallet } from '@/utils/utils/tron.js';
import { bindWallets,getWithdrawbalance } from '@/utils/axios/buyer/index';
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const store = useStore();
const router = useRouter();
const showBind = ref(false);
const loading = ref(false);

const handleBind = () => {
  showBind.value = true;
}

const pushRecharge = () => {
  store.commit("changeMenuType", 0);
  router.push('/console/buyer/recharge')
}

const withdrawbalance = ()=>{
  ElMessageBox.prompt(t('USRER-037'), (t('USRER-037')), {
    confirmButtonText: t('OK'),
    cancelButtonText: t('Cancel'),
    beforeClose: async (a, b, done)=>{
      if(a === 'confirm'){
        if(!b.inputValue){
          ElMessage.error(t('USRER-040'));
          return;
        }

        if(+b.inputValue > store.state.userInfo?.userInfo?.availableBalance){
          ElMessage.error(t('USRER-041'));
          return;
        }
        loading.value = true;
        const data = await getWithdrawbalance({withdrawAmount:b.inputValue});
        loading.value = false;
        if(data.code === 12000){
          ElMessage.success(t('OperateSuccess'));
          store.dispatch('getUserInfoAction');
          done()
        }else{
          ElMessage.error(data.msg);
        }
      } else{
        done()
      }
    },
    inputErrorMessage: t('USRER-042'),
  })
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
    ElMessage.success(t('BindingSuccessful'))
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
