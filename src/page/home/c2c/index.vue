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
            <div class="right-extra">
              <div class="btns">
                <span class="buy">
                  <i class="img"></i>
                  购买
                </span>
                <div class="center"></div>
                <span class="seller">
                  <i class="img"></i>
                  出售
                </span>
              </div>
              <el-button
                class="btn-vote"
                type="primary"
                size="large"
                plain
                :icon="Histogram"
                >投票</el-button
              >
              <el-select
                v-model="value"
                class="m-2"
                placeholder="Select"
                size="large"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <el-tabs type="border-card" class="demo-tabs">
              <el-tab-pane label="自助交易">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="date" label="收入" width="180" />
                  <el-table-column prop="name" label="最低收入" width="180" />
                  <el-table-column prop="address" label="冻结时间" />
                  <el-table-column fixed="right" label="操作" width="120">
                    <template #default>
                      <el-button
                        link
                        type="primary"
                        size="small"
                        >出售</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="快捷交易" style="text-align: center;">
                <el-link type="primary">正在跳转至快捷交易界面</el-link>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div class="history-order-container">
          <div class="custom-round-tab">
          <div class="tablist">
            <el-tabs type="border-card" class="demo-tabs">
              <el-tab-pane label="自助交易">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="date" label="收入" width="180" />
                  <el-table-column prop="name" label="最低收入" width="180" />
                  <el-table-column prop="address" label="冻结时间" />
                  <el-table-column fixed="right" label="操作" width="120">
                    <template #default>
                      <el-button
                        link
                        type="primary"
                        size="small"
                        >出售</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="快捷交易" style="text-align: center;">
                <el-link type="primary">正在跳转至快捷交易界面</el-link>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <api-box class="api"></api-box>
    </div>
  </div>
</template>

<script setup>
import { Calendar, Histogram } from '@element-plus/icons-vue'
const value = ref('Option2')
const options = [
  {
    value: 'Option1',
    label: '最新'
  },
  {
    value: 'Option2',
    label: '单价最高'
  },
  {
    value: 'Option3',
    label: '收入最高'
  },
  {
    value: 'Option4',
    label: '能量最高'
  }
]
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
  .right-extra {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 22px;
    .btns {
      font-weight: 550;
      display: flex;
      align-items: center;
      background-color: #294aa5;
      border-radius: 5px;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      .buy,
      .seller {
        display: flex;
        align-items: center;
        padding: 10px 16px;
        .img {
          height: 20px;
        }
      }
      .center {
        width: 1px;
        height: 16px;
        background-color: #3365bc80;
      }
    }
    .btn-vote {
      margin: 0 14px;
    }
  }
}
.history-order-container{
    margin-top: 50px;
    padding: 0 50px;
}
.api {
    margin-top: 60px;
}
</style>
<style lang="less">
.right-extra {
  .el-select {
    .el-input {
      width: 130px;
    }
  }
}
</style>
