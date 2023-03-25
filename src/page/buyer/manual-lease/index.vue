<template>
  <div class="maual-lease">
    <el-form :model="form" label-width="200px" label-position="left">
      <el-form-item label="可用余额:" class="maual-lease-item">
        <span>165.880744 TRX</span>
      </el-form-item>
      <el-form-item label="租用量:">
        <div class="maual-lease-item-energy">
          <el-input v-model="form.rentalEnergyQuantity" placeholder="请输入租用量">
            <template #append>Energy</template>
          </el-input>
          <span class="maual-lease-item-energy-text">
            大约需要支付
            <span class="maual-lease-item-energy-text-num">{{ rentalEnergynum }}</span>
            TRX
          </span>
        </div>
      </el-form-item>
      <el-form-item label="租用天数:" class="maual-lease-item">
        <el-input-number class="el-input-number" v-model="form.rentalDays" :min="3" placeholder="请输入租用天数" />
      </el-form-item>
      <el-form-item label="接收地址:" class="maual-lease-item">
        <el-input v-model="form.receiveAddress" placeholder="必须输入接受地址" />
      </el-form-item>
      <el-form-item class="maual-lease-item">
        <el-button type="primary" @click="() => buy()">租 用</el-button>
        <el-button link type="primary">批量租赁</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { manaulBuy } from '@/utils/axios/buyer/index';
import { ElMessage } from 'element-plus';
const form = reactive({
  receiveAddress: '',
  rentalDays: 3,
  rentalEnergyQuantity: ''
});

let rentalEnergynum = ref(null);

watch([() => form.rentalEnergyQuantity, () => form.rentalDays], (n, o) => {
  console.log(n)
  const rate = +n[0] >= 50000 ? 115 : 120;
  rentalEnergynum.value = +n[0] * rate * n[1] / 1000000
})

const buy = async () => {
  if (!form.rentalEnergyQuantity) { ElMessage.error('请输入租用量'); return; }
  if (!form.rentalDays) { ElMessage.error('请输入租用天数'); return; }
  if (!form.receiveAddress) { ElMessage.error('请输入接收地址'); return; }
  const data = await manaulBuy('/tron/user/manaul/buy', { ...form, rentalEnergyQuantity: +form.rentalEnergyQuantity });
  ElMessage[data.code === 12000 ? 'success' : 'error'](data.msg);
  const store = useStore();
  store.dispatch('getUserInfoAction');
}
</script>
<style scoped>
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