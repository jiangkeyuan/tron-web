<template>
  <div class="recharge">
    <DashBord v-loading.fullscreen.lock="fullscreenLoading">
      <div class="recharge">
        <el-tabs v-model="activeName" @tab-click="(e) => searchLog(e)">
          <el-tab-pane label="DAPP" name="first">
            <div class="recharge-content">
              <div class="recharge-content" v-if="store.state.userInfo?.userInfo?.walletAddress">
                <el-input :placeholder="$t('MANAGE-006')" v-model="rechargeAmount" size="large" class="recharge-content-input">
                  <template #append>TRX</template>
                </el-input>
                <el-button @click="addMoney" type="primary" class="recharge-content-button">{{ $t('MANAGE-005')}}</el-button>
                <span class="recharge-content-text">{{ $t('MANAGE-007')}}</span>
              </div>
              <div v-else>
                <div v-if="isConnectedWallet()">
                  <div class="recharge-content">
                    <el-input :value="walletAddress()" disabled size="large" class="recharge-content-input" />
                    <el-button @click="() => bindWalletHandle()" type="primary" class="recharge-content-button">
                      {{ $t('MANAGE-034') }}</el-button>
                    <span class="recharge-content-text">{{ $t('MANAGE-035') }}</span>
                  </div>
                </div>
                <div v-else>
                  <div class="tron-link-btn">
                    <img class="tron-link-logo" src="@/assets/login/tron-link-logo.svg" width="80" :alt="$t('MANAGE-036')">
                    <span>{{ $t('MANAGE-037') }}</span>
                  </div>

                  <div class="tips" data-v-045b4c20="">{{ $t('MANAGE-038') }}</div>
                  <div class="download tips" data-v-045b4c20=""><a target="_blank"
                      href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec"
                      data-v-045b4c20="">{{ $t('MANAGE-039') }}</a></div>
                  <div class="tips" data-v-045b4c20="">{{ $t('MANAGE-040') }}</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('MANAGE-008')" name="second">
            <div class="recharge-content">
              <span>{{ $t('MANAGE-009') }}</span>
              <div class="recharge-content-address">
                <span>{{ rechargeTransferAdress }}</span>
                <el-icon @click="copyEnd" class="recharge-content-address-icon" color="#c53027">
                  <CopyDocument />
                </el-icon>
              </div>
              <div class="recharge-content-two-text">
                <span>*</span>
                <span class="recharge-content-two-text-child">
                  {{ $t('MANAGE-010') }}</span>
              </div>
              <div class="recharge-content-two-text">
                <span>*</span>
                <span class="recharge-content-two-text-child">
                  {{ $t('MANAGE-011') }}</span>
              </div>
              <div class="recharge-content-two-text">
                <span>*</span>
                <span> {{ $t('MANAGE-012') }}</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('MANAGE-013')" name="three">
            <RechareLog ref="rechareRef"></RechareLog>
          </el-tab-pane>
        </el-tabs>
      </div>
    </DashBord>
  </div>
</template>
<script setup>
import DashBord from "@/components/dashbord-content.vue";
import { copy } from "@/utils/utils/index.js";
import { useRouter } from "vue-router";
import { isConnectedWallet, walletAddress, tronErrorList } from '@/utils/utils/tron.js';
import { dappRecharge, bindWallets, getPlatformRechargeAddress,getPlatformDappRechargeAddress } from '@/utils/axios/buyer/index';
import { ElMessage } from "element-plus";
import RechareLog from '../recharge-log/index.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter();
const activeName = ref("first");
const rechargeAmount = ref("");
const fullscreenLoading = ref(false);
const store = useStore();
const rechargeAdress = ref("");
const rechargeTransferAdress = ref('')
const rechareRef = ref('');


const searchLog = (e) => {
  if (e.props.name === 'three') {
    rechareRef.value.search();
  }
}

const bindWalletHandle = async () => {
  fullscreenLoading.value = true;
  const data = await bindWallets({
    walletAddress: walletAddress()
  })
  fullscreenLoading.value = false;
  if (data.code === 12000) {
    ElMessage.success(t('BindingSuccessful'))
    store.dispatch('getUserInfoAction')
  } else {
    ElMessage.error(data.msg);
  }
}

const addMoney = async () => {
  fullscreenLoading.value = true;
  if(!window.tronLink){
    fullscreenLoading.value = false;
    return 
  } 
  const isRead = await window.tronLink.request({
    method: "tron_requestAccounts",
  });
  if (!isRead) {
    fullscreenLoading.value = false;
    return;
  };
  if (walletAddress() !== store.state.userInfo?.userInfo?.walletAddress) {
    fullscreenLoading.value = false;
    ElMessage.error(t('MANAGE-041'))
    return;
  }
  try {
    const unsignedTxn = await tronWeb.transactionBuilder.sendTrx(
      rechargeAdress.value,
      tronWeb.toSun(rechargeAmount.value),
      walletAddress()
    );
    const signedTxn = await tronWeb.trx.sign(unsignedTxn);
    var broastTx = await tronWeb.trx.sendRawTransaction(signedTxn);
    const data = await dappRecharge({ transactionHash: broastTx.txid, signedTransactionHash: "x8SY39r6SOyHcycsYvSWT0WqYXg0uGvZ" })
    fullscreenLoading.value = false;
    if (data.code === 12000) {
      ElMessage.success(data.msg);
      store.dispatch('getUserInfoAction');
    } else {
      ElMessage.error(data.msg);
    }
  } catch (error) {
    fullscreenLoading.value = false;
    ElMessage.error(tronErrorList(error + ''));
  }
};

const getUserInfo = () => {
  if (!document.hidden) {
    store.dispatch('getUserInfoAction');
  }
}

onMounted(async () => {
  const data = await getPlatformDappRechargeAddress()
  const datas = await getPlatformRechargeAddress()
  if(datas.code === 12000){
    rechargeTransferAdress.value = datas.data;
  }
  if (data.code === 12000) {
    rechargeAdress.value = data.data;
  } else {
    ElMessage.error(data.msg);
  }

  window.addEventListener('visibilitychange', getUserInfo)
});

onUnmounted(() => {
  window.removeEventListener('visibilitychange', getUserInfo);
})

const copyEnd = () => {
  copy({
    msg: rechargeTransferAdress.value,
    callback: () => {
      ElMessage.success(t('MANAGE-042'));
    },
  });
};
</script>
<style scoped>
.tron-link-btn {
  width: 280px;
  height: 58px;
  border: 1px solid #c8d0df;
  border-radius: 6px;
  margin-bottom: 1em;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.tron-link-btn>img {
  width: 30px;
}

.tron-link-btn>span {
  margin-left: 10px;
}

.recharge {
  position: relative;
}

.recharge-content-history {
  cursor: pointer;
  position: absolute;
  right: 40px;
  top: 0;
  z-index: 99;
  display: inline-block;
  color: #c53027;
  transition: color 0.3s;
}

.recharge-content-two-text-child {
  color: #000000d9;
}

.recharge-content-two-text {
  color: red;
  margin-top: 10px;
}

.recharge-content {
  width: 100%;
  background: #f2f6ff;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.recharge-content-input {
  width: 500px;
}

.recharge-content-button {
  width: 160px;
  height: 40px;
  margin: 15px 0;
}

.recharge-content-text {
  font-size: 14px;
}

.recharge-content-address {
  height: 48px;
  width: 450px;
  box-sizing: border-box;
  padding: 4px 11px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
  align-items: center;
}

.recharge-content-address-icon {
  cursor: pointer;
}
</style>
