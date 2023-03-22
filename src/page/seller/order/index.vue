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
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="时间"> </el-table-column>
      <el-table-column prop="name" label="类型" />
      <el-table-column prop="address" label="金额" />
      <el-table-column prop="address" label="交易哈希" />
    </el-table>
  </DashbordContent>
</template>

<script setup>
const formInline = reactive({
  user: '',
  region: ''
})
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

<style>

</style>
