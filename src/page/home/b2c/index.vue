<template>
  <div class="b2c-container">
    <div class="b2c-content">
      <div class="rental-container-v2 rental">
        <div class="rental-about">
          <h1>快捷交易 - 能量秒到账</h1>
          <div class="introduce">
            <ul>
              <li>租期更长，最长30天</li>
              <li>范围更大，1万起租</li>
              <li>支持多币种支付购买</li>
              <li>支持DAPP支付和转账租赁</li>
              <li>
                <span>如一次性需大额能量，可</span>
                <a
                  class="customer-link"
                  href="https://t.me/tron_hashgo"
                  target="_blank"
                  >联系客服</a
                >
                <span> 下单 </span>
              </li>
            </ul>
            <img src="@/assets/home/introduce.png" alt="" />
          </div>
          <!-- <div class="info">
            <div>剩余可租能量：<span>966,484</span>energy</div>
            <div>未来2小时内增加：<span>75,854,513</span>energy</div>
            <div>单笔最大可租：<span>355,343</span>energy</div>
          </div> -->
          <img
            src="@/assets/home/swap-bg-spaceman.png"
            alt=""
            class="spaceman-img"
          />
        </div>
        <div class="rental-operation">
          <div class="header">
            <div class="title">{{ leaseRadio }}</div>
            <el-radio-group v-model="leaseRadio" @change="changeVal">
              <el-radio-button label="转账租凭" border class="color"
                >转账租凭</el-radio-button
              >
              <el-radio-button class="color" label="DAPP租赁" border
                >DAPP租赁</el-radio-button
              >
            </el-radio-group>
          </div>
          <template v-if="leaseRadio == '转账租凭'">
            <div class="project-panel">
              <div class="input-panel rentVal">
                <div class="title">租用量（单笔1~138.5908万）</div>
                <div class="input">
                  <el-input
                    v-model="capacity"
                    clearable
                    placeholder="请输入需要租用的数量"
                    min="10000"
                    max="1408730"
                    suffix-icon="Search"
                    @input="onInput"
                    :formatter="value => value.replace(/[^0-9.]/g, '')"
                  />
                </div>
                <div class="rent-value-shortcut">
                  <div
                    class="item"
                    v-for="(item, index) in shortcutList"
                    :key="index"
                    @click="onClick(item.value)"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </div>
              <div class="notice noticepc"></div>
              <div class="input-panel rentDay">
                <!-- <div class="title">租用时间{{ rentalDaysObj[rentalDays] }}</div> -->
                <div class="title">租用时间默认为3天</div>
                <!-- <br /> -->
                <!-- <Button-List v-model:rentalDays="rentalDays"></Button-List> -->
              </div>

              <div class="announcements">
                <div>1、转账租赁最小支持金额5.25TRX/0.33USDT</div>
                <div>2、若转账大于可租能量，将扣除1%手续费后原路退回</div>
                <div>
                  3、平台默认转账钱包为接收能量地址，若需自定义接收地址，请在转账时备注接收地址

                  <el-tooltip
                    class="box-item"
                    content="Left Center prompts info"
                    placement="left"
                    effect="light"
                  >
                    <template #content>
                      <img
                        src="@/assets/home/b2c-screenshot-zh.png"
                        alt=""
                        srcset=""
                      />
                    </template>
                    <span class="example-title"> 示例教程 </span>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="pay-panel">
              <div class="header">
                <div class="title">支付</div>
              </div>
              <div class="cashier">
                <div class="address">
                  <div class="address-title">平台地址：</div>
                  <div class="copy-board">
                    <span class="copy-btn-wrapper">
                      <div class="btn">
                        <span>{{ transferAddress }}</span>
                        <el-icon
                          class="icon"
                          @click="copyTransferAddress(transferAddress)"
                          ><CopyDocument
                        /></el-icon>
                      </div>
                    </span>
                  </div>
                </div>
                <div>*当前购买能量低于50000时，将会多收取0.6TRX</div>
                <div>
                  大约需要支付
                  <span class="commission">{{ fromSunAmount }}</span> TRX +
                  <span class="commission">{{ commission }}</span> TRX
                </div>
                <div class="amount-box">
                  <div class="amount-content">
                    <div class="amount">
                      <span>需转账金额</span>
                      <span>
                        <em>{{ amount }}</em>
                        TRX
                      </span>
                    </div>
                    <div class="info">
                      <div>
                        价格/天：
                        <span>{{ price.day }}</span>
                        sun
                      </div>
                      <!-- <div>
                        较3天烧毁省≈
                        <span>{{economize}}TRX</span>
                      </div> -->
                    </div>
                  </div>
                  <!-- <img
                    src="@/assets/home/content-qr-code.png"
                    alt="二维码加载失败，请检查网络后刷新重试"
                    class="content-qr-code"
                  /> -->
                  <div class="content-qr-code">
                    <qrcode-vue
                      :value="transferAddress"
                      :size="70"
                    ></qrcode-vue>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer">
              <el-button
                color="#fe4d01"
                class="btn-block"
                @click="copyEnd(amount)"
                >复制金额，去转账</el-button
              >
            </div>
          </template>
          <template v-if="leaseRadio == 'DAPP租赁'">
            <div class="project-panel">
              <div class="input-panel wallet-address" v-if="defaultAddr">
                {{ defaultAddr }}
              </div>
              <div class="input-panel rentVal">
                <div class="title">租用量</div>
                <div class="input">
                  <el-input
                    v-model="capacity"
                    clearable
                    placeholder="请输入需要租用的数量，30000起租"
                    min="10000"
                    max="1408730"
                    suffix-icon="Search"
                    @input="onInput"
                    :formatter="value => value.replace(/[^0-9.]/g, '')"
                  />
                </div>
                <div class="rent-value-shortcut">
                  <div
                    class="item"
                    v-for="(item, index) in shortcutList"
                    :key="index"
                    @click="onClick(item.value)"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </div>
              <div class="notice noticepc"></div>
              <div class="input-panel rentDay">
                <div class="title">租用时间{{ rentalDaysObj[rentalDays] }}</div>
                <br />
                <Button-List v-model:rentalDays="rentalDays"></Button-List>
              </div>
              <div class="address">
                <div class="input-panel receive-address">
                  <div class="title">
                    <span>接收方</span>
                    <div class="unaddress">
                      <!-- <span>移除接收方</span> -->
                    </div>
                  </div>
                  <div class="input">
                    <el-input
                      v-model="address"
                      clearable
                      placeholder="不填写默认为当前账户地址"
                      min="10000"
                      max="1408730"
                      suffix-icon="Search"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="pay-panel">
              <div class="header">
                <div class="title">支付</div>
              </div>
              <div>*当前购买能量低于50000时，将会多收取0.6TRX</div>
              <div>
                大约需要支付
                <span class="commission">{{ fromSunAmount }}</span> TRX +
                <span class="commission">{{ commission }}</span> TRX
              </div>
              <div class="cashier">
                <div class="amount-box">
                  <div class="amount-content">
                    <div class="amount">
                      <span>需转账金额</span>
                      <span>
                        <em>{{ amount }}</em>
                        TRX
                      </span>
                    </div>
                    <div class="info">
                      <div>
                        价格/天：
                        <span>{{rentalDays > 1 ?  price.day : price.hour }}</span>
                        sun
                      </div>
                      <!-- <div>
                        较3天烧毁省≈
                        <span>{{ economize }}TRX</span>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer">
              <el-checkbox v-model="clause" style="margin-bottom: 20px"
                >为了确保您的交易完成，当快捷区能量不足时，自动免费发布到自助交易区</el-checkbox
              >
              <el-button
                color="#fe4d01"
                class="btn-block"
                :loading="loading"
                @click="payment"
                >支付</el-button
              >
            </div>
          </template>
        </div>
      </div>
      <!-- <div class="statistics-content stc-display">
        <div class="item">
          <div class="num">
            <div class="container num">
              <div>1,749,045,738</div>
            </div>
          </div>
          <div class="info">平台总能量</div>
        </div>
        <div class="item">
          <div class="num">
            <div class="container num">
              <div>48,398,862,613</div>
            </div>
          </div>
          <div class="info">累计为用户提供能量</div>
        </div>
        <div class="item">
          <div class="num">
            <div class="container num">
              <div>9,676,190.026</div>
            </div>
          </div>
          <div class="info">累计为用户节省TRX</div>
        </div>
        <div class="item">
          <div class="num">
            <div class="container num">
              <div>105</div>
            </div>
          </div>
          <div class="info">当前单价(sun) <i class="img">1</i></div>
          <div class="rule">5万能量以上</div>
        </div>
      </div> -->
      <div class="rent-log-container">
        <div class="rent-log-panel">
          <div class="rent-log-title">
            <div class="switch-panel">
              <el-radio-group v-model="radio" @change="radioChange">
                <el-radio-button label="1" border>大家在租</el-radio-button>
                <el-radio-button label="2" border>我的租用</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <!-- 大家在租 -->
          <div class="table" v-if="radio == '1'">
            <el-table
              :data="finishedOrdersList"
              :row-class-name="tableRowClassName"
              style="width: 100%"
            >
              <el-table-column prop="transactionHash" label="交易哈希">
                <template #default="{ row }">
                  <el-link
                    :href="`https://tronscan.org/#/transaction/${row.transactionHash}`"
                    target="_blank"
                    type="primary"
                    >TxHash</el-link
                  >
                </template>
              </el-table-column>
              <el-table-column prop="toAddress" label="租用地址" width="280" />
              <el-table-column prop="rentalQuantity" label="租用资源">
                <template #default="{ row }">
                  <div>{{ row.rentalQuantity }} 能量</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="rentalHours"
                label="租用时长"
                :formatter="row => filterHours(row.rentalHours)"
              >
              </el-table-column>
              <el-table-column
                prop="delegateDate"
                label="日期"
                :formatter="row => filterDate(row.delegateDate)"
              />
            </el-table>
          </div>
          <div class="table" v-if="radio == '2'">
            <el-table
              :data="ordersList"
              :row-class-name="tableRowClassName"
              style="width: 100%"
            >
              <el-table-column
                prop="payDate"
                label="支付时间"
                :formatter="row => filterDate(row.payDate)"
              />
              <el-table-column
                prop="orderStatus"
                label="订单状态"
                :formatter="row => filterStatus(row.orderStatus)"
              />
              <el-table-column prop="orderNo" label="订单号" />
              <el-table-column prop="toAddress" label="接收地址" />
              <el-table-column prop="rentalQuantity" label="租用数量" />
              <el-table-column
                prop="rentalHours"
                label="租用时长"
                :formatter="row => filterHours(row.rentalHours)"
              >
              </el-table-column>
              <el-table-column
                prop="expiredDate"
                label="到期时间"
                :formatter="row => filterDate(row.expiredDate)"
              />
              <el-table-column prop="payAmount" label="支付金额" />
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <api-box class="api dark" :effect="true"></api-box>
  </div>
