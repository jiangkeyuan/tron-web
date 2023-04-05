<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>系统参数</span>
        <el-button type="primary" text @click="() => addManager()">
          <el-icon>
            <Plus />
          </el-icon>
        </el-button>
      </div>
    </template>
    <el-form :model="forms" inline class="sale-record sale-record-search">
      <el-form-item label="值">
        <el-input v-model="forms.systemKey" />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" color="#c53027" @click="seach">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" @sort-change="sortChange">
      <el-table-column prop="systemKey" label="名称" width="300" />
      <el-table-column prop="systemVal" label="值" />
      <el-table-column prop="remarks" label="备注" width="300" />
      <el-table-column prop="lastUpdateDate" sortable="custom" label="最后修改时间" width="300"
        :formatter="(row) => filterDate(row.lastUpdateDate)" />
      <el-table-column label="" width="130">
        <template #default='scope'>
          <el-button type="primary" link @click="() => change(scope)">
            修改
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

  <el-dialog v-model="dialogFormVisible" title="系统配置" append-to-body destroy-on-close>
    <el-form :model="form" label-position="right" label-width="60" ref="ruleFormRef" :rules="rules">
      <el-form-item label="名称:" prop="systemKey">
        <el-input v-model="form.systemKey" autocomplete="off" :disabled='form.type !== "add"' placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="值:" prop="systemVal">
        <el-input v-model="form.systemVal" autocomplete="off" placeholder="请输入值" />
      </el-form-item>
      <el-form-item label="备注:" prop="remarks">
        <el-input v-model="form.remarks" autocomplete="off" placeholder="请输入备注" />
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
import { filterDate } from '@/utils/utils/date.js';
import { getManagerList, addManagerList, changeManagerList, deleteManagerList } from '@/utils/axios/manager/index.js';
import { ElMessage } from 'element-plus';
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
    { required: true, message: '请输入系统名称', trigger: 'change' },
  ],
  systemVal: [
    { required: true, message: '请输入系统值', trigger: 'change' },
  ],
  remarks: [
    { required: true, message: '请输入备注', trigger: 'change' },
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
    ElMessage.success('删除成功')
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
          ElMessage.success('修改成功')
          seach();
        } else {
          ElMessage.error(data.msg)
        }
      } else {
        const data = await addManagerList(form);
        if (data.code === 12000) {
          dialogFormVisible.value = false;
          ElMessage.success('添加成功')
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