<template>
  <el-dialog
    v-model="props.show"
    :title="radioVal"
    width="450px"
    center
    :before-close="handleClose"
    @open="open"
    class="buy-popup"
  >
    <div class="content">
      <!-- <el-radio-group
        v-model="radioVal"
        style="margin-bottom: 30px"
        size="large"
      >
        <el-radio-button label="能量">能量</el-radio-button>
        <el-radio-button label="带宽">带宽</el-radio-button>
      </el-radio-group> -->

      <el-form
        :model="form"
        :rules="rules"
        ref="ruleFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-form-item :label="`接收${radioVal}地址`">
          <el-input v-model="form.receiveAddress" placeholder="不填写默认当前付款地址" />
        </el-form-item>
        <el-form-item :label="`${radioVal}数量`" prop="rentalEnergyQuantity">
          <el-input
          placeholder="请输入能量数量，30000起租"
            v-model="form.rentalEnergyQuantity"
            :formatter="value => value.replace(/[^0-9.]/g, '')"
          />
        </el-form-item>
        <el-form-item label="">
          <Desc label="价格/天">
            <template #content>
              <div>{{ radioVal }}单价，每百万能量需消耗的 TRX</div>
            </template>
            <template #value>
              <el-input-number
                v-model="form.price.day"
                :min="price.day"
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
        <div>*当前购买能量低于50000时，将会多收取0.6TRX</div>
        <div>大约需要支付 <span class="commission">{{origiAmount}}</span> TRX + <span class="commission">{{commission}}</span> TRX</div>
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
            <div>{{ economize }} TRX</div>
          </template>
        </Desc>
        <!-- <Desc
          label="折&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;扣"
          content="与冻结期间燃烧 TRX 相比的折扣"
        >
          <template #value>
            <div>74 %</div>
          </template>
        </Desc> -->
        <!-- <Desc label="手&nbsp;&nbsp;续&nbsp;费" content="永久免费">
            <template #value>
              <div>0 TRX</div>
            </template>
          </Desc> -->
      </div>
      <span class="hint">
        温馨提示：如果您选择比 {{ radioVal == '能量' ? price : 1200 }} Sun
        更高的价格/天，您的订单可能会更早完成。
      </span>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose" class="btn cancel">取消</el-button>
        <el-button
          type="primary"
          @click="handleSell(ruleFormRef)"
          class="btn cancel"
          :loading="loading"
        >
          下单
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { walletAddress } from '@/utils/utils/tron.js'
import {
  buyManualOrders,
  getPlatformTransferAddress,
  getPlatformPrice
} from '@/utils/axios/home/index.js'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { computed, reactive, ref } from 'vue'
const emit = defineEmits(['close'])
const radioVal = ref('能量')
const form = reactive({
  rentalHours: 72,
  price: {},
  rentalEnergyQuantity: '',
  receiveAddress: ''
})
const commission = ref(0)
const ruleFormRef = ref()
const origiAmount = ref(0)
const rules = reactive({
  rentalEnergyQuantity: [
    { required: true, message: '请输入数额', trigger: ['blur', 'change'] }
  ]
})

const address = ref('')
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
const loading = ref(false)
const handleChange = value => {
  console.log(value)
}
const handleClose = () => {
  emit('close')
  resetForm()
}
const handleSell = async formEl => {
  const receiveAddress = form.receiveAddress || walletAddress()
  console.log('address',address.value);
  if(form.rentalEnergyQuantity < 30000) {
    return ElMessage.error('租用最低 30000 能量')
  }
  console.log('receiveAddress',receiveAddress);
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        loading.value = true
        const unsignedTxn = await tronWeb.transactionBuilder.sendTrx(
          address.value,
          tronWeb.toSun(orderAmount.value),
          receiveAddress
        )
        const signedTxn = await tronWeb.trx.sign(unsignedTxn)
        const broastTx = await tronWeb.trx.sendRawTransaction(signedTxn)

        console.log('broastTx', broastTx)
        queryBuyManualOrders(broastTx.txid)
      } catch (error) {
        console.error(error)
        loading.value = false
        if (JSON.stringify(error).includes('balance is not sufficient')) {
          return ElMessage.error('余额不足')
        }
        ElMessage.error(error)
      }
    } else {
      return false
    }
  })
}
const queryBuyManualOrders = async hash => {
  const postData = {
    ...form,
    transactionHash: hash
  }
  const data = await buyManualOrders(postData)
  loading.value = false
  if (data.code === 12000) {
    ElMessage.success(data.msg)
    handleClose()
  } else {
    ElMessage.error(data.msg)
  }
}
const queryPlatformTransferAddress = async () => {
  const data = await getPlatformTransferAddress()
  if (data.code === 12000) {
    address.value = data.data
  } else {
    ElMessage.error(data.msg)
  }
}
const price = reactive({})
const queryPlatformPrice = async () => {
  const data = await getPlatformPrice()
  if (data.code === 12000) {
    form.price = data.data
    Object.assign(price,data.data)
  } else {
    ElMessage.error(data.msg)
  }
}
onMounted(() => {
  queryPlatformPrice()
  queryPlatformTransferAddress()
})
const orderAmount = computed(() => {
  const amount = getAmount()
  origiAmount.value = getAmount()
  return amount != 0 ? +amount + getCommissionValue(form.rentalEnergyQuantity) : amount
})
const economize = computed(() => {
  const amount = getAmount()
  const a = form.rentalEnergyQuantity * 3 / 2381
  console.log('a ',a );
  const result = a - amount
  console.log('amount ', result);
  return result.toFixed(2)
})
const getAmount = () => {
  const rentalHours = Math.floor((Number(form.rentalHours) + 23) / 24)
  const amount = form.rentalEnergyQuantity * rentalHours * (Number(form.rentalHours) > 1 ? form.price.day : form.price.hour);
  return tronWeb.fromSun(amount)
}
const getCommissionValue = (val) =>{
  if(+val >= 50000){
    commission.value = 0;
  }
  else{
    commission.value = 0.6;
  }
  return commission.value
}
const resetForm = () => {
  //   form.rentalEnergyQuantity = ''
  ruleFormRef.value.resetFields()
}
const open = () => {
  form.receiveAddress = walletAddress() || ''
}
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
  .commission {
    color: #2a47ab;
  }
}
</style>
