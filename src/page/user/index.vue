<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>用户列表</span>
        <!-- <el-button type="primary" text @click="() => addManager()">
          <el-icon>
            <Plus />
          </el-icon>
        </el-button> -->
      </div>
    </template>
    <el-form :model="forms" inline class="sale-record sale-record-search">
      <el-form-item label="email:">
        <el-input v-model="forms.email" />
      </el-form-item>
      <el-form-item label="钱包地址:">
        <el-input v-model="forms.walletAddress" />
      </el-form-item>
      <el-form-item label="时间" prop="date">
        <el-date-picker
          v-model="forms.date"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" color="#c53027" @click="seach"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" @sort-change="sortChange">
      <el-table-column prop="email" label="email" />
      <el-table-column prop="walletAddress" label="钱包地址">
        <template #default="{ row }">
          <div class="text-ellipsis">{{ row.walletAddress }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="createDate"
        sortable="custom"
        label="创建时间"
        :formatter="row => filterDate(row.createDate)"
      />
      <el-table-column prop="availableBalance" label="金额" />
      <el-table-column
        prop="state"
        label="当前状态"
        :formatter="row => filterState(row.state)"
      />
      <el-table-column
        prop="roles"
        label="卖家的身份"
        :formatter="row => filterRoles(row.roles)"
      />
      <el-table-column prop="settlementRatio" label="结算比例">
        <template #default="{ row }">
          <div>{{ row.settlementRatio }}%</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            link
            @click="() => change(scope)"
            v-if="scope.row.roles?.includes('BUYER') || scope.row.permissionId"
          >
            设置
          </el-button>
          <!-- <el-button type="primary" link @click="() => deleteList(scope)">
            删除
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="sale-record-table-pagination">
      <el-pagination
        @current-change="currentChange"
        layout="prev, pager, next"
        v-model:current-page="form.pageIndex"
        v-model:page-size="form.pageSize"
        :total="forms.totalCount"
      />
    </div>
  </el-card>

  <el-dialog
    v-model="dialogFormVisible"
    title="用户设置"
    append-to-body
    destroy-on-close
  >
    <el-form
      :model="form"
      label-position="right"
      label-width="100"
      ref="ruleFormRef"
      :rules="rules"
    >
      <el-form-item label="email:" prop="email" v-if="form.email">
        <el-input
          v-model="form.email"
          autocomplete="off"
          disabled
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="钱包地址:" prop="email" v-else>
        <el-input
          v-model="form.walletAddress"
          autocomplete="off"
          disabled
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="结算比列:" prop="settlementRatio">
        <el-input
          v-model="form.settlementRatio"
          autocomplete="off"
          placeholder="0~100"
          oninput="if(value > 100) value = 100; if(value < 0 || value == null) value = '';"
          :maxlength="3"
          :minlength="1"
        >
          <template #append>%</template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="() => addManagerApi(ruleFormRef)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { filterDate } from '@/utils/utils/date.js'
import { getUserList, settingRatio } from '@/utils/axios/user/index.js'
import { ElMessage } from 'element-plus'
const tableData = ref([])
const form = reactive({})
const ruleFormRef = ref()
const forms = reactive({
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0,
  email: '',
  walletAddress: '',
  date: []
})
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

const currentChange = val => {
  console.log('val', val)
  forms.pageIndex = val
  seach()
}

const reset = () => {
  forms.email = ''
  forms.walletAddress = ''
  forms.pageIndex = 1
  seach()
}

const change = async scope => {
  Object.keys(form).map(v => {
    form[v] = ''
  })
  dialogFormVisible.value = true
  Object.assign(form, scope.row, { type: 'change' })
}

const deleteList = async scope => {
  const data = await deleteManagerList(scope.row)
  if (data.code === 12000) {
    ElMessage.success('删除成功')
    seach()
  } else {
  }
}

const addManagerApi = async formEl => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const data = await settingRatio({
        settlementRatio: form.settlementRatio,
        userId: form.id
      })
      console.log(data)
      if (data.code === 12000) {
        ElMessage.success('设置成功')
        seach()
        dialogFormVisible.value = false
      } else {
        ElMessage.error(data.msg)
      }
    }
  })
}

const addManager = () => {
  Object.keys(form).map(v => {
    form[v] = ''
  })
  form.type = 'add'
  dialogFormVisible.value = true
}
const seach = async () => {
  if (forms.date && forms.date.length > 0) {
    forms.starTime = forms.date[0]
    forms.endTime = forms.date[1]
  } else {
    forms.date = []
  }
  const data = await getUserList({ ...forms })
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

const filterRoles = val => {
  return val
    ?.split(',')
    .map(item => {
      switch (item) {
        case 'BUYER':
          return '买家'
        case 'SELLER':
          return '卖家'
        default:
          return item
      }
    })
    .join(',')
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
</style>
