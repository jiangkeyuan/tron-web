<template>
  <div @click="gotoHelp('help/energy')" class="help">
    <img src="@/assets/home/doc-s1.svg" class="help-img" /><span
      class="help-text"
      >{{ $t("MANAGE-021") }}</span
    >
  </div>
  <div @click="gotoHelp('help/set-api-key')" class="help">
    <img src="@/assets/home/doc-s1.svg" class="help-img" /><span class="help-text">{{ $t("MANAGE-021") }}</span>
  </div>
  <div @click="gotoHelp('help/recharge')" class="help">
    <img src="@/assets/home/doc-s1.svg" class="help-img" /><span class="help-text">{{ $t("MANAGE-029") }}</span>
  </div>
  <div @click="gotoHelp('help/withdraw')" class="help">
    <img src="@/assets/home/doc-s1.svg" class="help-img" /><span class="help-text">{{ $t("MANAGE-031") }}</span>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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
