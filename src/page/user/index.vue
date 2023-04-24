<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ $t('USRER-001') }}</span>
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
      <el-form-item :label="`${$t('USRER-002')}:`">
        <el-input v-model="forms.walletAddress" />
      </el-form-item>
      <el-form-item :label="$t('USRER-003')" prop="date">
        <el-date-picker v-model="forms.date" type="daterange" :start-placeholder="$t('USRER-003')"
          :end-placeholder="$t('USRER-004')" />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">{{ $t('USRER-020') }}</el-button>
        <el-button type="primary" color="#c53027" @click="seach">{{ $t('USRER-021') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" @sort-change="sortChange">
      <el-table-column prop="email" label="email" />
      <el-table-column prop="walletAddress" :label="$t('USRER-002')">
        <template #default="{ row }">
          <el-tooltip class="box-item" effect="dark" :content="row.walletAddress" placement="top">
            <div class="text-ellipsis">{{ row.walletAddress?.replace(/^(\w{4})\w+(\w{4})$/, "$1****$2") }}</div>
          </el-tooltip>

        </template>
      </el-table-column>
      <el-table-column prop="createDate" sortable="custom" :label="$t('USRER-022')"
        :formatter="row => filterDate(row.createDate)" />
      <el-table-column prop="availableBalance" :label="$t('USRER-006')" />
      <el-table-column prop="state" :label="$t('USRER-007')" :formatter="row => filterState(row.state)" />
      <el-table-column prop="roles" :label="$t('USRER-008')" :formatter="row => filterRoles(row.roles)" />
      <el-table-column prop="settlementRatio" :label="$t('USRER-009')">
        <template #default="{ row }">
          <div>{{ row.settlementRatio }}%</div>
        </template>
      </el-table-column>
      <el-table-column prop="commissionRatio" :label="$t('USRER-010')">
        <template #default="{ row }">
          <div>{{ row.commissionRatio }}%</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('USRER-011')">
        <template #default="scope">
          <el-button type="primary" link @click="() => change(scope)"
            v-if="scope.row.roles?.includes('BUYER') || scope.row.permissionId">
            {{ $t('USRER-023') }}
          </el-button>
          <!-- <el-button type="primary" link @click="() => deleteList(scope)">
            删除
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="sale-record-table-pagination">
      <el-pagination @current-change="currentChange" layout="prev, pager, next, jumper"
        v-model:current-page="form.pageIndex" v-model:page-size="form.pageSize" :total="forms.totalCount" />
    </div>
  </el-card>

  <el-dialog v-model="dialogFormVisible" :title="$t('USRER-023')" append-to-body destroy-on-close>
    <el-form :model="form" label-position="right" label-width="100" ref="ruleFormRef" :rules="rules">
      <el-form-item label="email:" prop="email" v-if="form.email">
        <el-input v-model="form.email" autocomplete="off" disabled placeholder="" />
      </el-form-item>
      <el-form-item :label="`${$t('USRER-002')}:`" prop="email" v-else>
        <el-input v-model="form.walletAddress" autocomplete="off" disabled placeholder="" />
      </el-form-item>
      <el-form-item :label="`${$t('USRER-009')}:`" prop="settlementRatio">
        <el-input v-model="form.settlementRatio" autocomplete="off" placeholder="0~100"
          oninput="if(value > 100) value = 100; if(value < 0 || value == null) value = '';" :maxlength="3" :minlength="1">
          <template #append>%</template>
        </el-input>
      </el-form-item>
      <el-form-item :label="`${$t('USRER-010')}:`" prop="commissionRatio">
        <el-input v-model="form.commissionRatio" autocomplete="off" placeholder="0~100"
          oninput="if(value > 100) value = 100; if(value < 0 || value == null) value = '';" :maxlength="3" :minlength="1">
          <template #append>%</template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="() => addManagerApi(ruleFormRef)">
          {{ $t('USRER-024') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { filterDate } from '@/utils/utils/date.js'
import { getUserList, settingRatio } from '@/utils/axios/user/index.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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
  systemKey: [{ required: true, message: t('USRER-012'), trigger: 'change' }],
  systemVal: [{ required: true, message: t('USRER-013'), trigger: 'change' }],
  remarks: [{ required: true, message: t('USRER-014'), trigger: 'change' }]
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
    ElMessage.success(t('USRER-025'))
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
        commissionRatio: form.commissionRatio,
        userId: form.id
      })
      console.log(data)
      if (data.code === 12000) {
        ElMessage.success(t('USRER-015'))
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
      return t('USRER-016')
    case 1:
      return t('USRER-017')
    default:
      break
  }
}

const filterRoles = val => {
  return val
    ?.split(',')
    .map(item => {
      const v = item.toUpperCase()
      switch (v) {
        case 'BUYER':
          return t('USRER-018')
        case 'SELLER':
          return t('USRER-019')
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
