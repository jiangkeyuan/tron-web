<template>
  <Header @itemClick="itemClick"></Header>
  <main class="main">
    <router-view></router-view>
    <a class="tg-robot-wrapper tg-robot" href="" target="_blank">
      <img src="@/assets/logo/logo.svg" alt="" class="icon" />
      <p class="title">TG机器人</p>
      <p class="features" style="margin-bottom: 5px">能量 | 兑换</p>
      <p class="features">查询 | 监控</p>
    </a>
    <!-- <div class="to-top-wrapper to-top">
      <img src="@/assets/logo/logo.svg" alt="" class="icon" />
       
    </div> -->
    <el-backtop class="to-top" :right="25" bottom="" />
    <a class="customer-wrapper customer" href="http://" target="_blank">
      <img src="@/assets/logo/logo.svg" alt="" class="icon" />
      <p class="title">在线客服</p>
    </a>
  </main>
  <Footer></Footer>
  <recommend-popup-wrapper
    :show="recommendDialogVisible"
    @close="recommendDialogClose"
  ></recommend-popup-wrapper>
  <cooperation-popup-wrapper
    :show="cooperationDialogVisible"
    @close="cooperationDialogClose"
  >
  </cooperation-popup-wrapper>
</template>

<script setup>
// const handleSelect = (key, keyPath) => {
//   console.log(key, keyPath)
// }
const recommendDialogVisible = ref(false)
const cooperationDialogVisible = ref(false)
const router = useRouter()
const itemClick = ({ key }) => {
  console.log(key)
  switch (key) {
    case '2-1':
      router.push('/c2c')
      break
    case '2-2':
      router.push('/b2c')
      break
    case '4':
      recommendDialogVisible.value = true
      break
    case '5':
      router.push('/announcement')
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
<style lang="less" scoped>
.main {
  min-height: calc(100vh - 170px);
}
.tg-robot {
  bottom: calc(15% + 100px);
}
.tg-robot-wrapper {
  display: block;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #00000026;
  text-align: center;
  background-image: linear-gradient(#266ef1, #2a47ab);
  color: #fff;
  transition: all 0.2s;
  .icon {
    width: 34px;
    height: 34px;
  }
  .title {
    margin: 10px 0;
  }
  .features {
    text-align: center;
    font-size: 14px;
    opacity: 0.7;
  }
}
.to-top {
  bottom: calc(15% - 80px);
  width: 60px;
  height: 60px;
}
.customer {
  bottom: 15%;
}
.customer-wrapper {
  display: block;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #00000026;
  text-align: center;
  .icon {
    margin-bottom: 10px;
    width: 34px;
    height: 34px;
  }
  .title {
    color: #000;
  }
}
</style>
<style>
:global(.el-dialog__header) {
  padding: 0;
  margin: 0;
}
</style>
