<template>
  <div class="recharge">
    <DashBord>
      <div class="recharge">
        <div class="recharge-content-history" @click="() => gotoRechargeLog()">
          充值记录
        </div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="DAPP" name="first">
            <div class="recharge-content">
              <div class="recharge-content" v-if="store.state.userInfo?.userInfo?.walletAddress">
                <el-input placeholder="请输入充值TRX币额" v-model="rechargeAmount" size="large" class="recharge-content-input">
                  <template #append>TRX</template>
                </el-input>
                <el-button @click="addMoney" type="primary" class="recharge-content-button">充 值</el-button>
                <span class="recharge-content-text">充值实时到账,用不完的余额也可随时提取</span>
              </div>
              <div v-else>
                <div v-if="isConnectedWallet()">
                  <div class="recharge-content">
                    <el-input :value="walletAddress()" disabled size="large" class="recharge-content-input" />
                    <el-button @click="() => bindWalletHandle()" type="primary" class="recharge-content-button">
                      绑 定</el-button>
                    <span class="recharge-content-text">绑定钱包地址</span>
                  </div>
                </div>
                <div v-else>
                  <div class="tron-link-btn">
                    <img class="tron-link-logo" src="@/assets/login/tron-link-logo.svg" width="80" alt="图片加载失败">
                    <span>波场钱包</span>
                  </div>

                  <div class="tips" data-v-045b4c20="">1、还没有钱包？</div>
                  <div class="download tips" data-v-045b4c20=""><a target="_blank"
                      href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec"
                      data-v-045b4c20="">2、安装TronLink钱包</a></div>
                  <div class="tips" data-v-045b4c20="">3、一个账户只能绑定一个钱包。一旦一个钱包被绑定,它就不能被解除绑定或与另一个账户绑定</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="转账充值" name="second">
            <div class="recharge-content">
              <span>平台钱包地址</span>
              <div class="recharge-content-address">
                <span>{{ rechargeAdress }}</span>
                <el-icon @click="copyEnd" class="recharge-content-address-icon" color="#294aa5">
                  <CopyDocument />
                </el-icon>
              </div>
              <div class="recharge-content-two-text">
                <span>*</span>
                <span class="recharge-content-two-text-child">
                  请使用波场浏览器或手机钱包进行转账</span>
              </div>
              <div class="recharge-content-two-text">
                <span>*</span>
                <span class="recharge-content-two-text-child">
                  请核对钱包地址后再转账,若转账后没查到充值金额,可联系客服找回</span>
              </div>
              <div class="recharge-content-two-text">
                <span>*</span>
                <span> 必须使用账号绑定的钱包地址转账充值才可以正常入账</span>
              </div>
            </div>
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
import { md5 } from "@/utils/utils/md5.js";
import { isConnectedWallet, walletAddress } from '@/utils/utils/tron.js';
import { dappRecharge, bindWallets } from '@/utils/axios/buyer/index';
import { ElMessage } from "element-plus";
const router = useRouter();
const activeName = ref("first");
const rechargeAmount = ref("");
const store = useStore();
const rechargeAdress = ref("TFoTX1MtKuG97pUo3crNXjdZLY6fS77777");

const bindWalletHandle = async () => {
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

const addMoney = async () => {
  const isRead = await window.tronLink.request({
    method: "tron_requestAccounts",
  });
  console.log(isRead)
  if (!isRead) return;
  if (walletAddress !== store.state.userInfo?.userInfo?.walletAddress) {
    ElMessage.error('钱包地址与绑定地址不匹配，请使用绑定的钱包充值')
    return;
  }
  const unsignedTxn = await tronWeb.transactionBuilder.sendTrx(
    "TVDJUVhQPdp8Gojsp7bmZS47M8KU2zSsaq",
    tronWeb.toSun(rechargeAmount.value),
    walletAddress
  );
  const signedTxn = await tronWeb.trx.sign(unsignedTxn);
  var broastTx = await tronWeb.trx.sendRawTransaction(signedTxn);
  const data = await dappRecharge({ transactionHash: broastTx.txid, signedTransactionHash: "x8SY39r6SOyHcycsYvSWT0WqYXg0uGvZ" })
  if (data.code === 12000) {
    ElMessage.success(data.msg);
    store.dispatch('getUserInfoAction');
  } else {
    ElMessage.error(data.msg);
  }
};

onMounted(async () => {
  console.log(md5(11111, 'x8SY39r6SOyHcycsYvSWT0WqYXg0uGvZ'));
});

const copyEnd = () => {
  copy({
    msg: rechargeAdress.value,
    callback: () => {
      ElMessage.success("复制成功");
    },
  });
};

const gotoRechargeLog = () => {
  router.push("/console/buyer/recharge-log");
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
  color: #294aa5;
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
