<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>订单中心</span>
      </div>
    </template>
    <el-form :model="forms" inline class="sale-record sale-record-search">
      <el-form-item label="订单号:">
        <el-input v-model="forms.orderNo" />
      </el-form-item>
      <el-form-item label="接收:">
        <el-input v-model="forms.toAddress" />
      </el-form-item>
      <el-form-item label="时间" prop="date">
        <el-date-picker type="datetimerange" v-model="forms.date" start-placeholder="开始时间" end-placeholder="结束时间" />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" color="#c53027" @click="seach">查询</el-button>
        <el-button type="primary" color="#c53027" :disabled="tableData.length === 0"
          @click="exportExcel">导出excel</el-button>
      </el-form-item>
    </el-form>

    <el-radio-group v-model="forms.orderStatus" class="sale-record-group" @change="radioGroupClick">
      <el-radio-button label="">全部</el-radio-button>
      <el-radio-button label="WAIT_DELEGATE">待代理</el-radio-button>
      <el-radio-button label="DELEGATEING">代理中</el-radio-button>
      <el-radio-button label="ALMOST_DONE">即将结束</el-radio-button>
      <el-radio-button label="DONE">已完成</el-radio-button>
      <el-radio-button label="UNAVAILABLE">未生效</el-radio-button>
    </el-radio-group>
    <el-table :data="tableData" style="width: 100%" @sort-change="sortChange" :empty-text="$t('NoData')">
      <el-table-column prop="orderNo" label="订单号" />
      <el-table-column prop="toAddress" label="地址" width="200">
        <template #default="scope">
          <div class="text-overflow">
            <span>代理：</span>
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
      <el-table-column prop="rentalQuantity" label="租用量" />
      <!-- <el-table-column prop="doneRentalQuantity" label="已完成租用量" /> -->
      <el-table-column prop="rentalHours" label="租用时长" :formatter="row => filterHours(row.rentalHours)" />

      <el-table-column prop="payAmount" label="支付金额" />
      <el-table-column prop="delegateDate" label="代理时间" :formatter="row => filterDate(row.delegateDate)" />
      <el-table-column prop="expiredDate" label="到期时间" :formatter="row => filterDate(row.expiredDate)" />
      <el-table-column prop="orderStatus" label="状态" :formatter="row => filterStatus(row.orderStatus)" />
      <el-table-column prop="createDate" label="创建时间" :formatter="row => filterDate(row.createDate)" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" link @click="() => details(scope)">
            订单详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="sale-record-table-pagination">
      <el-pagination @current-change="currentChange" layout="prev, pager, next, jumper" v-model:current-page="form.pageIndex"
        v-model:page-size="form.pageSize" :total="forms.totalCount" />
    </div>
  </el-card>

  <el-dialog v-model="dialogFormVisible" title="订单详情" append-to-body destroy-on-close>
    <div class="detail">
      <div>
        订单号：
        <span class="text" style="padding: 0px 5px">{{
          detailsValue.orderNo || '-'
        }}</span>
      </div>
      <div>
        交易哈希：
        <a class="jump-a" target="_blank" :href="`https://tronscan.org/#/transaction/${detailsValue.transactionHash}`">{{
          detailsValue.transactionHash || '-' }}</a>
      </div>
      <div>
        apiKey：
        <span class="text" style="padding: 0px 5px">{{
          detailsValue.apiKey || '-'
        }}</span>
      </div>
      <div>
        代理：
        <a class="jump-a" target="_blank" :href="`https://tronscan.org/#/address/${detailsValue.fromAddress}`">{{
          detailsValue.fromAddress || '-' }}</a>
      </div>
      <div>
        接收：
        <a class="jump-a" target="_blank" :href="`https://tronscan.org/#/address/${detailsValue.toAddress}`">{{
          detailsValue.toAddress || '-' }}</a>
      </div>
      <div>
        租用量： <span class="text">{{ detailsValue.rentalQuantity }}</span>
      </div>
      <div>
        已完成租用量：<span class="text">{{
          detailsValue.doneRentalQuantity
        }}</span>
      </div>
      <div>
        租用时长：<span class="text">{{
          filterHours(detailsValue.rentalHours)
        }}</span>
      </div>
      <div>
        单价： <span class="text">{{ detailsValue.price }}</span>
      </div>
      <div>
        支付金额： <span class="text">{{ detailsValue.payAmount }} TRX</span>
      </div>
      <div>
        支付时间：
        <span class="text">{{ filterDate(detailsValue.payDate) }}</span>
      </div>
      <div>
        代理时间：
        <span class="text">{{ filterDate(detailsValue.delegateDate) }}</span>
      </div>
      <div>
        到期时间：
        <span class="text">{{ filterDate(detailsValue.expiredDate) }}</span>
      </div>
      <div class="flex">
        <span>订单类型：</span>
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
          {{ filterOrderType(detailsValue.orderType) }}
        </div>
      </div>
      <div class="flex">
        <span>状态：</span>
        <div style="
            display: inline-block;
            width: fit-content;
            padding: 1px 7px;
            margin: 0px;
            background: rgb(255, 255, 255);
            border: 1px solid #67C23A;
            border-radius: 3px;
            font-size: 12px;
            color: #67C23A;
          ">
          {{ filterStatus(detailsValue.orderStatus) }}
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="() => addManagerApi(ruleFormRef)">
          关闭
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { filterDate, filterHours } from '@/utils/utils/date.js'
import { getOrderCenter, exportOrder } from '@/utils/axios/order/index.js'
import { ElMessage } from 'element-plus'
import { getParamsNew, updateQueryStringParameter } from '@/utils/utils/index.js';
const tableData = ref([])
const form = reactive({})
const ruleFormRef = ref()
const forms = reactive({
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0,
  orderNo: '',
  toAddress: '',
  orderStatus: '',
  date: []
})
const detailsValue = reactive({})
const dialogFormVisible = ref(false)
const rules = reactive({
  systemKey: [{ required: true, message: '请输入系统名称', trigger: 'change' }],
  systemVal: [{ required: true, message: '请输入系统值', trigger: 'change' }],
  remarks: [{ required: true, message: '请输入备注', trigger: 'change' }]
})

