<template>
    <HelpContent>
        <div class="help-draw">
            {{ $t("MANAGE-032") }}
        </div>
    </HelpContent>
</template>
<script setup>
import HelpContent from "../help-content.vue";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<style scoped>
.help-draw{
    height: 36px;
}
</style>