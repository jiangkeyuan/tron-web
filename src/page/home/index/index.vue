<template>
  <main class="main">
    <div class="page">
      <div class="banner-wrapper">
        <div class="lg-screen">
          <div class="inner">
            <div class="bg"></div>
            <div class="d3">
              <h1 class="name">TRON能量交易平台</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>

</script>

<style lang="less" scoped>
.main {
  min-height: calc(100vh - 170px);
  .page {
    padding-bottom: 30px;
  }
  .banner-wrapper {
    --bottom-margin: -110px;
    margin-bottom: var(--bottom-margin);
    background-color: #121e42;
    color: #fff;
    .lg-screen {
      margin: 0 auto;
      max-width: 1300px;
      height: 600px;
      overflow: hidden;
      .inner {
        position: relative;
        height: calc(100% + var(--bottom-margin));
      }
      .bg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-family: sans-serif;
        font-size: 200px;
        font-weight: bolder;
        background: radial-gradient(circle, #0a339a, #fff);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        &:after {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          content: '';
          width: 100%;
          height: 100%;
          background: radial-gradient(
            ellipse closest-side at center,
            #00196b,
            rgba(255, 255, 255, 0)
          );
        }
      }
      .d3 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .name {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 800px;
        text-align: center;
        font-size: 50px;
        color: #fff;
      }
    }
  }
}
</style>
