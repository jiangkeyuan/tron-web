<template>
  <el-dialog
    v-model="props.show"
    title="出售能量"
    width="450px"
    center
    :before-close="handleClose"
  >
    <div class="content">
      <div class="sum">
        <div class="header">
          <div class="left">
            <div class="title">出售能量数量</div>
            <div class="range">(100,000~158,113,342)</div>
          </div>
          <div class="right">
            <div class="max-btn">最大值</div>
          </div>
        </div>
        <el-input
          v-model="input2"
          class="w-50 m-2"
          placeholder="Type something"
          :prefix-icon="Search"
        />
      </div>
      <div class="address">
        <span class="subheading">收款地址</span>
        <el-input
          v-model="input"
          class="w-50 m-2"
          placeholder="Type something"
          :prefix-icon="Search"
        />
      </div>
      <div class="sell-info">
        <div class="balance">
          <div class="label">
            <span class="title">您的余额</span>
            <div class="icon">
              <span
                role="img"
                aria-label="question-circle"
                tabindex="-1"
                class="anticon anticon-question-circle"
                ><svg
                  focusable="false"
                  class=""
                  data-icon="question-circle"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="64 64 896 896"
                >
                  <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                  ></path>
                  <path
                    d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"
                  ></path></svg></span
              ><span>：</span>
            </div>
          </div>
          <div class="value">
            <span>0</span><span class="unit">TRX</span
            >
          </div>
        </div>
        <div class="freeze balance">
          <div class="label">
            <span class="title">冻结</span>
            <div class="icon">
              <!----><span
                role="img"
                aria-label="question-circle"
                tabindex="-1"
                class="anticon anticon-question-circle"
                ><svg
                  focusable="false"
                  class=""
                  data-icon="question-circle"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="64 64 896 896"
                >
                  <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                  ></path>
                  <path
                    d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"
                  ></path></svg></span
              ><span>：</span>
            </div>
          </div>
          <div class="value">
            <span>5,918</span><span class="unit">TRX</span>
          </div>
        </div>
        <div class="freeze-time balance">
          <div class="label">
            <span class="title">冻结时间</span>
            <div class="icon">
              <!----><span
                role="img"
                aria-label="question-circle"
                tabindex="-1"
                class="anticon anticon-question-circle"
                ><svg
                  focusable="false"
                  class=""
                  data-icon="question-circle"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="64 64 896 896"
                >
                  <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                  ></path>
                  <path
                    d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"
                  ></path></svg></span
              ><span>：</span>
            </div>
          </div>
          <div class="value"><span>3</span><span class="unit">天</span></div>
        </div>
        <div class="profit balance">
          <div class="label">
            <span class="title">收入</span>
            <div class="icon">
              <span
                role="img"
                aria-label="question-circle"
                tabindex="-1"
                class="anticon anticon-question-circle"
                ><svg
                  focusable="false"
                  class=""
                  data-icon="question-circle"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="64 64 896 896"
                >
                  <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                  ></path>
                  <path
                    d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"
                  ></path></svg></span
              ><span>：</span>
            </div>
          </div>
          <div class="value">
            <span>23.625</span><span class="unit">TRX</span>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose" class="btn cancel">取消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false" class="btn cancel">
          出售
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// import { ref, defineProps, defineEmits } from 'vue'
import { Search } from '@element-plus/icons-vue'
const emit = defineEmits(['close'])
const props = defineProps({
  show: {
    type: Boolean
  }
})
const input2 = ref('')
const input = ref('')
const handleClose = () => {
  emit('close')
}
</script>

<style lang="less" scoped>
.sum {
    margin-bottom: 24px;
  .header {
    display: flex;
    margin-bottom: 5px;
    justify-content: space-between;
    .left {
      display: flex;
      flex-wrap: wrap;
      .title {
        flex: none;
      }
    }
    .right {
      .max-btn {
        white-space: nowrap;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
.address {
  .subheading {
    display: inline-block;
    margin: 5px 0;
  }
}
.sell-info {
  background-color: #f6f6f6;
  color: #707582;
  padding: 20px;
  margin: 10px 0;
  .balance {
    display: flex;
    align-items: center;
    margin: 3px 0;
  }
  .label {
    width: 110px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
    width: 70px;
    display: inline-block;
    -moz-text-align-last: justify;
    text-align-last: justify;
    text-align: justify;
    white-space: nowrap;
}
.unit{
    margin-left: 5px;
}
.icon{
    margin: 0 5px;
}
  }
}
.anticon{
    cursor: pointer;
}
.dialog-footer  {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .btn {
    width: 47%;
    border-radius: 6px;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
}
</style>
