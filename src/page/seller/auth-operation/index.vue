<template>
  <DashbordContent>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="类型">
        <el-select v-model="form.operateType" class="m-2" placeholder="全部" @change="queryOperation">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker v-model="form.date" value-format="x" type="daterange" start-placeholder="开始时间"
          end-placeholder="结束时间" />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </DashbordContent>
  <DashbordContent>
    <el-table :data="operationList" stripe style="width: 100%" empty-text="暂无数据">
      <el-table-column prop="createDate" label="时间" :formatter="row => filterDate(row.createDate)" />
      <el-table-column prop="type" label="类型" :formatter="row => filterStatus(row.type)" />
      <el-table-column prop="amount" label="金额" />
      <el-table-column prop="transactionHash" label="交易哈希">
        <template #default="scope">
          <el-link type="primary" @click="gotoNew(scope.row.transactionHash)" target="_blank">交易哈希</el-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="ctc-pagination pagination">
      <el-pagination v-model:current-page="form.pageIndex" v-model:page-size="form.pageSize" :small="small"
        layout="prev, pager, next, jumper" :total="totalCount" @current-change="handleCurrentChange"
        hide-on-single-pageS />
    </div>
  </DashbordContent>
</template>

<script setup>
import { filterDate } from '@/utils/utils/date.js'
import { getOperation } from '@/utils/axios/seller/index.js'
import { awaitFnLoading } from '@/utils/utils/loading.js'
import { ref } from 'vue'
const value1 = ref('')
const value = ref('')
const form = reactive({
  operateType: '',
  startTime: '',
  endTime: '',
  date: [],
  pageIndex: 1,
  pageSize: 10
})
const gotoNew = (url) => {
  window.open(`https://tronscan.org/#/transaction/${url}`, '_blank');
}
const totalCount = ref(0)
const options = [
  {
    value: 'VOTE',
    label: '投票'
  },
  {
    value: 'WITHDRAW',
    label: '提取收益'
  },
  {
    value: 'DELEGATE',
    label: '委托资源'
  },
  {
    value: 'UNDELEGATE',
    label: '回收资源'
  },
  {
    value: 'STAKE',
    label: '自动质押'
  }
]
const operationList = ref([])
const onSubmit = () => {
  console.log('submit!')
  queryOperation()
}
const resetForm = () => {
  Object.keys(form).map(v => {
    form[v] = ''
  })
  form.date = []
  form.pageIndex = 1
  form.pageSize = 10
  queryOperation()
}
const queryOperation = async () => {
  if (form.date && form.date.length > 0) {
    form.startTime = form.date[0]
    form.endTime = form.date[1]
  } else {
    form.date = []
  }
  const data = await awaitFnLoading(getOperation)(form)
  console.log('data', data)
  if (data.code === 12000) {
    console.log(data)
    operationList.value = data.data.data
    totalCount.value = data.data.totalCount
  } else {
    ElMessage.error(data.msg)
  }
}
const filterStatus = status => {
  const label = options.find(item => {
    return item.value == status
  })
  return label.label
}
const handleCurrentChange = (value) => {
  form.pageIndex = value
  queryOperation()
}
onMounted(() => {
  queryOperation()
})
</script>

<style></style>
