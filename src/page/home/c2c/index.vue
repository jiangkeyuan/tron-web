<template>
  <div class="c2c-container">
    <div class="c2c-content">
      <div class="container">
        <div class="wrapper">
          <i class="img">1</i>
          <span class="content">
            <el-carousel
              height="2em"
              direction="vertical"
              indicator-position="none"
              :autoplay="true"
            >
              <el-carousel-item v-for="item in systemMsg" :key="item.id">
                {{ item.title }}
              </el-carousel-item>
            </el-carousel>
          </span>
        </div>
      </div>
      <div class="current-order-container">
        <div class="custom-round-tab">
          <div class="tablist">
            <el-tabs type="border-card" class="demo-tabs">
              <el-tab-pane>
                <template #label>
                  <span class="custom-tabs-label">
                    <el-icon><calendar /></el-icon>
                    <span>Route</span>
                  </span>
                </template>
                Route
              </el-tab-pane>
              <el-tab-pane label="Config">Config</el-tab-pane>
              <el-tab-pane label="Role">Role</el-tab-pane>
              <el-tab-pane label="Task">Task</el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Calendar } from '@element-plus/icons-vue'
const systemMsg = reactive([
  {
    id: 1,
    title:
      '2月17日更新：下单可购买超1亿能量；显示订单完成进度；出售可自定义资源数量！'
  },
  {
    id: 2,
    title:
      '2月17日更新：下单可购买超1亿能量；显示订单完成进度；出售可自定义资源数量！'
  },
  {
    id: 3,
    title:
      '2月17日更新：下单可购买超1亿能量；显示订单完成进度；出售可自定义资源数量！'
  }
])
</script>

<style lang="less" scoped>
.c2c-container {
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
}
.c2c-content {
  margin: auto;
  width: 100%;
  max-width: 1400px;
}
.container {
  margin: 42px 0;
  padding: 0 50px;
  .wrapper {
    border-radius: 3px;
    background-color: #e3edfe;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    .img {
      margin-right: 15px;
    }
    .content {
      flex: 1;
      overflow: hidden;
      line-height: 2em;
    }
  }
}
.current-order-container {
  padding: 0 50px;
  .custom-round-tab {
    --button-gap: 40px;
    --radius: calc(var(--button-gap) / 2);
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
  }
}
</style>
