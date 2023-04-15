<template>
  <div class="header-wrapper">
    <div class="inner">
      <a href="/" class="logo logo-wrapper">
        <h1>
          <img src="@/assets/logo/logo.svg" alt="" class="img" />
          <span class="text">Hashgo.xyz</span>
        </h1>
      </a>
      <div class="navigation-wrapper nav">
        <!-- <ul class="nav">
          <li class="item">
            <a class="link" href="/"><span>首页</span></a>
          </li>
          <li class="item">
            <a class="link" href="/c2c">
              <span>能量交易</span>
            </a>
            <ul class="sub-nav">
              <li class="item">
                <a href="/">
                  <span></span>
                </a>
              </li>
            </ul>
          </li>
          <li class="item">
            <a class="link" href=""><span></span></a>
          </li>
          <li class="item">
            <a class="link" href=""><span></span></a>
          </li>
          <li class="item">
            <a class="link" href=""><span></span></a>
          </li>
          <li class="item">
            <a class="link" href=""><span></span></a>
          </li>
          <li class="item">
            <a class="link" href=""><span></span></a>
          </li>
        </ul> -->
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#121e42"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
        >
          <el-menu-item index="1">
            <a href="/"> 首页 </a>
          </el-menu-item>
          <el-sub-menu index="2" popper-class="sub-nav">
            <template #title>能量交易</template>
            <el-menu-item index="2-1">
              <div class="link">
                <div class="sub-link_title">自助交易</div>
                <p class="intro">灵活选择 价格优惠</p>
              </div>
            </el-menu-item>
            <el-menu-item index="2-2">
              <div class="link">
                <div class="sub-link_title">快捷交易</div>
                <p class="intro">租期更长 快速成交</p>
              </div>
            </el-menu-item>
          </el-sub-menu>
          <!-- <el-menu-item index="3">小助手</el-menu-item> -->
          <el-menu-item index="4">推荐奖励</el-menu-item>
          <el-menu-item index="5">平台公告</el-menu-item>
          <el-menu-item index="6">
            <a href="javascript:;">常见问题</a>
          </el-menu-item>
          <el-menu-item index="7">商务合作</el-menu-item>
        </el-menu>
      </div>
      <a class="service-wrapper">
        <img src="@/assets/logo/logo.svg" alt="" class="img" />
      </a>
      <a href="javascript:;" class="user-wrapper" @click="login">
        <span class="account">
          {{ store.state.userInfo?.userInfo?.email  || store.state.userInfo?.userInfo?.walletAddress  || '登录/注册' }}
        </span>
      </a>
      <div class="lang-wrapper">
        <div class="current-lang">
          <span>简体中文</span>
        </div>
        <ul class="lang-options">
          <li class="option">
            <div class="link">English</div>
          </li>
          <li class="option">
            <div class="link">简体中文</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const activeIndex = ref('1')
const activeIndex2 = ref('1')
const emit = defineEmits(['itemClick'])
const handleSelect = (key, keyPath) => {
  emit('itemClick', { key, keyPath })
}
const login = () => {
  if (store.state.userInfo?.userInfo?.email || store.state.userInfo?.userInfo?.walletAddress) {
    return router.push('/console')
  }
  router.push('/auth/login')
}
onMounted(() => {
  store.dispatch('getUserInfoAction')
})
</script>


<style lang="less" scoped>
.header-wrapper {
  position: sticky;
  z-index: 5;
  padding: 0 15px;
  top: 0;
  background-color: @color;
  color: #fff;
  .inner {
    display: grid;
    grid-template-columns: auto 1fr auto auto auto;
    align-items: center;
    margin: 0 auto;
    gap: 10px;
    width: 100%;
    min-height: 70px;
    .logo {
      margin-right: 20px;
      &-wrapper {
        display: block;
        & > h1 {
          display: flex;
          align-items: center;
          color: #fff;
          margin: 0;
        }
        .text {
          font-size: 22px;
        }
      }
    }
    .navigation-wrapper {
      height: 100%;
      .el-menu {
        height: 100%;
      }
      .el-menu-item {
        font-size: 16px;
      }
      .el-menu--horizontal {
        border-bottom: 0;
      }
    }
    .service-wrapper {
      img {
        width: 30px;
        height: 30px;
      }
    }
    .user-wrapper {
      display: flex;
      align-items: center;
      height: 30px;
      padding: 0 1em;
      border: 1.5px solid #fff;
      border-radius: 30px;
      color: #fff;
      .account {
        width: 70px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .lang-wrapper {
      --sub-nav-offset: 10px;
      --option-radius: 5px;
      position: relative;
      color: #fff;
      .current-lang {
        display: flex;
        align-items: center;
        padding: 0 1em;
        height: 30px;
        border: 1.5px solid #fff;
        border-radius: 30px;
        white-space: nowrap;
        cursor: pointer;
        &:hover + .lang-options {
          display: block;
        }
      }
      .lang-options {
        position: absolute;
        z-index: 99999;
        top: calc(100% + var(--sub-nav-offset));
        right: 0;
        display: none;
        padding: 5px 0;
        width: 120px;
        background-color: #fff;
        border-radius: var(--option-radius);
        box-shadow: 0 2px 5px #0000001a;
        color: #141e42;
        &:before {
          content: '';
          position: absolute;
          top: calc(0px - var(--sub-nav-offset));
          display: block;
          width: 100%;
          height: var(--sub-nav-offset);
          background-color: #fff0;
        }
        &:hover {
          display: block;
        }
        .option {
          .link {
            display: block;
            padding: 0.8em 1em;
            color: #000;
            cursor: pointer;
            &:last-of-type {
              border-radius: 0 0 var(--option-radius) var(--option-radius);
            }
            &:hover {
              color: #266ef1;
            }
          }
        }
      }
    }
  }
  .img {
    display: block;
    margin-right: 10px;
    width: 32px;
    height: 32px;
  }
}
:global(.el-popper.sub-nav) {
  border: 0;
}
:global(.el-popper.sub-nav .el-menu-item) {
  height: auto;
  line-height: 1.5;
}
:global(.el-popper.sub-nav .el-menu .link) {
  padding: 14px 34px;
  color: #fff;
}
:global(.el-menu--horizontal) {
  border: 0;
}
</style>
<style lang="less">
.el-sub-menu__title,
.sub-link_title {
  font-size: 16px;
}
</style>
