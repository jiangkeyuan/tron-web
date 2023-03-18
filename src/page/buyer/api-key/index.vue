<template>
  <div class="api-key">
    <el-button
      class="api-key-button"
      type="primary"
      v-if="apiList.length !== 0"
      @click="createAPIKEY"
      >创建API密钥</el-button
    >

    <div class="api-key-content" v-if="apiList.length === 0">
      <DashBord>
        <div class="api-key-content-header">
          <div class="api-key-content-header-left">
            <span class="api-key-content-header-left-title">API密钥(0/3)</span>
          </div>
          <div class="api-key-content-header-left">
            <span
              class="api-key-content-header-left-title api-key-content-header-left-title-color"
              >如何使用API?</span
            >
            <el-button class="api-key-button" type="primary" @click="createApi"
              >创建API密钥</el-button
            >
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
            <span class="api-key-content-header-left-title">1111</span>
            <span
              class="api-key-content-header-left-edit"
              @click="() => edit(item)"
              >编辑</span
            >
          </div>
          <div class="api-key-content-header-left">
            <span
              class="api-key-content-header-left-title api-key-content-header-left-title-color"
              >e7311742-6980-4959-825d-f3e20b7cf4ed</span
            >
            <el-icon
              size="15"
              @click="copyEnd"
              class="recharge-content-address-icon"
              color="#294aa5"
              ><CopyDocument
            /></el-icon>
          </div>
        </div>

        <div class="api-key-content-header-body">
          <div class="api-key-content-header-body-item">
            <span class="api-key-content-header-body-item-key">今日租用:</span>
            <span class="api-key-content-header-body-item-value"
              >0 能量 / 消耗 0 TRX</span
            >
          </div>

          <div class="api-key-content-header-body-item">
            <span class="api-key-content-header-body-item-key">今日租用:</span>
            <span class="api-key-content-header-body-item-value"
              >0 能量 / 消耗 0 TRX</span
            >
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
const apiList = ref([
  {
    id: 169,
    user_id: 895,
    name: "765432",
    key: "d4f98bf8-59f9-4b95-a824-c94f133f8969",
    used: 0,
    quota: 0,
    qps: 5,
    energy_surplus: 0,
    bandwidth_surplus: 0,
    today_consume_trx_amount: 0,
    today_energy_value: 0,
    today_bandwidth_value: 0,
    yesterday_consume_trx_amount: 0,
    yesterday_energy_value: 0,
    yesterday_bandwidth_value: 0,
    all_consume_trx_amount: 0,
    all_energy_value: 0,
    all_bandwidth_value: 0,
    create_time: 1678441934,
    status: 1,
  },
]);

const copyEnd = (msg) => {
  copy({
    msg,
    callback: () => {
      ElMessage.success("复制成功");
    },
  });
};

const edit = (item) => {
  ElMessageBox.prompt("", "请输入Key的名称，以便区分统计", {
    confirmButtonText: "创建KEY",
    inputErrorMessage: "Invalid Email",
    inputPlaceholder: "请输入内容",
    showCancelButton: false,
    inputValue: item.name,
    beforeClose: (a, b, done) => {
      if (a === "confirm") {
        done();
      }
    },
  });
};
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
