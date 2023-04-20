<template>
  <section class="api-box api-plate light">
    <h2 class="title">API自动租用</h2>
    <div class="text">
      使用API自动化购买波场能量、带宽，API租用更省心、更快捷、更安全
    </div>
    <p>
      <a href="/#/console/buyer/api-key" target="_blank">
        <img src="@/assets/logo/logo.png" alt="" class="icon" v-if="props.effect" />
        <img src="@/assets/logo/logo3.png" alt="" class="icon" v-else />
        申请使用
      </a>
    </p>
    <p class="text">
      如需其他服务可
      <a href="https://t.me/tron_hashgo" target="_blank"> 咨询客服 </a>
    </p>
  </section>
</template>

<script setup>
const props = defineProps({
  effect: Boolean,
})
</script>

<style lang="less" scoped>
.api-box {
  margin: 0 auto;
  max-width: 1300px;
  width: calc(100% - 30px);
  text-align: center;
  font-size: 16px;

  .title {
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .text {
    text-align: center;

    line-height: 1.4em;
  }

  p {
    margin-top: 15px;
  }

  .icon {
    height: 30px;
    margin-right: 10px;
  }
}
.light {
  .text {
    color: #707582;
  }
  a {
    color: @color;
  }
  .icon {
    color: @color;
  }
}
.dark {
  .text {
    color: #fdc2b1;
  }
  a {
    color: #ffd04b;
  }
  .icon {
    color: #ffd04b;
  }
}
</style>
