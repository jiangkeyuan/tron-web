<template>
  <el-dialog v-model="props.show" :title="radioVal" width="450px" center :before-close="handleClose" class="buy-popup">
    <div class="content">
      <!-- <el-radio-group
        v-model="radioVal"
        style="margin-bottom: 30px"
        size="large"
      >
        <el-radio-button label="能量">能量</el-radio-button>
        <el-radio-button label="带宽">带宽</el-radio-button>
      </el-radio-group> -->

      <el-form :model="form" label-width="100px" label-position="top">
        <el-form-item :label="`接收${radioVal}地址`">
          <el-input
            v-model="form.receiveAddress"
            placeholder="不填写默认当前付款地址"
          />
        </el-form-item>
        <el-form-item :label="`${radioVal}数量`">
          <el-input v-model="form.rentalEnergyQuantity" />
        </el-form-item>
        <el-form-item label="">
          <Desc label="价格/天">
            <template #content>
              <div>{{ radioVal }}单价，每百万能量需消耗的 TRX</div>
            </template>
            <template #value>
              <el-input-number
                v-model="form.price"
                :min="110"
                :max="99999"
                @change="handleChange"
              />
            </template>
          </Desc>
        </el-form-item>
        <el-form-item label="">
          <Desc label="冻结时间" value="3天">
            <template #content>
              <div>目前 TRON 限制为 3天，未来会加长</div>
            </template>
          </Desc>
        </el-form-item>
      </el-form>
      <div class="order-info">
        <Desc label="订单金额" content="您需要支付的订单金额">
          <template #value>
            <div>{{ orderAmount }} TRX</div>
          </template>
        </Desc>
        <Desc
          label="节&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;省"
          content="较 3天燃烧节省"
        >
          <template #value>
            <div>0 TRX</div>
          </template>
        </Desc>
        <Desc
          label="折&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;扣"
          content="与冻结期间燃烧 TRX 相比的折扣"
        >
          <template #value>
            <div>0 %</div>
          </template>
        </Desc>
        <!-- <Desc label="手&nbsp;&nbsp;续&nbsp;费" content="永久免费">
            <template #value>
              <div>0 TRX</div>
            </template>
          </Desc> -->
      </div>
      <span class="hint">
        温馨提示：如果您选择比 {{ radioVal == '能量' ? 110 : 1200 }} Sun
        更高的价格/天，您的订单可能会更早完成。
      </span>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose" class="btn cancel">取消</el-button>
        <el-button type="primary" @click="handleSell" class="btn cancel">
          下单
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { walletAddress } from '@/utils/utils/tron.js'
import { sellManualOrders } from '@/utils/axios/home/index.js'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
const emit = defineEmits(['close'])
const radioVal = ref('能量')
const form = reactive({
  rentalDays: 3,
  price: 110,
  rentalEnergyQuantity: '',
  receiveAddress: walletAddress()
})
// const orderAmount = ref(0)
const props = defineProps({
  show: {
    type: Boolean
  },
  rowData: {
    type: Object
  }
})
const num = ref(1)
const handleChange = value => {
  console.log(value)
}
const handleClose = () => {
  emit('close')
}

onMounted(() => {})
const orderAmount = computed(() => {
  const amount = form.rentalEnergyQuantity * form.rentalDays * form.price

  return tronWeb.fromSun(amount)
})
</script>

<style lang="less" scoped>
.buy-popup {
  .order-info {
    background-color: #f6f6f6;
    color: #707582;
    padding: 20px;
    margin: 10px 0;
  }

  .hint {
    color: #2a47ab;
    font-size: 13px;
  }
  .dialog-footer {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .btn {
      width: 47%;
      border-radius: 6px;
      padding: 20px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
<style lang="less">
.buy-popup {
  .el-tabs__header {
    display: none;
  }

  .el-radio-button__inner {
    width: 200px;
  }
}
</style>
