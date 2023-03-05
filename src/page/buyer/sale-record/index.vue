<template>
    <el-form :model="form" inline class="sale-record sale-record-search">
        <el-form-item label="订单号">
        <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="接收">
        <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="时间">
        <el-date-picker
            v-model="form.date"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
        />
        </el-form-item>
        <el-form-item label="Api Key">
        <el-select
            empty="11111"
            v-model="form.region"
            placeholder="please select your zone"
        >
            <el-option v-for="i in apiKey" :label="i.label" :value="i.value" />
            <div slot="empty">
            <el-empty description="description" />
            </div>
        </el-select>
        </el-form-item>
        <el-form-item>
        <el-button>重置</el-button>
        <el-button type="primary" color="#294aa5">查询</el-button>
        </el-form-item>
    </el-form>
    <div class="sale-record sale-record-table">
        <el-radio-group v-model="form.type" class="sale-record-group">
            <el-radio-button label="top">全部</el-radio-button>
            <el-radio-button label="right">待质押</el-radio-button>
            <el-radio-button label="bottom">质押中</el-radio-button>
            <el-radio-button label="left">即将结束</el-radio-button>
            <el-radio-button label="bottom">已完成</el-radio-button>
            <el-radio-button label="left">未生效</el-radio-button>
        </el-radio-group>
        <el-table :data="tableData" stripe class="sale-record-table-list">
            <el-table-column prop="order_no" label="订单号" width="220"/>
            <el-table-column prop="receive_address" label="接收" width="180"/>
            <el-table-column prop="min_amount" label="租用量" width="120"/>
            <el-table-column prop="frozen_resource_value" label="已完成租用量" width="120"/>
            <el-table-column prop="pay_action" label="租用时长" width="120"/>
            <el-table-column prop="freeze_time" label="支付时间" width="180"/>
            <el-table-column prop="freeze_time" label="质押时间"  width="180"/>
            <el-table-column prop="freeze_time" label="到期时间"  width="180"/>
            <el-table-column prop="pay_amount" label="支付金额" width="120"/>
            <el-table-column prop="pay_status" label="状态" width="120"/>
            <el-table-column prop="date" label="更多操作" width="120"/>
        </el-table>
        <div class="sale-record-table-pagination">
            <el-pagination layout="prev, pager, next" :total="50" />
        </div>
        
    </div>
</template>
<script setup>
const form = reactive({
  date: [],
  type:"top"
});
const apiKey = ref([]);
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
</script>
<style scoped>
.test{
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
  padding: 12px 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
}
.sale-record-table{
    height: 85%;
    padding: 6px;
}
.sale-record-group{
    margin-bottom: 14px;
}
.sale-record-table-list{
}
.sale-record-table-pagination{
    margin-top: 10px;
    width: 100%;
}
</style>
