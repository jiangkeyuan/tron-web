<template>
  <el-dialog v-model="props.show" width="400px" :before-close="handleClose">
    <div class="cooperation-popup-wrapper">
      <h2 class="title">招募商务合作伙伴</h2>
      <p class="tip">
        如果您长期持有大量闲置TRX，可联系官方客服，加入我们自动化出售能量以获得收入，详情请联系
      </p>
      <div class="contact-ways">
        <p class="tg">
          <img src="@/assets/logo/logo2.png" alt="" class="icon" />
          @email_hashgo
        </p>
        <p class="email">
          邮箱：<a href="mailto:email_hashgo@hashgo.xyz">email_hashgo@hashgo.xyz</a>
        </p>
      </div>
      <a href="https://t.me/tron_hashgo" class="tg-contact-btn" target="_blank">联系客服</a>
    </div>
  </el-dialog>
</template>

<script setup>
// import { ref, defineProps, defineEmits } from 'vue'
const emit = defineEmits(['close'])
const props = defineProps({
  show: {
    type: Boolean
  }
})
const handleClose = () => {
  emit('close', false)
}
</script>

<style lang="less" scoped>
.cooperation-popup-wrapper {
  .title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }

  .tip {
    font-size: 1rem;
  }

  .contact-ways {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 0;
    padding: 24px;
    background-color: #f4f8ff;
    border-radius: 10px;
    border: 1px dashed #c8d0df;

    .tg {
      display: flex;
      align-items: center;
      font-size: 1rem;
    }

    .email {
      font-size: 1rem;
    }
  }

  .tg-contact-btn {
    display: inline-block;
    font-size: 1rem;
    text-align: center;
    line-height: 50px;
    background-color: #c53027;
    width: 100%;
    border-radius: 10px;
    color: #fff;
  }
}</style>
