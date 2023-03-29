<template>
  <div class="c2c-container">
    <div class="c2c-content">
      <div class="container">
        <div class="wrapper">
          <i class="img">
            <el-icon><Bell /></el-icon>
          </i>
          <span class="content">
            <el-carousel
              height="2em"
              direction="vertical"
              indicator-position="none"
              :autoplay="true"
            >
              <el-carousel-item v-for="item in systemMsg" :key="item.id">
                {{ item.title }}
              </el-carousel-item>
            </el-carousel>
          </span>
        </div>
      </div>

      <div class="wallet-container" v-if="address">
        <div class="wallet-content">
          <div class="wallet item">
            <div class="header">
              <span class="c2c_address">{{ address }}</span>
              <i class="img symbol"
                ><el-icon><StarFilled /></el-icon
              ></i>
            </div>
            <div class="body">
              <ul class="pc-wallet-item">
                <li>可用：<span>1</span>TRX</li>
                <li>冻结：<span>1</span>TRX</li>
                <li>全部：<span>1</span>TRX</li>
              </ul>
              <i class="img"
                ><el-icon><FolderRemove /></el-icon
              ></i>
            </div>
          </div>
          <div class="energy item">
            <div class="header">
              <span class="c2c_address">能量</span>
              <div>0 <em>/0</em></div>
            </div>
            <div class="body">
              <ul class="pc-wallet-item">
                <li>发　送：<span>1</span>TRX</li>
                <li>已收到：<span>1</span>TRX</li>
              </ul>
              <i class="img"
                ><el-icon><Lightning /></el-icon
              ></i>
            </div>
          </div>
          <div class="bw item">
            <div class="header">
              <span class="c2c_address">带宽</span>
              <div>0 <em>/0</em></div>
            </div>
            <div class="body">
              <ul class="pc-wallet-item">
                <li>发　送：<span>1</span>TRX</li>
                <li>已收到：<span>1</span>TRX</li>
              </ul>
              <i class="img"
                ><el-icon><Odometer /></el-icon
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div class="current-order-container">
        <div class="custom-round-tab">
          <div class="tablist">
            <div class="right-extra">
              <div class="btns">
                <span class="buy" @click="handleBuy">
                  <i class="img"></i>
                  购买
                </span>
                <div class="center"></div>
                <span class="seller" @click="search">
                  <i class="img"></i>
                  出售
                </span>
              </div>
              <el-button
                class="btn-vote"
                type="primary"
                size="large"
                plain
                :icon="Histogram"
                @click="handleVote"
                >投票</el-button
              >
              <el-select
                v-model="value"
                class="m-2"
                placeholder="Select"
                size="large"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <el-tabs type="border-card" class="demo-tabs">
              <el-tab-pane label="自助交易">
                <el-table :data="manualOrders" style="width: 100%">
                  <el-table-column prop="benifitAmount" label="收入"
                    ><template #default="scope">
                      <div class="max_payout-column">
                        <div class="payout">
                          {{ scope.row.benifitAmount }} <i>TRX</i>
                        </div>
                        <div class="freeze">
                          质押: {{ scope.row.stakeAmount }} TRX
                        </div>
                        <div class="amount">
                          能量: {{ scope.row.energyQuantity }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="buyPrice" label="单价（价格/天）"
                    ><template #default="scope">
                      <div class="max_payout-column">
                        <div class="payout">
                          {{ scope.row.buyPrice }} <i>sun</i>
                        </div>
                        <div class="freeze">
                          年化率: {{ scope.row.annualizedPercent }} %
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="rentalDays" label="冻结时间"
                    ><template #default="scope">
                      {{ scope.row.rentalDays }} <span>天</span>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                      <el-button
                        link
                        type="primary"
                        size="small"
                        @click="handleSell(scope.row)"
                        >出售</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="快捷交易" style="text-align: center">
                <el-link type="primary">正在跳转至快捷交易界面</el-link>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div class="history-order-container">
        <div class="custom-round-tab">
          <div class="tablist">
            <el-tabs type="border-card" class="demo-tabs">
              <el-tab-pane label="最近完成">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="name" label="订单信息" />
                  <el-table-column prop="date" label="收入" />
                  <el-table-column prop="address" label="时间" />
                  <el-table-column fixed="right" label="操作">
                    <template #default>
                      <el-button link type="primary" size="small"
                        >交易哈希</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="质押列表">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="date" label="冻结对象" />
                  <el-table-column prop="name" label="资源" />
                  <el-table-column prop="address" label="冻结金额" />
                  <el-table-column prop="address" label="截止时间" />
                  <el-table-column fixed="right" label="操作">
                    <template #default>
                      <el-button link type="primary" size="small"
                        >出售</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="购买订单">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="date" label="订单信息" />
                  <el-table-column prop="name" label="接收地址" />
                  <el-table-column prop="address" label="时间" />
                  <el-table-column prop="address" label="状态" />
                  <el-table-column fixed="right" label="操作">
                    <template #default>
                      <el-button link type="primary" size="small"
                        >出售</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <api-box class="api"></api-box>
    </div>
  </div>
  <!-- <TronLinkPcPopupWrapper :show="true"></TronLinkPcPopupWrapper> -->
  <SellEnergyPopupWrapper
    :show="showSellEnergyPopup"
    @close="closeSellEnergyPopup"
    :rowData="rowData"
  ></SellEnergyPopupWrapper>
  <BuyPopup :show="showBuyPopup" @close="closeBuyPopup"></BuyPopup>
  <WithessPopup
    :show="showWithessPopup"
    @close="closeWithessPopup"
  ></WithessPopup>
</template>

<script setup>
import TronLink from '@/components/tron-link/index.js'
import BuyPopup from './buy-popup.vue'
import WithessPopup from './witness-popup.vue'
import {
  Calendar,
  Histogram,
  Bell,
  Odometer,
  FolderRemove,
  Lightning,
  StarFilled
} from '@element-plus/icons-vue'
import {
  getFinishedOrders,
  getManualOrders,
  sellManualOrders
} from '@/utils/axios/home/index.js'
import { reactive } from 'vue'
const value = ref('Option2')
const manualOrders = ref([])
const rowData = reactive({})
const address = ref('')
const showBuyPopup = ref(false)
const showWithessPopup = ref(false)
// showWithessPopup
const showSellEnergyPopup = ref(false)
const options = [
  {
    value: 'Option1',
    label: '最新'
  },
  {
    value: 'Option2',
    label: '单价最高'
  },
  {
    value: 'Option3',
    label: '收入最高'
  },
  {
    value: 'Option4',
    label: '能量最高'
  }
]
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
const systemMsg = reactive([
  {
    id: 1,
    title:
      '尊敬的卖家：波场stake2.0升级即将到来，届时授权权限将需要改变，为了更好的通知您升级时间，以及更好的协助您完成新权限授权，请您联系telegram在线客服获取最新信息与帮助！'
  }
])
const handleBuy = () => {
  showBuyPopup.value = true
}
const closeBuyPopup = () => {
  showBuyPopup.value = false
}
const queryManualOrders = async () => {
  //   await TronLink()
  console.log('999999999999999999999999999999999999')
  const data = await getManualOrders()
  console.log('data', data)
  if (data.code == 12000) {
    manualOrders.value = data.data
  }
}
const queryFinishedOrders = async () => {
    const data = await getFinishedOrders()
    console.log('data',data);
}
// 投票
const handleVote = async () => {
  showWithessPopup.value = true
}
const closeWithessPopup = () => {
  showWithessPopup.value = false
}
// 出售
const handleSell = async row => {
  console.log('row', row.orderId)
  Object.assign(rowData, row)
  await TronLink()
  showSellEnergyPopup.value = true
}
const search = async () => {
  await TronLink()
  //   showSellEnergyPopup.value = true

  console.log('999999999999999999999996666666666666')
}

const closeSellEnergyPopup = () => {
  showSellEnergyPopup.value = false
}
onMounted(() => {
  queryManualOrders()
  queryFinishedOrders()
  window.addEventListener('message', function (e) {
    if (e.data.message && e.data.message.action == 'tabReply') {
      if (e.data.message.data?.data?.address) {
        address.value = e.data.message.data.data.address
      } else {
        address.value = ''
      }
    }
  })
})

address.value = window.tronWeb?.defaultAddress?.base58
</script>

<style lang="less" scoped>
.c2c-container {
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
}
.c2c-content {
  margin: auto;
  width: 100%;
  max-width: 1400px;
}
.container {
  margin: 42px 0;
  padding: 0 50px;
  .wrapper {
    border-radius: 3px;
    background-color: #e3edfe;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    .img {
      margin-right: 15px;
    }
    .content {
      flex: 1;
      overflow: hidden;
      line-height: 2em;
    }
  }
}
.wallet-container {
  margin: 30px 0;
  padding: 0 50px;
  em {
    font-style: normal;
  }
  .wallet-content {
    display: flex;
    .item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 24px;
      margin-right: 15px;
      border: 1px solid #c8d0df;
      border-radius: 10px;
      box-shadow: 0 3px 10px #00000014;
      width: 33%;
      &:last-child {
        margin-right: 0;
      }
      .header {
        margin: 0 -24px;
        padding: 0 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f4f8ff;
        font-size: 16px;
        height: 55px;
        overflow-x: overlay;
        em {
          font-size: 14px;
          color: #707582;
        }
        .symbol {
          color: red;
        }
      }
      .body {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 24px;
        .pc-wallet-item {
          display: block;
        }
        ul {
          margin-bottom: 0;
          font-size: 14px;
          color: #707582;
        }
        .img {
          align-self: end;
          color: #c8d0df;
        }
      }
    }
  }
}
.current-order-container {
  padding: 0 50px;
  .custom-round-tab {
    --button-gap: 40px;
    --radius: calc(var(--button-gap) / 2);
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
  }
  .right-extra {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 22px;
    .btns {
      font-weight: 550;
      display: flex;
      align-items: center;
      background-color: #294aa5;
      border-radius: 5px;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      .buy,
      .seller {
        display: flex;
        align-items: center;
        padding: 10px 16px;
        .img {
          height: 20px;
        }
      }
      .center {
        width: 1px;
        height: 16px;
        background-color: #3365bc80;
      }
    }
    .btn-vote {
      margin: 0 14px;
    }
  }
}
.history-order-container {
  margin-top: 50px;
  padding: 0 50px;
}
.api {
  margin-top: 60px;
}
.max_payout-column {
  .payout {
    font-size: 22px;
    i {
      font-style: normal;
      font-size: 0.7em;
    }
  }
  .freeze {
    font-size: 12px;
    // display: inline-block;
  }
  .amount {
    font-size: 12px;
    display: inline-block;
  }
}
</style>
<style lang="less">
.right-extra {
  .el-select {
    .el-input {
      width: 130px;
    }
  }
}
</style>
