<template>
    <HelpContent>
        <div class="help-recharge">
            <h1 class="help-rechare-title">1. {{ $t("MANAGE-026") }}</h1>
            <img class="help-set-api-key-img" src="@/assets/help/api-create.png"/>
            <h1 class="help-rechare-title">1. {{ $t("MANAGE-026") }}</h1>
            <div class="help-rechare-title-l">2. {{ $t("MANAGE-027") }}</div>
            <img class="help-set-api-key-img" src="@/assets/help/api-create.png"/>
            <div class="help-rechare-title-l">2.2 {{ $t("MANAGE-028") }}</div>
            <img class="help-set-api-key-img" src="@/assets/help/api-create.png"/>
        </div>
    </HelpContent>
</template>

<script setup>
import HelpContent from "../help-content.vue";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<style scoped>
.help-set-api-key-img{
    width: 100%;
    height: auto;
    margin:10px 0 5px;
}
.help-rechare-title{
    font-size: 16px;
    margin: 10px 0;
}
.help-rechare-title-l{
    font-size: 14px;
    margin: 10px 0;
}
</style>