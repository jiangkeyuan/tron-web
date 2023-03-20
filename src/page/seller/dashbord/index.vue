<template>
  <DashbordContent> 666 </DashbordContent>
  <DashbordContent>
    <div class="vben-basic-table-title">最新订单</div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="Date" >
        <template #header>
          <div>
            质押时间
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
      <el-table-column prop="name" label="结算金额"/>
      <el-table-column prop="address" label="资源" />
      <el-table-column prop="date" label="Date" >
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
    </el-table>
  </DashbordContent>
  <DashbordContent>
    <div class="vben-basic-table-title">即将结束订单</div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="Date">
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
      <el-table-column prop="name" label="质押金额" />
      <el-table-column prop="address" label="资源" />
    </el-table>
  </DashbordContent>
</template>

<script setup>
import { WarningFilled } from '@element-plus/icons-vue'
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
</script>

<style lang="less" scoped>
.vben-basic-table-title {
  font-size: 16px;
}
</style>
