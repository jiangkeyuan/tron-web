<template>
  <el-dialog
    v-model="props.show"
    title=""
    width="350px"
    :z-index="1000"
    :before-close="handleClose"
  >
    <div class="tron-link-pc-popup-wrapper">
      <img src="@/assets/home/tron-link-1.png" alt="" class="tron-img" />
      <el-button type="primary" class="link-btn" @click="handleLinkTron"
        >连接钱包</el-button
      >
      <p class="tip">
        没安装TronLink?
        <a
          href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec"
          target="_blank"
          rel="noopener noreferrer"
          >去安装<el-icon><Download /></el-icon
        ></a>
      </p>
    </div>
  </el-dialog>
</template>

<script setup>
import { Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const emit = defineEmits(['close'])
const props = defineProps({
  show: {
    type: Boolean
  },
  remove: {
    type: Function,
    default: null
  }
})

const handleClose = () => {
  props.remove()
}
const handleLinkTron = async () => {
  if (!window.tronLink) {
    return ElMessage({
      message: '请安装 TronLink 钱包',
      type: 'warning'
    })
  }
//   console.log('请安装 TronLink 钱包')
  const isRead = await window.tronLink.request({
    method: "tron_requestAccounts",
  });
}
</script>

<style lang="less" scoped>
.tron-link-pc-popup-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  .tron-img {
    width: 90px;
    height: auto;
  }
  .link-btn {
    margin: 30px 0 15px;
    width: 100%;
  }
}
</style>
