<template>
  <el-dialog
    v-model="props.show"
    title=""
    width="500px"
    :before-close="handleClose"
  >
    <div class="recommend-popup-wrapper">
      <img src="@/assets/home/recommend-popup.png" alt="" class="img" />
      <h2 class="title">推荐奖励</h2>
      <p class="tip">
        推荐成功后，能量交易永久享受 3% 返佣，闪兑交易永久享受 1% 返佣
      </p>
      <a class="to-login-btn" href="http://" target="_blank"> 获取推荐链接 </a>
      <div class="recommend-link">
        <p>推广链接：https://feee.io/?ic=TS7U</p>
        <span class="copy-btn-wrapper">
          <div class="btn">
            <div class="copy-btn">复制</div>
          </div>
        </span>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
// import { ref, defineProps, defineEmits } from 'vue'
const emit = defineEmits(['close'])
const props = defineProps({
  show: {
    type: Boolean,
  }
})
const handleClose = () => {
    emit('close', false)
}
</script>

<style lang="less" scoped>
.recommend-popup-wrapper {
  padding: 10px 30px;
  .img {
    display: block;
    margin: 0 auto;
    width: 260px;
    height: 180px;
  }
  .title {
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
  }
  .tip {
    font-size: 1rem;
    margin-bottom: 20px;
  }
  .to-login-btn {
    display: block;
    width: 100%;
    border-radius: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #294aa5;
    font-size: 1rem;
    color: #fff;
  }
  .recommend-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px dashed #c8d0df;
    .copy-btn {
      padding: 0 0.5em;
      border-radius: 5px;
      border: 1px solid #c8d0df;
      white-space: nowrap;
    }
  }
}
.copy-btn-wrapper {
  display: inline-block;
  color: inherit;
  .btn {
    display: flex;
    align-items: center;
    color: inherit;
    cursor: pointer;
  }
}
</style>
