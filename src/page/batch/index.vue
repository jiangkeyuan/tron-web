<template>
  <div class="outer">
    <h1>{{$t('MANUAL-017')}}</h1>
    <div class="outer-title">
      <span>{{$t('MANUAL-018')}}</span>
      <span>{{$t('MANUAL-019')}}: 0</span>
    </div>
    <el-input v-model="form.apiKey" :placeholder="$t('MANUAL-029')">
    </el-input>
    <div class="outer-title">
      <span>{{$t('MANUAL-020')}}</span>
    </div>
    <el-input v-model="form.rentalEnergyQuantity" type="number" :placeholder="$t('MANUAL-020')"></el-input>

    <div class="outer-title">
      <span>{{$t('MANUAL-021')}}</span>
    </div>
    <Button-List v-model:rentalDays = 'form.rentalHours'></Button-List>

    <div class="outer-title">
      <span>{{$t('MANUAL-022')}}</span>
    </div>
    <el-input v-model="form.receiveAddress" :placeholder="$t('MANUAL-022')" rows="10" type="textarea"></el-input>

    <div class="outer-title">
      <span>{{$t('MANUAL-023')}}</span>
    </div>
    <el-input disabled v-model="receiveAddressSuccess" :placeholder="$t('MANUAL-024')" rows="10"
      type="textarea"></el-input>

    <el-button type="primary" @click="submit" class="outer-btn" :loading='loading'>{{$t('MANUAL-025')}}</el-button>
  </div>
</template>
<script setup>
import { orderSubmit } from "@/utils/axios/buyer/index.js";
import { ElMessage } from "element-plus";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const loading = ref(false);
const form = reactive({
  rentalHours: '1'
})

let receiveAddressList = [];
const receiveAddressSuccess = ref('');

const submit = async () => {
  if (!form.rentalEnergyQuantity) {
    ElMessage.error(t('MANUAL-026'));
    return;
  }
  if (+form.rentalEnergyQuantity < 30000) {
    ElMessage.error(t('MANUAL-027'));
    return;
  }
  if (!form.receiveAddress) {
    ElMessage.error(t('MANUAL-015'));
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
    ElMessage.success(t('OperateSuccess'))
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