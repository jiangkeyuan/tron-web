<template>
  <el-dialog v-model="dialogTableVisible" center title="完善账号信息" append-to-body>
    <div class="bind-emails">
      <span class="bind-emails-1">邮箱</span>
      <span class="bind-emails-2">支持账号登录，可找回账号</span>
      <span class="bind-emails-3" @click="showEmailsDialog = true">绑定</span>
    </div>
    <p class="bind-emails-tips" @click="tips">跳过，以后再设置</p>
    <div v-if="showEmailsDialog">
      <Bind-emails-input :callBack="showInput"></Bind-emails-input>
    </div>
  </el-dialog>
</template>
<script setup>
const dialogTableVisible = ref(true);
const showEmailsDialog = ref(false);
const props = defineProps({
  callback: Function
})
const tips = () => {
  localStorage.setItem('date', new Date().getTime())
  dialogTableVisible.value = false;
}

const showInput = () => {
  console.log(1);
  showEmailsDialog.value = false;
  dialogTableVisible.value = false
}
</script>

<style scoped>
.bind-emails {
  width: 90%;
  height: 40px;
  background: #eeeeee;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: 14px;
}

.bind-emails-1 {
  color: #000000;
}

.bind-emails-2 {
  color: #000000;
  text-align: start;
}

.bind-emails-3 {
  color: #294aa5;
  cursor: pointer;
}

.bind-emails-tips {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
}
</style>