</template>

<script setup>
import TronLink from '@/components/tron-link/index.js'
import { filterDate, filterHours } from '@/utils/utils/date.js'
import { walletAddress } from '@/utils/utils/tron.js'
import { copy } from '@/utils/utils/index.js'
import { Calendar, Search } from '@element-plus/icons-vue'
import {
  getQuickFinishedOrders,
  getQuickOrders,
  getPlatformRechargeAddress,
  buyDappOrders,
  getPlatformDappAddress,
  getPlatformTransferAddress,
  getPlatformPrice,
  hasSufficientTrx
} from '@/utils/axios/home/index.js'
import QrcodeVue from 'qrcode.vue'
import { reactive, ref } from 'vue'
const radio = ref('1')
const input = ref('')
const leaseRadio = ref('DAPP租赁')
const clause = ref(true)
const loading = ref(false)
const capacity = ref('')
const amount = ref('')
const transfer = ref('')
const rentalDays = ref(72)
const rentalDaysObj = reactive({
  1: '1小时',
  24: '1天',
  72: '3天'
})
const defaultAddr = ref('')
const economize = ref(0)
const fromSunAmount = ref(0)
const shortcutList = [
  {
    label: '50万',
    value: 500000
  },
  {
    label: '100万',
    value: 1000000
  },
  {
    label: '500万',
    value: 5000000
  },
  {
    label: '1000万',
    value: 10000000
  }
]
const commission = ref(0.6)
const amountFilter = str => {
  if (window.tronWeb) {
    return tronWeb?.fromSun(str)
  } else {
    return str / 1000000
  }
}

