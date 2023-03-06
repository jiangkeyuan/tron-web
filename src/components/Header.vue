<template>
  <div class="header-wrapper">
    <div class="inner">
      <a href="/" class="logo logo-wrapper">
        <h1>
          <img src="@/assets/logo/logo.svg" alt="" class="img" />
          <span class="text">Feee.io</span>
        </h1>
      </a>
      <div class="navigation-wrapper">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#121e42"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-sub-menu index="2">
            <template #title>能量交易</template>
            <el-menu-item index="2-1">自助交易</el-menu-item>
            <el-menu-item index="2-2">快捷交易</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="3">小助手</el-menu-item>
          <el-menu-item index="4">推荐奖励</el-menu-item>
          <el-menu-item index="5">平台公告</el-menu-item>
          <el-menu-item index="6">常见问题</el-menu-item>
          <el-menu-item index="7">商务合作</el-menu-item>
        </el-menu>
      </div>
      <a class="service-wrapper">
        <img src="@/assets/logo/logo.svg" alt="" class="img" />
      </a>
      <a href="/" class="user-wrapper">登录/注册</a>
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
import { ref } from 'vue'
const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
onMounted(() => {})
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
</style>
