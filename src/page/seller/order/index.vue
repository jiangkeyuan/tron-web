<template>
  <DashbordContent>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="formInline.user" placeholder="请输入订单号" />
      </el-form-item>
      <el-form-item label="接收">
        <el-input v-model="formInline.user" placeholder="请输入地址" />
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="value1"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
      </el-form-item>
      <el-form-item>
        <el-button>重置</el-button>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </DashbordContent>
  <DashbordContent>
    <el-radio-group v-model="radio2">
      <el-radio-button :label="0">全部</el-radio-button>
      <el-radio-button :label="1">质押中</el-radio-button>
      <el-radio-button :label="2">即将结束</el-radio-button>
      <el-radio-button :label="3">已完成</el-radio-button>
    </el-radio-group>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="订单号"> </el-table-column>
      <el-table-column prop="name" label="质押时间" />
      <el-table-column prop="address" label="钱包" />
      <el-table-column prop="address" label="结算金额" />
      <el-table-column prop="address" label="单价" />
      <el-table-column prop="address" label="质押" />
      <el-table-column prop="address" label="到期时间">
        <template #header>
          <div>
            到期时间
            <el-tooltip
              class="box-item"
              effect="dark"
              content="香港时间"
              placement="right"
            >
              <el-icon><WarningFilled /></el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="订单状态" />
      <el-table-column prop="address" label="操作">
        <template #default>
          <el-button link type="primary" size="small">
            质押详情</el-button>
            <el-button link type="primary" size="small">解押详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </DashbordContent>
</template>

<script setup>
const formInline = reactive({
  user: '',
  region: ''
})
const radio2 = ref(0)

const handleClick = (tab, event) => {
  console.log(tab, event)
}
const value1 = ref('')
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
const onSubmit = () => {
  console.log('submit!')
}
</script>

<style></style>
