<template>
  <div class="api-key">
    <el-button class="api-key-button" type="primary" v-if="apiList.length !== 0" @click="createApi">{{$t('KEY-003')}}</el-button>

    <div class="api-key-content" v-if="apiList.length === 0">
      <DashBord>
        <div class="api-key-content-header">
          <div class="api-key-content-header-left">
            <span class="api-key-content-header-left-title">{{$t('KEY-013')}}(0/3)</span>
          </div>
          <div class="api-key-content-header-left">
            <span class="api-key-content-header-left-title api-key-content-header-left-title-color">{{$t('KEY-014')}}</span>
            <el-button class="api-key-button" type="primary" @click="createApi">{{$t('KEY-003')}}</el-button>
          </div>
        </div>

        <div class="api-key-content-header-body">
          <div class="api-key-content-header-body-item">
            <span class="api-key-content-header-body-item-key"></span>
            <span class="api-key-content-header-body-item-value"></span>
          </div>

          <div class="api-key-content-header-body-item">
            <span class="api-key-content-header-body-item-key"></span>
            <span class="api-key-content-header-body-item-value"></span>
          </div>
        </div>
      </DashBord>
    </div>

    <div class="api-key-content" v-for="item in apiList" :key="item.index">
      <DashBord>
        <div class="api-key-content-header">
          <div class="api-key-content-header-left">
            <span class="api-key-content-header-left-title">{{ item.keyName }}</span>
            <span class="api-key-content-header-left-edit" @click="() => edit(item)">{{$t('Edit')}} </span>
            <span class="api-key-content-header-left-edit" @click="() => deleteApikey(item)"> {{$t('Delete')}}</span>
          </div>
          <div class="api-key-content-header-left">
            <span class="api-key-content-header-left-title api-key-content-header-left-title-color">{{ item.apiKey
            }}</span>
            <el-icon size="15" @click="() => copyEnd(item.apiKey)" class="recharge-content-address-icon" color="#c53027">
              <CopyDocument />
            </el-icon>
          </div>
        </div>

        <div class="api-key-content-header-body">
          <div class="api-key-content-header-body-item">
            <span class="api-key-content-header-body-item-key">{{$t('KEY-001')}}:</span>
            <span class="api-key-content-header-body-item-value">{{ item.rentalEnergy || 0 }} {{$t('KEY-015')}} {{ item.usedAmount
              || 0 }}
              TRX</span>
          </div>

          <div class="api-key-content-header-body-item">
            <span class="api-key-content-header-body-item-key">{{$t('KEY-002')}}:</span>
            <span class="api-key-content-header-body-item-value">{{ item.billingEnergy || 0 }} {{$t('KEY-015')}} {{
              item.sbillingAmount || 0 }}
              TRX</span>
          </div>
        </div>
      </DashBord>
    </div>
  </div>
</template>

<script setup>
import DashBord from "@/components/dashbord-content.vue";
import { copy } from "@/utils/utils/index.js";
import { createAPIKEY } from "@/utils/utils/utils-ui.js";
import { getApiList, addApiList, updateApiList, delApiList } from '@/utils/axios/buyer/index.js'
import { onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const apiList = ref([]);

const copyEnd = (msg) => {
  copy({
    msg,
    callback: () => {
      ElMessage.success(t('ReplicatingSuccess'));
    },
  });
};

const deleteApikey = (item) => {
  ElMessageBox.confirm(
    t('KEY-006'),
    t('KEY-005'),
    {
      confirmButtonText: t('OK'),
      cancelButtonText: t('Cancel'),
      type: 'warning',
    }
  )
    .then(async () => {
      const data = await delApiList({ apikey: item.apiKey })
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

const edit = (item) => {
  ElMessageBox.prompt("", t('KEY-009'), {
    confirmButtonText: t('KEY-010'),
    inputErrorMessage: "Invalid Email",
    inputPlaceholder: t('KEY-016'),
    showCancelButton: false,
    inputValue: item.keyName,
    beforeClose: async (a, b, done) => {
      if (a === "confirm") {
        const data = await updateApiList({
          keyName: b.inputValue,
          id: item.id
        });
        ElMessage.success(data.msg);
        if (data.code === 12000) {
          searchApi();
          done();
        }
      } else {
        done();
      }
    },
  });
};

const createApi = () => {
  if (apiList.value.length >= 3) {
    ElMessage.error(t('KEY-004'))
    return;
  }
  createAPIKEY(() => {
    searchApi();
  });
}
const searchApi = async () => {
  const data = await getApiList("/buyer/user/apikeys");
  if (data.code === 12000) {
    apiList.value = data.data;
  }
}

onMounted(() => {
  searchApi();
})
</script>
<style scoped>
.api-key {
  text-align: end;
  padding: 16px 0;
}

.api-key-content {
  margin-top: 20px;
}

.api-key-content-header {
  height: 38px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.api-key-content-header-left {
  font-size: 16px;
  height: 100%;
  line-height: 38px;
}

.api-key-content-header-left-title {
  margin-right: 15px;
}

.api-key-content-header-left-edit {
  font-size: 14px;
  color: #c53027;
  cursor: pointer;
}

.recharge-content-address-icon {
  cursor: pointer;
}

.api-key-content-header-left-title-color {
  color: #707582;
  font-size: 15px;
}

.api-key-content-header-body {
  width: 100%;
  background: #f4f8ff;
  border-radius: 6px;
  margin-top: 30px;
  text-align: start;
  box-sizing: border-box;
  padding-left: 20px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.api-key-content-header-body-item {
  height: 32px;
  padding: 10px 0;
  font-size: 15px;
}

.api-key-content-header-body-item-key {
  text-align: right;
  width: 80px;
  height: 32px;
  color: black;
}

.api-key-content-header-body-item-value {
  margin-left: 15px;
  color: #266ef1;
}
</style>
