<template>
  <div @click="gotoHelp('help/how-auto-sell')" class="help">
    <img src="@/assets/home/doc-s1.svg" class="help-img" /><span class="help-text">如何授权给Feee.io自动出售能量？</span>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const gotoHelp = (route) => {
  router.push(route);
};
</script>
<style scoped>
.help {
  display: flex;
  flex-direction: row;
  height: 22px;
  justify-items: center;
  align-items: center;
  cursor: pointer;
  margin: 14px 0;
}

.help-img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.help:hover {
  color: #c53027;
}
</style>
