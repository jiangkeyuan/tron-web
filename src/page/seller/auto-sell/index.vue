<template>
  <div class="auto-sell">
    <DashbordContent>
      <div class="user-data-static">
        <div class="auth-address">
          <span class="label">授权地址</span>
          <a :href="`https://tronscan.org/#/address/${sellConfigData.walletAddress}`" target="_blank">{{
            sellConfigData.walletAddress }}</a>
        </div>
        <div class="amount-sum">
          <span class="badge">
            <span class="badge-status-dot badge-status-processing"></span>
            <span class="badge-status-text">总资产：{{ sellConfigData.totalAmount }}</span>
          </span>
          <span class="badge">
            <span class="badge-status-dot badge-status-success"></span>
            <span class="badge-status-text">可用：{{ sellConfigData.availableAmount }}</span>
          </span>
          <span class="badge">
            <span class="badge-status-dot badge-status-error"></span>
            <span class="badge-status-text">在押：{{ sellConfigData.stakeAmount }}</span>
          </span>
          <span class="badge">
            <span class="badge-status-dot badge-status-default"></span>
            <span class="badge-status-text">投票收益：{{ sellConfigData.withdrawAmount }}</span>
          </span>
        </div>
        <div class="auth-detail">
          <span class="label"> 授权明细 </span>
          <el-tag class="ml-2" type="success" v-for="(item, index) in sellConfigData.permissions" :key="index">{{ item
          }}</el-tag>
          <!-- <el-tag class="ml-2" type="success">解押</el-tag>
          <el-tag class="ml-2" type="success">投票</el-tag>
          <el-tag class="ml-2" type="success">领取权益</el-tag> -->
        </div>
      </div>
    </DashbordContent>
    <DashbordContent>
      <el-form :model="sellConfigData" label-width="160px">
        <el-form-item label="开启自动出售">
          <el-switch v-model="sellConfigData.autoSell" :active-value="true" :inactive-value="false" />
          <span class="desc">开启自动出售则表示【允许平台代理质押/资源，以及自动投票和领取收益】</span>
        </el-form-item>

        <!-- <el-form-item label="出售资源">
          <el-radio-group v-model="form.take_order_resource">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">仅能量</el-radio>
            <el-radio :label="2">仅带宽</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="能量单价">
          <template #label>
            <div>
              能量单价
              <el-tooltip class="box-item" effect="dark" content="低于该单价不会自动出售" placement="top">
                <el-icon>
                  <WarningFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-radio-group v-model="sellConfigData.energeDefaultPrice">
            <el-radio :label="true">默认</el-radio>
            <el-radio :label="false">自定义</el-radio>
          </el-radio-group>
          <span class="desc">选择默认则按平台规则单价进行代理，当前单价为：{{price.day}}</span>
        </el-form-item>
        <el-form-item label="自定义能量单价" v-if="!sellConfigData.energeDefaultPrice">
          <template #label>
            <div>
              自定义能量单价
              <el-tooltip class="box-item" effect="dark" content="低于该单价不会自动出售" placement="top">
                <el-icon>
                  <WarningFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-input v-model="sellConfigData.energePrice" />
        </el-form-item>
        <!-- <template v-if="false">
          <el-form-item label="带宽单价">
            <template #label>
              <div>
                带宽单价
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="低于该单价不会自动出售"
                  placement="top"
                >
                  <el-icon><WarningFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
            <el-radio-group v-model="form.take_order_bandwidth">
              <el-radio :label="0">默认</el-radio>
              <el-radio :label="1">自定义</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="自定义带宽单价" v-if="form.take_order_bandwidth">
            <template #label>
              <div>
                自定义带宽单价
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="低于该单价不会自动出售"
                  placement="top"
                >
                  <el-icon><WarningFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="form.take_order_bandwidth_min_sun" />
          </el-form-item>
        </template> -->
        <el-form-item label="自动提款">
          <template #label>
            <div>
              自动提款
              <el-tooltip class="box-item" effect="dark" content="香港时间每天00点00分为统一自动支付结算时间" placement="top">
                <el-icon>
                  <WarningFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-radio-group v-model="sellConfigData.autoWithdrawAmount">
            <el-radio label="Y">自动全部</el-radio>
            <el-radio label="P">保留部分</el-radio>
            <el-radio label="N">禁用自动提款</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="保留金额" v-if="sellConfigData.autoWithdrawAmount == 'P'">
          <el-input v-model="sellConfigData.remainAmount" />
        </el-form-item>
        <el-form-item label="自动质押">
          <template #label>
            <div>
              自动质押
              <el-tooltip class="box-item" effect="dark" content="当你的剩余可用trx余额大于1000trx时，系统将会为您自动质押trx获取更多能量用于出售，增加收益！" placement="top">
                <el-icon>
                  <WarningFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>            
          <el-switch v-model="sellConfigData.autoStake" :active-value="true" :inactive-value="false" />
        </el-form-item>
                <el-form-item label="质押保留" v-if="sellConfigData.autoStake">
          <template #label>
            <div>
              质押保留
              <el-tooltip class="box-item" effect="dark" content="预留部分余额不参与质押，推荐设置数额：大于>近1天出售订单数*0.6TRX，避免造成带宽不足造成无法出售订单" placement="top">
                <el-icon>
                  <WarningFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-input v-model="sellConfigData.stakeRemainAmount" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </DashbordContent>
  </div>
