<template>
  <div class="maual-lease" v-loading.fullscreen.lock="fullscreenLoading">
    <el-form :model="form" label-width="200px" label-position="left">
      <el-form-item label="可用余额:" class="maual-lease-item">
        <span>{{ store.state.userInfo?.userInfo?.availableBalance?.toLocaleString() }} TRX</span>
      </el-form-item>
      <el-form-item label="租用量:">
        <div class="maual-lease-item-energy">
          <el-input v-model="form.rentalEnergyQuantity" placeholder="请输入租用量">
            <template #append>Energy</template>
          </el-input>
          
          <span class="maual-lease-item-energy-text">
            大约需要支付
            <span class="maual-lease-item-energy-text-num">{{ rentalEnergynum || 0 }}</span> 
            TRX
            +
            <span class="maual-lease-item-energy-text-num">{{ commission }}</span> 
            TRX
          </span>
        </div>
       
      </el-form-item>
      <el-form-item label="租用天数:" class="maual-lease-item">
        <Button-List v-model:rentalDays = 'form.rentalHours'></Button-List>
      </el-form-item>
      <el-form-item label="接收地址:" class="maual-lease-item">
        <el-input v-model="form.receiveAddress" placeholder="必须输入接受地址" />
      </el-form-item>
      <el-form-item class="maual-lease-item">
        <el-button type="primary" @click="() => buy()">租 用</el-button>
        <el-button link type="primary" @click=openBatch>批量租赁</el-button>
      </el-form-item>
    </el-form>

    <div class="recharge-content-two-text">
      <span>*</span>
      <span class="recharge-content-two-text-child">
        当购买能量低于50000时,将会多收取0.6TRX
      </span>
    </div>
  </div>
</template>
<script setup>
import { manaulBuy,getPlatformPrice } from '@/utils/axios/buyer/index';
import { ElMessage } from 'element-plus';
import { watch } from 'vue';
const store = useStore();
const fullscreenLoading = ref(false);
const form = reactive({
  receiveAddress: '',
  rentalHours: 1,
  rentalEnergyQuantity: ''
});
const platformPrice = ref(0);

let rentalEnergynum = ref(null);

let commission = ref(0.6);

watch([() => form.rentalEnergyQuantity, () => form.rentalHours], (n, o) => {
  rentalEnergynum.value = +n[0] * platformPrice.value * Math.floor((+n[1] + 23) / 24) / 1000000
})

watch(()=> form.rentalEnergyQuantity,(n)=>{
  if(+n >= 50000){
    commission.value = 0;
  }else{
    commission.value = 0.6;
  }
})


const pageGetPlatformPrice = async ()=>{
  const data = await getPlatformPrice();
  if(data.code === 12000){
    platformPrice.value = +data.data;
  }
}

pageGetPlatformPrice()

const buy = async () => {
  if (!form.rentalEnergyQuantity) { ElMessage.error('请输入租用量'); return; }
  if(+form.rentalEnergyQuantity < 30000){ ElMessage.error('租用最低 30000 能量'); return; }
  if (!form.rentalHours) { ElMessage.error('请选择租用天数'); return; }
  if (!form.receiveAddress) { ElMessage.error('请输入接收地址'); return; }

  fullscreenLoading.value = true;
  const data = await manaulBuy('/buyer/user/manaul/buy', { ...form, rentalEnergyQuantity: +form.rentalEnergyQuantity });
  store.dispatch('getUserInfoAction');
  fullscreenLoading.value = false;
  ElMessage[data.code === 12000 ? 'success' : 'error'](data.msg);
}

const openBatch = () => {
  window.open(`${location.origin}/#/open/batch`, '_blank');
}
</script>
<style scoped>

.recharge-content-two-text-child {
  color: #989fae;
}

.recharge-content-two-text {
  color: red;
  margin-top: 10px;
}
.maual-lease {
  padding: 24px;
  box-sizing: border-box;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  font-feature-settings: tnum;
  background: #fff;
  border-radius: 5px !important;
  border: 1px solid #c8d0df !important;
}

.maual-lease-item {
  width: 600px;
}

.el-input-number {
  width: 400px;
}

.el-input-group--append {
  width: 400px;
}

.maual-lease-item-energy {
  display: flex;
  flex-direction: row;
}

.maual-lease-item-energy-text {
  margin-left: 20px;
  color: #989fae;
}

.maual-lease-item-energy-text-num {
  color: #1890ff;
}
</style>