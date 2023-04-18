<template>
  <DashbordContent>
    <div class="statistics-panel">
      <div class="statistics-root">
        <div class="item">
          <div class="flex">
            <div class="item-tltle">
              收益利润
              <span class="font total">(累计收益：<span class="red">{{sellerObj.totalEarnings}}</span>TRX)
              </span>
            </div>
            <div class="font icon-question">
              <Tips content="收益利润=订单收益+投票收益"></Tips>
            </div>
          </div>
          <div class="flex">
            <div>
              <div>
                <span class="font"> 今日 订单({{sellerObj.toDay?.orderNum}}) </span>
                <span class="font text">{{sellerObj.toDay?.benifitAmount}}</span>
                <span class="font min-font">TRX</span>
              </div>
              <div>
                <span class="font"> 昨日 订单({{sellerObj.yesterday?.orderNum}})</span>
                <span class="font text">{{sellerObj.yesterday?.benifitAmount}}</span>
                <span class="font min-font">TRX</span>
              </div>
            </div>
            <div class="icon"></div>
          </div>
        </div>
        <div class="item">
          <div class="flex">
            <div class="item-tltle">
              投票收益
              <!-- <span class="font total">(累计收益：<span class="red">26,827.34147</span>TRX)
              </span> -->
            </div>
            <div class="font icon-question">
              <Tips content="收益利润=订单收益+投票收益"></Tips>
            </div>
          </div>
          <div class="flex">
            <div>
              <div>
                <span class="font"> 本周 </span>
                <span class="font text">{{sellerObj.voteEarnings?.thisWeek}}</span>
                <span class="font min-font">TRX</span>
              </div>
              <div>
                <span class="font"> 上周 </span>
                <span class="font text">{{sellerObj.voteEarnings?.lastWeek}}</span>
                <span class="font min-font">TRX</span>
              </div>
            </div>
            <div class="icon"></div>
          </div>
        </div>
        <div class="item">
          <div class="flex">
            <div class="item-tltle">
              出售能量
            </div>
            <div class="font icon-question">
              <Tips content="每日出售订单所代理产生的能量合计"></Tips>
            </div>
          </div>
          <div class="flex">
            <div>
              <div>
                <span class="font"> 今日 </span>
                <span class="font text">{{sellerObj.toDay?.enegerQuantity}}</span>
                <span class="font min-font">能量</span>
              </div>
              <div>
                <span class="font"> 昨日 </span>
                <span class="font text">{{sellerObj.yesterday?.enegerQuantity}}</span>
                <span class="font min-font">能量</span>
              </div>
            </div>
            <div class="icon"></div>
          </div>
        </div>
        <div class="item">
          <div class="flex">
            <div class="item-tltle">
              待释放
            </div>
            <div class="font icon-question">
              <Tips content="可回收的委托资源"></Tips>
            </div>
          </div>
          <div class="flex">
            <div>
              <div>
                <span class="font"> 今日 </span>
                <span class="font text">{{sellerObj.toDay?.delegateRelease}}</span>
                <span class="font min-font"></span>
              </div>
              <div>
                <span class="font"> 明日 </span>
                <span class="font text">{{sellerObj.tomorrow?.delegateRelease}}</span>
                <span class="font min-font"></span>
              </div>
            </div>
            <div class="icon"></div>
          </div>
        </div>
      </div>
    </div>
  </DashbordContent>
  <DashbordContent>
    <div class="vben-basic-table-title">最新订单</div>
    <el-table :data="latestSells" stripe style="width: 100%" empty-text="暂无数据">
      <el-table-column prop="orderNo" label="订单号" />
      <el-table-column prop="delegateDate" label="Date" :formatter="row => filterDate(row.delegateDate)">
        <template #header>
          <div>
            代理时间
            <el-tooltip class="box-item" effect="dark" content="香港时间" placement="right">
              <el-icon>
                <WarningFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="benifitAmount" label="结算金额" />
      <el-table-column prop="delegateAmount" label="代理金额" />
      <el-table-column prop="expiredDate" label="Date" :formatter="row => filterDate(row.expiredDate)">
        <template #header>
          <div>
            到期时间
            <el-tooltip class="box-item" effect="dark" content="香港时间" placement="right">
              <el-icon>
                <WarningFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </DashbordContent>
  <DashbordContent>
    <div class="vben-basic-table-title">即将结束订单</div>
    <el-table :data="almostSells" stripe style="width: 100%" empty-text="暂无数据">
        <el-table-column prop="orderNo" label="订单号" />
      <el-table-column prop="expiredDate" label="Date" :formatter="row => filterDate(row.expiredDate)">
        <template #header>
          <div>
            到期时间
            <el-tooltip class="box-item" effect="dark" content="香港时间" placement="right">
              <el-icon>
                <WarningFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="lendEnergy" label="资源" />
    </el-table>
  </DashbordContent>
</template>

<script setup>
import { filterDate } from '@/utils/utils/date.js'
import { getLatestSells, getAlmostSells, getSellerList } from '@/utils/axios/seller/index.js'
import { WarningFilled } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import Tips from './tips.vue'
const latestSells = ref([])
const almostSells = ref([])
const sellerObj = reactive({})
// 最新订单
const queryLatestSells = async () => {
  const data = await getLatestSells()
  console.log(data);
  if (data.code === 12000) {
    // ElMessage.success(data.msg);
    latestSells.value = data.data
  } else {
    ElMessage.error(data.msg);
  }
}
// 即将结束订单
const queryAlmostSells = async () => {
  const data = await getAlmostSells()
  console.log(data);
  if (data.code === 12000) {
    // ElMessage.success(data.msg);
    almostSells.value = data.data
  } else {
    ElMessage.error(data.msg);
  }
}

const querySellerList = async () => {
    const data = await getSellerList()
    if (data.code === 12000) {
    // ElMessage.success(data.msg);
    Object.assign(sellerObj, data.data) 
  } else {
    ElMessage.error(data.msg);
  }
}
querySellerList()
queryLatestSells()
queryAlmostSells()
</script>

<style lang="less" scoped>
.vben-basic-table-title {
  font-size: 16px;
}

.statistics-panel {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px 0;

  .statistics-root {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    background: #ffffff;

    // border-radius: 4px;
    // padding: 20px;
    .item {
      padding: 20px;
      background: #f4f8ff;
      border-radius: 10px;
    }

    .item-tltle {
      font-size: 15px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: left;
      color: #121c41;
    }
  }
}

.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.font {
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #707582;
}

.text {
  color: #121c41;
  margin: 0 4px 0 8px;
}

.min-font {
  display: inline-block;
  font-size: 12px;
  transform: scale(0.86);
  color: #989fae;
}

.total {
  font-size: 13px;
  font-weight: 600;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.icon-question {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.red {
  color: #e30000;
}
</style>