</template>

<script setup>
import { getSellConfig, saveSellConfig } from '@/utils/axios/seller/index.js'
import { getPlatformPrice } from '@/utils/axios/home/index.js'
import { awaitFnLoading } from '@/utils/utils/loading.js'
import { WarningFilled } from '@element-plus/icons-vue'
import { reactive } from 'vue'
const sellConfigData = reactive({})
const onSubmit = async () => {
  const data = await saveSellConfig(sellConfigData)
  console.log('data', data)
  if (data.code === 12000) {
    ElMessage.success('修改成功')
    querySellConfig()
  } else {
    ElMessage.error(data.msg)
  }
}
const querySellConfig = async () => {
  const data = await awaitFnLoading(getSellConfig)()
  console.log('data', data)
  if (data.code === 12000) {
    Object.assign(sellConfigData, data.data)
  } else {
    ElMessage.error(data.msg)
  }
  console.log('sellConfigData', sellConfigData)
}
const price = reactive({})
const queryPlatformPrice = async () => {
  const data = await getPlatformPrice()
  if (data.code === 12000) {
    Object.assign(price,data.data);
  } else {
    ElMessage.error(data.msg)
  }
}
onMounted(() => {
  queryPlatformPrice()
  querySellConfig()
})
</script>

<style lang="less" scoped>
.auto-sell {
  .user-data-static {
    padding: 0 60px;

    &>div {
      margin: 15px 0;
    }

    .label {
      margin-right: 15px;
    }

    .amount-sum {
      .badge {
        margin: 0 10px;

        &:first-child {
          margin: 0 10px 0 0;
        }

        &-status-dot {
          position: relative;
          top: -1px;
          display: inline-block;
          width: 6px;
          height: 6px;
          vertical-align: middle;
          border-radius: 50%;
        }

        &-status-text {
          margin-left: 8px;
          color: #000000d9;
          font-size: 14px;
        }

        &-status {
          &-processing {
            background-color: #c53027;
          }

          &-success {
            background-color: #55d187;
          }

          &-error {
            background-color: #ed6f6f;
          }

          &-default {
            background-color: #d9d9d9;
          }
        }
      }
    }

    .auth-detail {
      .ml-2 {
        margin-right: 0.5em;
      }
    }
  }
  .desc {
    margin-left: 20px;
    color: #909399;
  }
}
</style>
