<template>
  <Header @itemClick="itemClick"></Header>
  <router-view></router-view>
  <Footer></Footer>
  <recommend-popup-wrapper
    :show="recommendDialogVisible"
    @close="recommendDialogClose"
  ></recommend-popup-wrapper>
  <cooperation-popup-wrapper :show="cooperationDialogVisible" @close="cooperationDialogClose">
  </cooperation-popup-wrapper>
</template>

<script setup>
// const handleSelect = (key, keyPath) => {
//   console.log(key, keyPath)
// }
const recommendDialogVisible = ref(false)
const cooperationDialogVisible = ref(false)
const itemClick = ({ key }) => {
  console.log(key)
  switch (key) {
    case '4':
      recommendDialogVisible.value = true
      break
    case '7':
      cooperationDialogVisible.value = true
      break
    default:
      break
  }
}
const recommendDialogClose = () => {
  recommendDialogVisible.value = false
}
const cooperationDialogClose = () => {
  cooperationDialogVisible.value = false
}
onMounted(() => {})
</script>
<style>
:global(.el-dialog__header) {
  padding: 0;
  margin: 0;
}
</style>