<template>
  <el-form :model="form" inline class="sale-record sale-record-search">
    <el-form-item label="订单号">
      <el-input v-model="form.orderNo" />
    </el-form-item>
    <el-form-item label="接收">
      <el-input v-model="form.toAddress" />
    </el-form-item>
    <el-form-item label="时间">
      <el-date-picker v-model="form.date" type="datetimerange" range-separator="To" start-placeholder="Start date"
        end-placeholder="End date" />
    </el-form-item>
    <el-form-item label="Api Key">
      <el-select empty="11111" v-model="form.region" placeholder="please select your zone">
        <el-option v-for="i in apiKeyList" :label="i.label" :value="i.value" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="reset">重置</el-button>
      <el-button type="primary" color="#294aa5" @click="seach">查询</el-button>
    </el-form-item>
  </el-form>
  <div class="sale-record sale-record-table">
    <el-radio-group v-model="form.orderStatus" class="sale-record-group">
      <el-radio-button label="">全部</el-radio-button>
      <el-radio-button label="WAIT_DELEGATE">待代理</el-radio-button>
      <el-radio-button label="DELEGATEING">代理中</el-radio-button>
      <el-radio-button label="ALMOST_DONE">即将结束</el-radio-button>
      <el-radio-button label="DONE">已完成</el-radio-button>
      <el-radio-button label="UNAVAILABLE">未生效</el-radio-button>
    </el-radio-group>

    <el-table :data="tableData" stripe class="sale-record-table-list">
      <el-table-column prop="orderNo" label="订单号" width="220" />
      <el-table-column prop="toAddress" label="接收" width="180" />
      <el-table-column prop="rentalQuantity" label="租用量" width="120" />
      <el-table-column prop="doneRentalQuantity" label="已完成租用量" width="120" />
      <el-table-column prop="rentalDays" label="租用时长" width="120" />
      <el-table-column prop="payDate" label="支付时间" width="180" :formatter="(row) => filterDate(row.payDate)" />
      <el-table-column prop="delegateDate" label="代理时间" width="180" :formatter="(row) => filterDate(row.delegateDate)" />
      <el-table-column prop="expiredDate" label="到期时间" width="180" :formatter="(row) => filterDate(row.expiredDate)" />
      <el-table-column prop="payAmount" label="支付金额" width="120" />
      <el-table-column prop="orderStatus" label="状态" width="120" :formatter="(row) => filterStatus(row.orderStatus)" />
      <el-table-column prop="date" label="更多操作" width="220" fixed="right">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="details(scope)">订单详情</el-button>
          <el-button v-if="scope.row.transactionHash" link type="primary" size="small"
            @click="gotoNew(scope.row.transactionHash)">代理详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="sale-record-table-pagination">
      <el-pagination v-model:current-page='form.pageIndex' :page-size="form.pageSize" layout="prev, pager, next"
        :total="form.totalCount" />
    </div>

    <el-dialog v-model="dialogTableVisible" append-to-body center :title="`订单号:${detailsValue.orderNo}`">
      <div class="custom-modal-centent">
        <div class="modal-content">
          <div class="detail">
            <div>用户：<span class="text">375149089@qq.com</span></div>
            <div>
              钱包地址:
              <a class="jump-a" target="_blank"
                :href="`https://tronscan.org/#/address/${detailsValue.toAddress}`">TVDJUVhQPdp8Gojsp7bmZS47M8KU2zSsaq</a>
            </div>
            <div>
              <div>TRX余额：<span class="text">0</span></div>
            </div>
          </div>
          <div class="detail">
            <div>
              交易哈希：
              <span class="text" style="padding: 0px 5px">-</span>
            </div>
            <div>
              apiKey：
              <span class="text" style="padding: 0px 5px">-</span>
            </div>
            <div>
              接收：
              <a class="jump-a" target="_blank" :href="`https://tronscan.org/#/address/${detailsValue.toAddress}`">{{
                detailsValue.toAddress }}</a>
            </div>
            <div>
              租用量：<svg class="vben-svg-icon" aria-hidden="true" style="width: 16px; height: 16px">
                <use xlink:href="#icon-seller-selling-energy"></use>
              </svg><span class="text">{{ detailsValue.rentalQuantity }}</span>
            </div>
            <div>
              已完成租用量：<svg class="vben-svg-icon" aria-hidden="true" style="width: 16px; height: 16px">
                <use xlink:href="#icon-seller-selling-energy"></use>
              </svg><span class="text">{{ detailsValue.doneRentalQuantity }}</span>
            </div>
            <div>
              租用时长：<span class="text">{{ detailsValue.rentalDays }} <span style="padding: 0px 2px">天</span></span>
            </div>
            <div>支付金额： <span class="text">{{ detailsValue.payAmount }} TRX</span></div>
            <div>
              支付时间：
              <span class="text">{{ filterDate(detailsValue.payDate) }}</span>
            </div>
            <div>
              代理时间：
              <span class="text">{{ filterDate(detailsValue.stakeDate) }}</span>
            </div>
            <div>
              到期时间：
              <span class="text">{{ filterDate(detailsValue.expiredDate) }}</span>
            </div>
            <div class="flex">
              <span>状态：</span>
              <div style="
                              display: inline-block;
                              width: fit-content;
                              padding: 1px 7px;
                              margin: 0px;
                              background: rgb(255, 255, 255);
                              border: 1px solid rgb(191, 191, 191);
                              border-radius: 3px;
                              font-size: 12px;
                              color: rgb(191, 191, 191);
                            ">
                {{ filterStatus(detailsValue.orderStatus) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { getRentals, getApiList } from "@/utils/axios/buyer/index.js";
import { filterDate } from '@/utils/utils/date.js';
const form = reactive({
  date: [],
  orderStatus: "",
  pageIndex: 1,
  pageSize: 20,
  totalCount: 0
});
const apiKeyList = ref([]);
const tableData = ref([]);
const dialogTableVisible = ref(false);
const detailsValue = reactive({});
const details = (v) => {
  Object.assign(detailsValue, v.row);
  dialogTableVisible.value = true;
};
const gotoNew = (url) => {
  window.open(`https://tronscan.org/#/transaction/${url}`, '_blank');
}

const seach = async () => {
  if (form.date && form.date.length > 0) {
    form.startTime = form.date[0]
    form.endTime = form.date[1]
  } else {
    form.date = [];
  }
  const data = await getRentals("/buyer/user/rentals", form);
  tableData.value = data.data.data;
}

const filterStatus = (status) => {
  switch (status) {
    case "WAIT_DELEGATE":
      return "等待代理"
    case "DELEGATEING":
      return "代理中"
    case "ALMOST_DONE":
      return "即将结束"
    case "DONE":
      return "已经完成"
    case "UNAVAILABLE":
      return "未生效"
    default:
      return '';
  }
}

const reset = () => {
  Object.keys(form).map(v => {
    form[v] = '';
  })
  form.date = [];
}


onMounted(async () => {
  seach();
});
</script>
<style scoped>
.modal-content {}

.text {
  font-size: 14px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #121c41;
}

.jump-a {
  color: #294aa5;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
}

.detail {
  padding: 10px;
  border: 1px dashed transparent;
  background: linear-gradient(white, white) padding-box,
    repeating-linear-gradient(-45deg, #ccc 0, #ccc 0.3em, white 0, white 0.5em);
}

.detail div {
  margin: 0.4em 0;
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
  padding: 12px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
}

.sale-record-table {
  height: 85%;
  padding: 6px;
}

.sale-record-group {
  margin-bottom: 14px;
}

.sale-record-table-list {}

.sale-record-table-pagination {
  margin-top: 10px;
  width: 100%;
}
</style>
