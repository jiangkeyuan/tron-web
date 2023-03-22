<template>
  <div class="auto-sell">
    <DashbordContent>
      <div class="user-data-static">
        <div class="auth-address">
          <span class="label">授权地址</span>
          <a>TUfATaEXjXLtXVTm3twqq3Q1toE3nnptwq</a>
        </div>
        <div class="amount-sum">
          <span class="badge">
            <span class="badge-status-dot badge-status-processing"></span>
            <span class="badge-status-text">总资产：413,683.687813</span>
          </span>
          <span class="badge">
            <span class="badge-status-dot badge-status-success"></span>
            <span class="badge-status-text">可用：58.687813</span>
          </span>
          <span class="badge">
            <span class="badge-status-dot badge-status-error"></span>
            <span class="badge-status-text">在押：413,625</span>
          </span>
          <span class="badge">
            <span class="badge-status-dot badge-status-default"></span>
            <span class="badge-status-text">投票收益：107.158043</span>
          </span>
        </div>
        <div class="auth-detail">
          <span class="label"> 授权明细 </span>
          <el-tag class="ml-2" type="success">质押</el-tag>
          <el-tag class="ml-2" type="success">解押</el-tag>
          <el-tag class="ml-2" type="success">投票</el-tag>
          <el-tag class="ml-2" type="success">领取权益</el-tag>
        </div>
      </div>
    </DashbordContent>
    <DashbordContent>
      <el-form :model="form" label-width="160px">
        <el-form-item label="开启自动出售">
          <el-switch
            v-model="form.take_order"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>

        <el-form-item label="出售资源">
          <el-radio-group v-model="form.take_order_resource">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">仅能量</el-radio>
            <el-radio :label="2">仅带宽</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="form.take_order_resource != 2">
          <el-form-item label="能量单价">
            <template #label>
              <div>
                能量单价
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
            <el-radio-group v-model="form.take_order_energy">
              <el-radio :label="0">默认</el-radio>
              <el-radio :label="1">自定义</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="自定义能量单价" v-if="form.take_order_energy">
            <template #label>
              <div>
                自定义能量单价
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
            <el-input v-model="form.take_order_energy_min_sun" />
          </el-form-item>
        </template>
        <template v-if="form.take_order_resource != 1">
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
        </template>
        <el-form-item label="自动提款">
          <template #label>
            <div>
              带宽单价
              <el-tooltip
                class="box-item"
                effect="dark"
                content="香港时间每天00点00分为统一自动支付结算时间"
                placement="top"
              >
                <el-icon><WarningFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-radio-group v-model="form.withdraw_type">
            <el-radio :label="2">自动全部</el-radio>
            <el-radio :label="3">保留部分</el-radio>
            <el-radio :label="1">禁用自动提款</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="保留金额" v-if="form.withdraw_type == 3">
          <el-input v-model="form.withdraw_keep_amount" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </DashbordContent>
  </div>
</template>

<script setup>
import { WarningFilled } from '@element-plus/icons-vue'
const form = reactive({
  seller_id: 32,
  take_order: 0,
  take_order_energy: 0,
  take_order_energy_min_sun: 0,
  take_order_bandwidth: 0,
  take_order_bandwidth_min_sun: 0,
  take_order_resource: 0,
  withdraw_type: 2,
  withdraw_keep_amount: 0
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style lang="less" scoped>
.auto-sell {
  .user-data-static {
    padding: 0 60px;

    & > div {
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
            background-color: #294aa5;
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
}
</style>
