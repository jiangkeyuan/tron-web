<template>
  <DashbordContent>
    <el-form :inline="true" ref="ruleFormRef" :model="form" class="demo-form-inline">
      <el-form-item label="订单号" prop="orderNo">
        <el-input v-model="form.orderNo" placeholder="请输入订单号" />
      </el-form-item>
      <el-form-item label="接收" prop="toAddress">
        <el-input v-model="form.toAddress" placeholder="请输入地址" />
      </el-form-item>
      <el-form-item label="时间" prop="date">
        <el-date-picker value-format="x" v-model="form.date" type="daterange" start-placeholder="开始时间"
          end-placeholder="结束时间" />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </DashbordContent>
  <DashbordContent>
    <el-radio-group v-model="form.orderStatus" @change="changeStatus">
      <el-radio-button label="">全部</el-radio-button>
      <el-radio-button label="DELEGATEING">代理中</el-radio-button>
      <el-radio-button label="ALMOST_DONE">即将结束</el-radio-button>
      <el-radio-button label="DONE">已完成</el-radio-button>
    </el-radio-group>
    <el-table :data="userSells" stripe style="width: 100%" empty-text="暂无数据">
      <el-table-column prop="orderNo" label="订单号"> </el-table-column>
      <el-table-column prop="delegateDate" label="代理时间" :formatter="(row) => filterDate(row.delegateDate)" />
      <el-table-column prop="fromAddress" label="钱包">
        <template #default="scope">
          <div class="text-overflow">
            <span>收款：</span>
            <el-tooltip class="box-item" effect="dark" :content="scope.row.fromAddress" placement="top">
              <el-link :href="`https://tronscan.org/#/address/${scope.row.fromAddress}`" target="_blank" type="primary">{{
                formatAddr(scope.row.fromAddress) }}</el-link>
            </el-tooltip>
          </div>
          <div class="text-overflow">
            <span>接收：</span>
            <el-tooltip class="box-item" effect="dark" :content="scope.row.toAddress" placement="top">
              <el-link :href="`https://tronscan.org/#/address/${scope.row.toAddress}`" target="_blank" type="primary">{{
                formatAddr(scope.row.toAddress) }}</el-link>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="benifitAmount" label="结算金额" />
      <el-table-column prop="sellPrice" label="单价" />
      <el-table-column prop="address" label="代理">
        <template #default="scope">
          <!-- <div>金额：{{ scope.row.stakeAmount }}</div> -->
          <div>能量：{{ scope.row.lendEnergy }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="expiredDate" label="到期时间" :formatter="(row) => filterDate(row.expiredDate)">
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
      <el-table-column prop="orderStatus" label="订单状态" :formatter="(row) => filterStatus(row.orderStatus)" />
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-link type="primary" @click="gotoNew(scope.row.transactionHash)" target="_blank">委托详情</el-link>
          <div></div>
          <el-link v-if="scope.row.orderStatus == 'DONE'" type="primary" @click="gotoNew(scope.row.undelegateHash)"
            target="_blank">回收详情</el-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="ctc-pagination pagination">
      <el-pagination v-model:current-page="form.pageIndex" v-model:page-size="form.pageSize"
        layout="prev, pager, next, jumper" :total="form.totalCount" @current-change="handleCurrentChange"
        hide-on-single-pageS />
    </div>
  </DashbordContent>
</template>

<script setup>
import { filterDate } from "@/utils/utils/date.js";
import { awaitFnLoading } from "@/utils/utils/loading.js";
import { getUserSells } from "@/utils/axios/seller/index.js";
const form = reactive({
  orderNo: "",
  toAddress: "",
  startTime: "",
  endTime: "",
  orderStatus: "",
  date: [],
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0,
});
const radio2 = ref(0);
const gotoNew = (url) => {
  window.open(`https://tronscan.org/#/transaction/${url}`, "_blank");
};
const handleClick = (tab, event) => {
  console.log(tab, event);
};
const value1 = ref("");
const userSells = ref([]);
const onSubmit = () => {
  console.log("submit!");
  queryUserSells();
};
const queryUserSells = async () => {
  if (form.date && form.date.length > 0) {
    form.startTime = form.date[0];
    form.endTime = form.date[1];
  } else {
    form.date = [];
  }
  const data = await awaitFnLoading(getUserSells)(form);
  if (data.code === 12000) {
    console.log(data);
    userSells.value = data.data.data;
    form.totalCount = data.data.totalCount
  } else {
    ElMessage.error(data.msg);
  }
};
const filterStatus = (status) => {
  switch (status) {
    case "DELEGATEING":
      return "代理中";
    case "ALMOST_DONE":
      return "即将结束";
    case "DONE":
      return "已经完成";
    default:
      return "";
  }
};
const changeStatus = () => {
  queryUserSells();
};
const resetForm = () => {
  Object.keys(form).map((v) => {
    form[v] = "";
  });
  form.date = [];
  form.pageIndex = 1;
  form.pageSize = 10;
  queryUserSells();
};
onMounted(async () => {
  queryUserSells();
});
const handleCurrentChange = (value) => {
  form.pageIndex = value
  queryUserSells()
}
const formatAddr = (str) => {
  return str.replace(/^(\w{4})\w+(\w{4})$/, "$1****$2");
};
</script>

<style>
.text-overflow {
  display: block;
  width: 31em;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
