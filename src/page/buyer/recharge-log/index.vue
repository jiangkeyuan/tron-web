<template>
  <div class="recharge-log">
    <el-table :data="tableData" stripe class="recharge-log-table">
      <el-table-column prop="order_no" label="充值时间" />
      <el-table-column prop="amount" label="充值金额" />
      <el-table-column prop="amount" label="入账金额" />
      <el-table-column prop="orderStatus" label="订单状态" />
      <el-table-column prop="pay_action" label="交易哈希">
        <template #default="scope">
          <el-tooltip class="box-item" effect="dark" :content="scope.row.transactionHash" placement="bottom">
            <el-button link type="primary" size="small" @click="() => handleClick(scope)">查看</el-button>
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>
    <div class="recharge-log-pagination">
      <el-pagination layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>
<script setup>
import { rechargesLog } from '@/utils/axios/buyer/index';
const form = reactive({
  pageIndex: 1,
  pageSize: 20,

});
const tableData = ref([]);
const handleClick = (scope) => {
  window.open(`https://tronscan.org/#/transaction/${scope.row.transactionHash}`,)
};

const search = async () => {
  const data = await rechargesLog({ ...form });
  tableData.value = data.data.data;
}

onMounted(async () => {
  search();
})
</script>
<style scoped>
.recharge-log {
  background: white;
  padding: 6px;
  height: 90%;
}

.recharge-log-table {
  margin-bottom: 10px;
}
</style>
