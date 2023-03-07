<template>
  <section class="api-box api-plate">
    <h2 class="title">API自动租用</h2>
    <div class="text">
      使用API自动化购买波场能量、带宽，API租用更省心、更快捷、更安全
    </div>
    <p>
      <a href="/" target="_blank">
        <img src="@/assets/logo/logo.svg" alt="" class="icon" />
        申请使用
      </a>
    </p>
    <p class="text">
      如需其他服务可
      <a href="/" target="_blank"> 咨询客服 </a>
    </p>
  </section>
</template>

<script setup></script>

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
    color: #707582;
    line-height: 1.4em;
  }
  p {
    margin-top: 15px;
  }
  a {
    color: #294aa5;
  }
  .icon {
    height: 30px;
    color: #294aa5;
    margin-right: 10px;
  }
}
</style>