const tableRowClassName = ({ row, rowIndex }) => {
  if (rowIndex % 2 == 0) {
    return 'warning-row'
  }
  return 'success-row'
}
const onFormatter = value => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
const onParser = value => {
  return value.replace(/\$\s?|(,*)/g, '')
}
watch(rentalDays, o => {
  console.log('o', o)
  const sum = Math.floor((Number(o) + 23) / 24)
  const fromSun = amountFilter(capacity.value * sum * (Number(o) > 1 ? price.day : price.hour))
  fromSunAmount.value = fromSun
  amount.value =
    fromSun != 0 ? +fromSun + getCommissionValue(capacity.value) : fromSun
})
// 大家的租用地址
const radioChange = value => {
  console.log(value)
  switch (value) {
    case '1':
      queryQuickFinishedOrders()
      break
    case '2':
      queryQuickOrders()
      break

    default:
      break
  }
}
const finishedOrdersList = ref([])
const queryQuickFinishedOrders = async () => {
  const data = await getQuickFinishedOrders()
  console.log('data', data)
  finishedOrdersList.value = data.data
}
// 我的租用地址
const address = ref('')
const ordersList = ref([])
const queryQuickOrders = async () => {
  if (!address.value) return
  const data = await getQuickOrders(address.value)
  console.log('data', data)
  ordersList.value = data.data
}
const filterStatus = status => {
  switch (status) {
    case 'WAIT_DELEGATE':
      return '等待代理'
    case 'DELEGATEING':
      return '代理中'
    case 'ALMOST_DONE':
      return '即将结束'
    case 'DONE':
      return '已经完成'
    case 'UNAVAILABLE':
      return '未生效'
    default:
      return ''
  }
}
const onClick = val => {
  let sum = 0
  if (leaseRadio.value == '转账租凭') {
    sum = Math.floor((Number(72) + 23) / 24)
  } else {
    sum = Math.floor((Number(rentalDays.value) + 23) / 24)
  }
  console.log(1234)
  capacity.value = Number(capacity.value) + Number(val)
  const fromSun = tronWeb?.fromSun(capacity.value * sum * (Number(rentalDays.value) > 1 ? price.day : price.hour))
  fromSunAmount.value = fromSun
  console.log(fromSun)
  amount.value =
    fromSun != 0 ? +fromSun + getCommissionValue(capacity.value) : fromSun
  //   amount.value = +tronWeb?.fromSun(capacity.value * sum * price.value) + getCommissionValue(capacity.value)
  console.log('amount', amount.value)
  const x = capacity.value / 2381
  console.log('x', x)
  economize.value = Math.floor(x - amount.value)
}
const onInput = val => {
  let sum = 0
  if (leaseRadio.value == '转账租凭') {
    sum = Math.floor((Number(72) + 23) / 24)
  } else {
    sum = Math.floor((Number(rentalDays.value) + 23) / 24)
  }
  capacity.value = val
  const fromSun = tronWeb?.fromSun(capacity.value * sum * (Number(rentalDays.value) > 1 ? price.day : price.hour));
  fromSunAmount.value = fromSun
  amount.value =
    fromSun != 0 ? +fromSun + getCommissionValue(capacity.value) : fromSun
  console.log('amount', amount.value)
  const x = capacity.value / 2381
  economize.value = Math.floor(x - amount.value)
}
const changeVal = val => {
  rentalDays.value = '72'
  let sum = 0
  console.log(val == '转账租凭')
  if (val == '转账租凭') {
    sum = Math.floor((Number(72) + 23) / 24)
  } else {
    sum = Math.floor((Number(rentalDays.value) + 23) / 24)
  }
  console.log('changeVal', sum)
  const fromSun = tronWeb?.fromSun(capacity.value * sum * (Number(capacity.value) > 1 ? price.day : price.hour))
  fromSunAmount.value = fromSun
  amount.value =
    fromSun != 0 ? +fromSun + getCommissionValue(capacity.value) : fromSun
  console.log('amount', amount.value)
  const x = capacity.value / 2381
  console.log('x', x)
  economize.value = Math.floor(x - amount.value)
}
const copyEnd = msg => {
  if (!+amount.value) {
    return ElMessage.error('请输入金额')
  }
  copy({
    msg,
    callback: () => {
      ElMessage.success('复制成功')
    }
  })
}
const copyTransferAddress = msg => {
  copy({
    msg,
    callback: () => {
      ElMessage.success('复制成功')
    }
  })
}
const getCommissionValue = val => {
  if (+val >= 50000) {
    commission.value = 0
  } else {
    commission.value = 0.6
  }
  return commission.value
}
const payment = async () => {
  await TronLink()
  if (!amount.value) {
    return ElMessage.error('请输入需要租用的能量数')
  }
  if (+capacity.value < 30000) {
    return ElMessage.error('租用最低 30000 能量')
  }
  await queryHasSufficientTrx()
  if (!isHasSufficientTrx.value) {
    return ElMessage.error('平台能量不足')
  }
  try {
    const addr = address.value || walletAddress()
    loading.value = true
    const unsignedTxn = await tronWeb.transactionBuilder.sendTrx(
      dappAddress.value,
      tronWeb.toSun(amount.value),
      addr
    )
    const signedTxn = await tronWeb.trx.sign(unsignedTxn)
    const broastTx = await tronWeb.trx.sendRawTransaction(signedTxn)
    console.log('broastTx', broastTx)
    const postData = {
      transactionHash: broastTx.txid,
      rentalEnergyQuantity: Number(capacity.value),
      rentalHours: Number(rentalDays.value)
    }
    const data = await buyDappOrders(postData)
    console.log('data', data)
    loading.value = false
    if (data.code === 12000) {
      ElMessage.success(data.msg)
    } else {
      ElMessage.error(data.msg)
    }
  } catch (error) {
    console.error(error)
    loading.value = false
    if (JSON.stringify(error).includes('balance is not sufficient')) {
      return ElMessage.error('余额不足')
    }
    ElMessage.error(error)
  }
}
onMounted(() => {
  address.value = walletAddress() || ''
  defaultAddr.value = walletAddress() || ''
  //   queryPlatformRechargeAddress()
  queryPlatformDappAddress()
  queryPlatformTransferAddress()
  queryPlatformPrice()
  queryQuickFinishedOrders()
  window.addEventListener('message', function (e) {
    if (e.data.message && e.data.message.action == 'tabReply') {
      if (walletAddress()) {
        address.value = walletAddress()
        defaultAddr.value = walletAddress()
      } else {
        address.value = ''
        defaultAddr.value = ''
      }
    }
  })
})

