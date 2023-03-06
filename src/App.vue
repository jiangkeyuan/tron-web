<template>
  <router-view></router-view>
</template>

<script setup>
import {
    setStorage
}
from '@/utils/utils/index.js';
const {ctx,appContext } = getCurrentInstance();
appContext.config.globalProperties.$mitt.on('changeLang',(langs)=>{
  ctx.$i18n.locale = langs;
  setStorage('lang',langs);
})
</script>

<style scoped>
</style>