const sortChange = e => {
  forms.order = e.order === 'ascending' ? 'ASC' : 'DESC'
  seach()
}

const radioGroupClick = () => {
  seachReset()
  seach()
}

const seachReset = () => {
  var newurl = updateQueryStringParameter(window.location.href, 'reset', '1');
  //向当前url添加参数，没有历史记录
  window.history.replaceState({
    path: newurl
  }, '', newurl);
}

const currentChange = val => {
  console.log('val', val)
  forms.pageIndex = val
  seach()
}

const reset = () => {
  forms.orderNo = ''
  forms.toAddress = ''
  forms.orderStatus = ''
  forms.startTime = ''
  forms.endTime = ''
  forms.pageIndex = 1
  forms.date = []
  seach()
}

const details = async scope => {
  dialogFormVisible.value = true
  Object.assign(detailsValue, scope.row)
}

const addManagerApi = async formEl => {
  dialogFormVisible.value = false
}

const addManager = () => {
  Object.keys(form).map(v => {
    form[v] = ''
  })
  form.type = 'add'
  dialogFormVisible.value = true
}
const exportExcel = async () => {
  const data = await exportOrder({ ...forms })
  const blob = new Blob([data])
  console.log('blob', blob)
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = URL.createObjectURL(data)
  document.body.appendChild(link)
  link.click()
  ElMessage.success('导出成功')
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}
const seach = async () => {
  if (forms.date && forms.date.length > 0) {
    forms.starTime = forms.date[0]
    forms.endTime = forms.date[1]
  } else {
    forms.date = []
  }

  const orderstatus = getParamsNew('orderstatus');
  const reset = getParamsNew('reset');
  if (orderstatus !== null && reset != 1) {
    forms.orderStatus = orderstatus;
    const now = new Date();
    // 设置时间为当天的开始（即00:00:00.000）
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // 设置时间为当天的结束（即23:59:59.999）
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    // 转换成 ISO 8601 格式
    const isoStartOfDay = startOfDay.toISOString();
    const isoEndOfDay = endOfDay.toISOString();
    forms.date = [isoStartOfDay, isoEndOfDay];
    forms.starTime = isoStartOfDay;
    forms.endTime = isoEndOfDay
  }

  const data = await getOrderCenter({ ...forms })
  if (data.code === 12000) {
    tableData.value = data.data.data
    forms.totalCount = data.data.totalCount
  } else {
    ElMessage.error(data.msg)
  }
}
const filterState = val => {
  switch (val) {
    case 0:
      return '未激活'
    case 1:
      return '已激活'
    default:
      break
  }
}
const filterStatus = status => {
  switch (status) {
    case 'WAIT_DELEGATE':
      return '等待代理'
    case 'DELEGATEING':
      return '代理中'
    case 'ALMOST_DONE':
      return '即将结束'
    case 'DONE':
      return '已经完成'
    case 'UNAVAILABLE':
      return '未生效'
    default:
      return ''
  }
}
const filterOrderType = status => {
  switch (status) {
    case 'INNER':
      return '内部区'
    case 'QUICK':
      return '快捷区'
    case 'NORMAL':
      return '自助区'
    default:
      return ''
  }
}
const formatAddr = str => {
  return str?.replace(/^(\w{4})\w+(\w{4})$/, '$1****$2')
}
onMounted(() => {
  seach()
})
</script>
<style scoped>
.card-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.sale-record-table-pagination {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.sale-record-search {
  margin-bottom: 30px;
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

.sale-record-group {
  margin-bottom: 20px;
}

.el-form--inline .el-form-item {
  margin-bottom: 18px;
}
</style>