const dappAddress = ref('')
const queryPlatformDappAddress = async () => {
  const data = await getPlatformDappAddress()
  if (data.code === 12000) {
    dappAddress.value = data.data
  } else {
    ElMessage.error(data.msg)
  }
}
const transferAddress = ref('')
const queryPlatformTransferAddress = async () => {
  const data = await getPlatformTransferAddress()
  if (data.code === 12000) {
    transferAddress.value = data.data
  } else {
    ElMessage.error(data.msg)
  }
}
const price = reactive({});
const queryPlatformPrice = async () => {
  const data = await getPlatformPrice()
  if (data.code === 12000) {
    Object.assign(price,data.data);
  } else {
    ElMessage.error(data.msg)
  }
}
const isHasSufficientTrx = ref(false)
const queryHasSufficientTrx = async () => {
  const data = await hasSufficientTrx({
    rentalEnergyQuantity: Number(capacity.value)
  })

  if (data.code === 12000) {
    isHasSufficientTrx.value = data.data
  } else {
    ElMessage.error(data.msg)
  }
}
</script>

<style lang="less" scoped>
.b2c-container {
  --bg-primary-color: #ff733b;
  --bg-secondary-color: #15244f;
  --bg-lesser-color: #b73700;
  --text-primary-color: #fff;
  --text--secondary-color: #7f8fc8;
  --text-lesser-color: #fff;
  --text-table-body-color: #fff;
  --text-notice-color: #ffd04b;
  --border-primary-color: #b73700;
  --border-radio-color: #2a47ab;
  --border-dashed-color: #ff733b;
  --input-suffix-color: #266ef1;
  --input-shortcut-color: #b73700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--bg-primary-color);
  background-image: url('@/assets/home/swap-bg.webp'),
    url('@/assets/home/swap-bg-star.png');
  background-size: cover, 100px;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left top, 95% 70%;
}

