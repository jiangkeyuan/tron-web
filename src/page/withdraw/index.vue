<template>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>提现审核</span>
        </div>
      </template>
      <el-form :model="forms" inline class="sale-record sale-record-search">
        <el-form-item label="钱包地址:">
          <el-input v-model="forms.walletAddress" />
        </el-form-item>
        <el-form-item label="审核状态:">
          <el-select v-model="forms.audit" class="m-2" placeholder="Select">
            <el-option
              v-for="item in auditOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="提取状态:">
          <el-select v-model="forms.status" class="m-2" placeholder="Select">
            <el-option
              v-for="item in auditOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" color="#c53027" @click="seach">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" style="width: 100%" @sort-change="sortChange" :empty-text="$t('NoData')">
        <el-table-column prop="walletAddress" :label="$t('USRER-002')">
          <template #default="{ row }">
            <el-tooltip class="box-item" effect="dark" :content="row.walletAddress" placement="top">
              <div class="text-ellipsis">{{ row.walletAddress?.replace(/^(\w{4})\w+(\w{4})$/, "$1****$2") }}</div>
            </el-tooltip>

          </template>
        </el-table-column>
        <el-table-column prop="audit" label="审核状态" :formatter="row => filterAudit(row.audit)"/>
  
        <el-table-column prop="status" label="提取状态" :formatter="row => filterAudit(row.status)"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" link @click="() => widthdrawRequest(scope)">
              同意
            </el-button>

            <el-button type="primary" link @click="() => cancelWidthdrawRequest(scope)">
              拒绝
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="sale-record-table-pagination">
        <el-pagination @current-change="currentChange" layout="prev, pager, next, jumper"
          v-model:current-page="forms.pageIndex" v-model:page-size="forms.pageSize" :total="forms.totalCount" />
      </div>
    </el-card>
  </template>
  <script setup>
  import { filterDate } from '@/utils/utils/date.js'
  import { getWithdrawList } from '@/utils/axios/buyer/index.js'
  import { ElMessage } from 'element-plus'
  import { getParamsNew, updateQueryStringParameter } from '@/utils/utils/index.js';
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  const tableData = ref([{}])
  const forms = reactive({
    pageIndex: 1,
    pageSize: 10,
    totalCount: 0,
  })
  const detailsValue = reactive({})
  const dialogFormVisible = ref(false)

  const auditOptions = ref([
    {
      label:'成功',
      value:1
    },
    {
      label:'失败',
      value:0
    }
  ])
  
  const cancelWidthdrawRequest = (row)=>{
    ElMessageBox.prompt('是否拒绝该提现申请', "提现申请", {
      confirmButtonText: t('OK'),
      cancelButtonText: t('Cancel'),
      beforeClose: async (a, b, done)=>{
        console.log(a,b,"kkkkk");
        if(a === 'confirm'){
          if(!b.inputValue){
            ElMessage.error("请输入拒绝原因");
            return;
          }
          loading.value = true;
          const data = await getWithdrawbalance({withdrawAmount:b.inputValue});
          loading.value = false;
          if(data.code === 12000){
            ElMessage.success(t('OperateSuccess'));
            store.dispatch('getUserInfoAction');
            done()
          }else{
            ElMessage.error(data.msg);
          }
        } else{
          done()
        }
      }
    })
  }

  const widthdrawRequest =(row)=>{
    ElMessageBox.confirm(
    '是否同意该提现申请',
    '提现申请',
    {
      confirmButtonText: t('OK'),
      cancelButtonText: t('Cancel'),
      type: 'success',
    }
  )
    .then(async () => {
      const data = await delApiList({ apikey: row.apiKey })
      if (data.code == 12000) {
        searchApi();
        ElMessage({
          type: 'success',
          message: t('DeletedSuccess'),
        })
      } else {
        ElMessage({
          type: 'error',
          message: data.msg
        })
      }
    })
  }

  const sortChange = e => {
    forms.order = e.order === 'ascending' ? 'ASC' : 'DESC'
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
    forms.pageIndex = val
    seach()
  }
  
  const reset = () => {
    form.status = ''
    form.audit = ''
    form.walletAddress = ''
    seach()
  }
  
  const details = async scope => {
    dialogFormVisible.value = true
    Object.assign(detailsValue, scope.row)
  }
  
  const addManagerApi = async formEl => {
    dialogFormVisible.value = false
  }
  

  const seach = async () => {
    if (forms.date && forms.date.length > 0) {
      forms.startTime = forms.date[0]
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
      // 转换成 是时间戳
      const isoStartOfDay = startOfDay.getTime();
      const isoEndOfDay = endOfDay.getTime();
      forms.date = [isoStartOfDay, isoEndOfDay];
      forms.startTime = isoStartOfDay;
      forms.endTime = isoEndOfDay
    }
  
    const data = await getWithdrawList({ ...forms })
    if (data.code === 12000) {
      tableData.value = data.data.data
      forms.totalCount = data.data.totalCount
    } else {
      ElMessage.error(data.msg)
    }
  }
  const filterAudit = val => {
    switch (val) {
      case "0":
        return '未激活'
      case "1":
        return '已激活'
      default:
        return ''
    }
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
  