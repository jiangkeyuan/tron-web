<template>
  <div class="api-key">
    <el-button class="api-key-button" type="primary" v-if="apiList.length !== 0" @click="createApi">创建API密钥</el-button>

    <div class="api-key-content" v-if="apiList.length === 0">
      <DashBord>
        <div class="api-key-content-header">
          <div class="api-key-content-header-left">
            <span class="api-key-content-header-left-title">API密钥(0/3)</span>
          </div>
          <div class="api-key-content-header-left">
            <span class="api-key-content-header-left-title api-key-content-header-left-title-color">如何使用API?</span>
            <el-button class="api-key-button" type="primary" @click="createApi">创建API密钥</el-button>
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

    <div class="api-key-content" v-for="item in apiList">
      <DashBord>
        <div class="api-key-content-header">
          <div class="api-key-content-header-left">
            <span class="api-key-content-header-left-title">{{ item.keyName }}</span>
            <span class="api-key-content-header-left-edit" @click="() => edit(item)">编辑 </span>
            <span class="api-key-content-header-left-edit" @click="() => deleteApikey(item)"> 删除</span>
          </div>
          <div class="api-key-content-header-left">
            <span class="api-key-content-header-left-title api-key-content-header-left-title-color">{{ item.apiKey
            }}</span>
            <el-icon size="15" @click="() => copyEnd(item.apiKey)" class="recharge-content-address-icon" color="#294aa5">
              <CopyDocument />
            </el-icon>
          </div>
        </div>

        <div class="api-key-content-header-body">
          <div class="api-key-content-header-body-item">
            <span class="api-key-content-header-body-item-key">今日租用:</span>
            <span class="api-key-content-header-body-item-value">{{ item.rentalEnergy || 0 }} 能量 / 消耗 {{ item.usedAmount
              || 0 }}
              TRX</span>
          </div>

          <div class="api-key-content-header-body-item">
            <span class="api-key-content-header-body-item-key">昨日租用:</span>
            <span class="api-key-content-header-body-item-value">{{ item.billingEnergy || 0 }} 能量 / 消耗 {{
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
const apiList = ref([]);

const copyEnd = (msg) => {
  copy({
    msg,
    callback: () => {
      ElMessage.success("复制成功");
    },
  });
};

const deleteApikey = (item) => {
  ElMessageBox.confirm(
    '是否删除当前的API KEY',
    '警告',
    {
      confirmButtonText: '好的',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      const data = await delApiList({ apikey: item.apiKey })
      if (data.code == 12000) {
        searchApi();
        ElMessage({
          type: 'success',
          message: '删除成功',
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
  ElMessageBox.prompt("", "请输入Key的名称，以便区分统计", {
    confirmButtonText: "确定",
    inputErrorMessage: "Invalid Email",
    inputPlaceholder: "请输入内容",
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
    ElMessage.error('API KEYS最多只能三条')
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
  color: #294aa5;
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