.b2c-content {
  max-width: 1300px;
  width: 100%;
  margin: 0px auto;
  position: relative;
}

.rental-container-v2 {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 38px 100px 0px;

  .rental-about {
    position: relative;
    flex: 1 1 0%;
    min-width: 280px;
    max-width: 400px;
    margin-right: 40px;
    padding-top: 30px;

    h1 {
      margin-bottom: 34px;
      font-size: 30px;
      color: var(--text-primary-color);
    }

    .introduce {
      position: relative;
      margin-top: 40px;
      .customer-link {
        color: #4969b3;
      }
      ul {
        padding-left: 20px;
        list-style: initial;
        line-height: 1.8em;
        color: var(--text-lesser-color);
        font-size: 16px;
      }

      img {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 0px;
        bottom: 0px;
      }
    }

    .info {
      margin-top: 50px;
      padding: 20px;
      border: 1px dashed rgb(53, 90, 160);
      border-radius: 6px;
      background-color: rgb(39, 55, 103);

      div {
        margin-bottom: 10px;

        &:last-child {
          margin: 0px;
        }
      }
    }

    .spaceman-img {
      width: 120%;
      margin: 60px -50px 0px;
    }
  }

  .rental-operation {
    padding: 30px;
    border: 1px solid var(--border-primary-color);
    border-radius: 25px;
    max-width: 590px;
    min-width: 570px;
    width: 590px;
    height: 100%;
    background-color: var(--bg-lesser-color);
    color: var(--text-primary-color);

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      .title {
        font-size: 30px;
      }
    }

    .project-panel {
      .input-panel {
        padding: 20px 20px 15px;
        border-radius: 6px;
        background-color: #db4202;

        .title {
          display: flex;
          justify-content: space-between;
        }

        .input {
          margin: 25px -10px 0;
          position: relative;
        }
      }

      .wallet-address {
        display: flex;
        align-items: center;
        padding: 15px;
        margin-bottom: 15px;
      }

      .receive-address {
        margin-top: 20px;
      }

      .unaddress {
        color: #26a17b;
        cursor: pointer;
        display: flex;
        align-items: center;
      }

      .rentDay {
        padding: 20px;
      }

      .announcements {
        margin-top: 15px;
        font-size: 14px;
        color: var(--text-notice-color);
        line-height: 1.4em;

        .example-title {
          color: #266ef1;
        }
      }

      .notice {
        color: var(--text-notice-color);
        margin: 15px 0;
      }
    }

    .pay-panel {
      margin-top: 15px;
      padding: 20px;
      border: 1px dashed var(--border-dashed-color);
      border-radius: 6px;

      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0;

        .title {
          font-size: 16px;
        }
      }

      .cashier {
        .address {
          margin-top: 6px;
          font-size: 12px;
          color: var(--text-notice-color);

          .address-title {
            display: inline;
          }

          .copy-board {
            display: inline;
            margin-top: 8px;

            span {
              margin-right: 8px;
              cursor: pointer;
            }

            .copy-btn-wrapper .icon {
              font-size: 16px;
            }
          }
        }

        .amount-box {
          display: flex;

          .amount-content {
            flex: 1;

            .amount {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 20px;
              padding: 0 15px;
              border-radius: 6px;
              height: 50px;
              background-color: #bf4d1b;
              color: var(--text-primary-color);

              em {
                margin-right: 5px;
                color: var(--text-primary-color);
                font-size: 20px;
                font-style: normal;
              }
            }
          }

          .content-qr-code {
            margin-top: -20px;
            margin-left: 20px;
            width: 90px;
            height: 90px;
            background: #fff;
            padding: 10px;
          }
        }

        .info {
          margin-top: 15px;
          
      color: var(--text-notice-color);
          font-size: 14px;

          div {
            display: inline-block;
            margin-right: 5px;
          }
        }
      }
    }

    .footer {
      margin-top: 20px;

      .btn-block {
        height: 55px;
        border-radius: 6px;
        font-weight: 700;
        width: 100%;
      }
    }
  }

  .rent-value-shortcut {
    margin-top: 15px;
    display: flex;

    .item {
      margin-right: 8px;
      border: 1px solid var(--text-notice-color);
      border-radius: 3px;
      padding: 5px 15px;
      font-size: 12px;
      color: var(--text-notice-color);
      transition: all 0.5s ease-in-out;
      cursor: pointer;
    }
  }
}

