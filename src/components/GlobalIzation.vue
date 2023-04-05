<template>
  <el-dropdown trigger="click">
    <div :class="props.isLogin ? 'glo-login' : 'glo-other'">
      <img src="@/assets/login/login-text.svg" alt="" class="glo-img" v-if="props.isLogin" />
      <img src="@/assets/login/login-text-other.svg" alt="" class="glo-img" v-else />
      <span class="glo-title">{{ title }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="() => changeLang(common.LANGCN)">{{ filterName(common.LANGCN) }}</el-dropdown-item>
        <el-dropdown-item @click="() => changeLang(common.LANGEN)">{{ filterName(common.LANGEN) }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import common from '@/utils/utils/common.js';
import {
  getStorage,
  filterName
}
  from '@/utils/utils/index.js';
const { appContext } = getCurrentInstance();
const props = defineProps({
  isLogin: false
})
const title = ref(filterName(getStorage('lang')));

const changeLang = (lang) => {
  if (lang === common.LANGEN) {
    title.value = filterName(common.LANGEN);
  } else {
    title.value = filterName(common.LANGCN);
  }
  appContext.config.globalProperties.$mitt.emit('changeLang', lang);
}
</script>

<style scoped>
.glo-login {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black;
}

.glo-other {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 6px 16px;
  height: 36px;
  border: 1px solid #c53027;
  border-radius: 30px;
  color: #c53027;
}

.glo-img {
  width: 16px;
  height: 16px;
}

.glo-title {
  font-size: 16px;
  margin-left: 5px;
}
</style>