<template>
  <div class="c2c-container">
    <div class="c2c-content">
      <div class="container">
        <div class="wrapper">
          <i class="img">
            <el-icon>
              <Bell />
            </el-icon>
          </i>
          <span class="content">
            <el-carousel height="2em" direction="vertical" indicator-position="none" :autoplay="true">
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
              <i class="img symbol"><el-icon>
                  <StarFilled />
                </el-icon></i>
            </div>
            <div class="body">
              <ul class="pc-wallet-item">
                <li>可用：<span>0</span>TRX</li>
                <li>冻结：<span>0</span>TRX</li>
                <li>全部：<span>0</span>TRX</li>
              </ul>
              <i class="img"><el-icon>
                  <FolderRemove />
                </el-icon></i>
            </div>
          </div>
          <div class="energy item">
            <div class="header">
              <span class="c2c_address">能量</span>
              <div>0 <em>/0</em></div>
            </div>
            <div class="body">
              <ul class="pc-wallet-item">
                <li>发　送：<span>0</span>TRX</li>
                <li>已收到：<span>0</span>TRX</li>
              </ul>
              <i class="img"><el-icon>
                  <Lightning />
                </el-icon></i>
            </div>
          </div>
          <!-- <div class="bw item">
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
                ><el-icon>
                  <Odometer /> </el-icon
              ></i>
            </div>
          </div> -->
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
              <el-button class="btn-vote" type="primary" size="large" plain :icon="Histogram"
                @click="handleVote">投票</el-button>
              <el-select v-model="form.order" class="m-2" placeholder="Select" size="large" @change="onChange">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
            <el-tabs type="border-card" class="demo-tabs" @tab-change="changeManualOrder">
              <el-tab-pane label="自助交易">
                <el-table :data="manualOrders" style="width: 100%" empty-text="暂无数据">
                  <el-table-column prop="benifitAmount" label="收入"><template #default="scope">
                      <div class="max_payout-column">
                        <div class="payout">
                          {{ scope.row.benifitAmount }} <i>TRX</i>
                        </div>
                        <div class="freeze">
                          代理: {{ scope.row.stakeAmount }} TRX
                        </div>
                        <div class="amount">
                          能量: {{ scope.row.energyQuantity }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="buyPrice" label="单价（价格/天）"><template #default="scope">
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
                  <el-table-column prop="rentalHours" label="冻结时间" :formatter="row => filterHours(row.rentalHours)">
                  </el-table-column>
                  <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                      <el-button link type="primary" size="small" @click="handleSell(scope.row)">出售</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="ctc-pagination">
                  <el-pagination layout="prev, pager, next, jumper" v-model:current-page="form.pageIndex"
                    v-model:page-size="form.pageSize" hide-on-single-page :total="totalCount"
                    @current-change="currentChange" />
                </div>
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
            <el-tabs type="border-card" class="demo-tabs" @tab-change="changeTab">
              <el-tab-pane label="最近完成">
                <el-table :data="finishedOrders" style="width: 100%" empty-text="暂无数据">
                  <el-table-column prop="name" label="订单信息">
                    <template #default="scope">
                      <span>能量：{{ scope.row.energyQuantity }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="benifitAmount" label="收入">
                    <template #default="scope">
                      <span>{{ scope.row.benifitAmount }} RTX</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="delegateDate" label="时间" :formatter="row => filterDate(row.delegateDate)" />
                  <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                      <el-link type="primary" :href="`https://tronscan.org/#/transaction/${scope.row.transactionHash}`"
                        target="_blank">交易哈希</el-link>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="代理列表">
                <el-table :data="stakes" style="width: 100%" empty-text="暂无数据">
                  <el-table-column prop="walletAddress" label="冻结对象" />
                  <el-table-column prop="resource" label="资源" />
                  <el-table-column prop="statkeAmount" label="冻结金额">
                    <template #default="scope">
                      <span>{{ scope.row.statkeAmount }} RTX</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="expiredDate" label="截止时间" :formatter="row => filterDate(row.expiredDate)" />
                  <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                      <el-link type="primary" :href="`https://tronscan.org/#/transaction/${scope.row.transactionHash}`"
                        target="_blank">交易哈希</el-link>
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
                      <el-button link type="primary" size="small">出售</el-button>
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
  <SellEnergyPopupWrapper :show="showSellEnergyPopup" @close="closeSellEnergyPopup" :rowData="rowData">
  </SellEnergyPopupWrapper>
  <BuyPopup :show="showBuyPopup" @close="closeBuyPopup"></BuyPopup>
  <WithessPopup :show="showWithessPopup" @close="closeWithessPopup"></WithessPopup>
  <el-dialog v-model="sellPopup" title="" width="450px" center>
    <div class="sell-popup">
      <div class="join">
        <span>您可以加入我们VIP卖家全自动化出售能量以获得最高收益，点击下方注册VIP卖家开始加入</span>
        <a class="join-button" href="/#/console/buyer/dashboard" target="_blank"><span>注册加入</span></a>
      </div>
      <!-- <div class="channel">
        <span>当有订单时您也可以手动出售能量以获得收入，要获得及时的订单推送，请关注如下频道</span>
        <div class="channel-link">
          <a href="https://t.me/tronenergymarkets" target="_blank">TG频道：@TRON ENERGY MARKET</a>
        </div>
      </div> -->
      <div class="service">
        <span>如有其他问题，请联系：</span>
        <div class="service-link">
          <a href="https://t.me/tron_hashgo" target="_blank">TG客服：@tron_hashgo</a>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import TronLink from '@/components/tron-link/index.js'
import BuyPopup from './buy-popup.vue'
import WithessPopup from './witness-popup.vue'
import { awaitFnLoading } from '@/utils/utils/loading.js'
import { filterDate, filterHours } from '@/utils/utils/date.js'
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
  sellManualOrders,
  getStakes
} from '@/utils/axios/home/index.js'
import { walletAddress } from '@/utils/utils/tron.js';
import { reactive } from 'vue'
const router = useRouter()
const value = ref('Option2')
const manualOrders = ref([])
const finishedOrders = ref([])
const stakes = ref([])
const rowData = reactive({})
const address = ref('')
address.value = walletAddress()
const accountInfo = reactive({})
const sellPopup = ref(false)
const showBuyPopup = ref(false)
const showWithessPopup = ref(false)
// showWithessPopup
const showSellEnergyPopup = ref(false)
const form = reactive({
  order: 'createDate',
  pageIndex: 1,
  pageSize: 10
})
const totalCount = ref(0)
const options = [
  {
    value: 'createDate',
    label: '最新'
  },
  {
    value: 'price',
    label: '单价最高'
  },
  {
    value: 'payAmount',
    label: '收入最高'
  },
  {
    value: 'rentalQuantity',
    label: '能量最高'
  }
]
const tableData = []
const systemMsg = reactive([
  {
    id: 1,
    title:
      '尊敬的卖家：波场stake2.0升级即将到来，届时授权权限将需要改变，为了更好的通知您升级时间，以及更好的协助您完成新权限授权，请您联系telegram在线客服获取最新信息与帮助！'
  }
])
// 购买
const handleBuy = async () => {
  await TronLink()
  showBuyPopup.value = true
}
const closeBuyPopup = () => {
  showBuyPopup.value = false
}
// 自助交易
const onChange = () => {
  queryManualOrders()
}
const queryManualOrders = async () => {
  //   await TronLink()
  console.log('999999999999999999999999999999999999')
  const data = await awaitFnLoading(getManualOrders)(form)
  console.log('data', data)
  if (data.code == 12000) {
    manualOrders.value = data.data.data
    totalCount.value = data.data.totalCount
  }
}
const currentChange = value => {
  console.log(value)
  form.pageIndex = value
  queryManualOrders()
}
// 最近完成
const queryFinishedOrders = async () => {
  const data = await getFinishedOrders()
  console.log('data', data)
  if (data.code == 12000) {
    finishedOrders.value = data.data
  }
}
// 代理列表
const queryStakes = async () => {
  const data = await getStakes()
  console.log('data', data)
  if (data.code == 12000) {
    stakes.value = data.data
  }
}
// 投票
const handleVote = async () => {
  await TronLink()
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
  sellPopup.value = true
  console.log('999999999999999999999996666666666666')
}
const changeManualOrder = (val) => {
  console.log(val);
  switch (val) {
    case '0':
      queryManualOrders()
      break
    case '1':
      router.push('/b2c')
      break
    default:
      break
  }
}
const closeSellEnergyPopup = () => {
  showSellEnergyPopup.value = false
}

const changeTab = val => {
  console.log('changeTab', val)
  switch (val) {
    case '0':
      queryFinishedOrders()
      break
    case '1':
      queryStakes()
      break
    default:
      break
  }
}
watch(address, (o, n) => {
    console.log('o',o);
   if(o) {
    getAccountResources()
   }
})
const getAccountResources = async () => {
//   const data = await tronWeb.trx.getAccount(walletAddress())
  const data = await tronWeb.trx.getContract(walletAddress())
  console.log('data',JSON.stringify(data));
  Object.assign(accountInfo, data)
}
onMounted(() => {
  queryManualOrders()
  queryFinishedOrders()
  
  window.addEventListener('message', function (e) {
    if (e.data.message && e.data.message.action == 'tabReply') {
      if (walletAddress()) {
        address.value = walletAddress()
      } else {
        address.value = ''
      }
    }
  })
  address.value && getAccountResources() 
})

</script>

<style lang="less" scoped>
.ctc-pagination {
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

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
      width: 50%;

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
      background-color: @color;
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
        background-color: #b73700;
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
