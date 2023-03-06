<template>
  <div class="recharge-log">
    <el-table :data="tableData" stripe class="recharge-log-table">
      <el-table-column prop="order_no" label="充值时间" />
      <el-table-column prop="money" label="充值金额" />
      <el-table-column prop="amount" label="入账金额" />
      <el-table-column prop="status" label="订单状态" />
      <el-table-column prop="pay_action" label="交易哈希">
        <template #default="scope">
            <el-tooltip
                class="box-item"
                effect="dark"
                :content="scope.row.txid"
                placement="bottom"
            >
                <el-button
                    link
                    type="primary"
                    size="small"
                    @click="() => handleClick(scope)"
                >查看</el-button>
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
const tableData = ref([
  {
    recharge_id: 382,
    amount: 1470,
    amount_decimals: 1470000000,
    money: 1470,
    symbol: "TRX",
    decimals: 6,
    from_address: "TUfATaEXjXLtXVTm3twqq3Q1toE3nnptwq",
    to_address: "TFoTX1MtKuG97pUo3crNXjdZLY6fS77777",
    txid: "54c801e126ec0c7b21e544778dd6e30c3d5aeb7f112fe644e530f4d9accc42c0",
    order_no: "54c801e126ec0c7b21e544778dd6e30c",
    remark: "充值",
    create_time: 1673710067,
    pay_time: 1673710065,
    status: 1,
  },
]);
const handleClick = (scope) => {
  window.open(`https://tronscan.org/#/transaction/${scope.row.txid}`,)
};
</script>
<style scoped>
.recharge-log{
    background: white;
    padding: 6px;
    height: 90%;
}
.recharge-log-table{
    margin-bottom:10px;
}
</style>
