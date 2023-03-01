<template>
  <div class="root">
    <el-config-provider>
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup>
const {ctx,appContext } = getCurrentInstance();
appContext.config.globalProperties.$mitt.on('changeLang',(langs)=>{
  ctx.$i18n.locale = langs;
  sessionStorage.setItem('lang',langs);
})
</script>

<style scoped>
</style>