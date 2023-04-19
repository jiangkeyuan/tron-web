<template>
  <div class="outer">
    <h1>简易批量租能量</h1>
    <div class="outer-title">
      <span>您的Api密钥</span>
      <span>余额: 0</span>
    </div>
    <el-input v-model="form.apiKey" placeholder="填写你的密钥">
    </el-input>
    <div class="outer-title">
      <span>租用能量数</span>
    </div>
    <el-input v-model="form.rentalEnergyQuantity" type="number" placeholder="每个地址租用的能量数,30000起租"></el-input>

    <div class="outer-title">
      <span>租用天数</span>
    </div>
    <Button-List v-model:rentalDays = 'form.rentalHours'></Button-List>

    <div class="outer-title">
      <span>接收能量的地址（一行一个）</span>
    </div>
    <el-input v-model="form.receiveAddress" placeholder="接收能量的地址（一行一个）" rows="10" type="textarea"></el-input>

    <div class="outer-title">
      <span>已经发送的地址</span>
    </div>
    <el-input disabled v-model="receiveAddressSuccess" placeholder="此处会显示已发送成功的钱包地址..." rows="10"
      type="textarea"></el-input>

    <el-button type="primary" @click="submit" class="outer-btn" :loading='loading'>开始新的请求</el-button>
  </div>
</template>
<script setup>
import { orderSubmit } from "@/utils/axios/buyer/index.js";
import { ElMessage } from "element-plus";
const loading = ref(false);
const form = reactive({
  rentalHours: '1'
})

let receiveAddressList = [];
const receiveAddressSuccess = ref('');

const submit = async () => {
  if (!form.rentalEnergyQuantity) {
    ElMessage.error('请输入能量数');
    return;
  }
  if (+form.rentalEnergyQuantity < 30000) {
    ElMessage.error('最低租用30000能量');
    return;
  }
  if (!form.receiveAddress) {
    ElMessage.error('请输入接收方地址');
    return;
  }
  loading.value = true;

  if (receiveAddressList.length === 0) {
    receiveAddressList = form.receiveAddress.split(/[\s]/);
  }

  getList(receiveAddressList)
}

const getList = async (receiveAddressList) => {
  if (receiveAddressList.length === 0) {
    ElMessage.success('操作成功')
    loading.value = false;
    return;
  }

  const receiveAddress = receiveAddressList[0];
  receiveAddressList.splice(0, 1);
  const data = await orderSubmit({
    apiKey: form.apiKey,
    receiveAddress,
    rentalHours:form.rentalHours,
    rentalEnergyQuantity: form.rentalEnergyQuantity
  })
  if (data.code === 12000) {
    receiveAddressSuccess.value += data.data.toAddress + ','
    getList(receiveAddressList)
  } else {
    loading.value = false;
    ElMessage.error(`${receiveAddress}:${data.msg}`);
  }
}
</script>
<style scoped>
.outer-btn {
  margin-top: 20px;
}

h1 {
  font-size: 28px;
}

.outer-title {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #606266;
  font-size: 14px;
  margin: 10px 0;
}

.outer {
  margin: auto auto;
  width: 800px;
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, .1);
  padding: 20px;
}
</style>