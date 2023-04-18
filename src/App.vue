<template>
  <router-view></router-view>
</template>

<script setup>
import {
    setStorage
}
from '@/utils/utils/index.js';
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const {ctx,appContext } = getCurrentInstance();
appContext.config.globalProperties.$mitt.on('changeLang',(langs)=>{
  locale.value = langs;
  setStorage('lang',langs);
})
</script>

<style scoped>
</style>