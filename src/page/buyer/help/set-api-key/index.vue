<template>
    <HelpContent>
        <div class="help-set-api-key">
            <div>{{ $t("MANAGE-023") }}</div>
            <img class="help-set-api-key-img" src="@/assets/help/api-create.png"/>
            <div>{{ $t("MANAGE-024") }}</div>
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
</style>