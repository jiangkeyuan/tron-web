<template>
  <div class="page">
    <div class="banner-wrapper">
      <div class="lg-screen">
        <div class="inner">
          <div class="bg"></div>
          <div class="d3">
            <h1 class="name">{{ $t('HOME-001') }}</h1>
          </div>
        </div>
      </div>
    </div>
    <section class="transaction-mean-wrapper section transaction-mean">
      <h2 class="title">{{ $t('HOME-002') }}</h2>
      <div class="means">
        <a href="/#/c2c" class="mean">
          <div class="mean-content">
            <img
              src="@/assets/home/transaction-mean.png"
              alt=""
              class="transaction-img"
            />
            <div class="card">
              <div class="card-content">
                <h3 class="name">
                  <strong>{{ $t('Freedom') }}</strong
                  >&nbsp;{{ $t('Trading') }}
                  <i class="tip-icon"></i>
                </h3>
                <ul class="feature-list">
                  <li>{{ $t('HOME-004') }}</li>
                  <li>{{ $t('HOME-005') }}</li>
                  <li>{{ $t('HOME-006') }}</li>
                  <li>{{ $t('HOME-007') }}</li>
                  <li>{{ $t('HOME-008') }}</li>
                </ul>
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <h3 class="name">
                  <strong>{{ $t('Fast') }}</strong
                  >&nbsp;{{ $t('Trading') }}
                  <i class="tip-icon"></i>
                </h3>
                <ul class="feature-list">
                  <li>{{ $t('HOME-009') }}</li>
                  <li>{{ $t('HOME-010') }}</li>
                  <li>{{ $t('HOME-011') }}</li>
                  <li>{{ $t('HOME-012') }}</li>
                  <li>{{ $t('HOME-013') }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="go-btn">{{ $t('HOME-003') }}</div>
        </a>
      </div>
    </section>
    <section id="introduce" class="introduce-wrapper section introduce">
      <h2 class="title">Hashgo.xyz {{ $t('HOME-014') }}</h2>
      <div class="main">
        <div class="keywords">
          <div class="item">
            <img src="@/assets/home/gas-key-economy.png" alt="" />
            <strong>{{ $t('HOME-015') }}</strong>
          </div>
          <div class="item">
            <img src="@/assets/home/gas-key-safety.png" alt="" />
            <strong>{{ $t('HOME-016') }}</strong>
          </div>
          <div class="item">
            <img src="@/assets/home/gas-key-efficient.png" alt="" />
            <strong>{{ $t('HOME-017') }}</strong>
          </div>
        </div>
        <p class="intro">
          hashgo.xyz
          {{ $t('HOME-018') }}
        </p>
        <ul class="feature-list">
          <li>{{ $t('HOME-019') }}</li>
          <li>{{ $t('HOME-020') }}</li>
          <li>{{ $t('HOME-021') }}</li>
          <li>{{ $t('HOME-022') }}</li>
          <li>{{ $t('HOME-023') }}</li>
          <li>{{ $t('HOME-024') }}</li>
          <li>{{ $t('HOME-025') }}</li>
          <li>{{ $t('HOME-026') }}</li>
        </ul>
      </div>
    </section>
    <section id="faq" class="faq-wrapper section faq">
      <h2 class="title">FAQ</h2>
      <div class="main">
        <ul class="faq-list">
          <li
            v-for="(item, index) in helpList"
            :key="index"
            @click="toHelp(item.id)"
          >
            <a href="javascript:void(0)">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </section>
    <api-box class="section"></api-box>
  </div>
</template>

<script setup>
const router = useRouter()
const helpList = [
  {
    title: '什么是能量？能量是免费的吗？',
    id: 'q1'
  },
  {
    title: '能量有什么用？',
    id: 'q2'
  },
  {
    title: '如何获得能量？',
    id: 'q3'
  },
  {
    title: '如何租用能量？',
    id: 'q4'
  },
  {
    title: '支付成功后，能量什么时候到账？',
    id: 'q5'
  },
  {
    title: '能量使用后多久能恢复满？',
    id: 'q6'
  },
  {
    title: '订单可以撤回吗？',
    id: 'q7'
  }
]
const toHelp = id => {
  router.push({
    name: 'help',
    params: {
      id: id
    }
  })
}
</script>

<style lang="less" scoped>
.page {
  padding-bottom: 30px;

  .section {
    margin-bottom: 100px;
  }
}

.banner-wrapper {
  --bottom-margin: -110px;
  margin-bottom: var(--bottom-margin);
  //   background-color: @color;
  color: #fff;

  background-image: url('@/assets/home/banner.jpg');

  background-color: @color;
  background-size: 100% 90%;
  background-repeat: no-repeat;
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
    background-color: #b73700;
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
              color: @color;
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
                color: @color;
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
        background-color: @color;
        border-radius: 5px;
        color: #fff;
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
      //   list-style: disc url('@/assets/home/dart-1.png');

      margin-bottom: 10px;
      line-height: 1.4em;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        top: -3px;
        left: -30px;
        background: url('@/assets/home/dart-1.png') no-repeat 100%;
        width: 26px;
        height: 26px;
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
    background-color: #fddfd4;
    border: 1px dashed @color;
  }

  .faq-list {
    -moz-columns: 3;
    columns: 3;

    li {
      margin-left: 20px;
      margin-bottom: 14px;
      line-height: 1.4em;
      //   list-style: disc url('@/assets/home/doc-s1.png');
      position: relative;
      &:before {
        content: '';
        position: absolute;
        top: -3px;
        left: -30px;
        background: url('@/assets/home/doc-s1.png') no-repeat 100%;
        width: 26px;
        height: 26px;
      }

      a {
        color: @color;

        &:hover {
          color: @color;
        }
      }
    }
  }
}
</style>