.statistics-content {
  margin-top: 70px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px #0000001a;
  background-color: #18295c;
  color: #fff;
  width: 100%;
  height: 150px;

  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    border-right: 1.5px solid #21346c;

    .num {
      font-size: 30px;
      font-weight: 700;
    }

    .info {
      display: flex;
      align-items: center;
      line-height: 1.4em;
      font-size: 1rem;
      color: #566897;
    }

    .rule {
      font-size: 14px;
      line-height: 1.4em;
      color: #566897;
    }
  }
}

.rent-log-container {
  text-align: center;
  margin: 50px 0;

  .rent-log-title {
    margin-bottom: 30px;
  }

  .table {
    :deep(.el-table) {
      color: #fdc2b1;

      .warning-row {
        background-color: #ff7439;
      }

      .success-row {
        background-color: #e65c22;
      }

      td.el-table__cell,
      th.el-table__cell.is-leaf {
        border: 0;
      }

      th.el-table__cell {
        background-color: #e65c22;
      }

      thead {
        color: #fff;
      }

      .el-table__inner-wrapper {
        &::before {
          background-color: transparent;
        }
      }

      tbody tr:hover > td {
        // background-color: #273767;
        background-color: transparent;
      }
    }
  }
}

.switch-panel {
  display: inline-flex;
  //   height: 40px;
  // border: 1px solid #2a47ab;
  //   border-radius: 20px;
  //   box-shadow: 0 0 10px #0000001a;
  //   padding: 1px;
}

.api {
  margin: 30px auto;

  :deep(.title) {
    color: #fff;
  }
}

.copy-btn-wrapper {
  display: inline-block;
  color: inherit;

  .btn {
    display: flex;
    align-items: center;
    color: inherit;
    cursor: pointer;
  }
}
.color {
  color: @color !important;
}
</style>
<style lang="less">
.el-radio-button {
    --el-radio-button-checked-bg-color: #fe4d01;
    --el-radio-button-checked-text-color: var(--el-color-white);
    --el-radio-button-checked-border-color: #fe4d01;
    --el-radio-button-disabled-checked-fill: var(--el-border-color-extra-light);
}
.el-checkbox {
    --el-checkbox-checked-text-color: #fff;
}
.el-link {
  color: var(--text-notice-color);
}
</style>
