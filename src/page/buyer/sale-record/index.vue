<template>
  <el-form :model="form" inline class="sale-record sale-record-search">
    <el-form-item :label="$t('RENT-001')">
      <el-input v-model="form.orderNo" />
    </el-form-item>
    <el-form-item :label="$t('RENT-002')">
      <el-input v-model="form.toAddress" />
    </el-form-item>
    <el-form-item :label="$t('RENT-003')">
      <el-date-picker v-model="form.date" type="datetimerange" range-separator="To" start-placeholder="Start date"
        end-placeholder="End date" />
    </el-form-item>
    <el-form-item label="Api Key">
      <el-input v-model="form.apikey" />
    </el-form-item>
    <el-button @click="reset">{{ $t('resetting') }}</el-button>
    <el-button type="primary" color="#c53027" @click="seach">{{ $t('Query') }}</el-button>
  </el-form>
  <div class="sale-record sale-record-table">
    <el-radio-group v-model="form.orderStatus" class="sale-record-group" @change="seach">
      <el-radio-button label="">{{ $t('RENT-004') }}</el-radio-button>
      <el-radio-button label="WAIT_DELEGATE">{{ $t('RENT-005') }}</el-radio-button>
      <el-radio-button label="DELEGATEING">{{ $t('RENT-006') }}</el-radio-button>
      <el-radio-button label="ALMOST_DONE">{{ $t('RENT-007') }}</el-radio-button>
      <el-radio-button label="DONE">{{ $t('RENT-008') }}</el-radio-button>
      <el-radio-button label="UNAVAILABLE">{{ $t('RENT-009') }}</el-radio-button>
    </el-radio-group>

    <el-table :data="tableData" stripe class="sale-record-table-list" v-loading="fullscreenLoading"
      :empty-text="$t('NoData')">
      <el-table-column prop="orderNo" :label="$t('RENT-001')" width="220" />
      <el-table-column prop="toAddress" :label="$t('RENT-002')" width="180" />
      <el-table-column prop="rentalQuantity" :label="$t('RENT-010')" width="120" />
      <el-table-column prop="doneRentalQuantity" :label="$t('RENT-011')" width="220" />
      <el-table-column prop="rentalHours" :label="$t('RENT-012')" width="140"
        :formatter="(row) => filterHours(row.rentalHours)" />
      <el-table-column prop="payDate" :label="$t('RENT-013')" width="180" :formatter="(row) => filterDate(row.payDate)" />
      <el-table-column prop="delegateDate" :label="$t('RENT-018')" width="180"
        :formatter="(row) => filterDate(row.delegateDate)" />
      <el-table-column prop="expiredDate" :label="$t('RENT-019')" width="180"
        :formatter="(row) => filterDate(row.expiredDate)" />
      <el-table-column prop="payAmount" :label="$t('RENT-020')" width="200" />
      <el-table-column prop="orderStatus" :label="$t('RENT-021')" width="120"
        :formatter="(row) => filterStatus(row.orderStatus)" />
      <el-table-column prop="date" :label="$t('RENT-014')" width="220" fixed="right">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="details(scope)">{{ $t('RENT-022') }}</el-button>
          <el-button v-if="scope.row.transactionHash" link type="primary" size="small"
            @click="gotoNew(scope.row.transactionHash)">{{ $t('RENT-023') }}</el-button>
          <el-button v-if="scope.row.orderStatus === 'WAIT_DELEGATE' && scope.row.orderType === 'NORMAL'" link
            type="primary" size="small" @click="cancel(scope)">{{ $t('RENT-035') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="sale-record-table-pagination">
      <el-pagination v-model:current-page='form.pageIndex' @current-change="() => currentChange()"
        v-model:page-size="form.pageSize" layout="prev, pager, next, jumper" :total="form.totalCount" />
    </div>

    <el-dialog v-model="dialogTableVisible" append-to-body center :title="`${$t('RENT-001')}:${detailsValue.orderNo}`">
      <div class="custom-modal-centent">
        <div class="modal-content">
          <div class="detail">
            <div>{{ $t('RENT-024') }}:<span class="text">{{ store.state.userInfo?.userInfo?.email }}</span></div>
            <div>
              {{ $t('RENT-025') }}:
              <a class="jump-a" target="_blank" :href="`https://tronscan.org/#/address/${detailsValue.toAddress}`">{{
                store.state.userInfo?.userInfo?.walletAddress }}</a>
            </div>
            <div>
              <div>TRX{{ $t('RENT-026') }}：<span class="text">{{ store.state.userInfo?.userInfo?.availableBalance
              }}</span>
              </div>
            </div>
          </div>
          <div class="detail">
            <div>
              {{ $t('RENT-027') }}:
              <span class="text" style="padding: 0px 5px">{{ detailsValue.transactionHash || '-' }}</span>
            </div>
            <div>
              apiKey：
              <span class="text" style="padding: 0px 5px">{{ detailsValue.apiKey || '-' }}</span>
            </div>
            <div>
              {{ $t('RENT-028') }}:
              <a class="jump-a" target="_blank" :href="`https://tronscan.org/#/address/${detailsValue.toAddress}`">{{
                detailsValue.toAddress }}</a>
            </div>
            <div>
              {{ $t('RENT-029') }}:<svg class="vben-svg-icon" aria-hidden="true" style="width: 16px; height: 16px">
                <use xlink:href="#icon-seller-selling-energy"></use>
              </svg><span class="text">{{ detailsValue.rentalQuantity }}</span>
            </div>
            <div>
              {{ $t('RENT-030') }}:<svg class="vben-svg-icon" aria-hidden="true" style="width: 16px; height: 16px">
                <use xlink:href="#icon-seller-selling-energy"></use>
              </svg><span class="text">{{ detailsValue.doneRentalQuantity }}</span>
            </div>
            <div>
              {{ $t('RENT-031') }}:<span class="text">{{ filterHours(detailsValue.rentalHours) }}</span>
            </div>
            <div>{{ $t('RENT-020') }}: <span class="text">{{ detailsValue.payAmount }} TRX</span></div>
            <div>
              {{ $t('RENT-036') }}：
              <span class="text">{{ filterDate(detailsValue.payDate) }}</span>
            </div>
            <div>
              {{ $t('RENT-018') }}:
              <span class="text">{{ filterDate(detailsValue.stakeDate) }}</span>
            </div>
            <div>
              {{ $t('RENT-019') }}:
              <span class="text">{{ filterDate(detailsValue.expiredDate) }}</span>
            </div>
            <div class="flex">
              <span>{{ $t('RENT-021') }}:</span>
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
import { getRentals, getApiList, cancelOrder } from "@/utils/axios/buyer/index.js";
import { filterDate, filterHours } from '@/utils/utils/date.js';
import { ElMessage } from "element-plus";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const fullscreenLoading = ref(false);
const form = reactive({
  date: [],
  orderStatus: "",
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0
});
const apiKeyList = ref([]);
const store = useStore();
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

const cancel = async (scope) => {
  console.log(scope)
  ElMessageBox.alert(t('RENT-032'), t('RENT-033'), {
    confirmButtonText: t('RENT-037'),
    beforeClose: async (a, b, done) => {
      if (a === 'confirm') {
        const data = await cancelOrder({ id: scope.row.id });
        if (data === 12000) {
          ElMessage.success(t('OperateSuccess'));
          seach()
          done()
        } else {
          ElMessage.error(data.msg);
        }
      } else {
        done()
      }
    },
  })
}

const currentChange = () => {
  seach();
}

const seach = async () => {
  fullscreenLoading.value = true;
  if (form.date && form.date.length > 0) {
    form.startTime = form.date[0]
    form.endTime = form.date[1]
  } else {
    form.date = [];
  }
  const data = await getRentals("/buyer/user/rentals", form);
  fullscreenLoading.value = false;
  if (data.code == 12000) {
    tableData.value = data.data.data;
    form.totalCount = data.data.totalCount
  } else {
    ElMessage.error(data.mas)
  }

}

const filterStatus = (status) => {
  switch (status) {
    case "WAIT_DELEGATE":
      return t('RENT-005')
    case "DELEGATEING":
      return t('RENT-006')
    case "ALMOST_DONE":
      return t('RENT-007')
    case "DONE":
      return t('RENT-008')
    case "UNAVAILABLE":
      return t('RENT-009')
    default:
      return '';
  }
}

const reset = () => {
  Object.keys(form).map(v => {
    form[v] = '';
  })
  form.date = [];

  seach();
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
  color: #c53027;
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
