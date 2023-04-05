<template>
  <div class="recharge-log">
    <el-table :data="tableData" stripe class="recharge-log-table" empty-text="暂无数据">
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
      <el-pagination layout="prev, pager, next" v-model:current-page='form.pageIndex' v-model:page-size="form.pageSize"
        :total="form.totalCount" @current-change="search" />
    </div>
  </div>
</template>
<script setup>
import { rechargesLog } from '@/utils/axios/buyer/index';
const form = reactive({
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0
});
const tableData = ref([]);
const handleClick = (scope) => {
  window.open(`https://nile.tronscan.org/#/transaction/${scope.row.transactionHash}`,)
};

const search = async () => {
  const data = await rechargesLog({ ...form });
  if (data.code === 12000) {
    tableData.value = data.data.data;
    form.totalCount = data.data.totalCount
  } else {
    tableData.value = [];
    form.totalCount = 0
  }
}

defineExpose({
  search
})

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

.recharge-log-pagination {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 20px;
}
</style>
