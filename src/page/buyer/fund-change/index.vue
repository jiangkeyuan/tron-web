<template>
  <div class="recharge-log">
    <el-form :model="form" inline class="sale-record sale-record-search">
      <el-form-item label="最小金额">
        <el-input v-model="form.minAmount" />
      </el-form-item>
      <el-form-item label="最大金额">
        <el-input v-model="form.maxAmount" />
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker v-model="form.date" type="datetimerange" range-separator="To" start-placeholder="Start date"
          end-placeholder="End date" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option v-for="i in typeList" :label="i.label" :value="i.value" />
        </el-select>
      </el-form-item>
      <el-button @click="() => reset()">重置</el-button>
      <el-button type="primary" color="#c53027" @click="() => search()">查询</el-button>
    </el-form>
    <div class="sale-record-table">
      <el-table :data="tableData" stripe class="sale-record-table-list" empty-text="暂无数据">
        <el-table-column prop="createDate" label="发生时间" :formatter="(row) => filterDate(row.createDate)" />
        <el-table-column prop="type" label="类型" :formatter="(row) => filterType(row.type)" />
        <el-table-column prop="amount" label="入账金额(TRX)" />
        <el-table-column prop="transactionHash" label="交易哈希">
          <template #default="scope">
            <el-tooltip class="box-item" effect="dark" :content="scope.row.transactionHash" placement="bottom">
              <el-button link type="primary" size="small" @click="() => handleClick(scope)">查看</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="sale-record-table-pagination">
        <el-pagination layout="prev, pager, next" v-model:current-page='form.pageIndex' v-model:page-size="form.pageSize"
          :total="form.totalCount" @current-change="() => search()" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { transcations } from '@/utils/axios/buyer/index';
import { filterDate } from '@/utils/utils/date.js'
const form = reactive({
  date: [],
  type: "",
  totalCount: 0,
  pageIndex: 1,
  pageSize: 10
});
const typeList = ref([
  {
    label: "全部",
    value: ""
  },
  {
    label: "充值",
    value: "RECHARGE"
  },
  {
    label: "提现",
    value: "WITHDRAW"
  },
  {
    label: "手工下单",
    value: "INNER_ORDER"
  },
  {
    label: "出售定单",
    value: "SELL_ORDER"
  },
  {
    label: "API下单",
    value: "API_ORDER"
  },
]);
const tableData = ref([
  {
    order_no: "2301151573104199689100",
    order_num: 1,
    order_type: 1,
    api_key: "75c3b3b7-cd41-48c5-b0f2-3a236b10a620",
    resource_type: 1,
    receive_address: "TBKkub****a3Amvd",
    price_in_sun: 85,
    min_amount: 14650,
    min_payout: 2.801813,
    min_freeze: 644,
    max_amount: 14650,
    max_payout: 2.801813,
    max_freeze: 644,
    freeze_time: "2023-01-15 14:47:31",
    unfreeze_time: 1674024459,
    expire_time: 1674024452,
    create_time: 1673765251,
    resource_value: 14650,
    resource_split_value: 0,
    frozen_resource_value: 14650,
    rent_duration: 3,
    rent_expire_time: 1674024452,
    frozen_balance: 644,
    frozen_duration: 3,
    frozen_tx_id:
      "11bf439e8808750b1dfe81671c60e9b3de41cb40981472ca016f064bcd825ca4",
    unfreeze_tx_id:
      "66a98f86a4bfc3be4648c5df797c8321fa7f4b19639eccdf1ef5695de1874ac6",
    settle_amount: 2.801813,
    settle_address: "TN4idXszFtuSdnsjfGw9TzWHeMeYupV3dx",
    pay_action: 3,
    pay_address: "",
    pay_time: 1673765251,
    pay_tx_id: "",
    pay_symbol: "TRX",
    pay_amount: 3.73575,
    pay_status: 2,
    is_split: 0,
    cancel_tx_id: "",
    refund_tx_id: "",
    status: 9,
    api: {
      id: 91,
      user_id: 232,
      name: "ceshi",
      key: "75c3b3b7-cd41-48c5-b0f2-3a236b10a620",
      used: 0,
      quota: 0,
      qps: 5,
      energy_surplus: 0,
      bandwidth_surplus: 0,
      today_consume_trx_amount: 0,
      today_energy_value: 0,
      today_bandwidth_value: 0,
      yesterday_consume_trx_amount: 0,
      yesterday_energy_value: 0,
      yesterday_bandwidth_value: 0,
      all_consume_trx_amount: 3.73575,
      all_energy_value: 14650,
      all_bandwidth_value: 0,
      create_time: 1672118368,
      status: 1,
    },
  },
]);

const filterType = (type) => {
  let d = ''
  typeList.value.map(v => {
    if (v.value === type) {
      d = v.label;
    }
  })
  return d;
}

const handleClick = (scope) => {
  window.open(`https://nile.tronscan.org/#/transaction/${scope.row.transactionHash}`,)
};

const search = async () => {
  form.startTime = form.date[0];
  form.endTime = form.date[1];
  const data = await transcations(form);
  if (data.code === 12000) {
    tableData.value = data.data.data;
    form.totalCount = data.data.totalCount
  }
}

const reset = () => {
  Object.keys(form).map(v => {
    if (v === 'totalCount' || v === 'pageIndex' || v === 'pageSize') {
      return;
    }
    form[v] = '';
  })
  form.date = [];
}

onMounted(() => {
  search();
})

</script>
<style scoped>
.recharge-log {
  background: white;
  padding: 6px;
  height: 90%;
}

.test {
  display: flex;
  flex-direction: column;
}

.sale-record {
  width: 100%;
  box-sizing: border-box;
  background: white;
  border: 1px solid #c8d0df !important;
  border-radius: 2px;
}

.sale-record-search {
  padding: 12px 10px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
}

.sale-record-table {
  padding: 6px;
  box-sizing: border-box;
  min-height: 85%;
}

.sale-record-group {
  margin-bottom: 14px;
}

.sale-record-table-list {}

.sale-record-table-pagination {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 20px;
}
</style>
s
