<template>
  <main class="main-wrapper">
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
      <section class="transaction-mean-wrapper section transaction-mean">
        <h2 class="title">多种交易方式</h2>
        <div class="means">
          <a href="/" class="mean">
            <div class="mean-content">
              <img
                src="@/assets/home/transaction-mean.svg"
                alt=""
                class="transaction-img"
              />
              <div class="card">
                <div class="card-content">
                  <h3 class="name">
                    <strong>自助</strong>&nbsp;交易
                    <i class="tip-icon"></i>
                  </h3>
                  <ul class="feature-list">
                    <li>灵活选择，可自定义单价/天</li>
                    <li>价格更优，单价最低70sun/天</li>
                    <li>支持手机DAPP浏览器使用</li>
                    <li>支持能量、带宽批量交易</li>
                    <li>卖家可赚取交易费</li>
                  </ul>
                </div>
              </div>
              <div class="card">
                <div class="card-content">
                  <h3 class="name">
                    <strong>快捷</strong>&nbsp;交易
                    <i class="tip-icon"></i>
                  </h3>
                  <ul class="feature-list">
                    <li>租期更长，最长30天</li>
                    <li>范围更大，1万起租</li>
                    <li>快速租用，能量秒到账</li>
                    <li>支持多币种支付购买</li>
                    <li>支持DAPP浏览器使用</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="go-btn">立即交易</div>
          </a>
        </div>
      </section>
      <section id="introduce" class="introduce-wrapper section introduce">
        <h2 class="title">Feee.io 介绍</h2>
        <div class="main">
          <div class="keywords">
            <div class="item">
              <img src="@/assets/home/gas-key-economy.svg" alt="" />
              <strong>经济</strong>
            </div>
            <div class="item">
              <img src="@/assets/home/gas-key-safety.svg" alt="" />
              <strong>安全</strong>
            </div>
            <div class="item">
              <img src="@/assets/home/gas-key-efficient.svg" alt="" />
              <strong>安全</strong>
            </div>
          </div>
          <p class="intro">
            feee.io
            是波场生态中的能量交易平台,我们的宗旨是为波场交易者降低能量消耗所需燃烧的费用,优惠力度更大,更安全且高效的能量B2C和C2C交易服务。
          </p>
          <ul class="feature-list">
            <li>解决 TRX 手续费支出过多问题</li>
            <li>API&手工&转账多种租赁方式</li>
            <li>能量秒到账,手续费直降88%</li>
            <li>闲置 TRX 可以赚取能量交易佣金</li>
            <li>流程快捷方便,只需接收地址即可获取能量</li>
            <li>专业客服及技术团队,为用户运营保驾护航</li>
            <li>适用 USDT,合约转账,部署合约,部署NFT</li>
            <li>Tron 波场用户必备省钱专家</li>
          </ul>
        </div>
      </section>
      <section id="faq" class="faq-wrapper section faq">
        <h2 class="title">FAQ</h2>
        <div class="main">
          <ul class="faq-list">
            <li><a href="/">什么是能量？能量是免费的吗？</a></li>
            <li><a href="/">能量有什么用？</a></li>
            <li><a href="/">如何获得能量？</a></li>
            <li><a href="/">如何租用能量？</a></li>
            <li><a href="/">支付成功后，能量什么时候到账？</a></li>
            <li><a href="/">能量使用后多久能恢复满？</a></li>
            <li><a href="/">订单可以撤回吗？</a></li>
          </ul>
        </div>
      </section>
      <api-box class="section"></api-box>
    </div>
    <a class="tg-robot-wrapper tg-robot" href="" target="_blank">
      <img src="@/assets/logo/logo.svg" alt="" class="icon" />
      <p class="title">TG机器人</p>
      <p class="features" style="margin-bottom: 5px">能量 | 兑换</p>
      <p class="features">查询 | 监控</p>
    </a>
    <div class="to-top-wrapper to-top">
      <img src="@/assets/logo/logo.svg" alt="" class="icon" />
    </div>
    <a class="customer-wrapper customer" href="http://" target="_blank">
      <img src="@/assets/logo/logo.svg" alt="" class="icon" />
      <p class="title">在线客服</p>
    </a>
  </main>
