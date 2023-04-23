<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ $t('SYSTEM-001') }}</span>
        <el-button type="primary" text @click="() => addManager()">
          <el-icon>
            <Plus />
          </el-icon>
        </el-button>
      </div>
    </template>
    <el-form :model="forms" inline class="sale-record sale-record-search">
      <el-form-item :label="$t('SYSTEM-002')">
        <el-input v-model="forms.systemKey" />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">{{ $t('resetting') }}</el-button>
        <el-button type="primary" color="#c53027" @click="seach">{{ $t('Query') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" @sort-change="sortChange">
      <el-table-column prop="systemKey" :label="$t('SYSTEM-002')" width="300" />
      <el-table-column prop="systemVal" :label="$t('SYSTEM-003')" />
      <el-table-column prop="remarks" :label="$t('SYSTEM-004')" width="300" />
      <el-table-column prop="lastUpdateDate" sortable="custom" :label="$t('SYSTEM-005')" width="300"
        :formatter="(row) => filterDate(row.lastUpdateDate)" />
      <el-table-column label="" width="130">
        <template #default='scope'>
          <el-button type="primary" link @click="() => change(scope)">
            {{ $t('SYSTEM-006') }}
          </el-button>
          <!-- <el-button type="primary" link @click="() => deleteList(scope)">
            删除
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="sale-record-table-pagination">
      <el-pagination @current-change="currentChange" layout="prev, pager, next" v-model:current-page='form.pageIndex'
        v-model:page-size="form.pageSize" :total="forms.totalCount" />
    </div>
  </el-card>

  <el-dialog v-model="dialogFormVisible" :title="$t('SYSTEM-007')" append-to-body destroy-on-close>
    <el-form :model="form" label-position="right" label-width="60" ref="ruleFormRef" :rules="rules">
      <el-form-item :title="$t('SYSTEM-002')" prop="systemKey">
        <el-input v-model="form.systemKey" autocomplete="off" :disabled='form.type !== "add"' placeholder="$t('SYSTEM-013')" />
      </el-form-item>
      <el-form-item :title="$t('SYSTEM-003')" prop="systemVal">
        <el-input v-model="form.systemVal" autocomplete="off" :placeholder="$t('SYSTEM-008')" />
      </el-form-item>
      <el-form-item :title="$t('SYSTEM-004')" prop="remarks">
        <el-input v-model="form.remarks" autocomplete="off" :placeholder="$t('SYSTEM-009')" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="() => addManagerApi(ruleFormRef)">
          {{$t('SYSTEM-014')}}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { filterDate } from '@/utils/utils/date.js';
import { getManagerList, addManagerList, changeManagerList, deleteManagerList } from '@/utils/axios/manager/index.js';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const tableData = ref([]);
const form = reactive({});
const ruleFormRef = ref()
const forms = reactive({
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0,
  order: ''
})
const dialogFormVisible = ref(false);
const rules = reactive({
  systemKey: [
    { required: true, message: t('SYSTEM-010'), trigger: 'change' },
  ],
  systemVal: [
    { required: true, message: t('SYSTEM-011'), trigger: 'change' },
  ],
  remarks: [
    { required: true, message: t('SYSTEM-012'), trigger: 'change' },
  ],
})

const sortChange = (e) => {
  forms.order = e.order === "ascending" ? 'ASC' : "DESC"
  seach()
}

const currentChange = () => {
  seach();
}

const reset = () => {
  forms.systemKey = '';
  forms.pageIndex = 1;
  seach();
}

const change = async (scope) => {
  Object.keys(form).map(v => {
    form[v] = '';
  })
  dialogFormVisible.value = true;
  Object.assign(form, scope.row, { type: 'change' });
}

const deleteList = async (scope) => {
  const data = await deleteManagerList(scope.row);
  if (data.code === 12000) {
    ElMessage.success(t('DeletedSuccess'))
    seach();
  } else {

  }
}

const addManagerApi = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (form.type === 'change') {
        const data = await changeManagerList({ ...form, });
        if (data.code === 12000) {
          dialogFormVisible.value = false;
          ElMessage.success(t('EditSuccess'))
          seach();
        } else {
          ElMessage.error(data.msg)
        }
      } else {
        const data = await addManagerList(form);
        if (data.code === 12000) {
          dialogFormVisible.value = false;
          ElMessage.success(t('AddSuccess'))
          seach();
        } else {
          ElMessage.error(data.msg)
        }
      }
    }
  })
}

const addManager = () => {
  Object.keys(form).map(v => {
    form[v] = '';
  })
  form.type = 'add'
  dialogFormVisible.value = true;
}
const seach = async () => {
  const data = await getManagerList({ ...forms, sort: 'lastUpdateDate' });
  if (data.code === 12000) {
    tableData.value = data.data.data;
    forms.totalCount = data.data.totalCount
  } else {
    ElMessage.error(data.msg)
  }

}
onMounted(() => {
  seach();
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