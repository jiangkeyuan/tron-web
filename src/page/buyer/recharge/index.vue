<template>
  <div class="recharge">
    <DashBord>
      <div class="recharge-content-history" @click="gotoRechargeLog">
        充值记录
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="DAPP" name="first">
          <div class="recharge-content">
            <el-input
              v-model="rechargeAmount"
              size="large"
              class="recharge-content-input"
            >
              <template #append>TRX</template>
            </el-input>
            <el-button
              @click="addMoney"
              type="primary"
              class="recharge-content-button"
              >充 值</el-button
            >
            <span class="recharge-content-text"
              >充值实时到账,用不完的余额也可随时提取</span
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="转账充值" name="second">
          <div class="recharge-content">
            <span>平台钱包地址</span>
            <div class="recharge-content-address">
              <span>{{ rechargeAdress }}</span>
              <el-icon
                @click="copyEnd"
                class="recharge-content-address-icon"
                color="#294aa5"
                ><CopyDocument
              /></el-icon>
            </div>
            <div class="recharge-content-two-text">
              <span>*</span>
              <span class="recharge-content-two-text-child">
                请使用波场浏览器或手机钱包进行转账</span
              >
            </div>
            <div class="recharge-content-two-text">
              <span>*</span>
              <span class="recharge-content-two-text-child">
                请核对钱包地址后再转账,若转账后没查到充值金额,可联系客服找回</span
              >
            </div>
            <div class="recharge-content-two-text">
              <span>*</span>
              <span> 必须使用账号绑定的钱包地址转账充值才可以正常入账</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </DashBord>
  </div>
</template>
<script setup>
import DashBord from "@/components/dashbord-content.vue";
import { copy } from "@/utils/utils/index.js";
import { useRouter } from "vue-router";
const router = useRouter();
const activeName = ref("first");
const rechargeAmount = ref("");
const rechargeAdress = ref("TFoTX1MtKuG97pUo3crNXjdZLY6fS77777");

const addMoney = async () => {
  const isRead = await window.tronLink.request({
    method: "tron_requestAccounts",
  });
  if (!isRead) return;
  console.log(isRead);
  const base58Key = window.tronLink.sunWeb.mainchain.defaultAddress.base58;
  const unsignedTxn = await tronWeb.transactionBuilder.sendTrx(
    "TFoTX1MtKuG97pUo3crNXjdZLY6fS77777",
    1,
    base58Key
  );
  const signedTxn = await tronWeb.trx.sign(unsignedTxn);
  var broastTx = await tronWeb.trx.sendRawTransaction(signedTxn);
  console.log(broastTx);
};

onMounted(async () => {});

const copyEnd = () => {
  copy({
    msg: rechargeAdress.value,
    callback: () => {
      ElMessage.success("复制成功");
    },
  });
};

const gotoRechargeLog = () => {
  router.push("/buyer/recharge-log");
};
</script>
<style scoped>
.recharge {
  position: relative;
}
.recharge-content-history {
  cursor: pointer;
  position: absolute;
  right: 40px;
  top: 20px;
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