</template>

<script setup></script>

<style lang="less" scoped>
.main-wrapper {
  min-height: calc(100vh - 170px);
  .page {
    padding-bottom: 30px;
    .section {
      margin-bottom: 100px;
    }
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
  .transaction-mean-wrapper {
    margin: 0 auto;
    max-width: 1300px;
    width: calc(100% - 30px);
    background-color: #fff;
    h2.title {
      line-height: 55px;
      text-align: center;
      background-color: #17275f;
      font-size: 20px;
      color: #fff;
    }
    .means {
      display: flex;
      box-shadow: 0 0 20px #00000012;
      .mean {
        --scale: 1;
        --img-width: calc(165px * var(--scale));
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 50px;
        transform: scale(1);
        transition: box-shadow 0.2s;
        box-shadow: 0 0 #0000004d;
        &:hover {
          box-shadow: 0 0 20px #294aa54d;
        }
        .mean-content {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          justify-items: center;
          .card {
            .name {
              display: flex;
              justify-content: left;
              align-items: center;
              margin-bottom: 20px;
              font-size: calc(32px * var(--scale));
              strong {
                font-weight: inherit;
                color: #294aa5;
              }
              .tip-icon {
                display: block;
                width: 50px;
                height: 1em;
              }
            }
            .feature-list {
              margin: 20px 0;
              padding-left: 18px;
              list-style: disc;
              font-size: calc(18px * var(--scale));
              color: #000;
              width: 100%;
              li {
                margin: 5px 0;
                line-height: 1.4em;
                &::marker {
                  color: #294aa5;
                }
              }
            }
          }
        }
        .transaction-img {
          height: calc(240px * var(--scale));
        }
        .go-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          align-self: center;
          padding: 0.6em 1em;
          width: 300px;
          height: 40px;
          background-color: #294aa5;
          border-radius: 5px;
          color: #fff;
        }
      }
    }
  }
}
.introduce-wrapper {
  margin: 0 auto;
  max-width: 1300px;
  width: calc(100% - 30px);
  h2.title {
    text-align: center;
    font-size: 22px;
    line-height: 70px;
  }
  .main {
    margin: 0 auto;
    padding: 50px;
    max-width: 1300px;
    background-color: #fff;
    box-shadow: 0 0 20px #00000012;
  }
  .keywords {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 35px;
    .item {
      strong {
        display: block;
        margin-top: 5px;
        text-align: center;
        font-weight: 400;
      }
    }
  }
  .intro {
    margin: 35px 0;
    line-height: 1.4em;
    text-align: center;
    color: #707582;
  }
  .feature-list {
    -moz-columns: 2;
    columns: 2;
    -moz-column-rule: 1px dashed #d4ddf1;
    column-rule: 1px dashed #d4ddf1;
    -moz-column-gap: 8em;
    column-gap: 8em;
    li {
      margin-left: 22px;
      list-style: disc url('@/assets/home/dart-1.svg');
      margin-bottom: 10px;
      line-height: 1.4em;
      &:before {
        content: ' ';
      }
    }
  }
}
.faq-wrapper {
  margin: 0 auto;
  max-width: 1300px;
  width: calc(100% - 30px);
  h2.title {
    text-align: center;
    font-size: 22px;
    line-height: 70px;
  }
  .main {
    padding: 30px 50px;
    background-color: #f4f8fe;
    border: 1px dashed #c8d0df;
  }
  .faq-list {
    -moz-columns: 3;
    columns: 3;
    li {
      margin-left: 20px;
      margin-bottom: 14px;
      line-height: 1.4em;
      list-style: disc url('@/assets/home/doc-s1.svg');
      a {
        color: #121c41;
        &:hover {
          color: #266ef1;
        }
      }
    }
  }
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
}
.to-top-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 10px #00000026;
  cursor: pointer;
  .icon {
    color: #2a4da0;
  }
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
